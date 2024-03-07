const mongoose = require('mongoose')
const Joi=require('joi')

const designschema=Joi.object({
    Areaplot: Joi.number().required(),
    Areamap: Joi.number().required(),
    Description: Joi.string().required(),
    Imageofmap: Joi.array().items(Joi.string()).required()
})

const archiSchema = new mongoose.Schema({
    ArchiEmail: Joi.string().required(),
    ArchitectName: Joi.string().required(),
    NoOfProjects: Joi.number().required(),
    YearOfExperience: Joi.number().required(),
    ImageOfArchitect: Joi.array().items(Joi.string()).required(),
    designs: Joi.array().items(designschema).required()
})
const ArchiDetail = mongoose.model('architect_detail', archiSchema)
module.exports = ArchiDetail