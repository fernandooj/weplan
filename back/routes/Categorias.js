'use strict';


let express = require('express');
let router = express.Router();
let categoriasServices = require('./../services/categoriasServices.js');


////////////////************  creo el crud para categorias		*********/////////////////


// listar
router.get('/', function(req,res){
	categoriasServices.get(function(err, categorias){
			if (!err) {
				res.json({ status: 'SUCCESS', categoria: categorias }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
	})
})


// insertar 
router.post('/', function(req, res){
	categoriasServices.create(req.body, function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Creada', categoria: categorias });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

// modificar
router.put('/', function(req,res){
	//console.log(req.query)
	categoriasServices.modify(req.body, req.query.id, function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Modificada', categoria: categorias });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})


// eliminar
router.delete('/', function(req,res){
	categoriasServices.delete(req.query.id, function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Eliminada', categoria: categorias });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports = router;