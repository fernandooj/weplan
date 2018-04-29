'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fechab = moment().format('YYYY-MM-DD-h-mm')
let redis        = require('redis')
let cliente      = redis.createClient()

let preguntaServices = require('../services/preguntaServices.js')
let chatServices = require('../services/chatServices.js')
 

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////	 GET ALL 	//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
	preguntaServices.getALL((err, plan)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: chat, total:plan.length, code:1 });				
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY USER/PLAN 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:user', (req, res)=>{
	let id = req.session.usuario.user._id
	if (req.params.user=='user') {
		preguntaServices.getByidUSer(id, (err, item)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', item, total:item.length,  code:1 });				
			}
		})
	}else{
		preguntaServices.getByPlan(req.params.user, (err, item)=>{
			if(err){
				res.json({err, code:0})
			}else{
				//itemPlan(item, id, res)
				res.json({ status: 'SUCCESS', item, total:item.length, code:1 });				
			}
		})
	}
})

 
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY ID ITEM 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/id/:id', (req, res)=>{
	preguntaServices.getById(req.params.id, (err, plan)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: plan, total:plan.length, code:1 });				
		}
	})
})
 

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE PREGUNTA		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	preguntaServices.create(req.body, id, (err, pregunta)=>{
		if(err){
			res.json({err,  code:0})
		}else{
			res.json({ status: 'SUCCESS', pregunta,  code:1 });	
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		MODIFICO PREGUNTAS		///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

router.post('/:id', (req,res)=>{
	let id = req.session.usuario.user._id
	let ruta  = null
	let ruta2 = null
	let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
	let tipo  = null
	let pregunta1 = null
	let pregunta2 = null
	////////////////////////////////////////// 	RECIVO LA PRIMERA IMAGEN 	/////////////////////////////////////////
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let fullUrl = '../../front/docs/public/uploads/pregunta/'+fechab+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/pregunta/'+fechab+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/pregunta.png'
	}

	////////////////////////////////////////  RECIVO LA SEGUNDA IMAGEN 		/////////////////////////////////////////
	if (req.files.imagen2) {
		let extension2 = req.files.imagen2.name.split('.').pop()
		let fullUrl2 = '../../front/docs/public/uploads/pregunta/'+fechab+'_'+randonNumber+'.'+extension2
		ruta2 = req.protocol+'://'+req.get('Host') + '/public/uploads/pregunta/'+fechab+'_'+randonNumber+'.'+extension2
		fs.rename(req.files.imagen2.path, path.join(__dirname, fullUrl2))
	}else{
		ruta2 = req.protocol+'://'+req.get('Host') + '/pregunta.png'
	}

	///////////////////////// 	condiciono el tipo de pregunta 	///////////////////////
	if (req.files.imagen && req.files.imagen2) {
		tipo=1
		pregunta1=ruta
		pregunta2=ruta2
	}
	if (!req.files.imagen && !req.files.imagen2) {
		tipo=2
		pregunta1=req.body.pregunta1
		pregunta2=req.body.pregunta2
	}
	if (req.files.imagen && !req.files.imagen2) {
		tipo=3
		pregunta1=ruta
		pregunta2=req.body.pregunta2
	}
	if (!req.files.imagen && req.files.imagen2) {
		tipo=4
		pregunta1=req.body.pregunta1
		pregunta2=ruta2
	}

	let preguntaId   = req.params.id
	let userId       = req.session.usuario.user._id
	let photo        = req.session.usuario.user.photo
	let nombre       = req.session.usuario.user.nombre

	let tipoPregunta = tipo
	let pTitulo      = req.body.titulo
	let pDescripcion = req.body.descripcion
	let tipoChat 	 = 3
	let estado 	 	 =false

	let mensajeJson={
		preguntaId, userId, photo, nombre, tipoPregunta, pregunta1, pregunta2, pTitulo, pDescripcion, tipoChat, estado
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))

	preguntaServices.uploadImage(req.params.id, tipo, pregunta1, pregunta2, (err, pregunta)=>{
		
		if(err){
			res.json({err, code:0})
		}else{
			createChat(req, res, id, pregunta)
		}
	})

	/////////////////////////////////////////////////////////////////////////////
	///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
	/////////////////////////////////////////////////////////////////////////////
	let createChat = (req, res, id, pregunta)=>{
		console.log('si hay chat')
		chatServices.create(req.body, id,  3, (err,chat)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', pregunta, chat, code:1, other:'save chat' });	
			}
		})
	}


})






module.exports = router