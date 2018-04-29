'use strict';


let express = require('express');
let router = express.Router();
let respuestaServices = require('../services/respuestaServices.js');

 
 
router.get('/', (req, res)=>{
	respuestaServices.get((err, respuesta)=>{
		if (!err) {
			res.json({ status: 'SUCCESS', respuesta, code:1 }); 
		}else{
			res.json({ status: 'FAIL',  err, code:0 });
		}
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
	respuestaServices.cuenta(req.body, (totalRespuestas, totalValor)=>{
		let porcentaje1 = (totalValor*100)/totalRespuestas
		let porcentaje2 = 100-porcentaje1
		let total1=totalValor
		let total2=totalRespuestas - totalValor
		porcentaje1 = Math.round(porcentaje1 * 100) / 100
		porcentaje2 = Math.round(porcentaje2 * 100) / 100

		res.json({ status: 'SUCCESS', totalRespuestas, total1, total2, porcentaje1, porcentaje2, code:1 });
	})
}


module.exports = router;