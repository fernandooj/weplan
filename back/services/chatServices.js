'use strict'

let chatSchema = require('../models/chatModel.js');
 
 
class chatServices{
	getByPlan(planId, callback){
		chatSchema.find({planId}).populate('itemId').populate('userId').populate('encuestaId').exec(callback)
	}
	create(data, id, tipo, documento, callback){
		console.log(data)
		let chat = new chatSchema();
		chat.userId      = id
		chat.planId      = data.planId
		chat.tipo        = tipo
		chat.estado      = true
		chat.mensaje     = data.mensaje
		chat.itemId      = data.itemId
		chat.encuestaId  = data.encuestaId
		chat.contactoId  = data.contactoId
		chat.lat  		 = data.lat
		chat.lng  		 = data.lng
		chat.documento   = documento
		chat.save(callback)
	}
	// innactiva(_id, callback){
	// 	chatSchema.findByIdAndUpdate(_id, {$set: {
	//         'estado': false,
 //        }}, callback);	
	// }
}

module.exports = new chatServices()


 
  