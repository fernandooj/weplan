'use strict';

///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Categoria = require('./../models/categoriasModel.js');


///////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
///////////////////////////////////////////////////////////////////////////
class categoriasServices{
	constructor(){

	}
	get(callback){
		Categoria.find({},callback)
	}
	create(categoria, callback){
		var newCategoria = new Categoria({
			name: categoria.name,
			slug: categoria.slug,
			descripcion: categoria.descripcion
		});
		newCategoria.save(callback)
	}
	modify(categoria, id, callback){
		console.log(categoria)
		Categoria.findByIdAndUpdate(id, {$set: {
                            'name'        : categoria.name,
                            'slug'        : categoria.slug,
                            'descripcion' : categoria.descripcion,
                            'updatedAt'   : new Date()
                        }}, callback)
		 
	}
	delete(id, callback){
	    Categoria.findById(id, function(err, categoria) {
	      categoria.remove(function(err, categoria) {
	        if(callback) callback(err, Categoria);
	      });
	    });
	}
}



module.exports = new categoriasServices();