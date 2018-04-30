'use strict';


let express = require('express');
let router = express.Router();

let respuestaServices = require('../services/respuestaServices.js');
let chatServices = require('../services/chatServices.js')
 
 
router.get('/', (req, res)=>{
	respuestaServices.get((err, respuesta)=>{
		if (!err) {
			res.json({ status: 'SUCCESS', respuesta, code:1 }); 
		}else{
			res.json({ status: 'FAIL',  err, code:0 });
		}
	})
})

router.get('/:idPregunta',(req, res)=>{
	let idUser = req.session.usuario.user._id
	respuestaServices.cuenta(req.params, 1, idUser, (totalRespuestas, totalValor, asignado)=>{
		let porcentaje2 = (totalValor*100)/totalRespuestas
		let porcentaje1 = 100-porcentaje2
		let total1=totalValor
		let total2=totalRespuestas - totalValor
		porcentaje1 = Math.round(porcentaje1 * 100) / 100
		porcentaje2 = Math.round(porcentaje2 * 100) / 100
		res.json({ status: 'SUCCESS', porcentaje1, porcentaje2, total1, total2, asignado:asignado==1 ?true :false, code:1 });
	})
})
// insertar 
router.post('/', (req, res)=>{
	let id      = req.session.usuario.user._id
	respuestaServices.create(req.body, id, (err, respuesta)=>{
		if (err) {
			res.json({ status: 'FAIL',  err, code:0 }); 
		}else{
			totales(req, res)
		}
	})
})

let totales = (req, res)=>{
	respuestaServices.cuenta(req.body, req.body.valor, req.session.usuario.user._id, (totalRespuestas, totalValor, asignado)=>{
		let porcentaje1;
		let porcentaje2;
		if (req.body.valor==1) {
			porcentaje1 = (totalValor*100)/totalRespuestas
			porcentaje2 = 100-porcentaje1
		}else{
			porcentaje2 = (totalValor*100)/totalRespuestas
			porcentaje1 = 100-porcentaje2
		}	

		let total1=totalValor
		let total2=totalRespuestas - totalValor
		porcentaje1 = Math.round(porcentaje1 * 100) / 100
		porcentaje2 = Math.round(porcentaje2 * 100) / 100
		res.json({ status: 'SUCCESS', totalRespuestas, total1, total2, porcentaje1, porcentaje2, code:1 });
	})
		//editaRespuesta(req, res)
}
// let editaRespuesta = (req, res)=>{
// 	chatServices.innactiva(req.body.idChat, (err, chat)=>{
// 		if (err) {
// 			res.json({status:'FAIL', err, code:0})   
// 		}else{
			 
// 		}
// 	})
// }
 

module.exports = router;