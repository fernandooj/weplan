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

router.get('/:id', (req, res)=>{
	chatServices.getByPlan(req.params.id, (err, chat)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			chat = chat.map(e=>{
				return{
					id           : e._id,
					userId       : e.userId._id,
					nombre 		 : e.userId.nombre,
					photo 		 : e.userId.photo,
					token 		 : e.userId.tokenPhone,
					mensaje 	 : e.mensaje,
					asignadoItem : e.itemId ?e.itemId.asignados.includes(this.state.id) :null,
					esperaItem   : e.itemId ?e.itemId.espera.includes(this.state.id) :null,
					itemId 		 : e.itemId ?e.itemId._id :null ,
					titulo 		 : e.itemId ?e.itemId.titulo :null,
					descripcion  : e.itemId ?e.itemId.descripcion :null,
					rutaImagen	 : e.itemId ?e.itemId.rutaImagen :null,
					valor 		 : e.itemId ?e.itemId.valor :null,
					encuestaId	 : e.encuestaId ?e.encuestaId._id :null,
					pTitulo		 : e.encuestaId ?e.encuestaId.titulo :null,
					pDescripcion : e.encuestaId ?e.encuestaId.descripcion :null,
					pregunta1	 : e.encuestaId ?e.encuestaId.pregunta1 :null,
					pregunta2	 : e.encuestaId ?e.encuestaId.pregunta2 :null,
					//respuesta1   : res.data.porcentaje1,
					//respuesta2   : res.data.porcentaje2,
					tipoEncuesta : e.encuestaId ?e.encuestaId.tipo :null,
					tipoChat	 : e.tipo,
					estado       : e.estado,
					//porcentaje1  : res.data.porcentaje1,
					//porcentaje2  : res.data.porcentaje2,
					//asignado     : res.data.asignado
				}
			})

			res.json({status:'SUCCESS', chat, total:chat.length, code:1}) 
		}
	})
}) 

router.post('/', (req, res)=>{
 	let photo = req.session.usuario.user.photo 
	if (!photo) {
		photo = req.protocol+'://'+req.get('Host') + '/avatar.png'
	}

	////////////////  esta informacion se envia al chat	
	let mensajeJson={
		userId:req.session.usuario.user._id, 
		photo, 
		planId:req.body.planId, 
		mensaje:req.body.mensaje, 
		fecha:req.body.fecha, 
		nombre:req.session.usuario.user.nombre,
		tipoChat:1
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
	let url  =  `${req.protocol}://${req.get('Host')}/public/uploads/`
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (req.files.imagen) {																								////
		extension    = req.files.imagen.name.split('.').pop()															////
		randonNumber = Math.floor(90000000 + Math.random() * 1000000)													////
		fullUrl      = `../../front/docs/public/uploads/chat/Original_${fecha}_${randonNumber}.${extension}`			////
		ruta 		 = `${url}chat/Original_${fecha}_${randonNumber}.${extension}`										////
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))													////
	}else{																												////
		ruta = req.protocol+'://'+req.get('Host') + '/chat.png'															////
	}																													////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(req.session.usuario===undefined || req.session.usuario.user==null){
        res.json({status:'FAIL', user: 'SIN SESION', code:0 })
    }else{
    	chatServices.create(req.body, req.session.usuario.user._id, req.body.tipo, ruta, (err, chat)=>{
			if (err) {
				res.json({status:'FAIL', err, code:0})   
			}else{
				res.json({status:'SUCCESS', chat, code:1}) 
				extension!=='pdf' ?resizeImagenes(ruta, randonNumber, extension) :null
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