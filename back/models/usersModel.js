'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema = mongoose.Schema
let bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');

/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
// const pagoSchema = mongoose.Schema({
	 
// 	monto         : { type : Number },
// 	referencia    : { type : String },
// 	metodo		  : { type : String },
// 	descripcion   : { type : String },
// 	activo		  : { type : Boolean},
// 	planId     	  : { type: Schema.Types.ObjectId, ref:'Plan'},
// 	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
 
// })

let UserSchema = mongoose.Schema({
	createdAt	: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	username	: String,
	tokenPhone	: String,
	nombre		: String,
	nacimiento  : String,
	sexo 		: String,
	pais		: String,
	ciudad		: String,
	photo	 	: String,
	email		: String,
	telefono	: String,
	tipo		: String,
	acceso		: String,
	estado		: String,
	updatedAt	: String,
	username	: String,
	password 	: String,
	token		: String,
	cedula		: Number,
	notificacion:{ type:Boolean },
	calificacion:[{ type:Number }],
	categorias  :[{type: Schema.Types.ObjectId, ref:'CategoriaPlan'}],
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password) {
	if(this.password != null) {
		return bcrypt.compareSync(password, this.password);
	} else {
		return false; 
	}
};


module.exports =  mongoose.model('User', UserSchema) 