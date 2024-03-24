const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const archidetailschema=require("./Models/ArchiDetail.jsx")
const clientdetailschema=require("./Models/ClientDetail.jsx")
const designdetailschema=require("./Models/DesignDetail.jsx")
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

app.get('/ArchiSignU',async(req,res)=>{
    await archidetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/Profilefind/:role/:email',async(req,res)=>{
    if(req.params.role=="Architect"){
        await archidetailschema.findOne({ArchiEmail:req.params.email})
        .then(result=>res.json(result))
        .catch(err =>console.log(err))
    }
    else{
        await clientdetailschema.findOne({ClientEmail:req.params.email})
        .then(result=>res.json(result))
        .catch(err => console.log(err))
    }
})
app.get('/ClientSignU',async(req,res)=>{
    await clientdetailschema.find({})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/Profile/:role/:id',async(req,res)=>{
    id=req.params.id
    if(req.params.role=="Architect"){
        await archidetailschema.findById(id)
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
    else{
        await clientdetailschema.find({ClientEmail:req.params.email})
        .then(result=>res.json(result))
        .catch(err => console.log(err))
    }
})
app.get('/ShowDesign/:role/:id',async(req,res)=>{
    id=req.params.id
    await designdetailschema.find({ArchitectId:id})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.get('/Design/:role/:id/:did',async(req,res)=>{
    id=req.params.did
    if(req.params.role=="Architect"){
        await designdetailschema.findById(id)
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
})

app.put('/Profileedit/:role/:id',async(req,res)=>{
    const id=req.params.id
    if(req.params.role=="Architect"){
        console.log(req.body)
        await archidetailschema.findByIdAndUpdate(id,req.body)
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
    else{
        await clientdetailschema.findByIdAndUpdate(id,req.body)
        .then(result=>res.json(result))
        .catch(err => console.log(err))
    }
})
app.put('/EditDesign/:role/:id/:did',async(req,res)=>{
    const id=req.params.did
    if(req.params.role=="Architect"){
        await designdetailschema.findByIdAndUpdate(id,req.body)
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
})

app.post("/ArchiSignUp",archiupload.single("ImageOfArchitect"),(req,res)=>{
    const afiledata=req.body
    if(req.file){
        afiledata.ImageOfArchitect = req.file.filename
    }
    archidetailschema.create(afiledata)
    .then(result=>res.send(result))
    .catch(err => console.log(err))
})
app.post("/ClientSignUp",clientupload.single("ImageOfClient"),(req,res)=>{
    const cfiledata=req.body
    if(req.file){
        cfiledata.ImageOfClient = req.file.filename
    }
    clientdetailschema.create(cfiledata)
        .then(result=>res.send(result))
        .catch(err => console.log(err))
})
app.post('/AddDesign/:role/:id', designupload.single("ImageOfDesign"), (req, res) => {
    if (req.params.role === "Architect") {
        const dfiledata = req.body;
        if (req.file) {
            dfiledata.ImageOfDesign = req.file.filename;
        }
        designdetailschema.create(dfiledata)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    }
});


app.delete('/DeleteDesign/:role/:id/:did',async(req,res)=>{
    const id=req.params.did
    if(req.params.role=="Architect"){
        await designdetailschema.findByIdAndDelete(id)
        .then(result=>{res.json(result)})
        .catch(err =>console.log(err))
    }
})


app.listen(3000,()=>{
    console.log("Server 3000 is running")
})