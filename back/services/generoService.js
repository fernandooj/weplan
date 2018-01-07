'use strict';

///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Genero = require('./../models/generoModel.js');


///////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
///////////////////////////////////////////////////////////////////////////
class generoServices{
	constructor(){

	}
	get(callback){
		Genero.find({},callback)
	}
	create(genero, callback){
		var newGenero = new Genero({
			name: genero.name,
			slug: genero.slug,
			descripcion: genero.descripcion
		});
		newGenero.save(callback)
	}
	modify(genero, id, callback){
		Genero.findByIdAndUpdate(id, {$set: {
                            'name'        : genero.name,
                            'slug'        : genero.slug,
                            'descripcion' : genero.descripcion,
                            'updatedAt'   : new Date()
                        }}, callback)
		 
	}
	delete(id, callback){
	    Genero.findById(id, function(err, genero) {
	      genero.remove(function(err, genero) {
	        if(callback) callback(err, Genero);
	      });
	    });
	}
}



module.exports = new generoServices();