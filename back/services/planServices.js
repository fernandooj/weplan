'use strict'

let planSchema = require('../models/planModel.js')



class planServices {
	get(callback){
		planSchema.find({}, callback)
	}
	getById(id, callback){

	}
	create(planData, nameFile, callback){
		console.log(nameFile)
		let plan = new planSchema();
		plan.nombre = planData.nombre	
		plan.descripcion = planData.descripcion	
		plan.restricciones = planData.restricciones	
		plan.idUsuario = planData.idUsuario	
		plan.fechaLugar = planData.fechaLugar
		plan.imagen = nameFile	
		plan.lat = planData.lat	
		plan.lng = planData.lng	
		plan.lugar = planData.lugar	
		plan.asignados = planData.asignados	
		plan.save(callback)
	}
}


module.exports = new planServices();