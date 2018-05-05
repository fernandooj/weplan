'use strict'


let express = require('express')
let router = express.Router();
let notificacionService = require('../services/notificacionServices.js');
let amigoUserService    = require('../services/amigoUserServices.js');

router.get('/:id', (req, res)=>{ 
	notificacionService.getById(req.params.id, (err, amigoUser)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', amigoUser, code:1})    
		}
	})
})

router.get('/user/get/', (req, res)=>{ 
	notificacionService.getByUser(req.session.usuario.user._id, (err, amigoUser)=>{
		if (err) {
			res.json({status:'FAILAS', err, code:0})    
		}else{
			res.json({status:'SUCCESS', amigoUser, code:1})    
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			modifico y desactivo la notificacion y modifico el tipo de la notificacion
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:idNotificacion/:idTipo/:tipo', (req,res)=>{
	notificacionService.desactiva(req.params.idNotificacion, (err, notificacion)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			req.params.tipo==1 ?modificaAmigoUser(req.params.idNotificacion, res) :null
		}
	})
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// 			activo el usuario si es true es que ya son amigos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activaAmigoUser =(idTipo, res)=>{
	amigoUserService.activa(idTipo, (err, asignados)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', asignados, code:1})    
		}
	})
}


module.exports = router