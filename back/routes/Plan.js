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
			res.json({ status: 'SUCCESS',  planes, code:1 });	
		}
	})
})

router.get('/:clientes', function(req, res){
	let id = req.session.usuario.user._id
	if (req.params.clientes=='clientes') {
		planServices.getByclientes(function(err, planes){
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });	
			}
		})	
	}else{
		planServices.getById(id, function(err, planes){
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });	
			}
		})
	}
	
})


router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	planServices.create(req.body, id, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });	
		}
	})
})

router.put('/', (req, res)=>{
	let ruta = null 
	console.log(req.files.imagen)
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
		planServices.uploadImage(req.body.id, ruta, (err, plan)=>{
			if(err){
				res.json({err})
			}else{
				res.json({ status: 'SUCCESS', message: plan, code:1 });	
				fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
			}
		})
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/plan.png'
		planServices.uploadImage(req.body.id, ruta, (err, plan)=>{
			if(err){
				res.json({err})
			}else{
				res.json({ status: 'SUCCESS', message: plan, code:1 });	
			}
		})
	}
	
})




module.exports = router