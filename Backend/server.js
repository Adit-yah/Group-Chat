import app from './src/app.js'
import { createServer} from 'http'
import {setUpSocket} from './src/socket.io/socket.js'

const httpServer = createServer(app)

setUpSocket(httpServer)

httpServer.listen(3000 , ()=>console.log('server is running on port no 3000'))