'use strict'

let restriccionesSchema = require('../models/restriccionesModel.js');
 

class restriccionesServices{
	get(callback){
		restriccionesSchema.find({}, callback)
	}
	create(user, ruta, callback){
		let amigoUsers = new restriccionesSchema();
		amigoUsers.nombre = user.nombre
		amigoUsers.ruta   = ruta
		amigoUsers.save(callback)
	}
	editar(id, nameFile, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'imagen': nameFile,
        }}, callback);	
	}
}


module.exports = new restriccionesServices()