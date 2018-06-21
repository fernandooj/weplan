'use strict'


let express = require('express')
let router = express.Router();
let notificacionService = require('../services/notificacionServices.js');
let amigoUserService    = require('../services/amigoUserServices.js');
let itemServices 		= require('../services/itemServices.js')
let pagoServices 		= require('../services/pagoServices.js')


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
			res.json({status:'FAILAS', err, code:0})    
		}else{
			notificacion = notificacion.map((e)=>{
				return {
					id 		    : e._id,
					tipo 		: e.tipo,
					activo  	: e.activo,
					idUser      : e.idUsuarioAsigna._id       ,
					username    : e.idUsuarioAsigna.username  ,
					photo   	: e.idUsuarioAsigna.photo     ,
					nombre 	    : e.idUsuarioAsigna.nombre    ,
					token  	 	: e.idUsuarioAsigna.tokenPhone,
					////////////////////////////  AMIGOS  ////////////////////////////////////
					idAmigoUser : e.idAmigoUser ?e.idAmigoUser._id 				:null,
					////////////////////////////  ITEM  //////////////////////////////////////
					idItem   	: e.idItem  &&e.idItem._id    ,
					nombreItem  : e.idItem  &&e.idItem.titulo ,
					imagenItem  : e.idItem  &&e.idItem.imagenMiniatura ,
					valorItem   : e.idItem  &&Math.ceil((e.idItem.valor/(e.idItem.asignados.length+2))/100)*100,

					//////////////////////////// PLAN /////////////////////////////////////
					idPlan   	: e.idPlan  ?e.idPlan._id    :null,
					nombrePlan  : e.idPlan  ?e.idPlan.nombre :null,
					imagenPlan  : e.idPlan  ?e.idPlan.imagenMiniatura[0] :null,
				}
			})
		}
		res.json({status:'SUCCESS', notificacion, code:1})    
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			modifico y desactivo la notificacion y modifico el tipo de la notificacion
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:idNotificacion/:idTipo/:tipo/:idUser', (req,res)=>{
	notificacionService.desactiva(req.params.idNotificacion, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			req.params.tipo==1 
			?activaAmigoUser(req.params.idTipo, res) 
			:req.params.tipo==3 
			?activaItem(req.session.usuario, req.params.idTipo, req.params.idUser, res, req) 
			:res.json({status:'SUCCESS', notificacion, code:1}) 
		}
	})
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			activo el usuario si es true es que ya son amigos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const activaAmigoUser =(idTipo, res)=>{
	console.log(idTipo)
	amigoUserService.activa(idTipo, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', asignados, code:1})    
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
			itemServices.activaUsuario(idTipo, espera, asignados, (err, item)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					//res.json({status:'SUCCESS', asignados, code:1})
					nuevoPago(req, res, idTipo, req.body.monto)    	
				}
			})
		}
	})
}

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
	pagoServices.create(req.body, req.session.usuario.user._id, req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({err})
		}else{
			//res.json({ status: 'SUCCESS', pago, code:1 });
			editaPagoCreador(itemId, req.session.usuario.user._id, montoCreador, req.body.monto, res)					
		}
	})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// 	EDITO AL DUEÑO DEL ITEM, CUANDO EL USUARIO ACEPTA SER PARTE DEL ITEM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editaPagoCreador = (itemId, userId, montoCreador, montoAsignado, res)=>{
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
							editaPagoAsignados(itemId, item[0].userId._id, montoAsignado, res )
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
const editaPagoAsignados = (itemId, userId, monto, res)=>{
	pagoServices.betyByItemAndUserNotEqual(itemId, userId, (err, pago)=>{
		console.log(monto)
		if(err){
			res.json({err})
		}else{
			pago.map(e=>{
				pagoServices.edit(e._id, monto, (err, pago2)=>{
					console.log(pago2)
				})
			})
			res.json({ status: 'SUCCESS', pago, code:1 });				
		}
	})
}

//////////////////////////////////////////////////////////////////////////////////////////
////////   VERIFICO QUE EL USUARIO YA SE HALLA ACTIVADO 
//////////////////////////////////////////////////////////////////////////////////////////
function isInArray(value, array) {
	return array.indexOf(value) > -1;
}


module.exports = router