'use strict'

let abonoSchema = require('../models/abonoModel.js');
 

class abonoServices{
	getALL(callback){
		abonoSchema.find({}, callback)
	}
	getByidUSer(userId, callback){
 		abonoSchema.find({userId}, callback)
 	}
 	getByItem(itemId, callback){
		abonoSchema.find({itemId}, callback)
 	}
	create(data, id, callback){
		let chat = new abonoSchema();
		chat.monto  	 = data.monto
		chat.estado  	 = data.estado
		chat.userIdAbona = data.userIdAbona
		chat.userId  	 = id
		chat.itemId 	 = data.itemId
		chat.save(callback)
	}

}

module.exports = new abonoServices()


 
  