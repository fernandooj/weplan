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
let amigoUserService = require('../services/amigoUserServices.js');

router.get('/chatPlan/:id/:limit', (req, res)=>{
	planServices.getByIdPlanPopulate(req.params.id, (err, plan)=>{
		if (err) {
			console.log(err)
		}else{
			 
			chatServices.getByPlan(req.params.id, req.session.usuario.user._id, parseInt(req.params.limit), (err2, chatInfo)=>{
				if (err2) {
					res.json({status:'FAIL', err, code:0})   
				}else{
					console.log(plan[0])
					let planAsignados = []
					let chat = []
					if (plan[0]) {
						if (plan[0].asignados.length>0) {
							plan[0].asignados.filter(e=>{
								planAsignados.push(e._id)
							}) 
						}
						
					}
					chatInfo.map(e=>{	 

						let porcentaje1 = (e.totalUno*100)/e.totalRepuestas
						let porcentaje2 = 100-porcentaje1
						 
						porcentaje1 = Math.round(porcentaje1 * 100) / 100
						porcentaje2 = Math.round(porcentaje2 * 100) / 100

						let asignados = e.data.map(e=>{
							// arrayIdPreguntas.push(e.info[0].userIdRespuesta)
							return e.info[0].userIdRespuesta
						})
						asignados.push(e.data[0].info[0].encuestaUserId)
						let data = e.data[0].info[0]
						 

						chat.push({
							id           : e._id.id,
							userId       : data.userId,
							nombre 		 : data.nombre,
							photo 		 : data.photo,
							token 		 : data.token,
							mensaje 	 : data.mensaje,
							fecha 	     : data.fecha.slice(5, -3),
							documento 	 : data.documento,
							lat 	 	 : data.lat,
							lng 	 	 : data.lng,
							tipoChat	 : data.tipo,

							///////////////////////////////////////////////////////////////////////////////
							//////////////////////////////// ARTICULOS   //////////////////////////////////
							esperaItem	 : data.espera,
							asignadoItem : data.asignados,
							abierto      : data.abierto,
							itemId	 	 : data.itemId,
							titulo	 	 : data.itemTitulo,
							descripcion	 : data.itemDescripcion,
							rutaImagen	 : data.imagenMiniatura,
							valor	 	 : data.asignados ?Math.ceil((data.itemValor/(data.asignados.length +2))/100)*100 :0,
							//////////////////////////////////////////////////////////////////////////////
							////////////////////////////// ENCUESTAS /////////////////////////////////////
							encuestaId	 : data.encuestaId,
							tipoEncuesta : data.tipoEncuesta,
							eTitulo		 : data.encuestaTitulo,
							pregunta1	 : data.pregunta1,
							pregunta2	 : data.pregunta2,
							respuesta1   : porcentaje1,
							respuesta2   : porcentaje2,
							porcentaje1,
							porcentaje2,
							asignados,
							encuestaUserId : data.encuestaUserId,

							//////////////////////////////////////////////////////////////////////////////
							//////////////////////////////// contacto   //////////////////////////////////
							contactoId  : data.contactoId,
							cNombre	    : data.cNombre,
							cPhoto 	    : data.cPhoto,	
							cToken 	    : data.cToken,	
						})
					})
					// if (chat.length>=10) {
					// 	chat = chat.slice(req.params.limit-10, req.params.limit);
					// }
					chat = chat.reverse()
					
					 
					res.json({status:'SUCCESS', chat,  plan:plan[0], total:chat.length, planAsignados, code:1}) 
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
	console.log('-------')
	console.log(req.body)
	console.log('-------')
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