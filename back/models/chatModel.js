'use strict'

let mongoose = require('mongoose')
let moment = require('moment')
let Schema = mongoose.Schema;



let chatSchema = Schema({
	userId : 	{type: Schema.Types.ObjectId, ref:'User'},
	planId : 	{type: Schema.Types.ObjectId, ref: 'Plan'},
	mensaje: 	String,
	tipo: 	 	String,
	itemId:     {type: Schema.Types.ObjectId, ref: 'Item'},
	preguntaId: {type: Schema.Types.ObjectId, ref: 'Pregunta'},
	createdAt:  {type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
})


module.exports = mongoose.model('Chat', chatSchema)