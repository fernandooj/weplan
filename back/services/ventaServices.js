///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Venta = require('./../models/ventaModel.js');
let Conversacion = require('./../models/conversacionModel.js');
let moment   = require('moment');

//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class ventaServices{
	constructor(){

	}
	get(callback){
		//console.log(id)
		//Venta.find({}).populate('usuarioId').populate('usuarioId2').populate('libroId').populate('tituloId').exec(callback)
		Venta.find({}, callback)
	}
 	getById(id, callback){
		Venta.find({conversacionId: id}).populate('libroId').populate('tituloId').populate('usuarioId').populate('usuarioId2').populate('libroId2').populate('tituloId2').exec(callback)
	}
	create(data, user, callback){
		let newVenta = new Venta({
			direccion     : data.direccion,
			telefono      : data.telefono,
			mensaje  	  : data.mensaje,
			estado  	  : data.estado,
			tipo     	  : data.tipo,
			libroId  	  : data.libroId,
			libroId2  	  : data.libroId2,
			tituloId  	  : data.tituloId,
			usuarioId 	  : data.usuarioId,
			usuarioId2 	  : user._id,
			conversacionId: data.conversacionId
		})
		newVenta.save(callback)	
	}
	modify(idLibro2, id, callback){
		console.log(idLibro2)
		Venta.findByIdAndUpdate(id, {$set: {
            'estado'        : 2,
            'libroId2'        : idLibro2.idLibro,
            'tituloId2'       : idLibro2.idTitulo,
            'updatedAt'   : moment().format('YYYY-MM-DD h:mm:ss')
        }}, callback)
	}
	modifyConversacion(id, callback){
		Conversacion.findByIdAndUpdate(id, {$set: {
            'estado'        : 2,
            'updatedAt'   : moment().format('YYYY-MM-DD h:mm:ss')
        }}, callback)
	}
 
}

module.exports = new ventaServices();