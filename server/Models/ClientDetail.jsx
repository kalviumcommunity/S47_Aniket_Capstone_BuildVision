const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    ClientEmail: String,
    ClientName: String,
    ClientPassword: String,
    NoOfProjects: Number,
    BirthYear: Number,
    PhoneNumber: Number,
    ImageOfClient: [{type:String}],
    Role: String,
    PhoneNo: Number
})
const ClientDetail = mongoose.model('client_detail', clientSchema)
module.exports = ClientDetail