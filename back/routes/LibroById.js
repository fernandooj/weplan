'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let libroServices = require('./../services/libroServices.js');
 

 


router.get('/', function(req,res){
	libroServices.getByUser(req.user, function(err, libros){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libros }); 
		}
	})
})

router.get('/:idUsuario', function(req,res){
	libroServices.getByUserUrl(req.params, function(err, libros){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libros }); 
		}
	})
})

module.exports=router;