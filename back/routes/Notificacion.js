'use strict'


let express = require('express')
let router = express.Router();
let notificacionService = require('../services/notificacionServices.js');
 

router.get('/', (req, res)=>{
	notificacionService.get((err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})
})

router.get('/:id', (req, res)=>{ 
	notificacionService.getById(req.session.usuario.user._id, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			//console.log(asignados[0].asignados)
			res.json({status:'SUCCESSASI', asignados, code:1})    
		}
	})
})



router.post('/', (req, res)=>{
	let id = req.session.usuario.user._id
	notificacionService.create(req.body.asignado, id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})
	 
})
router.put('/', (req,res)=>{
	notificacionService.activa(req.body.id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})
})
module.exports = router