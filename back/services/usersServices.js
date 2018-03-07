'use strict';

let User = require('./../models/usersModel.js');
let moment   = require('moment');

class userServices {
	get(callback){
		User.find({}, callback)
	}
	getEmail(user, callback){
		User.findOne({'username':user.username}, callback)
	}

	create(user, randonNumber, callback ){ 
		let newUsuario = new User() 
		newUsuario.username = user.username,
		newUsuario.token    = randonNumber,
		newUsuario.estado   = "inactivo"
		newUsuario.tipo	    = "local"
		newUsuario.save(callback);	 
	}
	facebook(user, callback){
		let newUsuario = new User() 
		console.log(user)
		newUsuario.token = user.accessToken
		newUsuario.email = user.email
		newUsuario.name  = user.name
		newUsuario.photo = user.photo
		newUsuario.idUser 	 = user.idUser
		newUsuario.tipo	 = user.tipo
		newUsuario.save(callback)
	}
	google(user, callback){
		let newUsuario = new User() 
		console.log(user)
		newUsuario.token = user.accessToken
		newUsuario.email = user.email
		newUsuario.name  = user.name
		newUsuario.photo = user.photo
		newUsuario.idUser 	 = user.idUser
		newUsuario.tipo	 = user.tipo
		newUsuario.save(callback)
	}
	modificaCodigo(idUser, code, callback){
		User.findOne({'username':idUser.username}, function(err, user){
			User.findByIdAndUpdate(user._id, {$set:{
				'token':code
			}}, callback );	
		})
	}
	verificaToken(token, callback){
		User.findOne({'username':token.username, 'token': token.token}, callback)
	}
	activaUsuario(user, callback){
		User.findOne({ 'username' :  user.username }, function(error, user) {
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
	            'password': newUsuario.generateHash(user.password),
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
	            'password': newUsuario.generateHash(user.password),
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