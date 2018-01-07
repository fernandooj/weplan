let express = require('express')
let router = express.Router();
let nodemailer = require('nodemailer');

let mensajeServices = require('../services/mensajeServices.js')
let conversacionServices = require('../services/conversacionServices.js')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'entrelineasbookstore@gmail.com',
        pass: 'Clase2013'
    }
});

router.get('/', function(req,res){
	mensajeServices.get(function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

router.get('/:conversacionId', function(req,res){
	mensajeServices.getById(req.params.conversacionId, function(err, mensaje){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			conversacionServices.getById(req.params.conversacionId, function(err, conversacion){
				if(err){
					res.json({ status: 'FAIL', message: err }); 
				}else{
					res.json({ status: 'SUCCESS', usuario1:conversacion.usuario1.email, usuario2:conversacion.usuario2.email,  mensaje });
					//let email= [];
					//email.push(conversacion.usuario1.email, conversacion.usuario2.email)	
					//res.json({ status: 'SUCCESS', email,  mensaje });	
					//res.json({ status: 'SUCCESS', conversacion,  mensaje });	
				}
			})
		}
	})
})

router.post('/:conversacionId', function(req,res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		mensajeServices.create(req.body, req.user, req.params.conversacionId, function(err, titulo){
			if (!err) {
				let mailOptions = {
	                from: '<entrelineas@entrelineas.com>',         // email del que se envia
	                to: req.body.email,                      // al usuario que se la va enviar
	                subject: 'Tienes una Nueva Pregunta',                           // mensaje en el sujeto
	                //html:  'te han preguntado sobre tu libro: '+req.body.titulo+' <a href="http://localhost:8080/conversacion/?id='+req.params.conversacionId+'">Ver Conversacion</a>'          // texto
	                html:  'te han preguntado sobre tu libro: '+req.body.titulo+' <a href="http://entre-lineas.co/conversacion/?id='+req.params.conversacionId+'">Ver Conversacion</a>'          // texto
	            };
	            transporter.sendMail(mailOptions, (error, info) => {
	                if (error) {
	                    return console.log(error);
	                }
	            });
				res.json({ status: 'SUCCESS', titulo }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}
})
 

module.exports = router;