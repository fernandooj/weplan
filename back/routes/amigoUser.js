'use strict'


let express = require('express')
let router = express.Router();
let amigoUserService = require('../services/amigoUserServices.js');
let userServices 	 = require('./../services/usersServices.js') 
let notificacionService = require('../services/notificacionServices.js');


router.get('/', (req, res)=>{
	amigoUserService.get((err, respuesta)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', mensaje:respuesta, code:1})    
		}
	})
})

router.get('/:id', (req, res)=>{ 
	amigoUserService.getById(req.session.usuario.user._id, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			//console.log(asignados[0].asignados)
			res.json({status:'SUCCESSASI', asignados, code:1})    
		}
	})
})



router.post('/', (req, res)=>{
	let id = req.session.usuario.user._id
	amigoUserService.create(req.body.asignado, id, (err, amigoUser)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			creaNotificacion(req, res, amigoUser)
		
		}
	})
}) 

const creaNotificacion = (req, res, amigoUser)=>{
	notificacionService.create(req.session.usuario.user._id, amigoUser.asignado, 1, amigoUser._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', amigoUser, notificacion, code:1})    
		}
	})
}



router.put('/', (req,res)=>{
	amigoUserService.activa(req.body.id, (err, usuarios)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', usuarios, code:1})    
		}
	})
})
module.exports = router