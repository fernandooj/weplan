'use strict'


let express = require('express')
let router = express.Router();
let moment   = require('moment');
let fs = require('fs')
let path = require('path')
let fecha = moment().format('YYYY-MM-DD-h-mm')
let restriccionesServices = require('./../services/restriccionesServices.js') 

router.get('/', (req, res)=>{
	restriccionesServices.get((err, restriccion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', restriccion, code:1})    
		}
	})
})


router.post('/', (req, res)=>{
	console.log(req.body)
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/restriccion/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/restriccion/'+fecha+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/restriccion.png'
	}

	if (!req.session.usuario) {
		res.json({status:'FAIL', mensae:'sin login', code:0}) 
	}else{
		restriccionesServices.create(req.body, ruta, (err, restriccion)=>{
			if (err) {
				res.json({status:'FAIL', err, code:0})    
			}else{
				res.json({status:'SUCCESS', restriccion, code:1})    
			}
		})
	}
})

router.put('/:id', (req, res)=>{
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/restriccion/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/restriccion/'+fecha+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/restriccion.png'
	}

	if (!req.session.usuario) {
		res.json({status:'FAIL', mensae:'sin login', code:0}) 
	}else{
		restriccionesServices.editar(req.body, ruta, (err, restriccion)=>{
			if (err) {
				res.json({status:'FAIL', err, code:0})    
			}else{
				res.json({status:'SUCCESS', restriccion, code:1})    
			}
		})
	}
})
module.exports = router