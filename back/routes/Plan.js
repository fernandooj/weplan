'use strict'

let express = require('express')
let router = express.Router()
let planServices = require('../services/planServices.js')
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

router.get('/', (req, res)=>{
	planServices.get((err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS',  planes, code:1 });	
		}
	})
})

router.get('/:clientes', (req, res)=>{
	let id = req.session.usuario.user._id
	if (req.params.clientes=='clientes') {
		planServices.getByclientes((err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });	
			}
		})	
	}else{
		planServices.getById(id, (err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });	
			}
		})
	}
})


router.get('/:getbyid/:planId', (req, res)=>{
	planServices.getByIdPlan(req.params.planId, (err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', message: planes, total:planes.length, code:1 });	
		}
	})
})


router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	planServices.create(req.body, id, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });	
		}
	})
})

router.put('/', (req, res)=>{
	let ruta = null 
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = '../../front/docs/public/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
		ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/plan/'+fecha+'_'+randonNumber+'.'+extension
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/plan.png'
	}
	planServices.uploadImage(req.body.id, ruta, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });	
			
		}
	})
})


 
router.get('/pariente/ente/corriente/mente', (req, res)=>{
	planServices.sumaPlan(req.session.usuario.user._id, (err, pago)=>{
		//console.log(pago)
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			
	 
			let suma = pago.filter(e=>{
				//if (e.userId==req.session.usuario.user._id){suma.push(e.montos)}
				if (e._id.abono!==false) return e
				//console.log(e._id.abono)
			})
		 
			
			res.json({pago, suma})
		}
	})
})




module.exports = router