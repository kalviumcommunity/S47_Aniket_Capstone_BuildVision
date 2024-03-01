const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const archidetailschema=require("./Models/ArchiDetail.jsx")
const clientdetailschema=require("./Models/ClientDetail.jsx")
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.Cluster,{dbName:"BuildVision"},{
}).then(()=>{
    console.log("connected")
}).catch((error)=>{
    console.log(error)
})

app.get('/ArchitectureDetail',async(req,res)=>{
    await archidetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/ClientDetail',async(req,res)=>{
    await clientdetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})

app.post("/ArchitectureDetail",(req,res)=>{
    const{ArchitectName,NoOfProjects,YearOfExperience,PhoneNumber,ImageOfArchitect}=req.body
    archidetailschema.create(req.body)
        .then(result=>res.send(result))
        .catch(err => console.log(err))
})
app.post("/ClientDetail",(req,res)=>{
    const{ClientName,BirthYear,PhoneNumber,ImageOfClient}=req.body
    clientdetailschema.create(req.body)
        .then(result=>res.send(result))
        .catch(err => console.log(err))
})

app.listen(3000,()=>{
    console.log("Server 3000 is running")
})