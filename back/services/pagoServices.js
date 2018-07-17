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
	//////////////////////////////////////////////////////////////////////////////////////////
	create(data, id, userIdAbona, callback){
		let chat = new pagoSchema();
		chat.monto  	  = data.monto
		chat.abono  	  = data.abono
		chat.descripcion  = data.descripcion
		chat.activo  	  = true
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
 	 
 	 
}

module.exports = new pagoServices()


 
  