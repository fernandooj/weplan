'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');

/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
let UserSchema = mongoose.Schema({
	createdAt:   { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	username:    String,
	nombre:      String,
	nacimiento:  String,
	sexo :       String,
	pais:        String,
	ciudad:      String,
	extension:   String,
	email:    	 String,
	tipo:        String,
	estado:      String,
	//updatedAt:   { type: Date }
	local:{
		username:    String,
		password:    String,
		token:       String,
	},
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports =  mongoose.model('User', UserSchema) 