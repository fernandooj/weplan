'use strict'


let express = require('express')
let router = express.Router();
let redis        = require('redis')
let cliente      = redis.createClient()
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
			asignados=asignados.map((e)=>{
				return {
					id      : e.asignado &&e.asignado._id==idUsuario &&e.idUsuario?e.idUsuario._id          :e.asignado &&e.asignado._id,
					username: e.asignado &&e.asignado._id==idUsuario &&e.idUsuario?e.idUsuario.username     :e.asignado &&e.asignado.username,
					photo   : e.asignado &&e.asignado._id==idUsuario &&e.idUsuario?e.idUsuario.photo        :e.asignado &&e.asignado.photo,
					nombre  : e.asignado &&e.asignado._id==idUsuario &&e.idUsuario?e.idUsuario.nombre   	:e.asignado &&e.asignado.nombre,
					token   : e.asignado &&e.asignado._id==idUsuario &&e.idUsuario?e.idUsuario.tokenPhone   :e.asignado &&e.asignado.tokenPhone,
					estado  : e.estado,	
				}
			})
			res.json({status:'SUCCESS', asignados, code:1})    
		}
	})
})


router.get('/:id', (req, res)=>{ 
	amigoUserService.getByUser(req.session.usuario.user._id, req.params.id, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
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
	let mensajeJson={
		userId:req.body.asignado,
		notificacion:true,
	}
	cliente.publish('notificacion', JSON.stringify(mensajeJson))

	notificacionService.create(req.session.usuario.user._id, amigoUser.asignado, 1, amigoUser._id, true, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', amigoUser, notificacion, code:1})    
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea la peticion de amistad tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const activaNotificacionPerfil = (req, res, amigoUser)=>{
// 	notificacionService.create(req.session.usuario.user._id, amigoUser.asignado, 1, amigoUser._id, (err, notificacion)=>{
// 		if (err) {
// 			res.json({status:'FAIL', err, code:0})   
// 		}else{
// 			res.json({status:'SUCCESS', amigoUser, notificacion, code:1})    
// 		}
// 	})
// }



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