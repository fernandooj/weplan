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
	asignadosDueno 	: [{type: Schema.Types.ObjectId, ref:'User'}],
	userId     	  	: { type: Schema.Types.ObjectId, ref:'User'}, 
	asignados     	: [{type: Schema.Types.ObjectId, ref:'User'}],
	espera        	: [{type: Schema.Types.ObjectId, ref:'User'}],
	createdAt	  	: { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Item', itemSchema)


//// asignadosDueno ----> si es true es el dueño quien envio la invitacion de entrar, su unico objetivo es mostrar o no el boton de aceptar en pendientes,
// sin esto en pendientes muestra el boton de aceptar a ambos tanto al dueño del item como a quien esta interesado en entrar 
