import app from './src/app.js'
import { createServer} from 'http'
import {setUpSocket} from './src/socket.io/socket.js'
import dotenv from 'dotenv'

dotenv.config()
const httpServer = createServer(app)

setUpSocket(httpServer)

const PORT = process.env.PORT || 3000

httpServer.listen( PORT , ()=>console.log('server is running '))