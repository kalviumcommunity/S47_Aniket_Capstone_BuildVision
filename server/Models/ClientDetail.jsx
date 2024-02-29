const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    ClientName: String,
    BirthYear: Number,
    PhoneNumber: Number,
    ImageOfClient: String
})
const ClientDetail = mongoose.model('client_details', clientSchema)
module.exports = ClientDetail