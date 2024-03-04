const mongoose = require('mongoose')
const Joi=require('joi')

const archiSchema = new mongoose.Schema({
    ArchiEmail: Joi.string().required(),
    ArchiPassword: Joi.string().required(),
    ArchitectName: Joi.string().required(),
    NoOfProjects: Joi.number().required(),
    YearOfExperience: Joi.number().required(),
    ImageOfArchitect: Joi.string().required()
})
const ArchiDetail = mongoose.model('architect_detail', archiSchema)
module.exports = ArchiDetail