'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let itemSchema = mongoose.Schema({
	titulo        	: { type : String },
	tipo		  	: { type : String },
	descripcion   	: { type : String },
	imagenOriginal  : { type : String },
	imagenResize    : { type : String },
	imagenMiniatura : { type : String }, 
	enviarChat	  	: {type: String},
	valor         	: { type: String},
	activo		  	: { type : Boolean},
	abierto         : { type: Boolean},
	costoCreador    : { type: Number},
	planId     	  	: { type: Schema.Types.ObjectId, ref:'Plan'},
	userId     	  	: { type: Schema.Types.ObjectId, ref:'User'}, 
	asignados     	: [{type: Schema.Types.ObjectId, ref:'User'}],
	espera        	: [{type: Schema.Types.ObjectId, ref:'User'}],
	createdAt	  	: { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Item', itemSchema)
