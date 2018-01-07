///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Resena = require('./../models/resenaModel.js');


//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class resenaServices{
	constructor(){

	}
	get(callback){
		Resena.find({}).limit(2).sort({_id: 'desc'}).populate('usuarioId').populate('tituloId').exec(callback)
	}
	getByIdTitulo(tituloId, callback){
		Resena.find({tituloId}).populate('usuarioId').exec(callback)
	}
	getByIdUser(tituloId,callback){
		Resena.find({tituloId}, callback)
	}
	create(resena, usuarioId, callback){
		let newResena = new Resena({
			texto  : resena.texto, 
			usuarioId  : usuarioId,
			tituloId : resena.tituloId,
		})
		newResena.save(callback)
	}

}

module.exports = new resenaServices();