'use strict'

let notificacionSchema = require('../models/notificacionModel.js');
let moment = require('moment')

class notificacionService{
	get(callback){
		notificacionSchema.find({}).populate('idAmigoUser').exec(callback)
	}
	getById(_id, callback){
		notificacionSchema.find({_id}).populate('idAmigoUser').exec(callback)
	}
	getByUser(idUsuario, callback){
		notificacionSchema.find({idUsuario}).populate('idAmigoUser').exec(callback)
	}
	create(idUsuarioAsigna, idUsuario, tipo, idTipo, callback){
		let notificacionSchemas = new notificacionSchema();
		notificacionSchemas.idUsuario    	   = idUsuario
		notificacionSchemas.idUsuarioAsigna    = idUsuarioAsigna
		notificacionSchemas.tipo         	   = tipo
		notificacionSchemas.estado       	   = false
		notificacionSchemas.idAmigoUser        = tipo==1 ?idTipo :null
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