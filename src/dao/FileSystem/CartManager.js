import { promises as fs, existsSync, writeFileSync } from "fs";

class Cart {
    constructor(id, products) {
        this.id = id
        this.products = products
    }
}
export class CartManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async createCart() {
        this.checkFile()
        try {
            const read = await fs.readFile(this.path, 'utf-8')
            let data = JSON.parse(read)
            let newId
            data.length > 0 ? newId = data[data.length - 1].id + 1 : newId = 1
            const newCart = new Cart(newId, []);
            data.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(data))
            return newId
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async addProduct(cartId, prodId, prodQty) {
        this.checkFile();
        try {
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            const foundCartIndex = data.findIndex(elem => elem.id === cartId)
            if (foundCartIndex === -1) {
                throw `No se encontro la ID`
            } else {
                const cartObj = new Cart(cartId, data[foundCartIndex].products)
                const foundProdIndex = cartObj.products.findIndex(elem => elem.product === prodId)
                if (foundProdIndex === -1) {
                    cartObj.products.push({ product: prodId, quantity: prodQty })
                    data[foundCartIndex] = cartObj
                } else {
                    data[foundCartIndex].products[foundProdIndex].quantity += prodQty
                }
            }
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
            return true;
        } catch (err) {
            console.error(err);
            return err
        }
    }

    async getCart(id) {
        this.checkFile()
        try {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const found = data.findIndex(elem => elem.id === id)
            if (found === -1) {
                throw "No se encontro la ID"
            } else {
                return data[found] 
            }
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async removeProductById(cartId, prodId) {
        this.checkFile()
        try {
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            const foundCartIndex = data.findIndex(elem => elem.id === cartId)
            if (foundCartIndex === -1) {
                return `No se encontro la ID`
            } else {
                const cartObj = new Cart(cartId, data[foundCartIndex].products)
                const foundProdIndex = cartObj.products.findIndex(elem => elem.product === prodId)
                if (foundProdIndex === -1) {
                    return `El producto"${prodId}" no se encuentra en el carrito "${cartId}"`
                } else {
                    data[foundCartIndex].products.splice(foundProdIndex, 1)
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    return true
                }
            }
        } catch (err) {
            console.error(err)
            return err
        }
    }
}