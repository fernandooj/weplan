'use strict'

let notificacionSchema = require('../models/notificacionModel.js');
let moment = require('moment')

class notificacionService{
	get(callback){
		notificacionSchema.find({}).populate('idAmigoUser').populate('idItem').exec(callback)
	}
	getById(_id, callback){
		notificacionSchema.find({_id}).populate('idAmigoUser').populate('idItem').exec(callback)
	}
	getByUser(idUsuario, callback){
		notificacionSchema.find({idUsuario, activo:true}).populate('idUsuario').populate('idPlan').populate('idAmigoUser').populate('idItem').populate('idUsuarioAsigna').exec(callback)
	}
	create(idUsuarioAsigna, idUsuario, tipo, idTipo, callback){
		let notificacionSchemas = new notificacionSchema();
		notificacionSchemas.idUsuarioAsigna   = idUsuarioAsigna
		notificacionSchemas.idUsuario    	  = idUsuario
		notificacionSchemas.tipo         	  = tipo
		notificacionSchemas.activo       	  = true
		notificacionSchemas.idAmigoUser       = tipo==1 ?idTipo :null
		notificacionSchemas.idPlan            = tipo==2 ?idTipo :null
		notificacionSchemas.idItem            = tipo==3 ?idTipo :null
		notificacionSchemas.save(callback)
	}
	desactiva(_id, callback){
		notificacionSchema.findOneAndUpdate({_id}, {$set: {
            'activo': 	 false,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
}


module.exports = new notificacionService()