const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    ClientEmail: String,
    ClientName: String,
    ClientPassword: String,
    BirthYear: Number,
    ClientPhoneNumber: Number,
    ImageOfClient: [{type:String}],
    Role: String
})
const ClientDetail = mongoose.model('client_detail', clientSchema)
module.exports = ClientDetail