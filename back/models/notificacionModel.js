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
	idUsuario : { type: Schema.Types.ObjectId, ref:'User'},
	tipo      : String,
	estado    : Boolean,
	createdAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
	updatedAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
})


module.exports = mongoose.model('Notificacion', notificacionSchema)