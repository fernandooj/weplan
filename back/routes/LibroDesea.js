'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let libroDeseaServices = require('./../services/libroDeseaServices.js');


router.get('/', function(req,res){
	libroDeseaServices.get(function(err, libroDesea){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libroDesea }); 
		}
	})
})

router.get('/:id', function(req,res){
	libroDeseaServices.getOne(req.params, function(err, libroDesea){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libroDesea }); 
		}
	})
})

router.post('/',function(req,res){

	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		libroDeseaServices.create(req.body, req.user._id, function(err, libroDesea){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libroDesea }); 
			}
		})
	}
})

module.exports=router;