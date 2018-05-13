'use strict'

let planSchema = require('../models/planModel.js')



class planServices {
	get(callback){
		planSchema.find({}, null, {sort: {_id: -1}}).populate('asignados').exec(callback)
	}
	getByIdPlan(_id,callback){
		planSchema.find({estado:'activo', _id}, null, {sort: {_id: -1}}).populate('asignados').exec(callback)
	}
	getById(asignados, callback){
		planSchema.find({$or:[{'asignados':asignados, estado:'activo'},{'idUsuario':asignados, estado:'activo'}]}).populate('idUsuario').exec(callback)
	}
	getByclientes(callback){
		planSchema.find({estado:'activo', tipo:'cliente'}, null, {sort: {_id: -1}}, callback)
	}
	create(planData, id, callback){
		let plan 			= new planSchema();
		plan.tipo 		    = planData.tipo	
		plan.nombre 		= planData.nombre	
		plan.descripcion	= planData.descripcion	
		plan.restricciones  = planData.restricciones	
		plan.estado         = 'activo'	
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

	sumaPlan(callback){
 		planSchema.aggregate([
	 		{
	 			$lookup: {
	 				from: "items",
	 				localField: "_id",
	 				foreignField: "planId",
	 				as: "PlanData"
	 			}
	 		},
	 		{
	 			$unwind:'$PlanData'
	 		} 
		], callback);
 	}

}


module.exports = new planServices();