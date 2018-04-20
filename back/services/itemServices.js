'use strict'

let itemSchema = require('../models/itemModel.js')
 


class itemServices {
	getById(_id, callback){
		itemSchema.find({_id}, callback)
	}
 	getByidUSer(userId, callback){
 		itemSchema.find({userId}, callback)
 	}
 	getByPlan(planId, callback){
		itemSchema.find({planId}, callback)
 	}
	create(itemData, id, callback){
		let item 		 = new itemSchema();
		item.titulo 	 = itemData.titulo	
		item.tipo 		 = itemData.tipo	
		item.descripcion = itemData.descripcion
		item.estado      = 'activo'		
		item.userId 	 = id	
		item.enviarChat  = itemData.enviarChat
		item.valor 		 = itemData.valor		
		item.planId 	 = itemData.planId			
		item.asignados 	 = itemData.asignados	
		item.save(callback)
	}
	uploadImage(id, nameFile, callback){
		itemSchema.findByIdAndUpdate(id, {$set: {
	        'rutaImagen': nameFile,
        }}, callback);	
	}
 
}


module.exports = new itemServices();