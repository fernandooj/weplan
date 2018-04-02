'use strict'

let planSchema = require('../models/planModel.js')



class planServices {
	get(callback){
		planSchema.find({}, null, {sort: {_id: -1}}).populate('asignados').exec(callback)
	}
	getById(asignados, callback){
		planSchema.find({$or:[{'asignados':asignados},{'idUsuario':asignados}]}, callback)
	}
	create(planData, id, callback){
		let plan 			= new planSchema();
		plan.nombre 		= planData.nombre	
		plan.descripcion	= planData.descripcion	
		plan.restricciones  = planData.restricciones	
		plan.idUsuario 		= id	
		plan.fechaLugar 	= planData.fechaLugar

		plan.lat 			= planData.lat	
		plan.lng 			= planData.lng	
		plan.lugar 			= planData.lugar	
		plan.asignados 		= planData.asignados	
		plan.save(callback)
	}
	uploadImage(id, nameFile, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'imagen': nameFile,
        }}, callback);	
	}
}


module.exports = new planServices();