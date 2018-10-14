'use strict'

let express = require('express')
let router = express.Router()
 
 
let redis       		= require('redis')
let cliente      		= redis.createClient()
let pagoPublicoServices = require('../services/pagoPublicoServices.js')
 
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////	 	GET ALL 
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res)=>{
	pagoPublicoServices.getALL((err, pago)=>{
		if(err){
			res.json({ status: 'FAIL', mensaje:err, code:0});
		}else{
			res.json({ status: 'SUCCESS', pago, code:1 });				
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////	 	GET BY USER/PAGO 	
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/byuser', (req, res)=>{
	if (!req.session) {
		res.json({ status: 'FAIL', mensaje:'sin sesion', code:1});	
	}else{
		pagoPublicoServices.getByidUSer(req.session.usuario.user._id, (err, saldo)=>{
			if(err){
				res.json({ status: 'FAIL', mensaje:err, code:0});
			}else{
				saldo = saldo.length===0 ?0 :saldo[0].saldo
				res.json({ status: 'SUCCESS', saldo, code:1});				
			}
		})
	}
})

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////	 	GET BY USER/PAGO 	
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/listbyuser', (req, res)=>{
	pagoPublicoServices.getListByidUSer(req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({ status: 'FAIL', mensaje:err, code:0});
		}else{
			let pagos = pago.map(e=>{
                let data = e.data[0].info[0]
                return{
                    id:data._id,
                    metodo:data.metodo,
                    referencia:data.referencia,
                    createdAt:data.createdAt,
                    monto:data.monto,
                }
            })
			res.json({ status: 'SUCCESS', pagos, total:pago.saldo, code:1});				
		}
	})
})
 
 
//////////////////////////////////////////////////////////////////////////////////////////
////////   GUARDO EL PAGO  
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', (req, res)=>{ 
 	let activo = true
	pagoPublicoServices.create(req.body, req.session.usuario.user._id, activo, (err, pago)=>{
		if(err){
			res.json({ status: 'FAIL', mensaje:err, code:0});	
		}else{
			res.json({ status: 'SUCCESS',  pago, code:1});					
		}
	})
})

module.exports = router