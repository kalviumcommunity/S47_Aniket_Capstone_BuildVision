const mongoose = require('mongoose')

const archiSchema = new mongoose.Schema({
    ArchiEmail: String,
    ArchiPassword: String,
    ArchitectName: String,
    NoOfProjects: Number,
    YearOfExperience: Number,
    ArchiPhoneNumber: Number,
    ImageOfArchitect: [{type: String}],
    Role: String
})
const ArchiDetail = mongoose.model('architect_detail', archiSchema)
module.exports = ArchiDetail