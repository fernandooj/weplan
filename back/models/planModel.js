'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');



let planSchema = mongoose.Schema({
	createdAt	  :  { type: String, default: moment().format('YYYY-MM-DD h:mm') },
	nombre        :  { type : String },
	tipo		  :  { type: String},
	activo		  :  { type: Boolean},
	descripcion   :  { type : String },
	imagenOriginal  : [{ type : String }],
	imagenResize    : [{ type : String }],
	imagenMiniatura : [{ type : String }],
	restricciones : [{ type: Schema.Types.ObjectId, ref:'Restricciones'}],
	idUsuario     :  { type: Schema.Types.ObjectId, ref:'User'},
	fechaLugar    :  { type: String}, 
	lat 		  :  { type: String},
	lng           :  { type: String},
	lugar         :  { type: String},
	asignados     : [{ type: Schema.Types.ObjectId, ref:'User'}],
	categorias    : [{ type: Schema.Types.ObjectId, ref:'CategoriaPlan'}],
	planPadre     :  { type: Schema.Types.ObjectId, ref:'Plan'},
})

module.exports = mongoose.model('Plan', planSchema)
