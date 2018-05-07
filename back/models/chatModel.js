'use strict'

let mongoose = require('mongoose')
let moment = require('moment')
let Schema = mongoose.Schema;



let chatSchema = Schema({
	userId : 	{type: Schema.Types.ObjectId, ref:'User'},
	planId : 	{type: Schema.Types.ObjectId, ref: 'Plan'},
	mensaje: 	String,
	tipo: 	 	Number,
	estado:     Boolean,
	itemId:     {type: Schema.Types.ObjectId, ref: 'Item'},
	encuestaId: {type: Schema.Types.ObjectId, ref: 'Encuesta'},
	createdAt:  {type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
})


module.exports = mongoose.model('Chat', chatSchema)