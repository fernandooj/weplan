'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

let abonoServices = require('../services/abonoServices.js')

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////	 GET ALL 	//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
	abonoServices.getALL((err, abono)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', mensaje: abono, total:abono.length, code:1 });				
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY USER/ABONO 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:user', function(req, res){
	let id = req.session.usuario.user._id
	console.log(id)
	if (req.params.user=='user') {
		abonoServices.getByidUSer(id, (err, abono)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', mensaje: abono, total:abono.length,  code:1 });				
			}
		})
	}else{
		abonoServices.getByItem(req.params.user, (err, abono)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', mensaje: abono, total:abono.length, code:1 });				
			}
		})
	}
})


router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	abonoServices.create(req.body, id, (err, abono)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', mensaje: abono, total:abono.length, code:1 });					
		}
	})
})


 



module.exports = router