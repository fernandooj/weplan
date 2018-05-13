'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

let pagoServices = require('../services/pagoServices.js')

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////	 GET ALL 	//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
	pagoServices.getALL((err, pago)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: pago, total:pago.length, code:1 });				
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY USER/PAGO 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:user', function(req, res){
	let id = req.session.usuario.user._id
	if (req.params.user=='user') {
		pagoServices.getByidUSer(id, (err, pago)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', pago, total:pago.length,  code:1 });				
			}
		})
	}else{
		pagoServices.getByItem(req.params.user, (err, pago)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', pago, total:pago.length, code:1 });				
			}
		})
	}
})

///////////////////////////////////////////////////////////////////////////////////////////////
///////////// 		OBTIENE LA SUMA DE LOS RESULTADOS POR ITEM
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/suma/:idItem', (req, res)=>{
	pagoServices.suma(req.params.idItem, req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			sumaTodos(req, res, pago) 
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
///////////// 		OBTIENE LA SUMA DE LOS RESULTADOS POR USUARIOS
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/user/:idItem/:idUser', (req, res)=>{
	pagoServices.suma(req.params.idItem, req.params.idUser, (err, pago)=>{
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			sumaTodos(req, res, pago) 
		}
	})
})

const sumaTodos = (req, res, pago) =>{
	pagoServices.sumaTodos(req.params.idItem, (err, deuda)=>{
		if(err){
			res.json({err, code:0})
		}else{
			console.log(deuda)
			res.json({ status: 'SUCCESS', pago, deuda, total:pago.length, code:1 });				
		}
	})
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////// 		OBTIENE LA SUMA DE LOS RESULTADOS POR USUARIOS
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/pariente/ente/corriente/mente', (req, res)=>{
	 
	pagoServices.sumaPlan((err, pago)=>{
		console.log(pago)
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			res.json({pago})
		}
	})
})


router.post('/', (req, res)=>{
	let id = req.body.userId==null ?req.session.usuario.user._id :req.body.userId
	console.log(req.body)
	pagoServices.create(req.body, id, req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', mensaje: pago, total:pago.length, code:1 });					
		}
	})
})


 



module.exports = router