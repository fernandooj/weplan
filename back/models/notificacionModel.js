'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////

let mongoose = require('mongoose')
let moment   = require('moment')
let Schema = mongoose.Schema


/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////

let notificacionSchema = mongoose.Schema({
	idUsuario 			: { type: Schema.Types.ObjectId, ref:'User'},
	idUsuarioAsigna 	: { type: Schema.Types.ObjectId, ref:'User'},
	idAmigoUser 		: { type: Schema.Types.ObjectId, ref:'amigoUser'},
	tipo      			: Number,
	estado    			: Boolean,
	createdAt 			: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
	updatedAt 			: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
})


module.exports = mongoose.model('Notificacion', notificacionSchema)

/// idUsuario 		==> El usuario que se tiene asignado la notificacion
/// idUsuarioAsigna ==> El usuario quien crea la notificacion
/// number tipo 1   ==> notificacion cuando se agregar un amigo