'use strict'


let express = require('express')
let router = express.Router();
let moment   = require('moment');
let fs = require('fs')
let path = require('path')
let fecha = moment().format('YYYY-MM-DD-h-mm')
let categoriaPlanSchema = require('./../services/categoriaPlanServices.js') 

router.get('/', function(req, res){
	categoriaPlanSchema.get((err, categoria)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', categoria, code:1})    
		}
	})
})


router.post('/', function(req, res){
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/categoria/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/categoria/'+fecha+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/categoria.png'
	}

	if (!req.session.usuario) {
		res.json({status:'FAIL', mensae:'sin login', code:0}) 
	}else{
		categoriaPlanSchema.create(req.body, ruta, (err, categoria)=>{
			if (err) {
				res.json({status:'FAIL', err, code:0})    
			}else{
				res.json({status:'SUCCESS', categoria, code:1})    
			}
		})
	}
})
module.exports = router