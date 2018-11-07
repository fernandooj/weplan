'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fechab = moment().format('YYYY-MM-DD-h-mm')
let redis        = require('redis')
let cliente      = redis.createClient()
let Jimp = require("jimp");
var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));
let itemServices = require('../services/itemServices.js')
let chatServices = require('../services/chatServices.js')
let pagoServices = require('../services/pagoServices.js')
let notificacionService = require('../services/notificacionServices.js');
const ubicacion     =  '../../front/docs/public/uploads/item/'
const ubicacionJimp =  '../front/docs/public/uploads/item/'

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
	if (req.params.user=='user') {
		itemServices.getByidUSer(id, (err, item)=>{
			if(err){
				res.json({err, code:0})
			}else{
				res.json({ status: 'SUCCESS', item, total:item.length,  code:1 });				
			}
		})
	}else{
		itemServices.sumaItemPropios(req.params.user, req.session.usuario.user._id, (err, pago)=>{
			if(err){
				res.json({err, code:0})
			}else{
				itemServices.sumaItemAsignados(req.params.user, req.session.usuario.user._id, (err, deuda)=>{
					if (err) {
						res.json({err, code:0})
					}else{
						let data;
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						////////////////////////////  devuelvo solo los que son activos y que sean abonos
						//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
						pago = pago.filter(e=>{
							return (e._id.descripcion=="pago inicial por inscribirse") || (e._id.descripcion=="abono de parte del dueño del item" && e._id.activo===true)|| 
							(e._id.descripcion=="abono usuario" && e._id.activo===true)
						})


						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						///////////////////////  ESTE CODIGO LO HIZE POR QUE SE DUPLICAN LOS ITEMS, ASI QUE UNO LOS ITEM Y SUMO LOS TOTALES	
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						let map = pago.reduce((prev, next) =>{
						  if (next._id.id in prev) {
						    prev[next._id.id].deuda += next.deuda;
						  } else {
						     prev[next._id.id] = next;
						  }
						  return prev;
						}, {});
						pago = Object.keys(map).map(id => map[id]);

						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						///////////////////////  ESTE CODIGO LO HIZE POR QUE SE DUPLICAN LOS ITEMS, ASI QUE UNO LOS ITEM Y SUMO LOS TOTALES	
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						pago = pago.map(e=>{
							data = e.data[0].info[0]
							
							let nuevaDeuda = e.data.filter(e2=>{
								if (e2.info[0].userIdPago==req.session.usuario.user._id){
									return e2.info[0].monto	
								}
							}) 

							let costoCreador = data.costoCreador ?data.costoCreador :e.deuda-Math.ceil((data.valor/(data.asignados.length+1))/100)*100
							let nuevaDeuda2 = nuevaDeuda[0] ?nuevaDeuda[0].info[0].monto :costoCreador
							return{
								id:e._id.id,
								titulo:data.titulo,
								idUsuario:data.userId,
								valor:data.valor,
								count:e.count,
								// deuda:e.deuda-data.valor,
								// deuda:e.deuda - nuevaDeuda[0] ?nuevaDeuda[0].info[0].monto :e.deuda-Math.ceil((data.valor/(data.asignados.length+1))/100)*100,
								deuda:e.deuda - nuevaDeuda2 ,
								deuda1:nuevaDeuda,
								deuda2:nuevaDeuda2,
								deuda3:costoCreador,
								deuda3:e.deuda,
		 						abierto:data.abierto,
							}
						})

						 
						console.log(req.session.usuario.user._id)
						deuda = deuda.map(e=>{
							data = e.data[0].info[0]
							return{
								id:e._id,
								titulo:data.titulo,
								idUsuario:data.userId,
								valor:data.valor,
								nombre:data.nombre,
		 						deuda:e.deuda
							}
						})
						const add = (a, b)=>{
				 			return a + b;
						}
						let sumaPago  =[];
						let sumaDeuda =[];
						// pago.filter(e=>{
						// 	sumaPago.push(e.deuda)
						// })
						deuda.filter(e=>{
							sumaDeuda.push(e.deuda)
						})
						let sumPago  = sumaPago.reduce(add, 0);
						let sumDeuda = sumaDeuda.reduce(add, 0);
						let total = sumPago + sumDeuda;

						
						res.json({ status: 'SUCCESS', pago, deuda, deudaTotal:deuda.length, pagoTotal:pago.length, total, code:1 });	
					}
				})								
			}
		})
	}
})


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY ID ITEM 	 
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
/////////////////////////		OBTENGO LOS QUE ESTAN EN ESPERA  
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/pendientes/:planId', (req, res)=>{
	if (!req.params.planId) {
		res.json({ status: 'SUCCESS', pendientes:[], code:1 });	
	}else{
		itemServices.getEspera(req.session.usuario.user._id, req.params.planId, (err, pendientes)=>{
			if(err){
				res.json({err, code:0})
			}else{ //
				pendientes = pendientes.map((e)=>{
					return{
						id:e._id,
						titulo:e.titulo,
						valor:e.valor,
						idUsuario:e.userId.userId,
						nombre:e.userId.nombre,
						token:e.userId.tokenPhone,
						imagen:e.imagenResize,
						deuda:Math.ceil((e.valor/(e.asignados.length+2))/100)*100
					}
				})
				res.json({ status: 'SUCCESS', pendientes, code:1 });				
			}
		})
	}
})


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 OBTENGO LA DEUDA DE CADA USUARIO QUE LE DEBO
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/deudaPorUsuario/:planId', (req, res)=>{
	itemServices.sumaPorUsuarioDebo(req.params.planId, req.session.usuario.user._id, (err, debo)=>{
		if(err){
			res.json({err, code:0})
		}else{
			pagoServices.sumaPorUsuarioDeboSinGroup(req.params.planId, req.session.usuario.user._id, (err, debo2)=>{
				if(!err){
					sumaPorUsuarioMeDebe(req.params.planId, req.session.usuario.user._id, debo, debo2, res)		
				}
			})			
			// sumaPorUsuarioMeDebe(req.params.planId, req.session.usuario.user._id, debo, res)		
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////		OBTENGO LOS LA DEUDA DE CADA USUARIO QUE ME DEBE
///////////////////////////////////////////////////////////////////////////////////////////////
const sumaPorUsuarioMeDebe = (planId, id, debo, debo2, res)=>{
	pagoServices.sumaPorUsuarioMeDebe(planId, id, (err, meDeben)=>{
		if(err){
			console.log(err)
		}else{	
			pagoServices.sumaPorUsuarioMeDebeSinGroup(planId, id, (err2, meDeben2)=>{
				if (!err2) {
					let suma=[]
					let suma1=[]
					meDeben.filter(e=>{
						suma.push(e.total)
					})
					debo.filter(e=>{
						suma1.push(e.total)
					})
					let sum = suma.reduce(add, 0);
					let sum1 = suma1.reduce(add, 0);

					let total = Math.abs(sum) + sum1
 
					 
					res.json({ status: 'SUCCESS', debo, debo2, meDeben, meDeben2, total,  code:1 });
				}
					
			})			
		}
	})
}

const add = (a, b)=>{
	return a + b;
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////		OBTENGO LOS QUE NO ESTAN ASIGNADOS
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/publicados/:planId', (req, res)=>{
	itemServices.getPublicado(req.session.usuario.user._id, req.params.planId, (err, publicados)=>{
		if(err){
			res.json({err, code:0})
		}else{
			publicados = publicados.map((e)=>{
				return{
					id:e._id,
					titulo:e.titulo,
					valor:e.valor,
					idUsuario:e.userId.userId,
					nombre:e.userId.nombre,
					token:e.userId.tokenPhone,
					imagen:e.imagenResize,
					deuda:Math.ceil((e.valor/(e.asignados.length+2))/100)*100
				}
			})
			res.json({ status: 'SUCCESS', publicados, code:1 });				
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	 GET BY ID ITEM 	///////////////////////////////////////////////
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
/////////////////////////	 GET BY ID ITEM 	///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post('/cerrarItem', (req, res)=>{
	itemServices.closeItem(req.body.id, (err, item)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', item, code:1 });				
		}
	})
})


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE ITEM		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	if (req.session.usuario) {
		itemServices.create(req.body, req.session.usuario.user._id, (err, item)=>{
			if(err){
				res.json({err, status: 'FAIL', code:0})
			}else{
				createPago(req.body, res, req.session.usuario.user._id, item)		
			}
		})
	}else{
		res.json({status: 'FAIL', mensaje:'sin login', code:0})
	}
})




//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE IMAGEN		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/:id', (req,res)=>{	
	let url = `${req.protocol}s://${req.get('Host')}/public/uploads/`
	let rutaImagenOriginal ;
	let rutaImagenResize   ; 
	let rutaImagenMiniatura; 
	let id   = req.session.usuario.user._id
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		extension = extension=='HEIC' ?'jpg' :extension
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = `${ubicacion}Original_${fechab}_${randonNumber}.${extension}`
			
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))

		rutaImagenOriginal = `${url}item/Original_${fechab}_${randonNumber}.${extension}`
		rutaImagenResize = `${url}item/Resize_${fechab}_${randonNumber}.${extension}`
		rutaImagenMiniatura = `${url}item/Miniatura_${fechab}_${randonNumber}.${extension}`

		resizeImagenes(rutaImagenOriginal, randonNumber, extension)

	}else{
 
		rutaImagenOriginal  = req.protocol+'s://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenResize    = req.protocol+'s://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenMiniatura = req.protocol+'s://'+req.get('Host') + '/public/images/plan.jpg'

	}

	itemServices.uploadImage(req.params.id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, item)=>{
		if(err){
			res.json({err, code:0})
		}else{
			creaNotificacionVarios(req, res, item, rutaImagenResize)	
			if (req.body.enviarChat=="true"){
				createChat(req, res, id, item, rutaImagenResize)
			}else{
				res.json({ status: 'SUCCESS', item, code:1, imagen: rutaImagenResize });	
				//creaNotificacion(req, res, item, rutaImagenResize)
			}
		}
	})
})

//////////////////////////////////////////////////////////////////////////////////////////
////////   CREO UN PRIMER PAGO, O DEUDA 
//////////////////////////////////////////////////////////////////////////////////////////
let createPago = function(req, res, id, item){	
	console.log("req.valor") 
	console.log(req.valor) 
	let data = {userId:id, itemId:item._id, monto:req.valor, planId:req.planId, abono:true, metodo:null, descripcion:'pago inicial por inscribirse', activo:false} 
	pagoServices.create(data, null, id, false, (err, pago)=>{
		if(err){
			console.log(err)
		}else{		
			res.json({ status: 'SUCCESS', item, code:1 });				
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 		CREO LA NOTIFICACIÓN AL CREAR EL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacionVarios = (req, res, item, imagen)=>{
	item.espera.map(e=>{
		let mensajeJson={
			userId:e,
			notificacion:true,
		}
		cliente.publish('notificacion', JSON.stringify(mensajeJson))
		notificacionService.create(req.session.usuario.user._id, e, 3, item._id, true, (err, notificacion)=>{
			console.log(notificacion)
		})
	})  
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CAMBIO LOS TAMAÑOS DE LAS IMAGENES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const resizeImagenes = (ruta, randonNumber, extension) =>{
	Jimp.read(ruta, function (err, imagen) {
	    if (err) throw err;
	    imagen.resize(720, Jimp.AUTO)             
		.quality(90)                          
		.write(`${ubicacionJimp}Resize_${fechab}_${randonNumber}.${extension}`);
	});	

	setTimeout(function(){
		sizeOf(`${ubicacionJimp}Resize_${fechab}_${randonNumber}.${extension}`)
	    .then(dimensions => { 
	    	console.log(dimensions)
		  	let width  = dimensions.width
		  	let height = dimensions.height
		  	let x; 
		  	let y; 
		  	let w; 
		  	let h; 

		  	if (width>height) {
		  		console.log(1)
		  		x = (width*10)/100
			  	y = (width*10)/100
			  	w = (((height*100)/100)-y)
			  	h = (((height*100)/100)-y)
		  	}else{
				x = (height*10)/100
			  	y = (height*10)/100
			  	w = (width*90)/100
			  	h = (width*90)/100
		  	}
		  	
			Jimp.read(ruta, function (err, imagen) {
			    if (err) throw err;
			    imagen.resize(800, Jimp.AUTO)             
				.quality(90)                 
				.crop(x,y,w,h)                
				.write(`${ubicacionJimp}Miniatura_${fechab}_${randonNumber}.${extension}`);
			});	
		})
	.catch(err => console.error(err));
	},2000)
}

/////////////////////////////////////////////////////////////////////////////
///////////////////////		FUNCTION TO CREATE CHAT 	/////////////////////
/////////////////////////////////////////////////////////////////////////////
let createChat = function(req, res, userId, item, imagen){
	let mensajeJson={
		userId,
		nombre:req.session.usuario.user.nombre,
		photo:req.session.usuario.user.photo,
		itemId:req.params.id, 
		titulo:req.body.titulo, 
		descripcion:req.body.descripcion, 
		planId:req.body.planId, 
		rutaImagen:imagen,
		fecha:req.body.fecha, 
		valor:req.body.valor/2, 
		tipoChat:2,
		esperaItem: item.espera,
		asignadoItem: [],
		abierto:true
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))

	chatServices.create(req.body, userId, 2, null, (err,chat)=>{
		if(err){
			res.json({err, code:0})
		}else{
			res.json({ status: 'SUCCESS', item, chat, code:1, imagen,  other:'save chat' });
		}
	})
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 			agrego al usuario al item cuando acepta ser parte del item
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/activar/:idTipo', (req, res)=>{
	itemServices.getById(req.params.idTipo, (err, item)=>{
		let espera = item[0].espera.filter(e=>{
			return e!=req.session.usuario.user._id
		})
 
		let asignados = item[0].asignados.concat(req.session.usuario.user._id)
		itemServices.activaUsuario(req.params.idTipo, espera, asignados, (err, item2)=>{
			if (err) {
				res.json({status: 'FAIL', err, code:0})
			}else{

				//////////////////////////////////////////////////////////////////////////////////////////////////////////////
				////////////////////////////// 		edito el chat, el item y la notificacion con el nuevo valor 
				let mensajeJson1={
					id:item[0]._id ?item[0]._id :null, 
					planId:item[0].planId,
					valor:Math.ceil((item[0].valor/(item[0].asignados.length+3))/100)*100,
				}
				cliente.publish('itemCosto', JSON.stringify(mensajeJson1))
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
				/////////////////////////////////////////////////////////////////////////////////////////////////////////

				nuevoPago(req, res, req.params.idTipo, req.body.monto)    	
			}
		})
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	CREO UN NUEVO PAGO CUANDO EL USUARIO ACEPTA SER PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nuevoPago = (req, res, itemId, montoCreador) =>{
	
	req.body['abono']=false
	req.body['activo']=true
	req.body['metodo']=null
	req.body['itemId']=itemId
	req.body['monto']=-(req.body.monto)
	req.body['descripcion']='pago inicial por inscribirse'
	pagoServices.create(req.body, req.session.usuario.user._id, req.session.usuario.user._id, true, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
 
			editaPagoCreador(itemId, req.session.usuario.user._id, montoCreador, req.body.monto, req.session.usuario.user._id, res)					
		}
	})
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	EDITO AL DUEÑO DEL ITEM, CUANDO EL USUARIO ACEPTA SER PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editaPagoCreador = (itemId, userId, montoCreador, montoAsignado, id, res)=>{
	itemServices.getById(itemId, (err, item)=>{
		if (err) {
			console.log(err)
		}else{
			pagoServices.betyByItemAndUser(itemId, item[0].userId._id, (err, pago)=>{
				let mensajeJson={
					userId:item[0].userId._id,
					notificacion:true,
				}
				cliente.publish('notificacion', JSON.stringify(mensajeJson))
				if(err){
					res.json({err})
				}else{
					pagoServices.edit(pago._id, montoCreador, (err, pago2)=>{
						if (err) {
							console.log(err)
						}else{
							editaPagoAsignados(itemId, item[0], montoAsignado, id, userId, res )
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
const editaPagoAsignados = (itemId, item, monto, id, userId, res)=>{
	pagoServices.betyByItemAndUserNotEqual(itemId, item.userId, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			pago.map(e=>{
				pagoServices.edit(e._id, monto, (err, pago2)=>{
					//console.log(pago2)
				})
			})
			creaNotificacion(id, res, item, 6, false, userId)
			// res.json({ status: 'SUCCESS', pago, code:1 });				
		}
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
////////   SI UN USUARIO QUIERE INGRESAR AL ITEM, LO REGISTRO Y LO DEJO EN ESPERA 
//////////////////////////////////////////////////////////////////////////////////////////
router.put('/', (req, res)=>{	
	itemServices.getById(req.body.idItem, (err, item)=>{
		if (!item[0].abierto) {
			res.json({status: 'FAIL', mensaje:'ya se cerro el item', code:3})
		}else{
			if(isInArray(req.session.usuario.user._id, item[0].espera)){
				res.json({status: 'FAIL', mensaje:'ya esta en lista de espera', code:2})
			}else{
				let mensajeJson={
					userId:item[0].userId._id,
					notificacion:true,
				}
				cliente.publish('notificacion', JSON.stringify(mensajeJson))
				let nuevoArray = item[0].espera.concat(req.session.usuario.user._id)
				itemServices.ingresarItem(req.body.idItem, nuevoArray, (err, item)=>{
					if (err) {
						res.json({status: 'FAIL', err, code:0})
					}else{
						creaNotificacion(req.session.usuario.user._id, res, item, 4, true)	
					}
				})
			}
		}
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea la peticion de ingresar tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacion = (id, res, item, tipo, activo, userId)=>{ 	 
	notificacionService.create(id, item.userId, tipo, item._id, activo, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			if (userId) {
				desactivaNotificacion(item._id, userId, res)    
			}else{
				res.json({status:'SUCCESS', item, notificacion, code:1})
			}
			
			
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			desactivo la notificacion que se le envio al usuario invitandolo al item 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const desactivaNotificacion =(id, userId, res)=>{
	console.log('--------------')
	console.log(id)
	console.log(userId)
	notificacionService.getByItemUser(id, userId, (err, notificacion)=>{
		if (!err && notificacion[0]) {
			console.log(notificacion)
			notificacionService.desactiva(notificacion[0]._id,  (err2, notifica)=>{
				console.log(notificacion[0]._id)
				if (!err2) {
					res.json({status:'SUCCESS', notifica, code:1})
				}
			})
		}
	})
}



//////////////////////////////////////////////////////////////////////////////////////////
////////   VERIFICO QUE EL USUARIO YA ALLA MANDADO LA SOLICITUD DE INGRESAR 
//////////////////////////////////////////////////////////////////////////////////////////
function isInArray(value, array) {
	return array.indexOf(value) > -1;
}



 


module.exports = router


