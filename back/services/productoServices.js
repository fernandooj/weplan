'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Producto = require('./../models/productoModel.js');
let Categoria = require('../models/categoriasModel.js');

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class productosServices{
	constructor(){

	}
	get(callback){
		Producto.find({},callback)	
	}
	create(producto, callback){
		var newProducto = new Producto({
			name: producto.name,
			img: producto.img,
			categoria: {type: Schema.ObjectId, ref:'Categoria'}
		});
		newProducto.save(callback)
	}


}

module.exports = new productosServices();