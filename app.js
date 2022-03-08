const express = require("express")
const socket = require("socket.io")

const app= express();
app.use(express.static("frontend"));
let port=process.env.PORT || 6000;
let server=app.listen(port,()=>{
    console.log("listening to port"+ port) ;
})
let io=socket(server);
io.on("connection", (socket) =>{
    console.log("made socket connection");
    socket.on("beginpath",(data)=>{
        io.socket.emit("beginpath",data);
    })
})

