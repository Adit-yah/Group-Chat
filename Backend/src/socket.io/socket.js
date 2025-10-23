import { Server } from "socket.io";

export async function setUpSocket (httpServer ) {
    const io = new Server(httpServer , {cors : {
        origin : '*'
    }})

    //WHEN USER CONNECT
    io.on("connection" , (socket)=>{

        // FOR GROUP CHAT
        socket.on('join-group' , ({ groupId , username})=>{
            socket.join(groupId)
            //NOTIFY WHO'S JOIN
            socket.to(groupId).emit('notify' , username )
        })

        //NOTIFY WHO'S TYPING
        socket.on('typing' , ({groupId ,username})=>{
            socket.to(groupId).emit('typing' , username)
        })

        socket.on('stopTyping' , ({groupId , username})=>{
            socket.to(groupId).emit('stopTyping' , username)
        })

        //MENAGE MESSAGES SHARING IN GROUP
        socket.on('message' , ( data)=>{
            socket.to(data.groupId).emit('message' , data )
        })

        //WHEN USER DISCONNECT
        socket.on('disconnect', ()=>{
        })
    })
}