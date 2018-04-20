'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

let itemServices = require('../services/itemServices.js')
let chatServices = require('../services/chatServices.js')


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
	console.log(id)
	if (req.params.user=='user') {
		itemServices.getByidUSer(id, (err, plan)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', mensaje: plan, total:plan.length,  code:1 });				
			}
		})
	}else{
		itemServices.getByPlan(req.params.user, (err, plan)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', mensaje: plan, total:plan.length, code:1 });				
			}
		})
	}
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY ID PLAN 	///////////////////////////////////////////////
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
 

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE ITEM		///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	let ruta =null
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////	 GENERATE AND SAVE THE IMAGE 	///////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/item/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/item/'+fecha+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/plan.png'
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////

	itemServices.create(req.body, id, ruta, (err, item)=>{
		if(err){
			res.json({err})
		}else{
			if (req.body.enviarChat=='true'){
				createChat(req.body, res, id, item)
			}else{
				res.json({ status: 'SUCCESS', mensaje: item, code:1 });	
			}
						
		}
	})
})


/////////////////////////////////////////////////////////////////////////////
///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
/////////////////////////////////////////////////////////////////////////////
let createChat = function(req, res, id, plan){
	chatServices.create(req, id, plan._id, (err,chat)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: chat, code:1, other:'save chat' });	
		}
	})
}




module.exports = router