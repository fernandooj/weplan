'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let LibroDesea = require('./../models/libroDeseaModel.js');
 

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class libroDeseaServices{
	constructor(){

	}
	get(callback){
		LibroDesea.find({activo:true}).populate('usuario').populate('titulo').sort({_id: 'desc'}).exec(callback)	
	}
	getByUser(id, callback){
		LibroDesea.find({usuario:id._id}).populate('usuario').populate('titulo').populate('categoria').populate('genero').exec(callback)
	}
	create(libro, idUser, callback){
		var newLibroDesea = new LibroDesea({
			titulo: libro.titulo,
			usuario: idUser,
			activo:true
		});
		newLibroDesea.save(callback)
	}
}

module.exports = new libroDeseaServices();