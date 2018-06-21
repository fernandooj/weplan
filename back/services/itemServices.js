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
		item.asignados 	 = []	
		item.espera 	 = itemData.espera	
		item.save(callback)
	}
	uploadImage(id, imagenOriginal, imagenResize, imagenMiniatura, callback){
		itemSchema.findByIdAndUpdate(id, {$set: {
	        'imagenOriginal': imagenOriginal,
	        'imagenResize': imagenResize,
	        'imagenMiniatura': imagenMiniatura,
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
	sumaItemPropios(planId, userId, callback){
		planId = mongoose.Types.ObjectId(planId);
		userId = mongoose.Types.ObjectId(userId);
		itemSchema.aggregate([
			{ "$match": 
		     	{planId}
		    },
			{
				$lookup:{
					from:"pagos",
					localField:"_id",
					foreignField:"itemId",
					as:"PlanData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PlanData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			    $project:{
			        _id:1,
			        userId:1,
	 				montos:"$PlanData.monto",
	 				pagoId:"$PlanData._id",
			        abono:"$PlanData.abono",
			        titulo:1,
			    }
			},
			{
				"$match": {
					abono:true,
					userId
				}
		    },
			{
			    $group : {
			       _id : "$_id",
			       deuda: { $sum: "$montos"}, 
			       count: { $sum: 1 }, // for no. of documents count
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userId'}]},
			       }
			    } 
			},
		], callback)
	}
	sumaItemAsignados(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);

		itemSchema.aggregate([
			{ "$match": 
		     	{planId}
		    },
			{
				$lookup:{
					from:"pagos",
					localField:"_id",
					foreignField:"itemId",
					as:"PlanData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PlanData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			    $project:{
			        _id:1,
			        userIds:"$PlanData.userId",
			        userId:1,
	 				montos:"$PlanData.monto",
	 				pagoId:"$PlanData._id",
			        abono:"$PlanData.abono",
			        titulo:1,
			    }
			},
			{
				"$match": {
					userId:{
						$ne:idUser
					},
					userIds:idUser
				}
		    },
			{
			    $group : {
			       _id : "$_id",
			       deuda: { $sum: "$montos"}, 
			       count: { $sum: 1 }, // for no. of documents count
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userIds'}]},
			       }
			    } 
			},
		], callback)
	}
 	// sumaPlan(callback){
 	// 	itemSchema.aggregate([
	 // 		{
	 // 			$lookup: {
	 // 				from: "pagos",
	 // 				localField: "_id",
	 // 				foreignField: "itemId",
	 // 				as: "ItemData"
	 // 			}
	 // 		},
	 // 		{
	 // 			$unwind:{
	 // 				path: '$ItemData',
	 // 				preserveNullAndEmptyArrays:true
	 // 			}

	 // 		},
	 // 		{
	 // 			$project:{
	 // 				planId:1,
	 // 				montos:"$ItemData.monto"
	 // 			}
	 // 		},
	 // 		{
	 // 			$group:{
	 // 				_id:'$planId',
	 // 				total:{ $sum:"$montos" }
	 // 			}
	 // 		},
	 // 		{
	 // 			$lookup:{
	 // 				from:'plans',
	 // 				localField:"_id",
	 // 				foreignField:"_id",
	 // 				as:"PlanData",
	 // 			}
	 // 		},
	 // 		{
	 // 			$unwind:"$PlanData",
	 // 		},
	 // 		{
	 // 			$project:{
	 // 				nombre:"$PlanData.nombre",
	 // 				total:1
	 // 			}
	 // 		},
		// ], callback);
 	//}



 
}


module.exports = new itemServices();



