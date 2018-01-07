'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Libro = require('./../models/libroModel.js');
 

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class libroServices{
	constructor(){

	}
	getAll(callback){
		Libro.find({}).populate('usuario').populate('titulo').populate('categoria').populate('genero').sort({_id: 'desc'}).exec(callback)	
	}
	get(callback){
		Libro.find({activo:true}).populate('usuario').populate('titulo').populate('genero').sort({_id: 'desc'}).exec(callback)	
	}
	getHome(callback){
		Libro.find({activo:true}).populate('usuario').populate('titulo').populate('genero').sort({_id: 'desc'}).limit(4).exec(callback)	
	}
	getByUser(id, callback){
		Libro.find({usuario:id._id}).populate('usuario').populate('titulo').populate('categoria').populate('genero').exec(callback)
	}
	getByUserUrl(id, callback){
		Libro.find({usuario:id.idUsuario}).populate('usuario').populate('titulo').populate('categoria').populate('genero').exec(callback)
	}
	getOne(id, callback){
		Libro.findById(id.id).populate('usuario').populate('titulo').populate('categoria').populate('genero').exec(callback)
	}
	buscador(categoria, estado, clase, callback){
		if (clase=='cVenta') {
			Libro.find({activo:true, categoria, estado, cVenta:true}).populate('usuario').populate('titulo').populate('categoria').exec(callback)
		}
		if (clase=='cIntercambio') {
			Libro.find({activo:true, categoria, estado, cIntercambio:true}).populate('usuario').populate('titulo').populate('categoria').exec(callback)
		}
		if (clase=='cCompartir') {
			Libro.find({activo:true, categoria, estado, cCompartir:true}).populate('usuario').populate('titulo').populate('categoria').exec(callback)
		}
		
	}
	create(libro, idUser, callback){
		var newLibro = new Libro({
			titulo: libro.titulo,
			autor: libro.autor,
			categoria: libro.categoria,
			usuario: idUser,
			isbn: libro.isbn,
			descripcion: libro.descripcion,
			estado: libro.estado,
			cVenta: libro.cVenta,
			cIntercambio: libro.cIntercambio,
			cCompartir: libro.cCompartir,
			precio: libro.precio,
			activo:true
		});
		newLibro.save(callback)
	}
}

module.exports = new libroServices();