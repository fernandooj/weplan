'use strict';

let User = require('./../models/usersModel.js');
let moment   = require('moment');

class userServices {
	get(callback){
		User.find({}, null, {sort: {_id: -1}}, callback)
	}
	getEmail(user, callback){
		User.findOne({'username':user.username}, callback)
	}
	getEmailFacebook(username, callback){
		console.log(username)
		User.findOne({'username':username}, callback)
	}
	login(user, callback){
		User.findOne({ 'username' :  user.username }, callback)
	}
	getActivos(callback){
		User.find({ 'estado' :  'activo', 'acceso':'suscriptor' }, callback)
	}
	create(user, randonNumber, callback ){ 
		let newUsuario = new User() 
		newUsuario.username = user.username,
		newUsuario.token    = randonNumber,
		newUsuario.estado   = "inactivo"
		newUsuario.tipo	    = "local"
		newUsuario.acceso   = user.acceso
		newUsuario.save(callback);	 
	}
	facebook(user, callback){
		let newUsuario = new User() 
		newUsuario.token 	  = user.accessToken
		newUsuario.tokenPhone = user.tokenPhone
		newUsuario.email 	  = user.email
		newUsuario.username   = user.email
		newUsuario.nombre  	  = user.nombre
		newUsuario.photo 	  = user.photo
		newUsuario.idUser 	  = user.idUser
		newUsuario.tipo	 	  = user.tipo
		newUsuario.acceso     = user.acceso
		newUsuario.categorias = []
		newUsuario.estado     = "activo"
		newUsuario.save(callback)
	}
	 
	modificaCodigo(idUser, code, callback){
		User.findOne({'username':idUser.username}, function(err, user){
			User.findByIdAndUpdate(user._id, {$set:{
				'token':code
			}}, callback );	
		})
	}
	modificaTokenPhone(idUser, tokenPhone, callback){
		User.findByIdAndUpdate(idUser, {$set:{
			'tokenPhone':tokenPhone,
		}}, callback );	
	}
	verificaToken(token, callback){
		User.findOne({'username':token.username, 'token': token.token}, callback)
	}
	activaUsuario(user, callback){
		User.findOne({'username':user.username}, function(err, data){
			User.findByIdAndUpdate(data._id, {$set:{
				'estado':'activo'
			}}, callback );	
		})
	}
	enableDisable(user,callback){
		User.findByIdAndUpdate(user.id, {$set: {
		    'estado': 	  user.estado,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}
	edit(user, id, ruta, callback){
		let newUsuario = new User(); 
		if (user.password) {
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':         user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'password': 	  newUsuario.generateHash(user.password),
	            'sexo':       	  user.sexo,
	            'pais':  	  	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'photo':   	  	  ruta,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}else{
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':       user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'password': newUsuario.generateHash(user.password),
	            'sexo':       	  user.sexo,
	            'pais':       	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'photo':   	  	  ruta,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}
	}
	editCategorias(id, categorias, callback){
		User.findByIdAndUpdate(id, {$set: {
		    'categorias': categorias,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}
	createUser(user, randonNumber, ruta, callback){
		let newUsuario = new User() 
		newUsuario.username = user.email
		newUsuario.email 	= user.email
		newUsuario.nombre 	= user.nombre
		newUsuario.password =  newUsuario.generateHash(user.password)
		newUsuario.telefono = user.telefono
		newUsuario.estado   = user.estado
		newUsuario.sexo   	= user.sexo
		newUsuario.tipo	    = "local"
		newUsuario.acceso   = user.acceso
		newUsuario.ciudad   = user.ciudad
		newUsuario.pais     = user.pais
		newUsuario.token    = randonNumber
		newUsuario.photo    = ruta
		newUsuario.categorias = []
		newUsuario.save(callback);
	}
	avatar(id, extension, callback){
		User.findByIdAndUpdate(id, {$set: {
            extension    : extension,
            'updatedAt'   : new Date()
        }}, callback)
	}

}

module.exports = new userServices()