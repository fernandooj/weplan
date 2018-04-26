'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let restriccionesSchema = mongoose.Schema({
	nombre     : { type : String },
	ruta       : { type : String },
	createdAt  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Restricciones', restriccionesSchema)
