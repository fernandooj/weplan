'use strict';

let User = require('./../models/usersModel.js');
let moment   = require('moment');

class userServices {
	get(callback){
		User.find({}, callback)
	}
	getEmail(user, callback){
		User.findOne({'local.username':user.username}, callback)
	}

	create(user, randonNumber, callback ){ 
		let newUsuario = new User() 
		newUsuario.local.username = user.username,
		newUsuario.local.token =    randonNumber,
		newUsuario.estado =   "inactivo"
		newUsuario.save(callback);	 
	}
	verificaToken(token, callback){
		User.findOne({'local.username':token.username, 'local.token': token.token}, callback)
	}
	activaUsuario(user, callback){
		User.findOne({ 'local.username' :  user.username }, function(error, user) {
			User.findByIdAndUpdate(user._id, {$set: {
                'estado':'activo'
            }}, callback);
		})
	}
	tipo(user,callback){
		User.findByIdAndUpdate(user.id, {$set: {
		    'tipo':       user.tipo,
		    'estado': 	  user.estado,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}
	edit(user, id, callback){
		let newUsuario = new User();
		if (user.password) {
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':       user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'local.password': newUsuario.generateHash(user.password),
	            'sexo':       	  user.sexo,
	            'pais':  	  	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'tipo':   	  	  user.tipo,
	            'updatedAt':       moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}else{
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':       user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'sexo':       	  user.sexo,
	            'pais':       	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'tipo':   	  	  user.tipo,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}
	}



	avatar(id, extension, callback){
		User.findByIdAndUpdate(id, {$set: {
            extension    : extension,
            'updatedAt'   : new Date()
        }}, callback)
	}

}

module.exports = new userServices()