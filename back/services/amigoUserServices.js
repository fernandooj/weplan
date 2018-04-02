'use strict'

let amigoUser = require('../models/amigoUserModel.js');
let moment = require('moment')

class amigoUserService{
	get(callback){
		amigoUser.find({}).populate('asignados').exec(callback)
	}
	getById(idUsuario, callback){
		amigoUser.find({idUsuario:idUsuario}).populate('asignados').exec(callback)
	}
	buscarUsuario(idUsuario, callback){
		console.log(idUsuario)
		amigoUser.findOne({idUsuario}, callback)
	}
	create(user, idUsuario, callback){
		let amigoUsers = new amigoUser();
		amigoUsers.idUsuario = idUsuario
		amigoUsers.asignados = user.asignados
		amigoUsers.save(callback)
	}
	update(user, idUsuario, callback){
		amigoUser.findOneAndUpdate({idUsuario}, {$set: {
	            'asignados': 	  user.asignados,
	            'updatedAt':       moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
	}
}


module.exports = new amigoUserService()