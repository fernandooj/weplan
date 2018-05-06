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
		notificacionSchema.find({idUsuario, estado:true}).populate('idAmigoUser').populate('idUsuarioAsigna').exec(callback)
	}
	create(idUsuarioAsigna, idUsuario, tipo, idTipo, callback){
		let notificacionSchemas = new notificacionSchema();
		notificacionSchemas.idUsuario    	   = idUsuario
		notificacionSchemas.idUsuarioAsigna    = idUsuarioAsigna
		notificacionSchemas.tipo         	   = tipo
		notificacionSchemas.estado       	   = true
		notificacionSchemas.idAmigoUser        = tipo==1 ?idTipo :null
		notificacionSchemas.save(callback)
	}
	desactiva(_id, callback){
		notificacionSchema.findOneAndUpdate({_id}, {$set: {
            'estado': 	 false,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
}


module.exports = new notificacionService()