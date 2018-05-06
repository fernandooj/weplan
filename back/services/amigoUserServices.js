'use strict'

let amigoUser = require('../models/amigoUserModel.js');
let moment = require('moment')

class amigoUserService{
	get(callback){
		amigoUser.find({}).populate('asignado').exec(callback)
	}
	getById(idUsuario, callback){
		//amigoUser.find({idUsuario}).populate('asignado').populate('idUsuario').exec(callback)
		amigoUser.find().or([{idUsuario},{asignado:idUsuario}]).populate('asignado').populate('idUsuario').exec(callback)
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
}


module.exports = new amigoUserService()