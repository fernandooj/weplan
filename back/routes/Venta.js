let express = require('express')
let router = express.Router();
let nodemailer = require('nodemailer');

let ventaServices = require('../services/ventaServices.js')
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
	ventaServices.get(function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

router.get('/:conversacionId', function(req,res){
	ventaServices.getById(req.params.conversacionId, function(err, venta){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', venta });	
		}
	})
})

router.post('/', function(req,res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		ventaServices.create(req.body, req.user, function(err, venta){
			if (!err) {
				res.json({ status: 'SUCCESS', venta }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}
})

// modificar
router.put('/:id/:conversacionId', function(req,res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		ventaServices.modify(req.body, req.params.id, function(err, venta){
			if (!err) {
				ventaServices.modifyConversacion(req.params.conversacionId, function(err, venta2){
					if(!err){
						mensajeServices.create(req.body, req.user, req.params.conversacionId, function(err, mensaje){
							if(!err){
								let mailOptions = {
				                    from: '<entrelineas@entrelineas.com>',         // email del que se envia
				                    to: req.body.email,                      // al usuario que se la va enviar
				                    subject: 'Tienes una Nueva Notificacion',                           // mensaje en el sujeto
				                    html:  'Felicitaciones: <b>'+req.body.username +'</b><br/><br/>ha aceptado:<b> '+req.body.tipo+'</b></b><br/><br/>El libro:<b> '+req.body.titulo+' <a href="http://localhost:8080/conversacion/?id='+req.params.conversacionId+'">Ver Conversacion</a>'          // texto
				                    //html:  'Felicitaciones: <b>'+req.body.user +'</b><br/><br/>ha aceptado:<b> '+req.body.titulo+'</b></b><br/><br/> <a href="http://entre-lineas.co/conversacion/?id='+conversacion._id+'">Ver Conversacion</a>'          // texto
				                };
				                transporter.sendMail(mailOptions, (error, info) => {
				                    if (error) {
				                        return console.log(error);
				                    }
				                });
				                res.json({ status: 'SUCCESS', message: 'Venta Modificada', venta });
				            }else{
				            	res.json({ status: 'FAIL', message: 'err' }); 
				            }    
				        })    
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
 

module.exports = router;