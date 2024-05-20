const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()
app.use(express.json())

mongoose.connect(process.env.Cluster,{
}).then(()=>{
    console.log("connected")
}).catch((error)=>{
    console.log(error)
})

app.get("/",(req,res)=>{
    res.send("Hello, I am back")
})

app.post("/post",(req,res)=>{
    res.send("Post request")
})

app.listen(3000,()=>{
    console.log("Server 3000 is running")
})
