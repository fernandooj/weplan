'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let productosServices = require('./../services/productoServices.js');
let Categoria = require('../models/categoriasModel.js');

router.get('/', function(req,res){
	productosServices.get(function(err, productos){
		if (err) {
			console.log(err);
		}else{
			Categoria.populate(productos, {path:'categoria'}, function(err, producto){
				return res.send(productos);
			})
		}
	})
})

router.post('/', function(req,res){
	productosServices.create( req.body, function(err, productos){
		if (err) {
			return err
		}else{
			return res.send(productos);
		}
	})
})

module.exports=router;