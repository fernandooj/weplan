///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let User  = require('./../models/usersModel.js');
let Libro = require('./../models/libroModel.js');
let Venta = require('./../models/ventaModel.js');
let LibroDesea = require('./../models/libroDeseaModel.js');

//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class resumenServices{
	constructor(){

	}
	get(id, callback){
		Libro.find({}, callback)
	}

 	totalLibros(id, callback){
		Libro.count({usuario: id}, callback)
	}
	vendido1(id, callback){
		Venta.count({usuarioId: id, tipo: 1, estado:2}, callback)
	}
	vendido2(id, callback){
		Venta.count({usuarioId2: id, tipo: 1, estado:2}, callback)
	}
	compartido1(id, callback){
		Venta.count({usuarioId: id, tipo: 2, estado:2}, callback)
	}
	compartido2(id, callback){
		Venta.count({usuarioId2: id, tipo: 2, estado:2}, callback)
	}
	intercambiado(id, callback){
		Venta.count({usuario: id}, callback)
	}
	perfil(id, callback){
		User.findById(id, callback)
	}
	libros(id, callback){
		Libro.find({usuario:id, activo:true}).populate('categoria').populate('titulo').populate('usuario').exec(callback)
	}
	deseados(id, callback){
		LibroDesea.find({usuario:id,activo:true}).populate('titulo').populate('usuario').exec(callback)
	}
	/*vende(id, callback){
		Libro.find({usuario:id, estado:2,tipo:1 }).populate('tituloId').populate('libroId').exec(callback)
	}
	intercambia(id, callback){
		Libro.find({usuario:id, estado:2,tipo:2 }).populate('tituloId').populate('libroId').exec(callback)
	}
	comparte(id, callback){
		Libro.find({usuario:id, estado:2,tipo:3 }).populate('tituloId').populate('libroId').exec(callback)
	}*/
}

module.exports = new resumenServices();