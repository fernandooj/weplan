'use strict';


let express = require('express');
let router = express.Router();
let fs = require('fs');

let generoServices = require('./../services/generoService.js');

//const fileUpload = require('express-fileupload');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
////////////////************  creo el crud para genero		*********/////////////////


// listar
router.get('/', function(req,res){
	generoServices.get(function(err, genero){
			if (!err) {
				res.json({ status: 'SUCCESS', genero: genero }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
	})
})


// insertar 
router.post('/', upload.single('photo'), function(req, res){
	console.log(req.file)
	generoServices.create(req.body, function(err, genero){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Genero Creado', genero: genero });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

// modificar
router.put('/', function(req,res){
	generoServices.modify(req.body, req.query.id, function(err, genero){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Genero Modificado', genero: genero });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})


// eliminar
router.delete('/', function(req,res){
	generoServices.delete(req.query.id, function(err, genero){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Genero Eliminado', genero: genero });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports = router;