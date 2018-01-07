'use strict';


let express = require('express');
let router = express.Router();
let categoriasServices = require('./../services/categoriaServices.js');

 
////////////////************  creo el crud para categorias		*********/////////////////


// listar
router.get('/', function(req,res){
	categoriasServices.get(function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', categorias }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})
router.get('/:id', function(req,res){
	if(req.params.id=='padre'){
		categoriasServices.getPadre(function(err, categoria){
			if (!err) {
				res.json({ status: 'SUCCESS', categoria}); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}else if(req.params.id=='active'){
		categoriasServices.getActive(function(err, categoria){
			if (!err) {
				res.json({ status: 'SUCCESS', categoria}); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}else{
		categoriasServices.getById(req.params.id, function(err, categoria){
			if (!err) {
				res.json({ status: 'SUCCESS', categoria}); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}	
})


// insertar 
router.post('/', function(req, res){
	if (req.user) {
		categoriasServices.create(req.body, req.user.id, function(err, categoria){
			if (!err) {
				res.json({ status: 'SUCCESS', message: 'Categoria Creada', categoria });
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}else{
		res.json({ status: 'FAIL', message: 'Usuario no logueado' }); 
	}
	
})

// modificar
router.put('/', function(req,res){
	if (req.user) {
		categoriasServices.modify(req.body, req.user.id, function(err, categorias){
			if (!err) {
				res.json({ status: 'SUCCESS', message: 'Categoria Modificada', categorias });
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}else{
		res.json({ status: 'FAIL', message: 'Usuario no logueado' }); 
	}
})


// eliminar
router.delete('/:id', function(req,res){
	if (req.user) {
		if (req.user.tipo=='admin') {
			categoriasServices.delete(req.params.id, function(err, categorias){
				if (!err) {
					res.json({ status: 'SUCCESS', message: 'Categoria Eliminada', categorias });
				}else{
					res.json({ status: 'FAIL', message: err }); 
				}
			})
		}else{
			res.json({ status: 'FAIL', message: 'usuario no es administrador' }); 
		}
	}else{
		res.json({ status: 'FAIL', message: 'sin login' }); 
	}
})

// activa
router.put('/:estado', function(req,res){
	if (req.user) {
		categoriasServices.estatus(req.body.id, req.params.estado, req.user.id, function(err, categorias){
			if (!err) {
				res.json({ status: 'SUCCESS', message: 'Categoria Modificada', categorias });
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
		})
	}else{
		res.json({ status: 'FAIL', message: 'usuario no logueado' }); 
	}
})

module.exports = router;