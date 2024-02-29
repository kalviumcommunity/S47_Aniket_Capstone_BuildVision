const mongoose = require('mongoose')

const archiSchema = new mongoose.Schema({
    ArchitectName: String,
    NoOfProjects: Number,
    YearOfExperience: Number,
    PhoneNumber: Number,
    ImageOfArchitect: String
})
const ArchiDetail = mongoose.model('architect_detail', archiSchema)
module.exports = ArchiDetail