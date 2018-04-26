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

// let itemPlan = function(items, id, res){
// 	let deuda=[]
// 	let negro = items.filter(item=>{
// 		return pagoServices.suma(item._id, id, (err, pago)=>{
			 
// 				//let deudaNueva = pago.length>0 ?pago[0].monto :Math.round((item.valor/(item.asignados.length+1))/1000)*1000;
// 				deuda.push(pago)
			 
// 		})		
// 	})	
// 	res.json({ status: 'SUCCESS', negro, deuda, code:1 });
// 	console.log({negro})
// }









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
	let id = req.session.usuario.user._id
	itemServices.create(req.body, id, (err, item)=>{
		if(err){
			res.json({err})
		}else{
			createPlan(req.body, res, id, item)
			if (req.body.enviarChat===true){
				createChat(req, res, id, item)
			}else{
				res.json({ status: 'SUCCESS', mensaje: item, code:1 });	
			}			
		}
	})
})

/////////////////////////////////////////////////////////////////////////////
///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
/////////////////////////////////////////////////////////////////////////////
let createChat = function(req, res, id, item){
	chatServices.create(req.body, id, item._id, (err,chat)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', item, chat, code:1, other:'save chat' });	
		}
	})
}



let createPlan = function(req, res, id, item){
	console.log(item.valor/(item.asignados.length+1))
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
				//res.json({err, code:0})
			}else{
				console.log(pago)
				//res.json({ status: 'SUCCESS', pago, code:1 });					
			}
		})
	})
	
}

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE IMAGEN		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/:id', (req,res)=>{



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

	let id   = req.session.usuario.user._id
	let photo   = req.session.usuario.user.photo
	let nombre  = req.session.usuario.user.nombre
	let mensaje  = null
	let planId  = req.body.planId
	let fecha   = req.body.fecha
	let itemId  = req.params.id
	let titulo = req.body.titulo
	let descripcion = req.body.descripcion
	let valor  = req.body.valor

	let mensajeJson={
		itemId, mensaje, id, photo, planId, mensaje, fecha, nombre, titulo, descripcion, valor, rutaImagen:ruta
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))

	itemServices.uploadImage(req.params.id, ruta, (err, plan)=>{
		
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
			
		}
	})

})






module.exports = router