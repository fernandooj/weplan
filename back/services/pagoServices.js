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
	create(data, id, callback){
		let chat = new pagoSchema();
		chat.monto  	 = data.monto
		chat.metodo  	 = data.metodo
		chat.descripcion = data.descripcion
		chat.estado  	 = data.estado
		chat.userId  	 = id!==null ?id :data.userId
		chat.itemId 	 = data.itemId
		chat.save(callback)
	}
}

module.exports = new pagoServices()


 
  