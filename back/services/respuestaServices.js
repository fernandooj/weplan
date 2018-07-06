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
		respuesta.idEncuesta= data.idEncuesta
		respuesta.userId= id
		respuesta.valor= data.valor
		respuesta.save(callback)
	}
	cuenta(data, valor, userId, callback){
		console.log(data.idPregunta)
		////////////////////////////////////  cuenta todas las respuestas ////////////////////////////////////
		respuestaSchema.count({idPregunta: data.idPregunta}).exec((err, totalRespuestas)=>{

			////////////////////////////////////  cuenta las respuestas con valor 1 //////////////////////////
			respuestaSchema.count({idPregunta: data.idPregunta, valor}).exec((err, totalValor)=>{

				////////////////////////////////////  cuenta las respuestas del usuario //////////////////////////
				respuestaSchema.count({idPregunta: data.idPregunta, userId}).exec((err, totalIdUsuario)=>{
					callback(totalRespuestas, totalValor, totalIdUsuario)
				});
			});
		});
	}
}

module.exports = new respuestaServices();