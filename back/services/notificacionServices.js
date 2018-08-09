'use strict'

let notificacionSchema = require('../models/notificacionModel.js');
let moment = require('moment')

class notificacionService{
	get(callback){
		notificacionSchema.find({}, null, {sort: {_id: -1}}).populate('idAmigoUser').populate('idItem').exec(callback)
	}
	getById(_id, callback){
		notificacionSchema.find({_id}).populate('idAmigoUser').populate('idItem').exec(callback)
	}
	getByUser(idUsuario, callback){
		notificacionSchema.find({idUsuario, eliminado:true}, null, {sort: {_id: -1}}).populate('idUsuario').populate('idPlan').populate('idAmigoUser').populate('idItem').populate('idPago').populate('idUsuarioAsigna').exec(callback)
	}
	create(idUsuarioAsigna, idUsuario, tipo, idTipo, activo, callback){
		let notificacionSchemas = new notificacionSchema();
		notificacionSchemas.idUsuarioAsigna   = idUsuarioAsigna
		notificacionSchemas.idUsuario    	  = idUsuario
		notificacionSchemas.tipo         	  = tipo
		notificacionSchemas.activo       	  = activo
		notificacionSchemas.eliminado      	  = true
		notificacionSchemas.idAmigoUser       = tipo==1  ?idTipo :null
		notificacionSchemas.idPlan            = tipo==2  || tipo==8 || tipo==13 || tipo==14 ?idTipo :null
		notificacionSchemas.idPago            = tipo==10 || tipo==11 || tipo==12  ?idTipo :null
		notificacionSchemas.idItem            = tipo==3  || tipo==4 || tipo==6  || tipo==7 || tipo==9 ?idTipo :null
		notificacionSchemas.save(callback)
	}
	desactiva(_id, callback){
		notificacionSchema.findOneAndUpdate({_id}, {$set: {
            'activo': 	 false,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
	elimina(_id, callback){
		notificacionSchema.findOneAndUpdate({_id}, {$set: {
            'eliminado': false,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
}


module.exports = new notificacionService()