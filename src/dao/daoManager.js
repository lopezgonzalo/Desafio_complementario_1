export const getManagerMessages = async () => {
    const modelMessage = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Message.js').then(module => module.default) // MongoDB 
        : await import('./Postgresql/models/Message.js').then(module => module.default) // SQL (postgres)
    return modelMessage
}

export const getManagerProducts = async () => {
    const modelProduct = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Product.js').then(module => module.default) // MongoDB 
        : await import('./Postgresql/models/Product.js').then(module => module.default) // SQL (postgres)
    return modelProduct
}

export const getManagerCarts = async () => {
    const modelCart = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Cart.js'.then(module => module.default)) // MongoDB 
        : await import('./Postgresql/models/Cart.js').then(module => module.default)  // SQL (postgres)
    return modelCart
}