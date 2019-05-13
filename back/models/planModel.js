'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema


const geoSchema = mongoose.Schema({
	type:{
		type:String,
		default:"Point"
	},
	coordinates:{
		type:[Number],
		index:'2dsphere'
	}
})

let planSchema = mongoose.Schema({
	createdAt	   :  { type: String },
	updatedAt	   :  { type: String },
	nombre         :  { type : String },
	tipo		   :  { type : String},
	area		   :  { type : Number},
	activo		   :  { type : Boolean},
	eliminado	   :  { type : Boolean, default:false},
	descripcion    :  { type : String },
	imagenOriginal : [{ type : String }],
	imagenResize   : [{ type : String }],
	imagenMiniatura: [{ type : String }],
	restricciones  : [{ type: Schema.Types.ObjectId, ref:'Restricciones'}],
	idUsuario      :  { type: Schema.Types.ObjectId, ref:'User'},
	fechaLugar     :  { type: String}, 
	loc 		   :  geoSchema,
	lugar          :  { type: String},
	notificaciones : [{ type: Schema.Types.ObjectId, ref:'User'}],  //// son los usuarios que se les va a enviar notificaciones
	asignados      : [{ type: Schema.Types.ObjectId, ref:'User'}],
	categorias     : [{ type: Schema.Types.ObjectId, ref:'CategoriaPlan'}],
	planPadre      :  { type: Schema.Types.ObjectId, ref:'Plan'},
})

module.exports = mongoose.model('Plan', planSchema)
