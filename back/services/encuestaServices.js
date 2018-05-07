'use strict'

let encuestaSchema = require('../models/encuestaModel.js')
let mongoose = require('mongoose')


class encuestaServices {
	getById(_id, callback){
		encuestaSchema.find({_id}).populate('asignados').exec(callback)
	}
 	getByidUSer(userId, callback){
 		encuestaSchema.find({userId}).populate('userId').exec(callback)
 	}
 	getByPlan(planId, callback){
		encuestaSchema.find({planId}).populate('userId').exec(callback)
 	}
 
	create(encuestaData, id, callback){
		let encuesta 		 = new encuestaSchema();
		encuesta.titulo 	 = encuestaData.titulo	
		encuesta.descripcion = encuestaData.descripcion	
		encuesta.userId 	 = id	
		encuesta.planId 	 = encuestaData.planId	
		encuesta.save(callback)
	} 

	uploadImage(id, tipo, pregunta1, pregunta2, callback){
		encuestaSchema.findByIdAndUpdate(id, {$set: {
	        'tipo': tipo,
	        'pregunta1': pregunta1,
	        'pregunta2': pregunta2,
        }}, callback);	
	}

}


module.exports = new encuestaServices();



