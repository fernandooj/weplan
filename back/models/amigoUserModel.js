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

let amigoUser = mongoose.Schema({
	createdAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
	updatedAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
	idUsuario : { type: Schema.Types.ObjectId, ref:'User'},
	asignados : [{type: Schema.Types.ObjectId, ref:'User'}],
})


module.exports = mongoose.model('amigoUser', amigoUser)