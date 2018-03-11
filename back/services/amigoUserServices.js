'use strict'

let amigoUser = require('../models/amigoUserModel.js');


class amigoUserService{
	get(callback){
		amigoUser.find({}).populate('asignados').exec(callback)
	}
	getById(idUsuario, callback){
		amigoUser.find({idUsuario:idUsuario.id}).populate('asignados').exec(callback)
	}
	create(user, callback){
		let amigoUsers = new amigoUser();
		amigoUsers.idUsuario = user.idUsuario
		amigoUsers.asignados = user.asignados
		amigoUsers.save(callback)
	}
}


module.exports = new amigoUserService()