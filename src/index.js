import 'dotenv/config'
import routerProduct from "./routes/products.routes.js";
import routerSocket from "./routes/socket.routes.js";
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'
import { __dirname } from "./path.js";
import * as path from 'path'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

app.set("port", process.env.PORT || 8080)


const server = app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`)
})

const io = new Server(server)

const data = await getManagerMessages();
const managerMessages = new data();

io.on("connection", async (socket) => {
    console.log("Coneccion encontrada")

    socket.on("message", async newMessage => {
        await managerMessages.addElements([newMessage])
        const messages = await managerMessages.getElements()
        console.log(messages)
        io.emit("allMessages", messages)
    })

    socket.on("load messages", async () => {
        const messages = await managerMessages.getElements()
        console.log(messages)
        io.emit("allMessages", messages)
    })
})

app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/api/products', routerProduct)
app.use('/realtimeproducts', routerSocket)
app.use('/chat', routerSocket)