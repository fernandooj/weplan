'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let pagoSchema = mongoose.Schema({
	monto         : { type : String },
	metodo		  : { type : String },
	descripcion   : { type : String },
	estado		  : { type : String},
	itemId     	  : {type: Schema.Types.ObjectId, ref:'Item'},
	userId     	  : {type: Schema.Types.ObjectId, ref:'User'}, 
	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Pago', pagoSchema)
