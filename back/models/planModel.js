'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let planSchema = mongoose.Schema({
	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
	nombre        : { type : String },
	descripcion   : { type : String },
	imagen        : { type : String },
	restricciones : [{type:String}],
	idUsuario     : { type: Schema.Types.ObjectId, ref:'User'},
	fechaLugar    : {type: String}, 
	lat 		  : {type: String},
	lng           : {type: String},
	lugar         : {type: String},
	asignados     : [{type: Schema.Types.ObjectId, ref:'User'}],
})

module.exports = mongoose.model('Plan', planSchema)
