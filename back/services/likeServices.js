'use strict'

let likeSchema = require('../models/likeModel.js');
let mongoose = require('mongoose')
let moment = require('moment')

class likeServices{

	getOne(userId, planId, callback){
		likeSchema.findOne({'userId':userId, 'planId':planId}, callback)
	}
 	//////////////////////////////////////////////////////////////////////////////////////////
	////////   GUARDO EL LIKE
	//////////////////////////////////////////////////////////////////////////////////////////
	create(userId, planId, activo, callback){
		let like 		  = new likeSchema();
		like.activo  	  = activo
		like.userId  	  = userId 
		like.planId  	  = planId 
		like.save(callback)
	}
}

module.exports = new likeServices()