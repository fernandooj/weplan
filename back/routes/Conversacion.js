let express = require('express')
let router = express.Router();
let nodemailer = require('nodemailer');

let conversacionServices = require('../services/conversacionServices.js')
let mensajeServices = require('../services/mensajeServices.js')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'entrelineasbookstore@gmail.com',
        pass: 'Clase2013'
    }
});

router.get('/', function(req,res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		conversacionServices.get(req.user.id, function(err, titulo){
			if (!err) {
				conversacionServices.get2(req.user.id, function(err, titulo2){
					if (!err) {
						res.json({ status: 'SUCCESS', titulo, titulo2 }); 
					}else{
						res.json({ status: 'FAIL', message: 'err' });
					}
				})
			}else{
				res.json({ status: 'FAIL', message: 'err' }); 
			}
		})
	}
})

router.get('/:conversacionId', function(req,res){
	conversacionServices.getById(req.params.conversacionId, function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})


router.post('/', function(req,res, next){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		conversacionServices.create(req.body, req.user, function(err, conversacion){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				mensajeServices.create(req.body, req.user, conversacion._id, function(err, mensaje){
					
					if (err) {
						res.json({ status: 'FAIL', message: err }); 
						
					}else{
						let mailOptions = {
		                    from: '<entrelineas@entrelineas.com>',         // email del que se envia
		                    to: req.body.email,                      // al usuario que se la va enviar
		                    subject: 'Tienes una Nueva Pregunta',                           // mensaje en el sujeto
		                    //html:  'te han hecho la siguiente pregunta <b>'+req.body.texto +'</b><br/>sobre tu libro: '+req.body.titulo+' <a href="http://localhost:8080/venta/?id='+conversacion._id+'">Ver Conversacion</a>'          // texto
		                    html:  'Te han hecho la siguiente pregunta <b>'+req.body.texto +'</b><br/><br/>sobre tu libro:<b> '+req.body.titulo+'</b></b><br/><br/> <a href="http://entre-lineas.co/venta/?id='+conversacion._id+'">Ver Conversacion</a>'          // texto
		                };
		                transporter.sendMail(mailOptions, (error, info) => {
		                    if (error) {
		                        return console.log(error);
		                    }
		                });
             
						res.json({ status: 'SUCCESS', mensaje, conversacion }); 
					}
				})

			}
		})
	}
})
 
 
module.exports = router;