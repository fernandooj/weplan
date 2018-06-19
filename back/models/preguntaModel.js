'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let encuestaSchema = mongoose.Schema({
	titulo       : { type : String },
	descripcion  : { type : String },
	pregunta1  	 : { type : String },
	pregunta2  	 : { type : String },
	tipo  		 : { type : String },
	userId     	 : { type: Schema.Types.ObjectId, ref: 'User'}, 
	planId 		 : { type: Schema.Types.ObjectId, ref: 'Plan'},
	createdAt  	 : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
}) 

module.exports = mongoose.model('Pregunta', encuestaSchema)
