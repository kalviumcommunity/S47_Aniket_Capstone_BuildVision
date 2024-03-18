const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const archidetailschema=require("./Models/ArchiDetail.jsx")
const clientdetailschema=require("./Models/ClientDetail.jsx")
const cors=require('cors')
const {designupload}=require('./multer/designmulter.js')
const {clientupload}=require('./multer/clientmulter.js')
const {archiupload}=require('./multer/architectmulter.js')
const path=require('path')
const app=express()


app.use('/Upload',express.static(path.join(__dirname,'Upload')))
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
app.get('/ArchiSignU',async(req,res)=>{
    await archidetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/ClientSignU',async(req,res)=>{
    await clientdetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/Profile/:role/:email',async(req,res)=>{
    if(req.params.role=="Architect"){
        await archidetailschema.find({ArchiEmail:req.params.email})
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
    else{
        await clientdetailschema.find({ClientEmail:req.params.email})
        .then(result=>res.json(result))
        .catch(err => console.log(err))
    }
})


app.post("/ArchiSignUp",archiupload.single("ImageOfArchitect"),(req,res)=>{
    const afiledata=req.body
    if(req.file){
        afiledata.ImageOfArchitect = req.file.ImageOfArchitect[0].path
    }
    console.log(afiledata)
    archidetailschema.create(afiledata)
    .then(result=>res.send(result))
    .catch(err => console.log(err))
})
app.post("/ClientSignUp",clientupload.single("ImageOfClient"),(req,res)=>{
    const cfiledata=req.body
    cfiledata.ImageOfClient = req.file.filename
    console.log(cfiledata)
    console.log("zsfdxgcfgvjbkjh")
    console.log(req.body)
    clientdetailschema.create(cfiledata)
        .then(result=>res.send(result))
        .catch(err => console.log(err))
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