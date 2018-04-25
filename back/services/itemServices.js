'use strict'

let itemSchema = require('../models/itemModel.js')
let pagoSchema = require('../models/pagoModel.js');
let mongoose = require('mongoose')


class itemServices {
	getById(_id, callback){
		itemSchema.find({_id}, callback)
	}
 	getByidUSer(userId, callback){
 		itemSchema.find({userId}).populate('userId').exec(callback)
 	}
 	getByPlan(planId, callback){
		itemSchema.find({planId}).populate('userId').exec(callback)
 	}
 // 	getByPlan(planId, id, callback){
	// 	let user=[]
	// 	itemSchema.find({planId}).populate('userId').exec((err, result)=>{	
	// 	let userId = mongoose.Types.ObjectId(id);
	// 		result.map(e=>{
	// 			let itemId = mongoose.Types.ObjectId(e._id);	
	// 			pagoSchema.aggregate(
	// 				[
	// 				{ 	
	// 					"$match": 
	// 					{itemId:e._id, userId}
	// 				},
	// 				{
	// 					$group : 
	// 					{
	// 						_id : null,
	// 						       monto: { $sum: "$monto"}, // for your case use local.user_totaldocs
	// 						       count: { $sum: 1 } // for no. of documents count
	// 						   } 
	// 						}
	// 						], (err1, result1)=>{
	// 							callback({user:result, monto:result1})		  
	// 						})
	// 		})
	// 	})
		
	// }
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



