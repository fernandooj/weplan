'use strict'
let express = require('express');
let router = express.Router();
let redis        = require('redis')
let cliente      = redis.createClient()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')
let Jimp = require("jimp");
var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));

let chatServices = require('../services/chatServices.js')
let planServices = require('../services/planServices.js')
let respuestaServices = require('../services/respuestaServices.js');

router.get('/chatPlan/:id', (req, res)=>{

	planServices.getByIdPlanPopulate(req.params.id, (err, plan)=>{
		if (err) {
			console.log(err)
		}else{
			chatServices.getByPlan(req.params.id, req.session.usuario.user._id, (err2, chat)=>{
				if (err2) {
					res.json({status:'FAIL', err, code:0})   
				}else{
					 
					chat = chat.map(e=>{
						// return{
						// 	id           : e._id,
						// 	userId       : e.userId._id,
						// 	nombre 		 : e.userId.nombre,
						// 	photo 		 : e.userId.photo,
						// 	token 		 : e.userId.tokenPhone,
						// 	mensaje 	 : e.mensaje,
						// 	fecha 	     : e.createdAt,
						// 	documento 	 : e.documento,
						// 	lat 	 	 : e.lat,
						// 	lng 	 	 : e.lng,
						// 	//////////////////////////// ITEM //////////////////////////////////////////
						// 	asignadoItem : e.itemId &&isInArray(req.session.usuario.user._id, e.itemId.asignados),
						// 	esperaItem   : e.itemId &&isInArray(req.session.usuario.user._id, e.itemId.espera),
						// 	itemId 		 : e.itemId &&e.itemId._id  ,
						// 	titulo 		 : e.itemId &&e.itemId.titulo ,
						// 	descripcion  : e.itemId &&e.itemId.descripcion ,
						// 	rutaImagen	 : e.itemId &&e.itemId.imagenResize ,
						// 	valor 		 : e.itemId &&Math.ceil((e.itemId.valor/(e.itemId.asignados.length+2))/100)*100 ,
						// 	////////////////////////////////////////////////////////////////////////////
						// 	////////////////////////////// ENCUESTAS ///////////////////////////////////
						// 	encuestaId	 :e.tipo==3 &&e.encuestaId._id ,
						// 	eTitulo		 :e.tipo==3 &&e.encuestaId.titulo ,
						// 	eDescripcion :e.tipo==3 &&e.encuestaId.descripcion ,
						// 	pregunta1	 :e.tipo==3 &&e.encuestaId.pregunta1 ,
						// 	pregunta2	 :e.tipo==3 &&e.encuestaId.pregunta2 ,
						// 	////////////////////////////////////////////////////////////////////////////
						// 	//respuesta1   : res.data.porcentaje1,
						// 	//respuesta2   : res.data.porcentaje2,
						// 	tipoEncuesta : e.encuestaId ?e.encuestaId.tipo :null, 
						// 	tipoChat	 : e.tipo,
						// 	estado       : e.estado,
						// 	//porcentaje1  : res.data.porcentaje1,
						// 	//porcentaje2  : res.data.porcentaje2,
						// 	//asignado     : res.data.asignado
						// 	////////////////////////////////////////////////////////////////////////////
						// 	////////////////////////////// contacto   //////////////////////////////////
						// 	contactoId : e.tipo==4 &&e.contactoId._id   ,
						// 	cNombre	   : e.tipo==4 &&e.contactoId.nombre,
						// 	cPhoto 	   : e.tipo==4 &&e.contactoId.photo ,	
						// 	cToken 	   : e.tipo==4 &&e.contactoId.tokenPhone ,	
						// 	////////////////////////////////////////////////////////////////////////////////////
						// 	////////////////////////////// esta en el plan   //////////////////////////////////	
						// 	estaPlan: isInArray(e.tipo==4 &&e.contactoId._id, plan[0].asignados)
						// 	//estaPlan: plan[0].asignados.includes(e.contactoId &&e.contactoId._id)
						// }
						 

						 

						let porcentaje1 = (e.totalUno*100)/e.totalRepuestas
						let porcentaje2 = 100-porcentaje1
						 
						porcentaje1 = Math.round(porcentaje1 * 100) / 100
						porcentaje2 = Math.round(porcentaje2 * 100) / 100

						let asignados = e.data.map(e=>{
							// arrayIdPreguntas.push(e.info[0].userIdRespuesta)
							return e.info[0].userIdRespuesta
						})
						asignados.push(e.data[0].info[0].encuestaUserId)
						let asignadoItems = e.data[0].info[0].asignados
						return{
							id           : e._id.id,
							userId       : e.data[0].info[0].userId,
							nombre 		 : e.data[0].info[0].nombre,
							photo 		 : e.data[0].info[0].photo,
							token 		 : e.data[0].info[0].token,
							mensaje 	 : e.data[0].info[0].mensaje,
							fecha 	     : e.data[0].info[0].fecha,
							documento 	 : e.data[0].info[0].documento,
							lat 	 	 : e.data[0].info[0].lat,
							lng 	 	 : e.data[0].info[0].lng,
							tipoChat	 : e.data[0].info[0].tipo,

							///////////////////////////////////////////////////////////////////////////////
							//////////////////////////////// ARTICULOS   //////////////////////////////////
 

							esperaItem	 : e.data[0].info[0].espera,
							asignadoItem : e.data[0].info[0].asignados,
							 
							itemId	 	 : e.data[0].info[0].itemId,
							titulo	 	 : e.data[0].info[0].itemTitulo,
							descripcion	 : e.data[0].info[0].itemDescripcion,
							rutaImagen	 : e.data[0].info[0].imagenMiniatura,
							valor	 	 : e.data[0].info[0].itemValor,
							//////////////////////////////////////////////////////////////////////////////
							////////////////////////////// ENCUESTAS /////////////////////////////////////
							encuestaId	 : e.data[0].info[0].encuestaId,
							tipoEncuesta : e.data[0].info[0].tipoEncuesta,
							eTitulo		 : e.data[0].info[0].encuestaTitulo,
							pregunta1	 : e.data[0].info[0].pregunta1,
							pregunta2	 : e.data[0].info[0].pregunta2,
							respuesta1   : porcentaje1,
							respuesta2   : porcentaje2,
							porcentaje1,
							porcentaje2,
							asignados,
							encuestaUserId : e.data[0].info[0].encuestaUserId,

							//////////////////////////////////////////////////////////////////////////////
							//////////////////////////////// contacto   //////////////////////////////////
							contactoId  : e.data[0].info[0].contactoId,
							cNombre	    : e.data[0].info[0].cNombre,
							cPhoto 	    : e.data[0].info[0].cPhoto,	
							cToken 	    : e.data[0].info[0].cToken,	
							    
						}
					})

					 	
			 		 
			 		 
					
					res.json({status:'SUCCESS', chat,  plan:plan[0], total:chat.length, code:1}) 


				}
			})
		}
	})
}) 

function isInArray(value, array) {
	console.log({value,array})
  	return array.indexOf(value) > -1;
}

router.post('/', (req, res)=>{
 	let photo = req.session.usuario.user.photo 
	if (!photo) {
		photo = req.protocol+'s://'+req.get('Host') + '/avatar.png'
	}

	////////////////  esta informacion se envia al chat	
	let mensajeJson={
		userId:req.session.usuario.user._id, 
		photo, 
		planId:req.body.planId, 
		mensaje:req.body.mensaje, 
		fecha:req.body.fecha, 
		nombre:req.session.usuario.user.nombre,
		tipoChat:req.body.tipo,
		lat:req.body.lat,
		lng:req.body.lng,
		contactoId:req.body.contactoId,
		cNombre:req.body.cNombre,
		cPhoto:req.body.cPhoto,
		
	}
	cliente.publish('chat', JSON.stringify(mensajeJson))
	chatServices.create(req.body, req.session.usuario.user._id, req.body.tipo, null, (err, chat)=>{
		console.log('chat')
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', chat, code:1}) 
		}
	})	
})
	

////////////////////////////////////////////////////////////////////////////////
//////////////////// 		INSERTO SI ES IMAGEN O SI ES DOCUMENTO
////////////////////////////////////////////////////////////////////////////////

router.post('/documento', (req, res)=>{
	let ruta;			//// url donde va a quedar guardada la imagen ej localhost/imagenes/imagen1
	let extension;		//// guardo la extension de la imagen
	let randonNumber;	//// genero un numero aleatorio
	let fullUrl;        //// es la ruta donde va a quedar guardada la imagen
	let url  =  `${req.protocol}s://${req.get('Host')}/public/uploads/`
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (req.files.imagen) {																								////
		extension    = req.files.imagen.name.split('.').pop()															////
		randonNumber = Math.floor(90000000 + Math.random() * 1000000)													////
		fullUrl      = `../../front/docs/public/uploads/chat/Original_${fecha}_${randonNumber}.${req.files.imagen.name}`			////
		ruta 		 = `${url}chat/Original_${fecha}_${randonNumber}.${req.files.imagen.name}`										////
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))													////
	}else{																												////
		ruta = req.protocol+'s://'+req.get('Host') + '/chat.png'															////
	}																													////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(req.session.usuario===undefined || req.session.usuario.user==null){
        res.json({status:'FAIL', user: 'SIN SESION', code:0 })
    }else{
    	////////////////  esta informacion se envia al chat	
		let mensajeJson={
			userId:req.session.usuario.user._id, 
			photo:req.session.usuario.user.photo, 
			planId:req.body.planId, 
			fecha:req.body.fecha, 
			nombre:req.session.usuario.user.nombre,
			tipoChat:parseInt(req.body.tipo),
			documento:ruta,
		}
		cliente.publish('chat', JSON.stringify(mensajeJson))
		console.log(extension)
    	chatServices.create(req.body, req.session.usuario.user._id, req.body.tipo, ruta, (err, chat)=>{
			if (err) {
				res.json({status:'FAIL', err, code:0})   
			}else{
				res.json({status:'SUCCESS', chat, code:1}) 
				
				extension==='pdf' ?null :resizeImagenes(ruta, randonNumber, extension)
			}
		})	
    }
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})
const ubicacionJimp =  '../front/docs/public/uploads/chat/'
const resizeImagenes = (ruta, randonNumber, extension) =>{
	Jimp.read(ruta, function (err, imagen) {
	    if (err) throw err;
	    imagen.resize(500, Jimp.AUTO)             
		.quality(90)                          
		.write(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`);
	});	

	setTimeout(function(){
		sizeOf(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`)
	    .then(dimensions => { 
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
				.write(`${ubicacionJimp}Miniatura_${fecha}_${randonNumber}.${extension}`);
			});	
		})
	.catch(err => console.error(err));
	},2000)
}

module.exports = router