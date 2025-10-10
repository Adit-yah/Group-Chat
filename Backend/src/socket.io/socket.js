import { disconnect } from "process";
import { Server } from "socket.io";

export async function setUpSocket (httpServer ) {
    const io = new Server(httpServer)
    //ROOM NAME
    const room = 'group'

    //WHEN USER CONNECT
    io.on("connection" , (socket)=>{

        console.log('An user is connected to socket' , socket.id)

        // FOR GROUP CHAT
        socket.on('join-group' , (username)=>{
            socket.join(room)
            console.log(username + ' join the room')
            //NOTIFY WHO'S JOIN
            socket.to(room).emit('notify' , username )
        })

        //NOTIFY WHO'S TYPING
        socket.on('typing' , (username)=>{
            console.log(username + ' is typing...')
            socket.to(room).emit('typing' , username)
        })

        //MENAGE MESSAGES SHARING IN GROUP
        socket.on('group-chat' , (data)=>{
            console.log(data)
            socket.to(room).emit('group-chat' , data )
        })

        //WHEN USER DISCONNECT
        socket.on('disconnect', ()=>{
            console.log('An user is disconnected to socket' )
        })
    })
}