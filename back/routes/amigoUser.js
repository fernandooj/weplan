'use strict'


let express = require('express')
let router = express.Router();
let amigoUserService = require('../services/amigoUserServices.js');


router.get('/', function(req, res){
	amigoUserService.get(function(err, respuesta){
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', mensaje:respuesta, code:1})    
		}
	})
})

router.get('/:id', function(req, res){
	let id = req.session.usuario._id
	amigoUserService.getById(id, function(err, respuesta){
		console.log(respuesta)
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', mensaje:respuesta, code:1})    
		}
	})
})

router.post('/', function(req, res){
	let id = req.session.usuario._id
	amigoUserService.buscarUsuario(id, function(err, usuarios){
		if (usuarios) {
			amigoUserService.update(req.body, id, function(err, usuarios){
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', mensaje:usuarios, code:1})    
				}
			})
		}else{
			amigoUserService.create(req.body, id, function(err, usuarios){
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', mensaje:usuarios, code:1})    
				}
			})
		}
	})
	 
	
})
module.exports = router