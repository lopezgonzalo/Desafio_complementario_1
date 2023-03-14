import { Router } from 'express'
import { CartManager } from '../dao/FileSystem/CartManager.js'
import { getManagerProducts } from '../dao/daoManager.js'

const selectedDB = process.env.DBSELECTION
const routerCart = Router()
const cartManager = new CartManager('src/models/carts.json')
const prodManager = new ProductManager('src/models/products.json')

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const prodQty = 1 
    const productInfo = await prodManager.getProductById(parseInt(req.params.pid))
    if (productInfo) {
        const data = await cartManager.addProduct(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Producto "${productInfo.id}" añadido al carrito`) : res.send(`Error al añadir el producto`)
    } else {
        res.send(`Producto "${req.params.pid}" no encontrado`)
    }

})

routerCart.post('/', async (req, res) => {
    const data = await cartManager.createCart()
    data ? res.send(`Carrito creado en ID ${data}`) : res.send("Error al crear el carrito")
})

routerCart.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCart(parseInt(req.params.cid))
    cart ? res.send(cart) : res.send(`carrito no encontrado`)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    const data = await cartManager.removeProductById(parseInt(req.params.cid), parseInt(req.params.pid))
    res.send(data)
})

export default routerCart