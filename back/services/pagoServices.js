'use strict'

let pagoSchema = require('../models/pagoModel.js');
let mongoose = require('mongoose')
let moment = require('moment')

class pagoServices{
	getALL(callback){
		pagoSchema.find({}, callback)
	}
	getByidUSer(userId, callback){
 		pagoSchema.find({userId}, callback)
 	}
 	getByItem(itemId, callback){
		pagoSchema.find({itemId}, callback)
 	}
 	pagosPorUsuario(userId, callback){
 		pagoSchema.find({userId, abono:true}, callback)
 	}
 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	//////////////////// 	OBTIENE EL USUARIO CREADOR DEL ITEM  
 	//////////////////// idItem ===> es el id del item
 	//////////////////// idUsuario ===> es el id del usuario creador
 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	betyByItemAndUser(itemId, userId, callback){
 		pagoSchema.findOne({itemId, userId}, callback)
 	}

 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	//////////////////// 	OBTIENE LOS OTROS USUARIOS QUE SE HAN IDO REGISTRANDO, DIFERENTES AL CREADOR DEL ITEM 
 	//////////////////// idItem ===> es el id del item
 	//////////////////// idUsuario ===> es el id de los usuarios registrados al item
 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	betyByItemAndUserNotEqual(itemId, idUser, callback){
 		pagoSchema.find({itemId, userId:{$ne:idUser}}, callback)
 	}

 	//////////////////////////////////////////////////////////////////////////////////////////
	////////   GUARDO EL PAGO
	////////   data: info completa del usuario
	////////   id: es el id del usuario quien hace el pago, lo puede hacer el mismo usuario, o el dueño del item puede generar el abono
	////////   userIdAbona: es quien hace el abono del pago, puede ser el mismo usuario o el dueño del item
	////////   activo     : si es true es que el pago ya se hizo efectivo, si es false esta en espera de comprobacion
	//////////////////////////////////////////////////////////////////////////////////////////
	create(data, id, userIdAbona, activo, callback){
		let chat = new pagoSchema();
		chat.monto  	  = data.monto
		chat.abono  	  = data.abono
		chat.descripcion  = data.descripcion
		chat.activo  	  = activo
		chat.userId  	  = id!==null ?id :data.userId
		chat.userIdAbona  = userIdAbona
		chat.itemId 	  = data.itemId
		chat.planId 	  = data.planId
		chat.save(callback)
	}
	edit(_id, monto, callback){
		pagoSchema.findOneAndUpdate({_id}, {$set: {
            'monto': monto,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}
	activa(_id, callback){
		pagoSchema.findOneAndUpdate({_id}, {$set: {
            'activo': true,
            'updatedAt': moment().format('YYYY-MM-DD h:mm:ss')
    	}}, callback);
	}

 	suma(itemId, userId, callback){
 		itemId = mongoose.Types.ObjectId(itemId);	
 		userId = mongoose.Types.ObjectId(userId);	
 		pagoSchema.aggregate([
		    { "$match": 
		     	{itemId, userId}
		    },
			{
			    $group : {
			       _id : null,
			       monto: { $sum: "$monto"}, // for your case use local.user_totaldocs
			       count: { $sum: 1 } // for no. of documents count
			    } 
			}
		], callback)
 	}

 	sumaTodos(itemId, callback){
 		itemId = mongoose.Types.ObjectId(itemId);	
 		pagoSchema.aggregate([
		    {"$match": 
		     	{itemId, abono:true}
		    },
			{
			    $group : {
			       _id : null,
			       monto: { $sum: "$monto"}, // for your case use local.user_totaldocs
			       count: { $sum: 1 } // for no. of documents count
			    } 
			}
		], callback)
 	}
 	sumaPlan(callback){
 		pagoSchema.aggregate([
	 		{
	 			$lookup: {
	 				from: "items",
	 				localField: "itemId",
	 				foreignField: "_id",
	 				as: "ItemData"
	 			}
	 		},
	 		{
	 			$unwind: "$ItemData"
	 		},
	 		{
	 			$group: {
	 				_id: "$ItemData.planId",
	 				total: { $sum: "$monto" }
	 			}
	 		},
	 		{
	 			$lookup: {
	 				from: "plans",
	 				localField: "_id",
	 				foreignField: "_id",
	 				as: "PlanData"
	 			}
	 		},
	 		{ 
	 			$unwind: "$PlanData"
	 		},
	 		{
	 			$project: {
	 				name: "$PlanData.nombre",
	 				total: 1
	 			}
	 		}
		], callback);
 	}
 	 
 	sumaPorUsuarioDebo(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);
		pagoSchema.aggregate([
			{ 
				$match: {
					planId,
					userId:idUser
				}
			},
			{
				$lookup:{
					from:"items",
					localField:"itemId",
					foreignField:"_id",
					as:"itemData"
				}
			}, 
			{
			    $unwind:{
			        path:"$itemData",
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
					monto:1,
					abono:1,
					activo:1,
					itemId:'$itemData._id',
					userIds:'$itemData.userId',
			        nombre:'$UserData.nombre',
			        photo:'$UserData.photo'
			    }
			},
			{ 
				$match: {
					userIds:{
						$ne:idUser
					},
					activo:true
				}
			},
			{
			    $group : {
			       _id : "$userId",
			       total: { $sum: "$monto"}, 
			       count: { $sum: 1 },  
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userIds', nombre:'$nombre', photo:'$photo'}]},
			       }
			    } 
			},
		], callback)
	}
	sumaPorUsuarioDeboSinGroup(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);
		pagoSchema.aggregate([
			{ 
				$match: {
					planId,
					userId:idUser
				}
			},
			{
				$lookup:{
					from:"items",
					localField:"itemId",
					foreignField:"_id",
					as:"itemData"
				}
			}, 
			{
			    $unwind:{
			        path:"$itemData",
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
					monto:1,
					abono:1,
					activo:1,
					itemId:'$itemData._id',
					userIds:'$itemData.userId',
			        nombre:'$UserData.nombre',
			        photo:'$UserData.photo'
			    }
			},
			{ 
				$match: {
					userIds:{
						$ne:idUser
					},
					activo:true
				}
			}
		], callback)
	}

	sumaPorUsuarioMeDebe(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);
		pagoSchema.aggregate([
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
					from:"items",
					localField:"itemId",
					foreignField:"_id",
					as:"itemData"
				}
			}, 
			{
			    $unwind:{
			        path:"$itemData",
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
					monto:1,
					abono:1,
					activo:1,
					itemId:'$itemData._id',
					userIds:'$itemData.userId',
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
			    $group : {
			       _id : "$userId",
			       total: { $sum: "$monto"}, 
			       count: { $sum: 1 },  
			       data: {
			       	$addToSet: {info:[{titulo:'$titulo', userId:'$userIds', nombre:'$nombre', photo:'$photo'}]},
			       }
			    } 
			},
		], callback)
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////// 	me trae todos los pagos sin hacer la agrupacion
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	sumaPorUsuarioMeDebeSinGroup(planId, idUser, callback){
		planId = mongoose.Types.ObjectId(planId);
		idUser = mongoose.Types.ObjectId(idUser);
		pagoSchema.aggregate([
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
					from:"items",
					localField:"itemId",
					foreignField:"_id",
					as:"itemData"
				}
			}, 
			{
			    $unwind:{
			        path:"$itemData",
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
					monto:1,
					abono:1,
					activo:1,
					createdAt:1,
					itemId:'$itemData._id',
					userIds:'$itemData.userId',
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
		], callback)
	}
 	 
}

module.exports = new pagoServices()


 
  