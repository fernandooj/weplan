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

router.get('/suma/:idItem', function(req, res){
	pagoServices.suma(req.params.idItem, req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', pago, total:pago.length, code:1 });				
		}
	})
})


router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	pagoServices.create(req.body, id, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', mensaje: pago, total:pago.length, code:1 });					
		}
	})
})


 



module.exports = router