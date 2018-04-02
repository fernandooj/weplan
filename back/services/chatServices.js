'use strict'

let chatSchema = require('../models/chatModel.js');

class chatServices{
	getByPlan(planId, callback){
		console.log(planId)
		chatSchema.find({planId}).populate('userId').exec(callback)
	}
	create(data, id, callback){
		let chat = new chatSchema();
		chat.userId  = id
		chat.planId  = data.planId
		chat.mensaje = data.mensaje
		chat.save(callback)
	}

}

module.exports = new chatServices()