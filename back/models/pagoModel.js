'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let pagoSchema = mongoose.Schema({
	monto         : { type : Number },
	metodo		  : { type : String },
	descripcion   : { type : String },
	activo		  : { type : Boolean},
	abono		  : { type : Boolean},
	itemId     	  : { type: Schema.Types.ObjectId, ref:'Item'},
	userId     	  : { type: Schema.Types.ObjectId, ref:'User'}, 
	userIdAbona   : { type: Schema.Types.ObjectId, ref:'User'}, 
	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
	updatedAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Pago', pagoSchema)


//// si el el dueño del item hace un abono a otro usuario entonces: quien asigna==userIdAbona