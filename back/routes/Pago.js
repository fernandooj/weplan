'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')
let redis        = require('redis')
let cliente      = redis.createClient()
let pagoServices = require('../services/pagoServices.js')
let itemServices = require('../services/itemServices.js')
let notificacionService = require('../services/notificacionServices.js');
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////	 	GET ALL 
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
//////////////////////	 	GET BY USER/PAGO 	
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
/////////////////	 OBTENGO DE CADA USUARIO LO QUE ADEUDA POR CADA ITEM pantalla abonos por el creador del item
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/porusuario/:itemId', (req, res)=>{
	itemServices.getById(req.params.itemId, (err, item)=>{
		if(!err){
			pagoServices.deudaPorUsuario(req.session.usuario.user._id, req.params.itemId, (err, pago)=>{
				if(err){
					res.json({err, code:0})
				}else{
					pago = pago.map(e=>{
						let data = e.data[0].info[0]
						return{
							id:e._id,
							nombre:data.nombre,
							photo:data.photo,
							monto:(Math.ceil((data.valor/(data.asignados.length+1))/100)*100)-e.deuda,
						}
					})
					res.json({ status: 'SUCCESS', pago, item, code:1 });				
				}
			})
		}
	})
})

 

///////////////////////////////////////////////////////////////////////////////////////////////
///////////// 		OBTIENE LA SUMA DE LOS RESULTADOS POR USUARIOS
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/user/:idItem/', (req, res)=>{
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

 
//////////////////////////////////////////////////////////////////////////////////////////
////////   GUARDO EL PAGO
////////   userId: es el id del usuario quien hace el pago, lo puede hacer el mismo usuario, o el dueño del item puede generar el abono  
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', (req, res)=>{
	let id = req.body.userId==null ?req.session.usuario.user._id :req.body.userId
	let activo = req.body.metodo==3 ?false :true
	let mensajeJson={
		userId:req.body.userItem,
		notificacion:true,
	}
	cliente.publish('notificacion', JSON.stringify(mensajeJson))

	itemServices.getById(req.body.itemId, (err, item)=>{
		console.log(item[0].abierto)
		if (!err) {
			if (item[0].abierto==true) {
				res.json({ status: 'FAIL', mensaje:'el item esta abierto', code:2 });		
			}else{
				pagoServices.create(req.body, id, req.session.usuario.user._id, activo, (err, pago)=>{
					if(err){
						res.json({err})
					}else{
						creaNotificacion(req.session.usuario.user._id, req.body.userItem, pago._id, res)
						//res.json({ status: 'SUCCESS', mensaje: pago, total:pago.length, code:1 });					
					}
				})
			}
		}
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea el pago envio la notificacion
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacion = (SessionId, userId, pagoId, res)=>{ 	
	notificacionService.create(SessionId, userId, 10, pagoId, true, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS',  notificacion, code:1})    
		}
	})
}
 



module.exports = router