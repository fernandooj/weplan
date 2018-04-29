'use strict'

let preguntaSchema = require('../models/preguntaModel.js')
let mongoose = require('mongoose')


class preguntaServices {
	getById(_id, callback){
		preguntaSchema.find({_id}).populate('asignados').exec(callback)
	}
 	getByidUSer(userId, callback){
 		preguntaSchema.find({userId}).populate('userId').exec(callback)
 	}
 	getByPlan(planId, callback){
		preguntaSchema.find({planId}).populate('userId').exec(callback)
 	}
 
	create(preguntaData, id, callback){
		let pregunta 		 = new preguntaSchema();
		pregunta.titulo 	 = preguntaData.titulo	
		pregunta.descripcion = preguntaData.descripcion	
		pregunta.userId 	 = id	
		pregunta.planId 	 = preguntaData.planId	
		pregunta.save(callback)
	} 

	uploadImage(id, tipo, pregunta1, pregunta2, callback){
		preguntaSchema.findByIdAndUpdate(id, {$set: {
	        'tipo': tipo,
	        'pregunta1': pregunta1,
	        'pregunta2': pregunta2,
        }}, callback);	
	}

}


module.exports = new preguntaServices();



