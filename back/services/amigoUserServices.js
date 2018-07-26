'use strict'

let amigoUser = require('../models/amigoUserModel.js');
let moment = require('moment')

class amigoUserService{
	get(callback){
		amigoUser.find({}).populate('asignado').exec(callback)
	}
	getById(idUsuario, estado, callback){
		console.log(idUsuario)
		if (estado!=='null') {
			console.log(estado)
			amigoUser.find().or([{idUsuario, estado},{asignado:idUsuario, estado}]).populate('asignado').populate('idUsuario').exec(callback)
		}else{
			amigoUser.find().or([{idUsuario},{asignado:idUsuario}]).populate('asignado').populate('idUsuario').exec(callback)
		}
	}
	yaSonAmigos(idUsuario, asignado, callback){
		amigoUser.find().or([{idUsuario, asignado, estado:true},{idUsuario:asignado, asignado:idUsuario, estado:true}]).populate('asignado').populate('idUsuario').exec(callback)
	}
	getByUser(idUsuario, asignado, callback){
		amigoUser.find().or([{idUsuario, asignado},{idUsuario:asignado, asignado:idUsuario}]).populate('asignado').populate('idUsuario').exec(callback)
	}
	buscarUsuario(idUsuario, callback){
		amigoUser.find({idUsuario}, callback)
	}
	create(asignado, idUsuario, callback){
		let amigoUsers = new amigoUser();
		amigoUsers.idUsuario = idUsuario
		amigoUsers.asignado  = asignado
		amigoUsers.estado    = false
		amigoUsers.save(callback)
	}
	activa(_id, callback){
		amigoUser.findOneAndUpdate({_id}, {$set: {
            'estado': 	 true,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
	elimina(_id, callback){
		amigoUser.remove({_id}, callback);
	}
}


module.exports = new amigoUserService()