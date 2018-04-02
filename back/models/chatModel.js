'use strict'

let mongoose = require('mongoose')
let moment = require('moment')
let Schema = mongoose.Schema;



let chatSchema = Schema({
	userId : {type: Schema.Types.ObjectId, ref:'User'},
	planId : {type: Schema.Types.ObjectId, ref: 'Plan'},
	mensaje: String,
	createdAt: {type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
})


module.exports = mongoose.model('Chat', chatSchema)