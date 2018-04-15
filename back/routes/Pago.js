'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

let pagoServices = require('../services/pagoServices.js')

router.post('/', function(req, res){
 	
	pagoServices.create(req.body, id, ruta, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			createChat(req.body, res, id, plan)			
		}
	})
})


 



module.exports = router