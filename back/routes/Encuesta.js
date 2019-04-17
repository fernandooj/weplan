'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fechab = moment().format('YYYY-MM-DD-h-mm')
let redis        = require('redis')
let cliente      = redis.createClient()

let encuestaServices = require('../services/encuestaServices.js')
let chatServices = require('../services/chatServices.js')
 

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////	 GET ALL 	//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
	encuestaServices.getALL((err, plan)=>{
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
		encuestaServices.getByidUSer(id, (err, item)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', item, total:item.length,  code:1 });				
			}
		})
	}else{
		encuestaServices.getByPlan(req.params.user, id, (err, encuesta)=>{
			if(err){
				res.json({err, code:0})
			}else{
				encuesta = encuesta.map(e=>{ 
					let porcentaje1 = (e.totalUno*100)/e.totalRepuestas
					let porcentaje2 = 100-porcentaje1
					 
					porcentaje1 = Math.round(porcentaje1 * 100) / 100
					porcentaje2 = Math.round(porcentaje2 * 100) / 100

					let asignados = e.data.map(e=>{
						// arrayIdPreguntas.push(e.info[0].userIdRespuesta)
						return e.info[0].userIdRespuesta
					})
					asignados.push(e.data[0].info[0].encuestaUserId)
					return{
						encuestaId	 : e._id.id,
						tipoEncuesta : e.data[0].info[0].tipo,
						eTitulo		 : e.data[0].info[0].titulo,
						pregunta1	 : e.data[0].info[0].pregunta1,
						pregunta2	 : e.data[0].info[0].pregunta2,
						respuesta1   : porcentaje1,
						respuesta2   : porcentaje2,
						porcentaje1,
						porcentaje2,
						asignados,
						totalRespuestas : e.totalRepuestas,
						encuestaUserId : e.data[0].info[0].encuestaUserId,
					}
				})
				encuesta.reverse()
				res.json({ status: 'SUCCESS', encuesta,  code:1 });		
			}
		})
	}
})

 
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 OBTENGO LOS PUBLICADOS QUE NO HA CREADO EL USUARIO LOGUEADO
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/publicados/:idPlan', (req, res)=>{
		encuestaServices.getPublicados(req.params.idPlan, req.session.usuario.user._id, (err, encuesta)=>{
			if(err){
				res.json({err, code:0})
			}else{
				console.log(encuesta)
				encuesta = encuesta.map(e=>{ 
					let porcentaje1 = (e.totalUno*100)/e.totalRepuestas
					let porcentaje2 = 100-porcentaje1
					 
					porcentaje1 = Math.round(porcentaje1 * 100) / 100
					porcentaje2 = Math.round(porcentaje2 * 100) / 100

					let asignados = e.data.map(e=>{
						// arrayIdPreguntas.push(e.info[0].userIdRespuesta)
						return e.info[0].userIdRespuesta
					})
					asignados.push(e.data[0].info[0].encuestaUserId)
					return{
						id	 : e._id.id,
						tipoEncuesta : e.data[0].info[0].tipo,
						eTitulo		 : e.data[0].info[0].titulo,
						pregunta1	 : e.data[0].info[0].pregunta1,
						pregunta2	 : e.data[0].info[0].pregunta2,
						respuesta1   : porcentaje1,
						respuesta2   : porcentaje2,
						porcentaje1,
						porcentaje2,
						asignados,
						totalRespuestas : e.totalRepuestas,
						encuestaUserId : e.data[0].info[0].encuestaUserId,
					}
				})
				encuesta.reverse()
				res.json({ status: 'SUCCESS', encuesta, id: req.session.usuario.user._id,  code:1 });		
			}
		})
 
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY ID ITEM 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/id/:id', (req, res)=>{
	encuestaServices.getById(req.params.id, (err, plan)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: plan, total:plan.length, code:1 });				
		}
	})
})
 

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE encuesta		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	encuestaServices.create(req.body, id, (err, encuesta)=>{
		if(err){
			res.json({err,  code:0})
		}else{
			res.json({ status: 'SUCCESS', encuesta,  code:1 });	
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
	let randonNumber2 = Math.floor(90000000 + Math.random() * 1000000)
	let tipo  = null
	let pregunta1 = null
	let pregunta2 = null
	////////////////////////////////////////// 	RECIVO LA PRIMERA IMAGEN 	/////////////////////////////////////////
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
			extension = extension=='HEIC' ?'jpg' :extension
		let fullUrl = '../../front/docs/public/uploads/encuesta/'+fechab+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/encuesta/'+fechab+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
	}

	////////////////////////////////////////  RECIVO LA SEGUNDA IMAGEN 		/////////////////////////////////////////
	if (req.files.imagen2) {
		let extension2 = req.files.imagen2.name.split('.').pop()
			extension2 = extension2=='HEIC' ?'jpg' :extension2
		let fullUrl2 = '../../front/docs/public/uploads/encuesta/'+fechab+'_'+randonNumber2+'.'+extension2
		ruta2 = req.protocol+'://'+req.get('Host') + '/public/uploads/encuesta/'+fechab+'_'+randonNumber2+'.'+extension2
		fs.rename(req.files.imagen2.path, path.join(__dirname, fullUrl2))
	}else{
		ruta2 = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
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
	
	encuestaServices.uploadImage(req.params.id, tipo, pregunta1, pregunta2, (err, encuesta)=>{
		
		if(err){
			res.json({err, code:0})
		}else{
			createChat(req, res, id, tipo, pregunta1, pregunta2, encuesta)
		}
	})

	/////////////////////////////////////////////////////////////////////////////
	///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
	/////////////////////////////////////////////////////////////////////////////
	let createChat = (req, res, id, tipo, pregunta1, pregunta2, encuesta)=>{
		chatServices.create(req.body, id,  3, null, (err,chat)=>{
			let asignados = []
			asignados.push(req.session.usuario.user._id)
			let mensajeJson={
				id :         encuesta._id,
				planId: 	 req.body.planId, 
				encuestaId:  req.params.id, 
				userId: 	 req.session.usuario.user._id, 
				photo:  	 req.session.usuario.user.photo, 
				nombre: 	 req.session.usuario.user.nombre, 
				asignados,
				tipoEncuesta:tipo, 
				pregunta1,   
				pregunta2, 
				eTitulo: 	 encuesta.titulo,
				pDescripcion:encuesta.descripcion, 
				tipoChat    :3, 
				estado: 	true
			}

			cliente.publish('chat', JSON.stringify(mensajeJson))
			 

			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', encuesta, chat, code:1, other:'save chat' });	
			}
		})
	}


})






module.exports = router