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
	console.log(req.session.usuario.user._id)
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
						pago = pago.map(e=>{
							return{
								id:e._id,
								titulo:e.data[0].info[0].titulo,
								idUsuario:e.data[0].info[0].userId,
								valor:e.data[0].info[0].valor,
		 						deuda:e.deuda
							}
						})
						deuda = deuda.map(e=>{
							return{
								id:e._id,
								titulo:e.data[0].info[0].titulo,
								idUsuario:e.data[0].info[0].userId,
								valor:e.data[0].info[0].valor,
		 						deuda:e.deuda
							}
						})
						const add = (a, b)=>{
				 			return a + b;
						}
						let sumaPago  =[];
						let sumaDeuda =[];
						pago.filter(e=>{
							sumaPago.push(e.deuda)
						})
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
				res.json({ status: 'SUCCESS', item, code:1 });			
			}
		})
	}else{
		res.json({status: 'FAIL', mensaje:'sin login', code:0})
	}
	 
	
})


//////////////////////////////////////////////////////////////////////////////////////////
////////   CREO UN PRIMER PAGO, O DEUDA 
//////////////////////////////////////////////////////////////////////////////////////////
let createPago = function(req, res, id, item){
	let deudaAsignados = Math.ceil((item.valor/(item.asignados.length+1))/100)*100
	let deudaCreador = req.valor - (deudaAsignados * item.asignados.length)
	let data = req.asignados.map(e=>{
		return {
			userId:e,
			itemId:item._id,
			monto:-deudaAsignados,
			metodo:null,
			descripcion:null,
			estado:1,
			abono:false
		}
	})
	data.push({userId:id, itemId:item._id, monto:deudaCreador, abono:true, metodo:null, descripcion:null, estado:1})

	data.map(e=>{
		pagoServices.create(e, null, id, (err, pago)=>{
			if(err){
				console.log(err)
			}else{					
			}
		})
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////	 		SAVE IMAGEN		//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/:id', (req,res)=>{	
	console.log('tomatela te digo')
	let url = `${req.protocol}s://${req.get('Host')}/public/uploads/`
	let rutaImagenOriginal ;
	let rutaImagenResize   ; 
	let rutaImagenMiniatura; 
	let id   = req.session.usuario.user._id
	let ruta =null
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = `${ubicacion}Original_${fechab}_${randonNumber}.${extension}`
			
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))

		rutaImagenOriginal = `${url}item/Original_${fechab}_${randonNumber}.${extension}`
		rutaImagenResize = `${url}item/Resize_${fechab}_${randonNumber}.${extension}`
		rutaImagenMiniatura = `${url}item/Miniatura_${fechab}_${randonNumber}.${extension}`

		resizeImagenes(rutaImagenOriginal, randonNumber, extension)

	}else{
		rutaImagenOriginal = req.protocol+'s://'+req.get('Host') + '/plan.png'
		rutaImagenResize = req.protocol+'s://'+req.get('Host') + '/plan.png'
		rutaImagenMiniatura = req.protocol+'s://'+req.get('Host') + '/plan.png'
	}

	itemServices.uploadImage(req.params.id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, item)=>{
		if(err){
			res.json({err, code:0})
		}else{
			if (req.body.enviarChat=="true"){
				createChat(req, res, id, item, rutaImagenResize)
			}else{
				//res.json({ status: 'SUCCESS', item, code:1, imagen: rutaImagenResize });	
				creaNotificacion(req, res, item, rutaImagenResize)
			}
		}
	})
})


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
		valor:req.body.valor, 
		tipoChat:2
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))

	chatServices.create(req.body, userId, 2, null, (err,chat)=>{
		if(err){
			res.json({err, code:0})
		}else{
			//res.json({ status: 'SUCCESS', item, chat, code:1, imagen,  other:'save chat' });
			creaNotificacionVarios(req, res, item, imagen)	
		}
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
////////   SI UN USUARIO QUIERE INGRESAR AL ITEM, LO REGISTRO Y LO DEJO EN ESPERA 
//////////////////////////////////////////////////////////////////////////////////////////
router.put('/', (req, res)=>{
	itemServices.getById(req.body.itemId, (err, item)=>{
		if(isInArray(req.session.usuario.user._id, item[0].espera)){
			res.json({status: 'FAIL', mensaje:'ya esta en lista de espera', code:2})
		}else{
			let nuevoArray = item[0].espera.concat(req.session.usuario.user._id)
			itemServices.ingresarItem(req.body.itemId, nuevoArray, (err, item)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					creaNotificacion(req, res, item)	
				}
			})
		}
		
	})
})

//////////////////////////////////////////////////////////////////////////////////////////
////////   VERIFICO QUE EL USUARIO YA ALLA MANDADO LA SOLICITUD DE INGRESAR 
//////////////////////////////////////////////////////////////////////////////////////////
function isInArray(value, array) {
	return array.indexOf(value) > -1;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea el item tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacionVarios = (req, res, item, imagen)=>{
	console.log(item.asignados)
	item.asignados.map(e=>{
		notificacionService.create(req.session.usuario.user._id, e, 3, item._id, (err, notificacion)=>{
			console.log(notificacion)
		})
	})
	res.json({status:'SUCCESS', item, imagen, code:1})    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea la peticion de ingresar tambien se crea la notificacion 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacion = (req, res, item, imagen)=>{
	notificacionService.create(req.session.usuario.user._id, item.userId, 3, item._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', item, notificacion, imagen, code:1})    
		}
	})
}

 


module.exports = router


