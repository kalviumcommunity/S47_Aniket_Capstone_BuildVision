const mongoose = require('mongoose')
const Joi=require('joi')

const clientSchema = new mongoose.Schema({
    ClientEmail: Joi.string().required(),
    ClientPassword: Joi.string().required(),
    ClientName: Joi.string().required(),
    NoOfProjects: Joi.number().required(),
    BirthYear: Joi.number().required(),
    PhoneNumber: Joi.number().required(),
    ImageOfClient: Joi.string().required()
})
const ClientDetail = mongoose.model('client_detail', clientSchema)
module.exports = ClientDetail