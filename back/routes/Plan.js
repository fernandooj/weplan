'use strict'

let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')
let Jimp = require("jimp");
let redis        = require('redis')
let cliente      = redis.createClient()
let { promisify } = require('util');
let sizeOf = promisify(require('image-size'));
let mongoose = require('mongoose')
let ip = require("ip");
let ipLocator = require('ip-locator')

let planServices = require('../services/planServices.js')
const ubicacion     =  '../../front/docs/public/uploads/plan/'
const ubicacionJimp =  '../front/docs/public/uploads/plan/'
let notificacionService = require('../services/notificacionServices.js');

 
 
 
router.get('/', (req, res)=>{
	planServices.get((err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS',  planes, code:1 });	
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES PUBLICOS DEL USUARIO LOGUEADO, ESTO PARA EL ADMINISTRADOR
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/planesPublicos/', (req, res)=>{
	planServices.getPublicos(req.session.usuario.user._id, req.session.usuario.user.acceso, (err, plan)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CUENTA CUANTOS PLANES PRIVADOS SE HAN ABIERTO Y CERRADO POR ACA PLA PUBLICO
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/cuentaPlanesPublicos/:id', (req, res)=>{
	planServices.getCuentaPublicos(req.params.id, (err, plan)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
		}
	})
})


router.get('/:pago', (req, res)=>{
	if (req.params.pago==='pago') {
		planServices.getByPago((err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', planes, code:1 });	
			}
		})	
	}else{
		planServices.getByIdPlanPopulate(req.params.pago, (err, plan)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', plan, code:1 });	
			}
		})
	}
})
 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES DEL HOME, LOS QUE ESTAN MAS CERCA DEL USUARIO, DEPENDIENDO DE LA UBICACION Y DEL AREA DE INFLUENCIA
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get(`/pago/:lat/:lon`, (req,res)=>{
	ipLocator.getDomainOrIPDetails(ip.address(),'json', function (err, data) {
	  let lat = req.params.lat ?req.params.lat :data.lat
	  let lon = req.params.lon ?req.params.lon :data.lon
 
	  planServices.getByPagoLatLng(lat, lon, (err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				planes = planes.filter(e=>{
					return (e.dist<e.area)	
				})
				res.json({ status: 'SUCCESS', planes, code:1 });	
			}
		})
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES DE UN USUARIO ESPECIFICO
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getbyid/:userId', (req, res)=>{
	planServices.getByUserId(req.params.userId, (err, plan)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
		}
	})
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO MIS PLANES 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getbyUserId/misPlanes', (req, res)=>{
	planServices.getByUserId(req.session.usuario.user._id, (err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', planes, code:1 });	
		}
	})
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO MIS PLANES CON POPULATE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getbyUserId/misPlanes/populate', (req, res)=>{
	planServices.getByIdPlanPopulate(req.session.usuario.user._id, (err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', planes, code:1 });	
		}
	})
})

 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// INSERTO UN PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', function(req, res){
	if(req.session.usuario===undefined || req.session.usuario.user==null){
        res.json({status:'FAIL', user: 'SIN SESION', code:0 })
    }else{
    	ipLocator.getDomainOrIPDetails(ip.address(),'json', function (err, data) {
			let lat = req.body.lat ?req.body.lat :data.lat
			let lon = req.body.lng ?req.body.lng :data.lon

	    	planServices.create(req.body, req.session.usuario.user._id, lat, lon, (err, plan)=>{
	    		console.log(err)
				if(err){
					res.json({err})
				}else{
					if (req.body.planPadre) {
							req.body.asignados.map(e=>{
								let mensajeJson={
									userId:e,
									notificacion:true,
								}
								cliente.publish('notificacion', JSON.stringify(mensajeJson))
								notificacionService.create(req.session.usuario.user._id, e, 2, plan._id, true, (err, notificacion)=>{
									console.log(notificacion)
								})
							})
						res.json({status:'SUCCESS', message: plan, code:1})  
					}else{

						res.json({ status: 'SUCCESS', message: plan, code:1 });	
					}
				}
			})
		})
    }
})

router.put('/salir', (req, res)=>{
	planServices.getByIdPlan(req.body.id, (err, plan)=>{
		if (err) {
			res.json({status: 'FAIL', err, code:0})
		}else{
			
			let asignados = plan[0].asignados.filter(e=>{
				if(e._id != req.session.usuario.user._id) return e 
			})
			planServices.salir(req.body.id, asignados, (err, plan2)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					res.json({status: 'SUCCESS', plan2, code:1})
				}
			})
		}
	})
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// MODIFICO LAS IMAGENES SI SE ENVIAN DESDE LA WEB / ACEPTAN VARIAS IMAGENES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/web', (req, res)=>{
	let url = `${req.protocol}://${req.get('Host')}/public/uploads/`
	let id = req.body.id[0].length > 2 ?req.body.id[0] :req.body.id 
	let rutaImagenOriginal  = [] 
	let rutaImagenResize    = [] 
	let rutaImagenMiniatura = []  
	if (req.files.imagen) {
		req.files.imagen.forEach(e=>{
			let extension = e.name.split('.').pop()
			let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
			let fullUrl = `${ubicacion}Original_${fecha}_${randonNumber}.${extension}`
			
			fs.rename(e.path, path.join(__dirname, fullUrl))

			let rutasImagenOriginal = `${url}plan/Original_${fecha}_${randonNumber}.${extension}`
			let rutasImagenResize = `${url}plan/Resize_${fecha}_${randonNumber}.${extension}`
			let rutasImagenMiniatura = `${url}plan/Miniatura_${fecha}_${randonNumber}.${extension}`

			rutaImagenOriginal.push(rutasImagenOriginal)
			rutaImagenResize.push(rutasImagenResize)
			rutaImagenMiniatura.push(rutasImagenMiniatura)
			resizeImagenes(rutasImagenOriginal, randonNumber, extension)
		})	
	}else{
		rutaImagenOriginal = req.protocol+'://'+req.get('Host') + '/plan.png'
		rutaImagenResize = req.protocol+'://'+req.get('Host') + '/plan.png'
		rutaImagenMiniatura = req.protocol+'://'+req.get('Host') + '/plan.png'
	}
	planServices.uploadImage(id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1, imagen: rutaImagenOriginal });		
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// MODIFICO LAS IMAGENES SI SE ENVIAN DESDE LA APP / SOLO ACEPTA UNA IMAGEN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/', (req, res)=>{
	let url = `${req.protocol}s://${req.get('Host')}/public/uploads/`
	let rutaImagenOriginal  = [] 
	let rutaImagenResize    = [] 
	let rutaImagenMiniatura = [] 
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = `${ubicacion}Original_${fecha}_${randonNumber}.${extension}`
			
		fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))

		let rutasImagenOriginal = `${url}plan/Original_${fecha}_${randonNumber}.${extension}`
		let rutasImagenResize = `${url}plan/Resize_${fecha}_${randonNumber}.${extension}`
		let rutasImagenMiniatura = `${url}plan/Miniatura_${fecha}_${randonNumber}.${extension}`


		rutaImagenOriginal.push(rutasImagenOriginal)
		rutaImagenResize.push(rutasImagenResize)
		rutaImagenMiniatura.push(rutasImagenMiniatura)
		resizeImagenes(rutasImagenOriginal, randonNumber, extension)
	
	}else{
		rutaImagenOriginal = req.protocol+'s://'+req.get('Host') + '/plan.png'
		rutaImagenResize = req.protocol+'s://'+req.get('Host') + '/plan.png'
		rutaImagenMiniatura = req.protocol+'s://'+req.get('Host') + '/plan.png'
	}
	planServices.uploadImage(req.body.id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			//res.json({ status: 'SUCCESS', message: plan, code:1 });	
			creaNotificacion(req, res, plan, rutaImagenResize )
		}
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			cuando se crea el plan tambien se crea la notificacion  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacion = (req, res, plan, rutaImagenResize)=>{
	plan.asignados.map(e=>{
	let mensajeJson={
		userId:e,
		notificacion:true,
	}
	cliente.publish('notificacion', JSON.stringify(mensajeJson))

		notificacionService.create(req.session.usuario.user._id, e, 2, plan._id, true, (err, notificacion)=>{
			console.log(notificacion)
		})
	})
	res.json({status:'SUCCESS', message: plan, rutaImagenResize, code:1})    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// INSERTO UN USUARIO AL PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/insertar/:planId', (req,res)=>{
	planServices.getByIdPlan(req.params.planId, (err, plan)=>{
		if(err) {
			console.log(err)
		}else{
			agregarUsuarioPlan(req, res, plan[0].asignados)
		}
	})
})
const agregarUsuarioPlan =(req, res, planes)=>{
	planes = [req.body.id, ...planes]
	planServices.insertaUsuarioPlan(req.params.planId, planes, (err, plan)=>{
		if (err) {
			console.log(err)
		}else{
			console.log(plan)
			//res.json({ status: 'SUCCESS', plan, code:1 });	
			creaNotificacionUsuarioChat(req, res, plan )
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			funcion cuando inserto un usuario a un plan desde el chat
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const creaNotificacionUsuarioChat = (req, res, plan)=>{
	notificacionService.create(req.session.usuario.user._id, req.body.id, 2, plan._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})   
		}
	}) 
}


router.put('/finalizar', (req, res)=>
	planServices.finalizar(req.body.id, (err, plan)=>{
		if (err) {
			res.json({status: 'FAIL', err, code:0})
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
		}
	})
)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS TOTALES DE CADA PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/suma/totales/plan', (req, res)=>{
	planServices.sumaPlan(req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			
	 
			let abonoTrue = pago.filter(e=>{
				if (e._id.abono!==false && e.data[0].info[9]==true) return e
			})

			let data1 = abonoTrue.filter(e=>{
				if(e.data[0].info[5]!=req.session.usuario.user._id) {e.total=e.total-e.data[0].info[7]}
				return e
			})
	 		let data = data1.map(e=>{
				return{
					id:e._id.id,
					nombrePlan:e.data[0].info[4],
					nombreUsuario:e.data[0].info[1],
					imagen:e.data[0].info[3],
					fecha:e.data[0].info[8],
					total: e.total
				}
			})

			let map = data.reduce((prev, next) =>{
			  if (next.id in prev) {
			    prev[next.id].total += next.total;
			  } else {
			     prev[next.id] = next;
			  }
			  return prev;
			}, {});

			let result = Object.keys(map).map(id => map[id]);

			res.json({result})
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
		.write(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`);
	});	

	setTimeout(function(){
		sizeOf(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`)
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
				.write(`${ubicacionJimp}Miniatura_${fecha}_${randonNumber}.${extension}`);
			});	
		})
	.catch(err => console.error(err));
	},2000)
}


module.exports = router