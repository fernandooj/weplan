'use strict'

let categoriaPlanSchema = require('../models/categoriaPlanModel.js');
 

class categoriaPlanServices{
	get(callback){
		categoriaPlanSchema.find({}, callback)
	}
	create(user, ruta, callback){
		let amigoUsers = new categoriaPlanSchema();
		amigoUsers.nombre = user.nombre
		amigoUsers.ruta   = ruta
		amigoUsers.save(callback)
	}
}


module.exports = new categoriaPlanServices()