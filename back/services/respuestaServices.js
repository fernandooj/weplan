'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let respuestaSchema = require('../models/respuestaModel.js');
 

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class respuestaServices{
	get(callback){
		respuestaSchema.find({},callback)	
	}
	create(data, id, callback){
		var respuesta = new respuestaSchema()
		respuesta.idPregunta= data.idPregunta
		respuesta.userId= id
		respuesta.valor= data.valor
		respuesta.save(callback)
	}
	cuenta(data, callback){
		respuestaSchema.count({idPregunta: data.idPregunta}).exec((err, totalRespuestas)=>{
			respuestaSchema.count({idPregunta: data.idPregunta, valor:data.valor}).exec((err, totalValor)=>{
				callback(totalRespuestas, totalValor)
			});
		});
	}
}

module.exports = new respuestaServices();