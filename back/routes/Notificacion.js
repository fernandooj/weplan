'use strict'


let express = require('express')
let router = express.Router();
let notificacionService = require('../services/notificacionServices.js');
let amigoUserService    = require('../services/amigoUserServices.js');
let itemServices 		= require('../services/itemServices.js')


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
router.get('/user/get/', (req, res)=>{ 
	notificacionService.getByUser(req.session.usuario.user._id, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAILAS', err, code:0})    
		}else{
			notificacion = notificacion.map((e)=>{
				return {
					id 		    : e._id,
					tipo 		: e.tipo,
					estado  	: e.estado,
					////////////////////////////  AMIGOS  ////////////////////////////////////
					idAmigoUser : e.idAmigoUser ?e.idAmigoUser._id 				:null,
					idUser      : e.idUsuarioAsigna ?e.idUsuarioAsigna._id        :null,
					username    : e.idUsuarioAsigna ?e.idUsuarioAsigna.username   :null,
					photo   	: e.idUsuarioAsigna ?e.idUsuarioAsigna.photo      :null,
					nombre 	    : e.idUsuarioAsigna ?e.idUsuarioAsigna.nombre     :null,
					token  	 	: e.idUsuarioAsigna ?e.idUsuarioAsigna.tokenPhone :null,
					////////////////////////////  ITEM  //////////////////////////////////////
					idItem   	: e.idItem  ?e.idItem._id    :null,
					nombreItem  : e.idItem  ?e.idItem.titulo :null,
					imagenItem  : e.idItem  ?e.idItem.imagenMiniatura :null,

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
			?activaItem(req.session.usuario, req.params.idTipo, req.params.idUser, res) 
			:res.json({status:'SUCCESS', notificacion, code:1}) 
		}
	})
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			activo el usuario si es true es que ya son amigos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const activaAmigoUser =(idTipo, res)=>{
	console.log('aaaaa')
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
///// 			agrego al usuario al item 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const activaItem =(usuario, idTipo, id, res)=>{
	itemServices.getById(idTipo, (err, item)=>{
		if(isInArray(usuario.user._id, item[0].asignados)){
			res.json({status: 'FAIL', mensaje:'ya esta agregado', code:2})
		}else{
			let espera = item[0].espera.filter(e=>{
				return e!=id
			})
			let asignados = item[0].asignados.concat(id)
			itemServices.activaUsuario(idTipo, espera, asignados, (err, item)=>{
				if (err) {
					res.json({status: 'FAIL', err, code:0})
				}else{
					res.json({status:'SUCCESS', asignados, code:1})    	
				}
			})
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