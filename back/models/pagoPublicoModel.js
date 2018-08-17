'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let pagoPublicoSchema = mongoose.Schema({
	monto         : { type : Number },
	referencia    : { type : String },
	metodo		  : { type : String },
	descripcion   : { type : String },
	activo		  : { type : Boolean},
	userId     	  : { type: Schema.Types.ObjectId, ref:'User'}, 
	planId     	  : { type: Schema.Types.ObjectId, ref:'Plan'}, 
	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('PagoPublico', pagoPublicoSchema)
 