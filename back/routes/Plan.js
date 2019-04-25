'use strict'

let express   = require('express')
let router    = express.Router()
let fs 	      = require('fs')
let path      = require('path')
let moment    = require('moment-timezone');
let fecha     = moment().format('YYYY-MM-DD-h-mm')
let fecha2    = moment().format('YYYY-MM-DD h:mm')
let Jimp      = require("jimp");
let redis     = require('redis')
let cliente   = redis.createClient()
let {promisify} = require('util');
let sizeOf    = promisify(require('image-size'));
let mongoose  = require('mongoose')
let ip 		  = require("ip");
let ipLocator = require('ip-locator')
let nodemailer = require('nodemailer');
const ubicacion     =  '../../front/docs/public/uploads/plan/'
const ubicacionJimp =  '../front/docs/public/uploads/plan/'
let planServices = require('../services/planServices.js')
let notificacionService = require('../services/notificacionServices.js');
let itemServices = require('../services/itemServices.js')
let pagoServices = require('../services/pagoServices.js')
let transporter=null;  
///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DEL CORREO
*/
///////////////////////////////////////////////////////////////////////////
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'weplanapp@gmail.com', // generated ethereal user
        pass: 'AppWePlan2019/'  // generated ethereal password
    }
});
 
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
/////// OBTENGO TODOS LOS PLANES PUBLICOS DEL USUARIO LOGUEADO, ESTO PARA EL ADMINISTRADOR
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/planesPublicos/activos', (req, res)=>{
	planServices.getPublicosActivos((err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			// plan = plan.map(e=>{
			// 	let data = e.data[0].info[0]
			// 	return{
			// 		_id:e._id,
			// 		nombre:data.nombre,
			// 		tipo:data.tipo,
			// 		area:data.area,
			// 		lugar:data.lugar,
			// 		activo:data.activo,
			// 		likes:e.likes,
			// 		planPadre:data.planPadre,
			// 	}
			// })			
			res.json({ status: 'SUCCESS', planes, code:1 });	
		}
	})
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES PUBLICOS DEL USUARIO LOGUEADO, ESTO PARA EL ADMINISTRADOR
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/planesPublicos/', (req, res)=>{
	console.log(req.session)
	if (!req.session.usuario) {
		res.json({ status: 'FAIL', mensaje:'sin sesion', code:0 });
	}else{
		planServices.getPublicos(req.session.usuario.user._id, req.session.usuario.user.acceso, (err, plan)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				plan = plan.map(e=>{
	                let data = e.data[0].info[0]
	                return{
	                    _id:e._id,
	                    nombre:data.nombre,
	                    tipo:data.tipo,
	                    area:data.area,
	                    lugar:data.lugar,
	                    activo:data.activo,
	                    likes:e.likes,
	                    planPadre:data.planPadre,
	                }
	            })			
				res.json({ status: 'SUCCESS', plan, code:1 });	
			}
		})
	}
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
/////// DESACTIVO LOS PLANES QUE YA SE VENCIRON, ESTOS PARA EL HOME
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/pagos/desactivar', (req, res)=>{
	planServices.getByPago((err, planes)=>{
		if (err) {
			res.json({ status: err, message: 'no se pudo cargar los planes', code:0 });
		}else{

			///// saco la hora actual
			let fechaActual   = moment().tz("America/Bogota").format("YYYY-MM-DD h:mm a")
			//// quito 3 horas a mi hora si es a las 6, pongo a las 3
			let agregoHora    = moment(fechaActual).add(-3, 'hours');
			//// convierto en formato milisegundos
			let nuevaHora     = moment(agregoHora).valueOf()
			//// convierto en formato que necesito de hora y fecha
			nuevaHora 		  = moment(nuevaHora).format("YYYY-MM-DD h:mm a")
	 		console.log(nuevaHora)
			
			let nuevoPlanes = planes.map( function(e, index) {
				 // console.log(moment(parseInt(e.fechaLugar)).format("YYYY-MM-DD h:mm a").valueOf())
				// console.log(moment(e.fechaLugar).format("YYYY-MM-DD h:mm a")<nuevaHora)
 				// return {e:moment(e.fechaLugar).format("YYYY-MM-DD h:mm a")<nuevaHora}
 				if (moment(parseInt(e.fechaLugar)).format("YYYY-MM-DD h:mm a")<nuevaHora) {
 					planServices.cambioestado(e._id, false, (err, plan)=>{
 							
					})
 				}
				return {id:e._id, fecha:e.fechaLugar, nombre:e.nombre}
			});
			res.json({status: 'SUCCESS', code:1, miHora:nuevaHora, total:planes.length, planes:nuevoPlanes}) 	
		}
	})	
})



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES DEL HOME, LOS QUE ESTAN MAS CERCA DEL USUARIO, DEPENDIENDO DE LA UBICACION Y DEL AREA DE INFLUENCIA
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get(`/pago/:lat/:lon`, (req,res)=>{
	// ipLocator.getDomainOrIPDetails(ip.address(),'json', function (err, data) {
	//   // let lat = req.params.lat ?req.params.lat :data.lat
	//   // let lon = req.params.lon ?req.params.lon :data.lon
	//    console.log('ip.address()')
 // 	})
 
	let lat = req.params.lat!=='undefined' ?req.params.lat :4.597825
	let lon = req.params.lon!=='undefined' ?req.params.lon :-74.0755723
	if (!req.session.usuario) {
		res.json({ status: 'FAIL', mensaje:'sin sesion', planes:[], code:2 });
	}else{
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
	}
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS PLANES PUBLICOS INNACTIVOS DEL USUARIO LOGUEADO, ESTO ES DE LA PAGINA AJUSTES / PLANES PUBLICOS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get(`/planespublicos/cliente`, (req,res)=>{
	planServices.getPlanesPublicosDesactivados(req.session.usuario.user._id, (err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: err, code:0 });
		}else{
			planes = planes.map(e=>{
                let data = e.data[0].info[0]
                return{
                    id:e._id,
                    saldo:e.saldo,
                    imagen:data.imagenMiniatura,
                    estado:data.estado,
                    nombre:data.nombre,
                }
            })
			res.json({ status: 'SUCCESS', planes, code:1 }); 	
		}
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
/////// EDITO 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/editar', (req, res)=>{
	if(req.session.usuario===undefined || req.session.usuario.user==null){
        res.json({status:'FAIL', user: 'SIN SESION', code:0 })
    }else{
		let lat = req.body.lat!=='undefined' ?req.body.lat :4.597825
		let lon = req.body.lng!=='undefined' ?req.body.lng :-74.0755723
 
    	planServices.editar(req.body, req.body.planId, lat, lon, (err, plan)=>{
			if(err){
				res.json({err})
			}else{ 
				res.json({ status: 'SUCCESS', plan, code:1 });	
			}
		})
    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// SILENCIAR / CANCELO SILENCIAR PLAN 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/silenciar', (req, res)=>{
	planServices.silenciar(req.body.data, req.body.planId, (err, plan)=>{
		if(err){
			res.json({err})
		}else{ 
			res.json({ status: 'SUCCESS', plan, code:1 });	
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
  //   	ipLocator.getDomainOrIPDetails(ip.address(),'json', function (err, data) {
		// 	let lat = req.body.lat ?req.body.lat :data.lat
		// 	let lon = req.body.lng ?req.body.lng :data.lon
		// })
		let lat = req.body.lat==='undefined' || req.body.lat==='null' || req.body.lat===undefined ?4.597825    :req.body.lat 
		let lon = req.body.lng==='undefined' || req.body.lng==='null' || req.body.lng===undefined ?-74.0755723 :req.body.lng
		let notificaciones = req.body.asignados ?req.body.asignados.concat(req.session.usuario.user._id) :[]

    	planServices.create(req.body, req.session.usuario.user._id, lat, lon, notificaciones, (err, plan)=>{
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
							notificacionService.create(req.session.usuario.user._id, e, 2, plan._id, false, (err, notificacion)=>{
								console.log(notificacion)
							})
						})
					res.json({status:'SUCCESS', message: plan, code:1})  
				}else{
					res.json({ status: 'SUCCESS', message: plan, code:1 });	
				}
			}
		})	
    }
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
		rutaImagenOriginal = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenResize = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenMiniatura = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
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
	console.log(req.files)
	let url = `${req.protocol}://${req.get('Host')}/public/uploads/`
	let rutaImagenOriginal  = [] 
	let rutaImagenResize    = [] 
	let rutaImagenMiniatura = [] 
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		extension = extension=='HEIC' ?'jpg' :extension
 
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
		rutaImagenOriginal = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenResize = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
		rutaImagenMiniatura = req.protocol+'://'+req.get('Host') + '/public/images/plan.jpg'
	}
	planServices.uploadImage(req.body.id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			console.log(plan.tipo)
			if (plan.tipo==='pago') {
				let mailOptions = {
                    from: '<weplanapp@appweplan.com>',                              // email del que se envia
                    to: 'fernandooj@ymail.com, unifyincatec@gmail.com',
                    subject: req.body.editado ?`El plan: ${plan.nombre} ha sido editado` :'Nuevo plan creado',                                            // mensaje en el sujeto
                    html:  `Usuario :   <b> ${req.session.usuario.user.nombre}</b> <br/>Nombre : <b>${plan.nombre}</b> <br/>
                    		Ubicación : <b>${plan.lugar}</b> <br/>
                    		Tipo    :   <b>${plan.tipo}</b> <br/>
                    		Area    :   <b>${plan.area}</b> Mt <br/>
                    		Costo   :   <b>${'$ '+Number(req.body.costo ?req.body.costo :0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </b><br/>
                    		Img     :    <img src="${rutaImagenMiniatura}" /> <br/>`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });	
			}
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

		notificacionService.create(req.session.usuario.user._id, e, 2, plan._id, false, (err, notificacion)=>{
			console.log(notificacion)
		})
	})
	res.json({status:'SUCCESS', message: plan, rutaImagenResize, code:1})    
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// ACTIVO O DESACTIVO LOS PLANES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/cambiarestado', (req,res)=>{
	planServices.cambioestado(req.body.id, req.body.activo, (err, plan)=>{
		if(err) {
			res.json({status:'FAIL', message: err,  code:0})  
		}else{
			res.json({status:'SUCCESS',  plan, code:1})  
		}
	})
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// ELIMINO EL PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/eliminar', (req,res)=>{
	planServices.eliminar(req.body.planId, (err, plan)=>{
		if(err) {
			res.json({status:'FAIL', message: err,  code:0})  
		}else{
			res.json({status:'SUCCESS',  plan, code:1})  
		}
	})
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// INSERTO UN USUARIO AL PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/insertar/:planId', (req,res)=>{
	let mensajeJson={
			userId:req.body.id,
			notificacion:true,
		}
		cliente.publish('notificacion', JSON.stringify(mensajeJson))
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
	notificacionService.create(req.session.usuario.user._id, req.body.id, 2, plan._id, false, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})   
		}else{
			res.json({status:'SUCCESS', notificacion, code:1})   
		}
	}) 
}






///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////	SACO AL USUARIO DEL PLAN, PERO PRIMERO VERIFICO QUE NO LE DEBA A NADIE
///////////////////////////////////////////////////////////////////////////////////////////////
router.put('/salir', (req, res)=>{
	itemServices.sumaPorUsuarioDebo(req.body.id, req.session.usuario.user._id, (err, debo)=>{
		if(err){
			res.json({err, code:0})
		}else{
			sumaPorUsuarioMeDebe(req.body.id, req.session.usuario.user._id, debo, res)		 
		}
	})
})
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////		OBTENGO  LA DEUDA DE CADA USUARIO QUE LE DEBE AL USUARIO LOGUEADO
///////////////////////////////////////////////////////////////////////////////////////////////
const sumaPorUsuarioMeDebe = (planId, id, debo, res)=>{
	pagoServices.sumaPorUsuarioMeDebe(planId, id, (err, meDeben)=>{
		if(err){
			console.log(err)
		}else{
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
			if (total===0) {
				planServices.getByIdPlan(planId, (err, plan)=>{
					if (err) {
						res.json({status: 'FAIL', err, code:0})
					}else{
						let asignados = plan[0].asignados.filter(e=>{
							if(e != id) return e 
						})
						//////////////////////////// salir del plan /////////////
						planServices.salir(planId, asignados, (err, plan2)=>{
							if (err) {
								res.json({status: 'FAIL', err, code:0})
							}else{
								envioNotificacionSalir(id, plan[0]._id, plan[0].fechaLugar, total, res)
							}
						})
						 
						/////////////////////////////////////////////////////////
					}
				})
			}
			else{
				res.json({ status: 'SUCCESS', total, code:1 }); 
			}
		}
	})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////  si el usuario se sale despues de la fecha de inicio del plan le envio la notificacion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const envioNotificacionSalir=(id, planId, fechaPlan, total, res)=>{
 
	if (fechaPlan<fecha2) {
		notificacionService.create(id, id, 14, planId, true, (err, notificacion)=>{
			if (!err) {
				res.json({status: 'SUCCESS',  total, code:1})
			}
		})
	}else{
		res.json({status: 'SUCCESS', total, code:1})
	}
	
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// FINALIZO EL PLAN, VERIFICANDO QUE NO SE LE DEBA NADA A NADIE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/finalizar', (req, res)=>
	itemServices.sumaTotalPlan(req.body.id, (err, deuda)=>{
		if(!err){
			deuda = deuda.map(e=>{
				return{
					id:e._id,
					valor:e.data[0].info[0].valor,
					// total: e.total
					total: e.total- Math.abs((Math.ceil((e.data[0].info[0].valor/(e.data[0].info[0].asignados.length+1))/100)*100)) 
				}
			})
			let suma=[]
			deuda.filter(e=>{
				suma.push(e.total)
			})
			let total = suma.reduce(add, 0);

			if (total===0) {
				planServices.finalizar(req.body.id, (err, plan)=>{
					if (err) {
						res.json({status: 'FAIL', err, code:0})
					}else{
						console.log(plan.asignados)
						////////////////////////////////////////////////////////////////   ENVIO NOTIFICACIONES 
						plan.asignados.map(e=>{
							let mensajeJson={
								userId:e,
								notificacion:true,
							}
							cliente.publish('notificacion', JSON.stringify(mensajeJson))

							//////////////////////////////////////////////////////////// notificacion que se cerro el plan  
							notificacionService.create(req.session.usuario.user._id, e, 13, plan._id, false, (err, notificacion)=>{
								console.log(notificacion)
							})
							///////////////////////////////////////////////////////////  notificacion para calificar el plan
							////////////////////////////////////////////////////////////////////////////////////////////////////////
							if (req.body.planPadre) {
								notificacionService.create(req.session.usuario.user._id, e, 14, req.body.planPadre, true, (err, notificacion)=>{
									console.log(notificacion)
								})
							}
							////////////////////////////////////////////////////////////////////////////////////////////////////////
						})
						////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						///////////////////////////////////////////////////////////  notificacion para calificar el plan de parte del creador del plan
						if (req.body.planPadre) {
							notificacionService.create(req.session.usuario.user._id, req.session.usuario.user._id, 14, req.body.planPadre, true, (err, notificacion)=>{
								console.log(notificacion)
							})
						}
						////////////////////////////////////////////////////////////////////////////////////////////////////////
						res.json({ status: 'SUCCESS', deuda, total, plan, code:1 });	
					}
				})
			}else{
				res.json({ status: 'SUCCESS', deuda, total, code:1 });
			}	 
		}
	})

	
)
const add = (a, b)=>{
	return a + b;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// OBTENGO LOS TOTALES DE CADA PLAN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/suma/totales/plan', (req, res)=>{
	if (!req.session.usuario) {
		res.json({ status: 'FAIL', mensaje:'sin sesion', result:[], code:2 });
	}else{
		planServices.sumaPlan(req.session.usuario.user._id, (err, pago)=>{
			if(err){
				res.json({status: 'FAIL', err, code:0})
			}else{
				let id = req.session.usuario.user._id
				let suma=[]
				///////////////////////////////////////////////////////////////////  DEVUELVO LOS PAGOS ACTIVOS, QUE SEAN TIPO ABONOS Y QUE EL USUARIO ESTE EN ESE ITEM
				let abonoTrue = pago.filter(e=>{
					if (e._id.abono!==false && e._id.pagoActivo===true) return e
				})
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////  SI EL USUARIO ES EL DUEÑO DEL ITEM TRAIGO CIERTA INFORMACION 
				let result = abonoTrue.map(e=>{
					e.data.filter(e2=>{
						if (e2.info[11]==id){
							suma.push(e2.info[12])
						}
					})
					if (e._id.userItemId==id) {
						return {
							id:e._id.id,
							nombrePlan:e.data[0].info[4],
							imagen:e.data[0].info[3],
							total:e.data[0].info[7]-e.total,
							monto:e.data[0].info[7],
							nombreUsuario:e.data[0].info[1],
							asignados:e.data[0].info[14],
							userItemId:e._id.userItemId
						}
					}else{
						return {
							id:e._id.id,
							nombrePlan:e.data[0].info[4],
							imagen:e.data[0].info[3],
							total:suma.reduce(add, 0)-Math.abs((Math.ceil((e.data[0].info[7]/(e.data[0].info[10]+1))/100)*100)),
							asignados:e.data[0].info[14],
							nombreUsuario:e.data[0].info[1],
						}
					}
				})
				 				
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				///////////////////////  ESTE CODIGO LO HIZE POR QUE AL CREAR MAS DE UN ITEM SE DUPLICA EL PLAN, ASI QUE UNO LOS ITEM Y SUMO LOS TOTALES	
				// let map = getUserpays.reduce((prev, next) =>{
				//   if (next.id in prev) {
				//     prev[next.id].total += next.total;
				//   } else {
				//      prev[next.id] = next;
				//   }
				//   return prev;
				// }, {});
				// let result = Object.keys(map).map(id => map[id]);
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				res.json({status: 'SUCCESS', result, code:1, pago, abonoTrue, id })
			}
		})
	}
})

 
router.get('/suma/totales/miplan', (req, res)=>{
	if (!req.session.usuario) {
		res.json({ status: 'FAIL', mensaje:'sin sesion', result:[], code:2 });
	}else{
		planServices.sumaPlan2(req.session.usuario.user._id, (err, pago)=>{
			if(err){
				res.json({status: 'FAIL', err, code:0})
			}else{
				let id = req.session.usuario.user._id
				let suma=[]
		 
				let abonoTrue = pago.filter(e=>{
					if (e._id.abono!==false && e.data[0].info[9]==true) return e
				})

				let data1 = abonoTrue.filter(e=>{
					if(e.data[0].info[5]!=req.session.usuario.user._id) {e.total=e.total-e.data[0].info[7]}
					return e
				})
		 		let result = data1.map(e=>{
					e.data.filter(e2=>{
						if (e2.info[11]==id){
							suma.push(e2.info[12])
						}
					})
					if (e._id.userItemId==id) {
						return {
							id:e._id.id,
							nombrePlan:e.data[0].info[4],
							imagen:e.data[0].info[3],
							total:e.data[0].info[7]-e.total,
							monto:e.data[0].info[7],
							nombreUsuario:e.data[0].info[1],
							asignados:e.data[0].info[14],
							userItemId:e._id.userItemId,
							fecha:e.data[0].info[8],
						}
					}else{
						return {
							id:e._id.id,
							nombrePlan:e.data[0].info[4],
							imagen:e.data[0].info[3],
							total:suma.reduce(add, 0)-Math.abs((Math.ceil((e.data[0].info[7]/(e.data[0].info[10]+1))/100)*100)),
							asignados:e.data[0].info[14],
							nombreUsuario:e.data[0].info[1],
							fecha:e.data[0].info[8],
						}
					}
				})

				// let map = data.reduce((prev, next) =>{
				//   if (next.id in prev) {
				//     prev[next.id].total += next.total;
				//   } else {
				//      prev[next.id] = next;
				//   }
				//   return prev;
				// }, {});

				// let result = Object.keys(map).map(id => map[id]);

				res.json({result, code:1, id})
			}
		})
	}
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CAMBIO LOS TAMAÑOS DE LAS IMAGENES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const resizeImagenes = (ruta, randonNumber, extension) =>{
	Jimp.read(ruta, function (err, imagen) {
	    if (err) throw err;
	    imagen.resize(800, Jimp.AUTO)             
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