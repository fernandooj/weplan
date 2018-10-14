'use strict'


let express = require('express')
let router = express.Router();
let redis        = require('redis')
let cliente      = redis.createClient()

let notificacionService = require('../services/notificacionServices.js');
let amigoUserService    = require('../services/amigoUserServices.js');
let itemServices 		= require('../services/itemServices.js')
let pagoServices 		= require('../services/pagoServices.js')
let planServices 		= require('../services/planServices.js')
let userServices 		= require('./../services/usersServices.js') 
let chatServices 		= require('../services/chatServices.js')

router.get('/:id', (req, res)=>{ 
	notificacionService.getById(req.params.id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})
})


///////////////////////////////////////////////////////////////////////////
/*
OBTENGO LAS NOTIFICACIONES DEL USUARIO LOGUEADO
*/
///////////////////////////////////////////////////////////////////////////
router.get('/', (req, res)=>{ 
	notificacionService.getByUser(req.session.usuario.user._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			notificacion = notificacion.map((e)=>{
				return {
					id 	   : e._id,
					tipo   : e.tipo, 
					activo : e.activo,
					btnEliminar:false, /// pongo este valor para que muestre el boton de eliminar
					idUser : e.idUsuarioAsigna &&e.idUsuarioAsigna._id,
					nombre : e.idUsuarioAsigna &&e.idUsuarioAsigna.nombre,
					idTipo : e.idAmigoUser ?e.idAmigoUser._id :e.idPlan ?e.idPlan._id :e.idPago ?e.idPago._id	:e.idItem ?e.idItem._id :e.idItem===4 &&e.idItem._id,
					photo  : e.idAmigoUser ?e.idUsuarioAsigna.photo  :e.idPlan ?e.idPlan.imagenMiniatura[0] :e.idItem ?e.idItem.imagenMiniatura :e.idItem===4 ?e.idItem.imagenMiniatura :e.tipo==5 ?e.idUsuarioAsigna.photo :e.idPago &&e.idUsuarioAsigna.photo ,
					titulo : e.idAmigoUser ?e.idUsuarioAsigna.nombre :e.idPlan ?e.idPlan.nombre :e.idPago ?e.idPago.monto :e.idItem ?e.idItem.titulo :e.idItem===4 &&e.idItem.titulo,
					token  : e.idUsuarioAsigna &&e.idUsuarioAsigna.tokenPhone,
					infoPlan:e.idPlan ?e.idPlan :null,
					infoItem:e.idItem ?e.idItem :null,
					////////////////////////////  AMIGOS  ////////////////////////////////////
					//idAmigoUser : e.idAmigoUser ?e.idAmigoUser._id 				:null,

					//////////////////////////// PLAN /////////////////////////////////////
					//idPlan   	: e.idPlan  ?e.idPlan._id    :null,
					//nombrePlan  : e.idPlan  ?e.idPlan.nombre :null,
					//imagenPlan  : e.idPlan  ?e.idPlan.imagenMiniatura[0] :null,

					////////////////////////////  ITEM  //////////////////////////////////////
					//idItem   	: e.idItem  &&e.idItem._id    ,
					//nombreItem  : e.idItem  &&e.idItem.titulo ,
					//imagenItem  : e.idItem  &&e.idItem.imagenMiniatura ,
					valorItem   : e.idItem  &&Math.ceil((e.idItem.valor/(e.idItem.asignados.length+2))/100)*100,

				}
			})
			res.json({status:'SUCCESS', notificacion, id:req.session.usuario.user._id, code:1})   
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

router.delete('/:id', (req, res)=>{
	notificacionService.elimina(req.params.id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})	 
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			modifico y desactivo la notificacion y modifico el tipo de la notificacion
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:idNotificacion/:idTipo/:tipo/:idUser', (req,res)=>{
	let mensajeJson={
		userId:req.params.idUser,
		notificacion:true,
	}
	cliente.publish('notificacion', JSON.stringify(mensajeJson))
	let id = req.params.tipo==4 ?req.params.idUser :req.session.usuario.user._id 
	console.log(id)
	notificacionService.desactiva(req.params.idNotificacion, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			req.params.tipo==1 
			?activaAmigoUser(req.params.idTipo, req.params.idUser, req.session.usuario.user._id, res) 
			:req.params.tipo==3 || req.params.tipo==4
			?verificaItemAbierto(req.session.usuario, req.params.idTipo, id, res, req, req.params.tipo) 
			:req.params.tipo==11
			?editaPago(req.params.idTipo, req.session.usuario.user._id, req.params.idUser, res) 
			:req.params.tipo==14
			?insertaRatingUser(req.params.idTipo,  req.params.idUser, res) 
			:res.json({status:'SUCCESS', notificacion, code:1}) 
		}
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			inserta el ranking sobre el plan padre
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const insertaRatingUser = (rating, idUser, res) =>{
	userServices.getOneUser(idUser,  (err, user)=>{
		if (!err) {
			console.log(user)
			let calificacion = user.calificacion
			calificacion = calificacion.concat(rating)
			userServices.rating(idUser, calificacion,  (err, user)=>{
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', user, code:1})    
				}
			})	
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			edito el pago y lo activo
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editaPago =(idTipo,  idSession, idUser, res)=>{
	console.log(idTipo)
	pagoServices.activa(idTipo, (err, pago)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			///////////////////  creo la notificacion de que ya acepto ser amigo
			notificacionService.create(idSession, idUser, 11, idTipo, false, (err, notificacion)=>{
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', notificacion, code:1})    
				}
			})	
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}
	})
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			activo el usuario si es true es que ya son amigos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const activaAmigoUser =(idTipo, idUser, idSession, res)=>{
	amigoUserService.activa(idTipo, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			///////////////////  creo la notificacion de que ya acepto ser amigo
			notificacionService.create(idSession, idUser, 5, null, false, (err, notificacion)=>{
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', notificacion, code:1})    
				}
			})	
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}
	})
}

const verificaItemAbierto=(usuario, idTipo, id, res, req, tipo)=>{
	itemServices.getById(idTipo, (err, item)=>{
		if (err) {
			console.log(err)
		}else{
			if (item[0].abierto) {
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////
				////////////////////////////// 		edito el chat, el item y la notificacion con el nuevo valor 
				if (tipo==='3') {
					let mensajeJson1={
						id:item[0]._id ?item[0]._id :null, 
						planId:item[0].planId,
						valor:Math.ceil((item[0].valor/(item[0].asignados.length+3))/100)*100,
					}
					cliente.publish('itemCosto', JSON.stringify(mensajeJson1))
					notificacionService.getByItem(item[0]._id, (err, notificacion)=>{
						if (!err) {
							if (notificacion.length>0) {
								let mensajeJson={
									id:notificacion[0]._id ?notificacion[0]._id :null, 
									userId:req.session.usuario.user._id,
									valor:Math.ceil((item[0].valor/(item[0].asignados.length+3))/100)*100,
								}
								cliente.publish('notificacionCosto', JSON.stringify(mensajeJson))
							}
						}
					})
				}
				
				if(tipo==='4'){
					let mensajeJson1={
						id:item[0]._id ?item[0]._id :null, 
						valor:Math.ceil((item[0].valor/(item[0].asignados.length+3))/100)*100,
					}
					cliente.publish('notificacionCostoCreador', JSON.stringify(mensajeJson1))
				}
				
				

				chatServices.getByItem(item[0]._id, (err, chat)=>{
					if (!err) {
						if (chat.length>0) {
							let mensajeJson={
								id:chat[0]._id ?chat[0]._id :null, 
								planId:item[0].planId,
								valor:Math.ceil((item[0].valor/(item[0].asignados.length+3))/100)*100,
							}
							cliente.publish('editaPago', JSON.stringify(mensajeJson))
						}
					}
				})
				
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////
				activaItem(usuario, idTipo, id, res, req)
			}else{

				res.json({status:'FAIL', mensaje:'EL ITEM ESTA CERRADO', code:2})
			}
		}
	})
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 			agrego al usuario al item 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const activaItem =(usuario, idTipo, id, res, req)=>{
	itemServices.getById(idTipo, (err, item)=>{
		if(isInArray(usuario.user._id, item[0].asignados)){
			res.json({status: 'FAIL', mensaje:'ya esta agregado', code:2})
		}else{
			
			id = id==='null' ?usuario.user._id :id
			let espera = item[0].espera.filter(e=>{
				return e!=id
			})
	 
			let asignados = item[0].asignados.concat(id)
			itemServices.activaUsuario(idTipo, espera, asignados, (err, item2)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					//res.json({status:'SUCCESS', asignados, code:1})
					nuevoPago(req, res, idTipo, id, req.body.monto, item)    	
				}
			})
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	CREO UN NUEVO PAGO CUANDO EL CREADOR DEL ITEM ACEPTA QUE EL OTRO USUARIO SEA PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nuevoPago = (req, res, itemId, idUser, montoCreador, item) =>{
	let tipo = req.params.tipo==3 ?6 :req.params.tipo==4 &&7
	req.body['abono']=false
	req.body['activo']=true
	req.body['metodo']=null
	req.body['itemId']=itemId
	req.body['planId']=item[0].planId
	req.body['monto']=-(req.body.monto)
	req.body['descripcion']='pago inicial por inscribirse'
	//pagoServices.create(req.body, req.session.usuario.user._id, req.session.usuario.user._id, (err, pago)=>{
	pagoServices.create(req.body, idUser, idUser, true, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			//res.json({ status: 'SUCCESS', pago, code:1 });
			editaPagoCreador(itemId, req.session.usuario.user._id, req.params.idUser, montoCreador, req.body.monto, tipo, res)					
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	EDITO AL DUEÑO DEL ITEM, CUANDO EL USUARIO ACEPTA SER PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editaPagoCreador = (itemId, idSession, idUser, montoCreador, montoAsignado, tipo, res)=>{
	itemServices.getById(itemId, (err, item)=>{
		if (err) {
			console.log(err)
		}else{
			pagoServices.betyByItemAndUser(itemId, item[0].userId._id, (err, pago)=>{
				if(err){
					res.json({err})
				}else{
					pagoServices.edit(pago._id, montoCreador, (err, pago2)=>{
						if (err) {
							console.log(err)
						}else{
							editaPagoAsignados(itemId, item[0].userId._id, montoAsignado, idSession, idUser, tipo, res )
						}
					})					
				}
			})
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	EDITO LOS DEMAS PAGOS DE LOS MIEMBROS DEL ITEM, CUANDO EL USUARIO ACEPTA SER PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editaPagoAsignados = (itemId, userId, monto, idSession, idUser, tipo, res)=>{
	pagoServices.betyByItemAndUserNotEqual(itemId, userId, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			pago.map(e=>{
				pagoServices.edit(e._id, monto, (err, pago2)=>{
					//console.log(pago2)
				})
			})
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			///////////////////  creo la notificacion de que ya esta dentro del item
			notificacionService.create(idSession, idUser, tipo, itemId, false, (err, notificacion)=>{
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', notificacion, code:1})    
				}
			})	
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
		}
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
////////   VERIFICO QUE EL USUARIO YA SE HALLA ACTIVADO 
//////////////////////////////////////////////////////////////////////////////////////////
function isInArray(value, array) {
	return array.indexOf(value) > -1;
}


								///////////// 			CUANDO DECLINA LA NOTIFICACION  		/////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			modifico y desactivo la notificacion y modifico el tipo de la notificacion
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/cancelar/:idNotificacion/:idTipo/:tipo/:idUser', (req, res)=>{
	let mensajeJson={
		userId:req.params.idUser,
		notificacion:true,
	}
	cliente.publish('notificacion', JSON.stringify(mensajeJson))

	notificacionService.desactiva(req.params.idNotificacion, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			req.params.tipo==1 
			?eliminaAmigoUser(req.params.idTipo, res) 
			:req.params.tipo==2 
			?eliminaUserPlan(req.params.idTipo, req.session.usuario.user._id, res) 
			:req.params.tipo==3 
			?eliminarUserItem(req.params.idTipo, req.params.idUser, res, req) 
			:req.params.tipo==11
			?rechazaPago(req.params.idTipo, req.session.usuario.user._id, req.params.idUser, res) 
			:res.json({status:'SUCCESS', notificacion, code:1}) 
		}
	})
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			activo el usuario si es true es que ya son amigos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const rechazaPago =(idTipo,  idSession, idUser, res)=>{
	 
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////  creo la notificacion de que ya acepto ser amigo
	notificacionService.create(idSession, idUser, 12, idTipo, false, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 			no acepto que un usuario sea parte de un item 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminarUserItem =(idItem, idUser, res, req)=>{
	itemServices.getById(idItem, (err, item)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			if (req.params.tipo==3) {
				createNotificacionCancelar(req.session.usuario.user._id, idUser, 9, idItem, res)
			}else{
				res.json({status:'SUCCESS', item, code:1})  
			}		  
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			elimino el registro para agregar amigo
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminaAmigoUser =(idTipo, res)=>{
	amigoUserService.elimina(idTipo, (err, data)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', data, code:1})    
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			saco al usuario del plan
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminaUserPlan =(idTipo, idSession, res)=>{
	planServices.getByIdPlan(idTipo, (err, plan)=>{
		if (err) {
			res.json({status: 'FAIL', err, code:0})
		}else{
			let asignados = plan[0].asignados.filter(e=>{
				return e != idSession  
			})
			planServices.salir(idTipo, asignados, (err, plan2)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					createNotificacionCancelar(idSession, plan[0].idUsuario, 8, idTipo, res)
					// res.json({status: 'SUCCESS', plan2, code:1})
				}
			})
		}
	})
}

const createNotificacionCancelar = (idSession, idUser, tipo, planId, res) =>{
	notificacionService.create(idSession, idUser, tipo, planId, false, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})    
		}
	})	
}
module.exports = router

