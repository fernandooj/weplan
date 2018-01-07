'use strict';

///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Categoria = require('./../models/categoriaModel.js');
let moment   = require('moment');

///////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
///////////////////////////////////////////////////////////////////////////
class categoriasServices{
	constructor(){

	}
	get(callback){
		Categoria.find({}).populate('UsuarioCrea').populate('UsuarioModifica').exec(callback)
	}
	getActive(callback){
		Categoria.find({estatus:true}).populate('UsuarioCrea').populate('UsuarioModifica').exec(callback)
	}
	getPadre(callback){
		Categoria.find({Categoria:null}).populate('UsuarioCrea').populate('UsuarioModifica').exec(callback)
	}
	getById(id, callback){
		console.log(id)
		Categoria.find({Categoria:id}).exec(callback)
	}
	create(categoria, user, callback){
		var newCategoria = new Categoria({
			name: categoria.name,
			slug: categoria.slug,
			descripcion: categoria.descripcion,
			Categoria: categoria.idPadre,
			estatus: true,
			UsuarioCrea: user,
			createdAt : categoria.id,
		});
		newCategoria.save(callback)

	}
	modify(categoria, user, callback){
		Categoria.findByIdAndUpdate(categoria.id, {$set: {
            'name'        : categoria.name,
            'slug'        : categoria.slug,
            'descripcion' : categoria.descripcion,
            'Categoria'   : categoria.idPadre,
            'UsuarioModifica' : user,
            'estatus'         : categoria.estatus,
            'updatedAt'   : moment().format('YYYY-MM-DD h:mm:ss')
        }}, callback)
		 
	}
	delete(id, callback){
	    Categoria.findById(id, function(error, categoria) {
	    	console.log(categoria)
	    	if (categoria!==null) {
	    		categoria.remove(function(err, categorias) {
			        if(callback) callback(err, categorias);
			    });
	    	}else{
	    		return error
	    	}
	      
	    });
	}
	estatus(id, categoria, user,  callback){
		Categoria.findByIdAndUpdate(id, {$set: {
			'estatus'         : categoria.estatus,
			'UsuarioModifica' : user,
			'updatedAt'   : moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback)
	}
}

module.exports = new categoriasServices();