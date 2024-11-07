const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const archidetailschema = require("./Models/ArchiDetail.jsx")
const clientdetailschema = require("./Models/ClientDetail.jsx")
const designdetailschema = require("./Models/DesignDetail.jsx")
const cors = require('cors')
const { designupload } = require('./multer/designmulter.js')
const { clientupload } = require('./multer/clientmulter.js')
const { archiupload } = require('./multer/architectmulter.js')
const path = require('path')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Validation } = require('./Auth/Auth.js')
const sendotp = require('./Helper/nodemailer.js')

app.use('/Upload', express.static(path.join(__dirname, 'Upload')))
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.CLUSTER, { dbName: "BuildVision" }, {
}).then(() => {
    console.log("connected")
}).catch((error) => {
    console.log(error)
})

app.get('/ArchiSignU', Validation, async (req, res) => {
    await archidetailschema.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.get('/Profilefind/:role/:email', async (req, res) => {
    if (req.params.role == "Architect") {
        await archidetailschema.findOne({ ArchiEmail: req.params.email })
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
    else if (req.params.role == "Client") {
        await clientdetailschema.findOne({ ClientEmail: req.params.email })
            .then(result => { res.json(result) })
            .catch(err => console.log(err))
    }
})
app.get('/ClientSignU', Validation, async (req, res) => {
    await clientdetailschema.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.get('/Profile/:role/:id', async (req, res) => {
    id = req.params.id
    if (req.params.role == "Architect") {
        await archidetailschema.findById(id)
            .then(result => {
                res.json(result)
            })
            .catch(err => console.log(err))
    }
    else if (req.params.role == "Client") {
        await clientdetailschema.findById(id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
})
app.get('/Designs', Validation, async (req, res) => {

    await designdetailschema.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.get('/ShowDesign/:role/:id', async (req, res) => {
    id = req.params.id
    await designdetailschema.find({ ArchitectId: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.get('/Design/:role/:id/:did', async (req, res) => {
    id = req.params.did
    if (req.params.role == "Architect") {
        await designdetailschema.findById(id)
            .then(result => { res.json(result) })
            .catch(err => console.log(err))
    }
})
app.get('/ClientForgetPass', async (req, res) => {
    try {
        const email = req.headers.email
        const client = await clientdetailschema.findOne({ "ClientEmail": email })
        if (!client) {
            return res.status(404).send("User does not exist");
        }
        else {
            const otp = Math.round((Math.random()) * 10000)
            await (sendotp(otp, email))
                .then(() => {
                    res.status(200).send({ otp });
                }).catch((err) => {
                    console.log(err)
                })
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/ArchitectForgetPass', async (req, res) => {
    try {
        const email = req.headers.email
        const client = await archidetailschema.findOne({ "ArchiEmail": email })
        if (!client) {
            return res.status(404).send("User does not exist");
        }
        else {
            const otp = Math.round((Math.random()) * 10000)
            await (sendotp(otp, email))
                .then(() => {
                    res.status(200).send({ otp });
                }).catch((err) => {
                    console.log(err)
                })
        }
    } catch (error) {
        console.log(error)
    }
})






app.put('/Profileedit/:role/:id', async (req, res) => {
    const id = req.params.id
    if (req.params.role == "Architect") {
        await archidetailschema.findByIdAndUpdate(id, req.body)
            .then(result => { res.json(result) })
            .catch(err => console.log(err))
    }
    else {
        await clientdetailschema.findByIdAndUpdate(id, req.body)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
})
app.put('/EditDesign/:role/:id/:did', async (req, res) => {
    const id = req.params.did
    if (req.params.role == "Architect") {
        await designdetailschema.findByIdAndUpdate(id, req.body)
            .then(result => { res.json(result) })
            .catch(err => console.log(err))
    }
})
app.put('/Clientchangepassword', async (req, res) => {
    try {
        const { email, pass } = req.body;
        console.log(email, pass)
        const hash = await bcrypt.hash(pass, 10);
        const client = await clientdetailschema.findOne({ "ClientEmail": email });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        client.ClientPassword = hash;
        await client.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.put('/Architectchangepassword', async (req, res) => {
    try {
        const { email, pass } = req.headers;
        const hash = await bcrypt.hash(pass, 10);
        const Architect = await archidetailschema.findOne({ "ArchiEmail": email });
        if (!Architect) {
            return res.status(404).json({ message: "Architect not found" });
        }
        Architect.ArchiPassword = hash;
        await Architect.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});







app.post('/ClientLogin', async (req, res) => {
    try {
        const { email, password } = req.body
        const walidate = await clientdetailschema.findOne({ ClientEmail: email })
        if (walidate) {
            const pass = walidate.ClientPassword
            const validpassword = await bcrypt.compare(password, pass)
            if (validpassword) {
                const token = jwt.sign({ walidate }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                res.json({ "result": "Login Successful", "token": token })
            }
            else {
                return res.status(400).send("Entries doesn't match")
            }
        }
        else {
            return res.status(400).send("User Doest Exist")
        }
    } catch (error) {
        console.log(error)
    }
})
app.post('/ArchiLogin', async (req, res) => {
    try {
        const { email, password } = req.body
        const walidate = await archidetailschema.findOne({ ArchiEmail: email })
        if (walidate) {
            const pass = walidate.ArchiPassword
            const validpassword = await bcrypt.compare(password, pass)
            if (validpassword) {
                const token = jwt.sign({ walidate }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                res.json({ "result": "Login Successful", "token": token })
            }
            else {
                return res.status(400).send("Entries doesn't match")
            }
        }
        else {
            return res.status(400).send("User Doest Exist")
        }
    } catch (error) {
        console.log(error)
    }
})
app.post("/ArchiSignUp", archiupload.single("ImageOfArchitect"), async (req, res) => {
    const afiledata = req.body
    const userexist = await archidetailschema.findOne({ ArchiEmail: afiledata.ArchiEmail })
    if (userexist) {
        return res.status(400).json({ message: "user already exists" })
    }
    else {
        if (req.file) {
            afiledata.ImageOfArchitect = req.file.filename
        }
        if (afiledata.ArchiPassword) {
            const pass = req.body.ArchiPassword
            const hash = await bcrypt.hash(pass, 10)
            archidetailschema.create({ ...afiledata, ArchiPassword: hash })
                .then(result => {
                    const token = jwt.sign({ result }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                    res.json({ "result": "Signup Successful", "token": token })
                })
                .catch(err => console.log(err))
        }
        else {
            archidetailschema.create({ ...afiledata })
                .then(result => {
                    res.json({ "result": "Signup Successful" })
                })
                .catch(err => console.log(err))
        }
    }
})
app.post("/ClientSignUp", clientupload.single("ImageOfClient"), async (req, res) => {
    const cfiledata = req.body
    // console.log(pass);


    const userexist = await clientdetailschema.findOne({ ClientEmail: cfiledata.ClientEmail })
    if (userexist) {
        // console.log(userexist);
        return res.status(400).json({ message: "user already exists" })
    }
    else {

        if (req.file) {
            cfiledata.ImageOfClient = req.file.filename
        }
        if (cfiledata.ClientPassword) {
            const pass = req.body.ClientPassword
            const hash = await bcrypt.hash(pass, 10)
            clientdetailschema.create({ ...cfiledata, ClientPassword: hash })
                .then(result => {
                    const token = jwt.sign({ result }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                    res.json({ "result": "Signup Successful", "token": token })
                })
                .catch(err => console.log(err))
        }
        else {
            clientdetailschema.create({ ...cfiledata })
                .then(result => {
                    res.json({ "result": "Signup Successful" })
                })
                .catch(err => console.log(err))
        }
    }
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






app.delete('/DeleteDesign/:role/:id/:did', async (req, res) => {
    const id = req.params.did
    if (req.params.role == "Architect") {
        await designdetailschema.findByIdAndDelete(id)
            .then(result => { res.json(result) })
            .catch(err => console.log(err))
    }
})





app.listen(3000, () => {
    console.log("Server 3000 is running")
})


