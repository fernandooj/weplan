'use strict'

let chatSchema = require('../models/chatModel.js');
let itemSchema = require('../models/itemModel.js');

class chatServices{
	getByPlan(planId, callback){
		chatSchema.find({planId}).populate('itemId').exec(callback)

	}
	create(data, id, itemId, callback){
		console.log(itemId)
		let chat = new chatSchema();
		chat.userId  = id
		chat.planId  = data.planId
		chat.mensaje = !itemId ?data.mensaje :null
		chat.itemId = itemId
		chat.save(callback)
	}

}

module.exports = new chatServices()


 
  