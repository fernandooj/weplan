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

 	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	/////////   obtengo los que estan en estado de espera del usuario logueado
 	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getEspera(userId, planId, callback){
 		itemSchema.find({planId, espera:userId}).populate('userId').exec(callback)
 	}
 	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	/////////   obtengo los que estan no estan ni asignados ni en espera del usuario logueado
 	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getPublicado(userId, planId, callback){
 		itemSchema.find({planId}).and([{asignados:{$ne:userId}}, {userId:{$ne:userId}}, {espera:{$ne:userId}}]).populate('userId').exec(callback)
 	}
	create(itemData, id, callback){
		let item 		 = new itemSchema();
		item.titulo 	 = itemData.titulo	
		item.tipo 		 = itemData.tipo	
		item.descripcion = itemData.descripcion
		item.activo      = true	
		item.abierto     = true	
		item.userId 	 = id	
		item.enviarChat  = itemData.enviarChat
		item.valor 		 = itemData.valor		
		item.planId 	 = itemData.planId			
		item.asignados 	 = itemData.asignados	
		item.espera 	 = itemData.espera	
		item.asignadosDueno = itemData.espera	
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
	closeItem(_id, callback){
		itemSchema.findByIdAndUpdate(_id, {$set: {
	        'abierto': false,
        }}, callback);	
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////   EDITO EL COSTO DE CUANTO LE TOCA PAGAR AL DUEÑO DEL ITEM
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	editaCostoCreador(_id, costo, callback){
		itemSchema.findByIdAndUpdate(_id, {$set: {
	        'costoCreador': costo,
        }}, callback);	
	}
	sumaItemPropios(planId, userId, callback){
		console.log(userId)
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
					as:"PagoData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PagoData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			    $project:{
			        _id:1,
			        userId:1,
			        asignados:1,
			        valor:1,
			        activo:1,
	 				montos:"$PagoData.monto",
	 				pagoId:"$PagoData._id",
			        abono:"$PagoData.abono",
			        userIdPago:'$PagoData.userId',
			        titulo:1,
			        abierto:1,
			        costoCreador:1,
			        pagoActivo:"$PagoData.activo",
			        descripcion:"$PagoData.descripcion",
			        createdAt:"$PagoData.createdAt",
			    }
			},
			{
				"$match": {
					abono:true,
					userId
				}
			},
			{ 
				$sort : { createdAt : -1} 
			},
			{
			    $group : {
			       _id : {id:"$_id", activo:'$pagoActivo', descripcion:'$descripcion'},
			       deuda: { $sum: "$montos"}, 
			       count: { $sum: 1 }, // for no. of documents count
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userId', abierto:'$abierto', asignados:'$asignados', valor:'$valor', monto:"$montos", userIdPago:'$userIdPago', pagoId:'$pagoId', activo:'$activo', costoCreador:'$costoCreador' }]},
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
					as:"PagoData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PagoData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			    $project:{
			        _id:1,
			        userIds:"$PagoData.userId",
					userId:1,
					createdAt:1,
	 				montos:"$PagoData.monto",
	 				pagoId:"$PagoData._id",
			        abono:"$PagoData.abono",
			        titulo:1,
			        activo:"$PagoData.activo",
			    }
			},
			
			{
				"$match": {
					userId:{
						$ne:idUser
					},
					userIds:idUser,
					activo:true,
				}
		    },
		    {
	 			$lookup: {
	 				from: "users",
	 				localField: "userId",
	 				foreignField: "_id",
	 				as: "UserData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$UserData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$project:{
	 				_id:1,
	 				nombreUsuario:'$UserData.nombre',
	 				titulo:1,
					montos:1,
					createdAt:"$PagoData.createdAt",
	 			},
			 },
			{ 
				$sort : { createdAt : 1} 
			},
			{
			    $group : {
			       _id : "$_id",
			       deuda: { $sum: "$montos"}, 
			       count: { $sum: 1 }, // for no. of documents count
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userIds', nombre:'$nombreUsuario', createdAt:"$createdAt"}]},
			       }
			    } 
			},
		], callback)
	}


 	sumaPorUsuarioDebo(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);
		itemSchema.aggregate([
			{ 
				$match: {
					planId,
					userId:{
						$ne:idUser
					},
				}
			},
			{
				$lookup:{
					from:"pagos",
					localField:"_id",
					foreignField:"itemId",
					as:"PagoData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PagoData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
	 			$lookup: {
	 				from: "users",
	 				localField: "userId",
	 				foreignField: "_id",
	 				as: "UserData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$UserData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
			{
			    $project:{
			        _id:1,
					userId:1,
					titulo:1,
					createdAt:1,
					userIds:"$PagoData.userId",
					montos:"$PagoData.monto",
					pagoId:"$PagoData._id",
					abono:"$PagoData.abono",
					activo:"$PagoData.activo",
			        nombre:'$UserData.nombre',
			        photo:'$UserData.photo'
			    }
			},
			{ 
				$match: {
					userIds:idUser,
					activo:true
				}
			},
			{ 
				$sort : { createdAt : 1} 
			},
			{
			    $group : {
			       _id : "$userId",
			       total: { $sum: "$montos"}, 
			       count: { $sum: 1 },  
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userId', nombre:'$nombre', photo:'$photo'}]},
			       }
			    } 
			},
		], callback)
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////   es la sumatoria de todas las deudas de un plan, para verificar si se puede cerrar
	/////////   llama a esta funcion desde plan
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	sumaTotalPlan(idPlan, callback){
		idPlan = mongoose.Types.ObjectId(idPlan);
		itemSchema.aggregate([
			
			{
				$lookup:{
					from:"pagos",
					localField:"_id",
					foreignField:"itemId",
					as:"PagoData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PagoData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			    $project:{
			        _id:1,
					valor:1,
					planId:1,
					userIds:"$PagoData.userId",
					monto:"$PagoData.monto",
					activo:"$PagoData.activo",
					// asignados:{ "$size": { "$ifNull": [ 1, [] ] } },
					// asignados:{ $size:  1 },
					asignados:1,
			    }
			},
			{ 
				$match: {
					planId:idPlan,
					activo:true
				}
			},
			{
			    $group : {
			       _id : "$_id",
			       total: { $sum: "$monto"}, 
			       count: { $sum: 1 }, 
			       data: {
			       	$addToSet: {info:[{valor:'$valor', asignados:'$asignados' }]},
			       } 
			    } 
			},
		], callback)
	}

 
}


module.exports = new itemServices();



