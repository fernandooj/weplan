'use strict'

let notificacionSchema = require('../models/notificacionModel.js');
let moment = require('moment')

class notificacionService{
	get(callback){
		//notificacionSchema.find({}).populate('asignado').exec(callback)
	}
	getById(idUsuario, callback){
		// notificacionSchema.find({idUsuario}).populate('asignado').exec(callback)
	}
	buscarUsuario(idUsuario, callback){
		// notificacionSchema.find({idUsuario}, callback)
	}
	create(asignado, idUsuario, callback){
		let notificacionSchemas = new notificacionSchema();
		notificacionSchemas.idUsuario = idUsuario
		notificacionSchemas.asignado  = asignado
		notificacionSchemas.estado    = false
		notificacionSchemas.save(callback)
	}
	activa(idUsuario, callback){
		notificacionSchema.findOneAndUpdate({idUsuario}, {$set: {
            'estado': 	 true,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
}


module.exports = new notificacionService()