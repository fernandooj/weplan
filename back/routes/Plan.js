'use strict'

let express = require('express')
let router = express.Router()
let planServices = require('../services/planServices.js')
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

router.get('/', function(req, res){
	planServices.get(function(err, planes){
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', message: planes, code:1 });	
		}
	})
})

router.get('/:id', function(req, res){
	planServices.getById(function(err, planes){
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', message: planes, code:1 });	
		}
	})
})


router.post('/', function(req, res){
	let extension = req.files.imagen.name.split('.').pop()
	let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
	let fullUrl = '../static/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
	let ruta = req.protocol+'://'+req.get('Host') + '/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
	planServices.create(req.body,  ruta, function(err, plan){
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });	
			fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
		}
	})	
})

module.exports = router