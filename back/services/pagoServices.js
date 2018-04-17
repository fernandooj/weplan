'use strict'

let pagoSchema = require('../models/pagoModel.js');
 

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
	create(data, id, callback){
		let chat = new pagoSchema();
		chat.monto  	 = data.monto
		chat.metodo  	 = data.metodo
		chat.descripcion = data.descripcion
		chat.estado  	 = data.estado
		chat.userId  	 = id
		chat.itemId 	 = data.itemId
		chat.save(callback)
	}

}

module.exports = new pagoServices()


 
  