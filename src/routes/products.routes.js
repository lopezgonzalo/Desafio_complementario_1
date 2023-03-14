import { Router } from 'express'
import { getManagerProducts } from '../dao/daoManager.js'

const selectedDB = process.env.DBSELECTION
const routerProduct = Router()
const managerData = await getManagerProducts()
const manager = new managerData()

routerProduct.get('/', async (req, res) => {
    let { limit } = req.query;
    if (selectedDB == 1) {
        let products
        !limit
            ? products = await manager.getElements(0)
            : products = await manager.getElements(limit)
        res.send({ response: products })
    } else {
        
    }

});

routerProduct.get("/:pid", async (req, res) => {
    
    if (selectedDB == 1) {
        
        const product = await manager.getElementById(req.params.pid)
        res.send({ response: product })
    } else {
        
    }
});

routerProduct.post('/', async (req, res) => {
    try {
        if (selectedDB == 1) {
            
            const data = await manager.addElements(req.body)
            res.send({ response: data })
        } else {
            
        }
    } catch (error) {
        res.send({ response: error })
    }

})

routerProduct.put('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            
            const data = await manager.updateElement(req.params.pid, req.body)
            res.send({ response: data })
        } else {
            
        }
    } catch (error) {
        res.send({ response: error })
    }

})

routerProduct.delete('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            
            const data = await manager.deleteElement(req.params.pid)
            res.send({ response: data })
        } else {
            
        }

    } catch (error) {
        res.send({ response: error })

    }
    
})

export default routerProduct