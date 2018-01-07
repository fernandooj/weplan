'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let libroServices = require('./../services/libroServices.js');


router.get('/', function(req,res){
	libroServices.getAll(function(err, libros){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libros }); 
		}
	})
})

router.get('/:id', function(req,res){
	if (req.params.id=='activo') {
		libroServices.get(function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}else if (req.params.id=='limit') {
		libroServices.getHome(function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}
	else{
		libroServices.getOne(req.params, function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}
})

/*router.get('/:buscador/:categoria/:estado/:clase', function(req,res){
	if (req.params.buscador=='buscador') {
		libroServices.buscador(req.params.categoria, req.params.estado, req.params.clase, function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}	
})*/


router.post('/:titulo/:categoria/:isbn/:descripcion/:estado/:cVenta/:cIntercambio/:cCompartir/:precio', function(req,res){

	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		libroServices.create(req.params, req.user._id, function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}
})

module.exports=router;