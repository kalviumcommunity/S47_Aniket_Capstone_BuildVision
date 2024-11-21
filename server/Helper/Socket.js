const {Server} = require("socket.io")
const http = require("http")
const express = require("express")

const app=express()
const server=http.createServer(app)

const io= new Server(server,{
    // cors:{
    //     origin:"https://chat-project-mauve.vercel.app",
    //     methods:["GET","POST"],
    //     credentials:true
    // }
    cors:{
        origin:'http://localhost:5173',
        // origin:"*",
        methods:["GET","POST"],
        credentials:true
    }
})

const getRecieversSocketid=(recieverid)=>{
    return usersocketmap[recieverid]
}

const usersocketmap={};//{userid:socket.id}

io.on("connection", (socket) => {
    const userid = socket.handshake.query.userid;
    console.log(userid)
    if (userid !== "undefine") usersocketmap[userid] = socket.id;

    // const conversationid = socket.handshake.query.conversationId;
    // const conversationID = conversationid.toString();

    
    // Emit list of online users
    io.emit("getonlineusers", Object.keys(usersocketmap));

    // Join the user to their own room
    socket.join(userid);

    // Listen for 'sendMessage' event from client
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const receiverSocketId = getRecieversSocketid(receiverId);
        if (receiverSocketId) {
            // Emit the message to the specific receiver
            io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
        }
    });

    socket.on("disconnect", () => {
        delete usersocketmap[userid];
        io.emit("getonlineusers", Object.keys(usersocketmap));
    });
});


module.exports = {app , io , server , getRecieversSocketid}
