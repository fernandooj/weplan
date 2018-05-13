'use strict'

let itemSchema = require('../models/itemModel.js')
let pagoSchema = require('../models/pagoModel.js');
let mongoose = require('mongoose')


class itemServices {
	getById(_id, callback){
		itemSchema.find({_id}).populate('asignados').populate('userId').exec(callback)
	}
 	getByidUSer(userId, callback){
 		itemSchema.find({userId}).populate('userId').exec(callback)
 	}
 	getByPlan(planId, callback){
 		console.log(planId)
		itemSchema.find({planId}).populate('userId').exec(callback)
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
		item.espera 	 = []	
		item.save(callback)
	}
	uploadImage(id, nameFile, callback){
		itemSchema.findByIdAndUpdate(id, {$set: {
	        'rutaImagen': nameFile,
        }}, callback);	
	}
	ingresarItem(_id, espera, callback){
		itemSchema.findByIdAndUpdate(_id, {$set: {
	        'espera': espera,
        }}, callback);	
	}
	activaUsuario(_id, espera, asignados, callback){
		itemSchema.findByIdAndUpdate(_id, {$set: {
	        'espera': espera,
	        'asignados': asignados,
        }}, callback);	
	}


	// sumaPlan(callback){
 // 		itemSchema.aggregate([
	//  		{
	//  			$lookup: {
	//  				from: "pagos",
	//  				localField: "_id",
	//  				foreignField: "itemId",
	//  				as: "ItemData"
	//  			}
	//  		},
	//  		{
	//  			$unwind:{
	//  				path: '$ItemData',
	//  				preserveNullAndEmptyArrays:true
	//  			}

	//  		},
	//  		{
	//  			$project:{
	//  				planId:1,
	//  				monto:"$ItemData.monto"
	//  			}
	//  		},
	//  		{
	//  			$group:{
	//  				_id:'$planId',
	//  				total:{ $sum:"$monto" }
	//  			}
	//  		},
	//  		{
	//  			$lookup:{
	//  				from:'plans',
	//  				localField:"_id",
	//  				foreignField:"_id",
	//  				as:"PlanData",
	//  			}
	//  		},
	//  		{
	//  			$unwind:"$PlanData",
	//  		},
	//  		{
	//  			$project:{
	//  				total:1,
	//  				nombre:"$PlanData.nombre"
	//  			}
	//  		},
	// 	], callback);
 // 	}

 	sumaPlan(callback){
 		itemSchema.aggregate([
	 		{
	 			$lookup: {
	 				from: "pagos",
	 				localField: "_id",
	 				foreignField: "itemId",
	 				as: "ItemData"
	 			}
	 		},
	 		{
	 			$unwind:{
	 				path: '$ItemData',
	 				preserveNullAndEmptyArrays:true
	 			}

	 		},
	 		{
	 			$project:{
	 				planId:1,
	 				montos:"$ItemData.monto"
	 			}
	 		},
	 		{
	 			$group:{
	 				_id:'$planId',
	 				total:{ $sum:"$montos" }
	 			}
	 		},
	 		{
	 			$lookup:{
	 				from:'plans',
	 				localField:"_id",
	 				foreignField:"_id",
	 				as:"PlanData",
	 			}
	 		},
	 		{
	 			$unwind:"$PlanData",
	 		},
	 		{
	 			$project:{
	 				nombre:"$PlanData.nombre",
	 				total:1
	 			}
	 		},
		], callback);
 	}



 
}


module.exports = new itemServices();



