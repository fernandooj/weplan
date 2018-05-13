'use strict'

let pagoSchema = require('../models/pagoModel.js');
let mongoose = require('mongoose')

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
 	suma(itemId, userId, callback){
 		itemId = mongoose.Types.ObjectId(itemId);	
 		userId = mongoose.Types.ObjectId(userId);	
 		pagoSchema.aggregate(
		 [
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
 		pagoSchema.aggregate(
		 [
	     { "$match": 
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
 	// sumaPlan(callback){
 	// 	pagoSchema.aggregate([
	 // 		{
	 // 			$lookup: {
	 // 				from: "items",
	 // 				localField: "itemId",
	 // 				foreignField: "_id",
	 // 				as: "ItemData"
	 // 			}
	 // 		},
	 // 		{
	 // 			$unwind: "$ItemData"
	 // 		},
	 // 		{
	 // 			$group: {
	 // 				_id: "$ItemData.planId",
	 // 				total: { $sum: "$monto" }
	 // 			}
	 // 		},
	 // 		{
	 // 			$lookup: {
	 // 				from: "plans",
	 // 				localField: "_id",
	 // 				foreignField: "_id",
	 // 				as: "PlanData"
	 // 			}
	 // 		},
	 // 		{ 
	 // 			$unwind: "$PlanData"
	 // 		},
	 // 		{
	 // 			$project: {
	 // 				name: "$PlanData.nombre",
	 // 				total: 1
	 // 			}
	 // 		}
		// ], callback);
 	// }
 	

	create(data, id, userIdAbona, callback){
		let chat = new pagoSchema();
		chat.monto  	  = data.monto
		chat.monto  	  = data.monto
		chat.abono  	  = data.abono
		chat.descripcion = data.descripcion
		chat.estado  	  = data.estado
		chat.userId  	  = id!==null ?id :data.userId
		chat.userIdAbona = userIdAbona
		chat.itemId 	  = data.itemId
		chat.save(callback)
	}
}

module.exports = new pagoServices()


 
  