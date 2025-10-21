import { disconnect } from "process";
import { Server } from "socket.io";

export async function setUpSocket (httpServer ) {
    const io = new Server(httpServer , {cors : {
        origin : '*'
    }})

    //WHEN USER CONNECT
    io.on("connection" , (socket)=>{

        console.log('An user is connected to socket' , socket.id)

        // FOR GROUP CHAT
        socket.on('join-group' , ({ groupId , username})=>{
            socket.join(groupId)
            console.log(username + ' join the room')
            //NOTIFY WHO'S JOIN
            socket.to(groupId).emit('notify' , username )
        })

        //MANAGING IF USER NOT IN ROOM THEN ADDING THEM
        
        //NOTIFY WHO'S TYPING
        socket.on('typing' , ({groupId ,username})=>{
            console.log(username + ' is typing...')
            socket.to(groupId).emit('typing' , username)
        })

        //MENAGE MESSAGES SHARING IN GROUP
        socket.on('message' , ( data)=>{

            console.log(data)
            socket.to(data.groupId).emit('message' , data )
        })

        //WHEN USER DISCONNECT
        socket.on('disconnect', ()=>{
            console.log('An user is disconnected to socket' )
        })
    })
}