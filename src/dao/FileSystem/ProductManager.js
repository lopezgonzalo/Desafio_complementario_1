import { promises as fs, existsSync, writeFileSync } from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async addProduct(title, description, code, price, status = true, stock, category, thumbnails = []) {
        const prodObj = { title, description, code, price, status, stock, category, thumbnails };

        if (Object.values(prodObj).includes("") || Object.values(prodObj).includes(null)) {
            return `Campos incompletos`
        } else {
            this.checkFile();
            try {
                const read = await fs.readFile(this.path, "utf-8");
                let data = JSON.parse(read);
                if (data.some((elem) => elem.code === prodObj.code)) {
                    throw `El codigo "${code}" ya existe`;
                } else {
                    let newID;
                    !data.length ? (newID = 1) : (newID = data[data.length - 1].id + 1);
                    data.push({ ...prodObj, id: newID });
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    return newID
                }
            } catch (err) {
                console.error(err);
                return err
            }
        }
    }

    async getProducts() {
        this.checkFile();
        try {
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async getProductById(id) {
        this.checkFile();
        try {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const found = data.find((prod) => prod.id === id);
            if (!found) {
                console.log(`ID no encontrada`)
                return false
            } else {
                return found;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async updateProduct(id, title, description, code, price, status = true, stock, category, thumbnails = []) {
        this.checkFile();
        try {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            if (data.some((prod) => prod.id === id)) {
                const index = data.findIndex((prod) => prod.id === id);
                data[index].title = title;
                data[index].description = description;
                data[index].category = category;
                data[index].price = price;
                data[index].thumbnails = thumbnails;
                data[index].code = code;
                data[index].stock = stock;
                data[index].status = status;
                await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                return true
            } else {
                throw `ID "${id}" No encontrada`;
            }
        } catch (err) {
            console.error(err);
            return err
        }
    }

    async deleteProduct(id) {
        this.checkFile();
        try {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const index = data.findIndex((prod) => prod.id === id);
            if (index !== -1) {
                data.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                return true
            } else {
                throw `ID "${id}" no encontrada`;;
            }
        } catch (err) {
            console.log(err);
            return err
        }
    }
}

export default ProductManager;

