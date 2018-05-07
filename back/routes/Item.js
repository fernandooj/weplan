'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fechab = moment().format('YYYY-MM-DD-h-mm')
let redis        = require('redis')
let cliente      = redis.createClient()

let itemServices = require('../services/itemServices.js')
let chatServices = require('../services/chatServices.js')
let pagoServices = require('../services/pagoServices.js')
let notificacionService = require('../services/notificacionServices.js');
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////	 GET ALL 	//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
	itemServices.getALL((err, plan)=>{
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
		itemServices.getByidUSer(id, (err, item)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', item, total:item.length,  code:1 });				
			}
		})
	}else{
		itemServices.getByPlan(req.params.user, (err, item)=>{
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
	itemServices.getById(req.params.id, (err, plan)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: plan, total:plan.length, code:1 });				
		}
	})
})
 

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE ITEM		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	if (req.session.usuario) {
		itemServices.create(req.body, req.session.usuario.user._id, (err, item)=>{
			if(err){
				res.json({err, status: 'FAIL', code:0})
			}else{
				createPago(req.body, res, req.session.usuario.user._id, item)
				res.json({ status: 'SUCCESS', item, code:1 });			
			}
		})
	}else{
		res.json({status: 'FAIL', mensaje:'sin login', code:0})
	}
	 
	
})


//////////////////////////////////////////////////////////////////////////////////////////
////////   CREO UN PRIMER PAGO, O DEUDA 
//////////////////////////////////////////////////////////////////////////////////////////
let createPago = function(req, res, id, item){
	let deudaAsignados = Math.ceil((item.valor/(item.asignados.length+1))/1000)*1000
	let deudaCreador = req.valor - (deudaAsignados * item.asignados.length)
	let data = req.asignados.map(e=>{
		return {
			userId:e,
			itemId:item._id,
			monto:-deudaAsignados,
			metodo:null,
			descripcion:null,
			estado:1
		}
	})
	data.push({userId:id, itemId:item._id, monto:deudaCreador, metodo:null, descripcion:null, estado:1})

	data.map(e=>{
		pagoServices.create(e, null, (err, pago)=>{
			if(err){
				console.log(err)
			}else{					
			}
		})
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE IMAGEN		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/:id', (req,res)=>{
	let id   = req.session.usuario.user._id
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/item/'+fechab+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/item/'+fechab+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/item.png'
	}

	itemServices.uploadImage(req.params.id, ruta, (err, item)=>{
		if(err){
			res.json({err, code:0})
		}else{
			if (req.body.enviarChat=="true"){
				createChat(req, res, id, item, ruta)
			}else{
				res.json({ status: 'SUCCESS', item, code:1 });	
			}
		}
	})
})

/////////////////////////////////////////////////////////////////////////////
///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
/////////////////////////////////////////////////////////////////////////////
let createChat = function(req, res, userId, item, ruta){
	let mensajeJson={
		userId,
		nombre:req.session.usuario.user.nombre,
		photo:req.session.usuario.user.photo,
		itemId:req.params.id, 
		titulo:req.body.titulo, 
		descripcion:req.body.descripcion, 
		planId:req.body.planId, 
		rutaImagen:ruta,
		fecha:req.body.fecha, 
		valor:req.body.valor, 
		tipoChat:2
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))

	chatServices.create(req.body, userId, 2, (err,chat)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', item, chat, code:1, other:'save chat' });	
		}
	})
}




//////////////////////////////////////////////////////////////////////////////////////////
////////   SI UN USUARIO QUIERE INGRESAR AL ITEM, LO REGISTRO Y LO DEJO EN ESPERA 
//////////////////////////////////////////////////////////////////////////////////////////
router.put('/', (req, res)=>{
	itemServices.getById(req.body.itemId, (err, item)=>{
		if(isInArray(req.session.usuario.user._id, item[0].espera)){
			res.json({status: 'FAIL', mensaje:'ya esta en lista de espera', code:2})
		}else{
			let nuevoArray = item[0].espera.concat(req.session.usuario.user._id)
			itemServices.ingresarItem(req.body.itemId, nuevoArray, (err, item)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					creaNotificacion(req, res, item)	
				}
			})
		}
		
	})
})

//////////////////////////////////////////////////////////////////////////////////////////
////////   VERIFICO QUE EL USUARIO YA ALLA MANDADO LA SOLICITUD DE INGRESAR 
//////////////////////////////////////////////////////////////////////////////////////////
function isInArray(value, array) {
	return array.indexOf(value) > -1;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea la peticion de ingresar tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacion = (req, res, item)=>{
	notificacionService.create(req.session.usuario.user._id, item.userId, 2, item._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', item, notificacion, code:1})    
		}
	})
}



module.exports = router


