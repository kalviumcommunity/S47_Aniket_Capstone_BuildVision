const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()

mongoose.connect(process.env.Cluster)

app.get("/",(req,res)=>{
    res.send("Hello, I am back")
})

app.listen(3000,()=>{
    console.log("Server 3000 is running")
})