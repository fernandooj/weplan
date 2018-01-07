///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Conversacion = require('./../models/conversacionModel.js');


//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class conversacionServices{
	constructor(){

	}
	get(id, callback){
		Conversacion.find({usuario1:id}).sort({_id: 'desc'}).populate('usuario1').populate('usuario2').populate('libroId').populate('tituloId').exec(callback)
	}
	get2(id, callback){
		Conversacion.find({usuario2:id}).sort({_id: 'desc'}).populate('usuario1').populate('usuario2').populate('libroId').populate('tituloId').exec(callback)
	}
 	getById(id, callback){
		Conversacion.findById(id).populate('usuario1').populate('usuario2').populate('libroId').populate('tituloId').exec(callback)
	}
	create(data, user, callback){
		let newConversacion = new Conversacion({
			libroId  : data.libroId,
			tituloId  : data.tituloId,
			usuario1 : data.usuario,
			usuario2 : user._id,
			tipo     : data.tipo,
			estado   : 1
		})
		newConversacion.save(callback)	
	}
 
}

module.exports = new conversacionServices();