///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Mensaje = require('./../models/mensajeModel.js');


//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class mensajeServices{
	constructor(){

	}
	get(callback){
		Mensaje.find({}, callback)
	}
	getById(id, callback){
		Mensaje.find({conversacionId:id}).populate('usuarioId').sort({_id: 'desc'}).exec(callback)
	}
	create(data, user, conversacion, callback){
		let newMensaje = new Mensaje({
			mensaje  : data.texto,
			usuarioId : user._id,
			conversacionId : conversacion
		})
		newMensaje.save(callback)	
	}
 
}

module.exports = new mensajeServices();