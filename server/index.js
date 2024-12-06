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
const sendotp = require('./Helper/OTPnodemailer.js')
const { getRecieversSocketid, io } = require('./Helper/Socket.js');
const Conversation = require('./Models/conversation.jsx')
const Message = require('./Models/message.jsx')
const ArchiDetail = require('./Models/ArchiDetail.jsx')
const ClientDetail = require('./Models/ClientDetail.jsx')



app.use('/Upload', express.static(path.join(__dirname, 'Upload')))
app.use(express.json())
app.use(cors())

app.use(cors({
    // origin:"http://localhost:5173",
    origin:`*`,
    credentials:true,
    methods: ["GET","POST"]
}))

mongoose.connect(process.env.CLUSTER, { dbName: "BuildVision" }, {
}).then(() => {
    console.log("connected")
}).catch((error) => {
    console.log(error)
})

app.get('/ArchiSignU', Validation, async (req, res) => {
    try {
        await archidetailschema.find({})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (error) {
        console.log(Error)
    }
})
app.get('/Profilefind/:role/:email', async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
})
app.get('/ClientSignU', Validation, async (req, res) => {
    try {
        await clientdetailschema.find({})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (error) {
        console.log(error)
    }
})
app.get('/Profile/:role/:id', async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
})
app.get('/Designs', Validation, async (req, res) => {
    try {
        await designdetailschema.find({})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (error) {
        console.log(error)
    }
})
app.get('/ShowDesign/:role/:id', async (req, res) => {
    try {
        id = req.params.id
        await designdetailschema.find({ ArchitectId: id })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (error) {
        console.log(error)
    }
})
app.get('/Design/:role/:id/:did', async (req, res) => {
    try {
        id = req.params.did
        if (req.params.role == "Architect") {
            await designdetailschema.findById(id)
                .then(result => { res.json(result) })
                .catch(err => console.log(err))
        }
    } catch (error) {
        console.log(error)
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
    try {
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
    } catch (error) {
        console.log(error)
    }
})
app.put('/EditDesign', async (req, res) => {
    try {
        const { role, did } = req.body
        if (role == "Architect") {
            await designdetailschema.findByIdAndUpdate(did, req.body.data)
                .then(result => { res.json(result) })
                .catch(err => console.log(err))
        }
    } catch (error) {
        console.log(error)
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
            const id = walidate._id
            const validpassword = await bcrypt.compare(password, pass)
            if (validpassword) {
                const token = jwt.sign({ walidate }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                res.json({ "result": "Login Successful", "token": token ,"id":id})
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
            const id = walidate._id
            const validpassword = await bcrypt.compare(password, pass)
            if (validpassword) {
                const token = jwt.sign({ walidate }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                res.json({ "result": "Login Successful", "token": token, "id": id})
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
    try {
        const afiledata = req.body
        const userexist = await archidetailschema.findOne({ ArchiEmail: afiledata.ArchiEmail })
        const nametaken = await archidetailschema.findOne({ ArchitectName: afiledata.ArchitectName })
        if (nametaken) {
            return res.status(400).json({ message: "Name Already Taken" })
        }
        if (userexist) {
            return res.status(400).json({ message: "User Already Exists" })
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
                        res.json({ "result": "Signup Successful", "token": token , "id":result._id})
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
    } catch (error) {
        console.log(error)
    }
})
app.post("/ClientSignUp", clientupload.single("ImageOfClient"), async (req, res) => {
    try {
        const cfiledata = req.body
        // console.log(pass);
        const userexist = await clientdetailschema.findOne({ ClientEmail: cfiledata.ClientEmail })
        const nametaken = await archidetailschema.findOne({ ArchitectName: afiledata.ArchitectName })
        if (nametaken) {
            return res.status(400).json({ message: "Name Already Taken" })
        }
        if (userexist) {
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
                        // console.log(result)
                        const token = jwt.sign({ result }, `${process.env.SECRET_KEY}`, { expiresIn: "1d" })
                        res.json({ "result": "Signup Successful", "token": token , "id":result._id})
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
    } catch (error) {
        console.log(error)
    }
})
app.post('/AddDesign/:role/:id', designupload.single("ImageOfDesign"), (req, res) => {
    try {
        const dfiledata = req.body;
        if (req.file) {
            dfiledata.ImageOfDesign = req.file.filename;
        }
        designdetailschema.create(dfiledata)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    } catch (error) {
        console.log(error)
    }
});






app.delete('/DeleteDesign/:role/:id/:did', async (req, res) => {
    try {
        const id = req.params.did
        if (req.params.role == "Architect") {
            await designdetailschema.findByIdAndDelete(id)
                .then(result => { res.json(result) })
                .catch(err => console.log(err))
        }
    } catch (error) {
        console.log(error)
    }
})










app.get('/GetArchiData',Validation, async (req, res) => {
    try {
        const data = await ArchiDetail.find().select("-password"); // Select all user data except password
        res.send(data);
    } catch (error) {
        console.error("GetUserDataError:", error);
        res.status(500).send("Server error");
    }
});
app.get('/GetClientData', Validation,async (req, res) => {
    try {
        const data = await ClientDetail.find().select("-password"); // Select all user data except password
        res.send(data);
    } catch (error) {
        console.error("GetUserDataError:", error);
        res.status(500).send("Server error");
    }
});
// app.get('/GetCurrentUser/:email',async (req, res) => {
//     const email=req.params.email
//     // console.log(email)
//     try {
//         const data = await User.findOne({ email: email })
//         res.send(data)
//     }
//     catch (error) {
//         console.error("getcurrentuserError:", error);
//     }
// })



app.get('/GetUserDataById',async (req, res) => {
    const {id,role}=req.query
    // console.log("id",id)
    try {
        const data = role === "Architect" 
            ? await archidetailschema.findOne({ _id: id }) 
            : await clientdetailschema.findOne({ _id: id });
        res.send(data)
    }
    catch (error) {
        console.error("getuserdatabyidError:", error);
    }
})



app.get('/:recieverid',async (req, res) => {
    try {
        const recieverid=req.params.recieverid
        const senderid=req.query.senderid
        // console.log(senderid)

        const conversation=await Conversation.findOne({
            participants: {
                $all: [senderid, recieverid]
            }
        }).populate("messages"); //not reference but actual messages

        // console.log(conversation)
        if(!conversation || !conversation.messages){
            return res.status(404).json({error:"Start a conversation"});
        }
        const messages=conversation.messages || []
        
        res.status(200).json(messages)
    }

    catch (error) {
        console.error("Error:", error);
        res.Status(500).json({error:"Internal Server Error"});
    }
})

app.post('/SendMessage/:recieverid',async (req, res) => {
    const recieverid = req.params.recieverid

    const { senderid, msg:message } = req.body
    // console.log(senderid, recieverid, message)

    try {
        let conversation=await Conversation.findOne({
            participants: {
                $all: [senderid, recieverid]
            }
        })
        if(!conversation){
            conversation=await Conversation.create({participants: [senderid, recieverid]})
        }

        const newMessage = new Message({
            senderid,
            recieverid,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        
        //save parallely
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ])

        // socket io for message
        const recieversocketid=getRecieversSocketid(recieverid)
        if(recieversocketid){
            // use to send event to specific user
            // console.log("recieversocketid",recieversocketid)
            io.to(recieversocketid).emit("newMessage",newMessage)

        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error:", error);
        res.Status(500).json({error:"Internal Server Error"});
    }
})













app.listen(3000, () => {
    console.log("Server 3000 is running")
})