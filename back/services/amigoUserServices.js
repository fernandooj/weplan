'use strict'

let amigoUser = require('../models/amigoUserModel.js');
let moment = require('moment')

class amigoUserService{
	get(callback){
		amigoUser.find({}).populate('asignados').exec(callback)
	}
	getById(idUsuario, callback){
		console.log(idUsuario)
		amigoUser.find({idUsuario}).populate('asignados').exec(callback)
	}
	buscarUsuario(idUsuario, callback){
		amigoUser.findOne({idUsuario}, callback)
	}
	create(user, idUsuario, callback){
		let amigoUsers = new amigoUser();
		amigoUsers.idUsuario = idUsuario
		amigoUsers.asignados = user.asignados
		amigoUsers.save(callback)
	}
	update(nuevoIds, idUsuario, callback){
		amigoUser.findOneAndUpdate({idUsuario}, {$set: {
	            'asignados': 	  nuevoIds,
	            'updatedAt':       moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
	}
}


module.exports = new amigoUserService()