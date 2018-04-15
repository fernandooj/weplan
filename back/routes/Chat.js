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
	let id      = req.session.usuario.user._id
	let photo   = req.session.usuario.user.photo
	let nombre   = req.session.usuario.user.nombre
	let planId  = req.body.planId
	let mensaje = req.body.mensaje
	let fecha   = req.body.fecha
	if (!photo) {
		photo = req.protocol+'://'+req.get('Host') + '/avatar.png'
	}

	////////////////  guardo estos tres datos en una variable	
	let mensajeJson={
		id, photo, planId, mensaje, fecha, nombre
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))
	chatServices.create(req.body, id, null, (err, chat)=>{
		console.log('chat')
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', mensaje:chat, code:1}) 
		}
	})	
})
	
module.exports = router