'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let respuestaSchema = mongoose.Schema({
	idEncuesta : { type: Schema.Types.ObjectId, ref: 'Pregunta'}, 
	userId     : { type: Schema.Types.ObjectId, ref: 'User'},
	valor      : { type : Number },
	createdAt  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Respuesta', respuestaSchema)
