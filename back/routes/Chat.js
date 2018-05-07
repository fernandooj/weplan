'use strict'
let express = require('express');
let router = express.Router();
let redis        = require('redis')
let cliente      = redis.createClient()

let chatServices = require('../services/chatServices.js')



router.get('/:id', (req, res)=>{
	chatServices.getByPlan(req.params.id, (err, chat)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', mensaje:chat, total:chat.length, code:1}) 
		}
	})
})

router.post('/', (req, res)=>{
	
	////////////////  recupero el id del usuario / el id del plan / el mensaje
 	let photo = req.session.usuario.user.photo 
	if (!photo) {
		photo = req.protocol+'://'+req.get('Host') + '/avatar.png'
	}

	////////////////  esta informacion se envia al chat	
	let mensajeJson={
		userId:req.session.usuario.user._id, 
		photo, 
		planId:req.body.planId, 
		mensaje:req.body.mensaje, 
		fecha:req.body.fecha, 
		nombre:req.session.usuario.user.nombre,
		tipoChat:1
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))
	chatServices.create(req.body, req.session.usuario.user._id, 1, (err, chat)=>{
		console.log('chat')
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', chat, code:1}) 
		}
	})	
})
	
module.exports = router