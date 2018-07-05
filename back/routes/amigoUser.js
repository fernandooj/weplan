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

router.get('/asignados/:estado', (req, res)=>{ 
	amigoUserService.getById(req.session.usuario.user._id, req.params.estado, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			let idUsuario = req.session.usuario.user._id
			// asignados=asignados.map((e)=>{
			// 	return {
			// 		id      : e.asignado._id==idUsuario ?e.idUsuario._id      :e.asignado._id,
			// 		username: e.asignado._id==idUsuario ?e.idUsuario.username :e.asignado.username,
			// 		photo   : e.asignado._id==idUsuario ?e.idUsuario.photo    :e.asignado.photo,
			// 		nombre  : e.asignado._id==idUsuario ?e.idUsuario.nombre   :e.asignado.nombre,
			// 		token   : e.asignado._id==idUsuario ?e.idUsuario.tokenPhone   :e.asignado.tokenPhone,
			// 		estado  : e.estado,	
			// 	}
			// })
			console.log(asignados)
			res.json({status:'SUCCESS', asignados, code:1})    
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea la peticion de amistad tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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