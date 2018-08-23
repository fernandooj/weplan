'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment   = require('moment');

let likeSchema = mongoose.Schema({
	activo		  : { type : Boolean},
	userId     	  : { type: Schema.Types.ObjectId, ref:'User'}, 
	planId     	  : { type: Schema.Types.ObjectId, ref:'Plan'}, 
	createdAt	  : { type: String, default: moment().format('YYYY-MM-DD h:mm') },
})

module.exports = mongoose.model('Like', likeSchema)
 