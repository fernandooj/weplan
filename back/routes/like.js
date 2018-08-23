'use strict'

let express = require('express')
let router = express.Router()
 
let likeServices = require('../services/likeServices.js')
 
 
//////////////////////////////////////////////////////////////////////////////////////////
////////   GUARDO EL PAGO  
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', (req, res)=>{ 
 	let activo = true
 	likeServices.getOne(req.session.usuario.user._id, req.body.planId, (err, like)=>{
 		if (!like) {
 			likeServices.create(req.session.usuario.user._id, req.body.planId, activo, (err, like)=>{
				if(err){
					res.json({ status: 'FAIL', mensaje:err, code:0});	
				}else{
					res.json({ status: 'SUCCESS',  like, code:1});					
				}
			})
 		}else{
 			res.json({ status: 'FAIL', mensaje:'ya se hizo votacion', code:0});	
 		}
 	})
	
})

module.exports = router