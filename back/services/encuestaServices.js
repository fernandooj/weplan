'use strict'

let encuestaSchema = require('../models/encuestaModel.js')
let mongoose = require('mongoose')


class encuestaServices {
	getById(_id, callback){
		encuestaSchema.find({_id}).populate('asignados').exec(callback)
	}
 	getByidUSer(userId, callback){
 		encuestaSchema.find({userId}).populate('userId').exec(callback)
 	}
 	getByPlan(planId, userId, callback){
 		userId = mongoose.Types.ObjectId(userId);
 		planId = mongoose.Types.ObjectId(planId);
		encuestaSchema.aggregate([
			{
	 		    $match:{
	 		        userId, planId
	 		    }
	 		},	 		 
	 		{
 		      $lookup:{
 		         from:"respuestas",
 		         localField:'_id',
 		         foreignField:"idEncuesta", 
 		         as:"RespuestaData"
 		      }
	 		}, 
	 		{
	 			$unwind:
	 			{
	 				path:'$RespuestaData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$project: {
	 				/////// info de la encuesta
	 				titulo: 1,
	 				tipo:   1,
	 				pregunta1:  1,
	 				pregunta2:  1,
	 				////// respuesta de cada encuesta
	 				valorRespuesta:'$RespuestaData.valor',
	 				userIdRespuesta:'$RespuestaData.userId',
	 				preguntaIdRespuesta:'$RespuestaData.idEncuesta',
	 				totalUno:{
	 					$cond:[{$eq:['$RespuestaData.valor',1]},1,0]
	 				},
	 				totalRepuestas:{
	 					$cond:[{$gte:['$RespuestaData.valor',0]},1,0]
	 				}
	 			}
	 		},
	 		{ 
	 			$sort : { _id : -1 } 
	 		},
	 		{
			    $group:{
			        _id:
				        {
				        	id:'$_id',
				        	 
				        	//abono:  "$abono",
				        },
					data: {
					$addToSet: {info:[{titulo:"$titulo",  tipo:"$tipo", pregunta1:"$pregunta1", pregunta2:"$pregunta2", valorRespuesta:"$valorRespuesta",  userIdRespuesta:"$userIdRespuesta", preguntaIdRespuesta:'$preguntaIdRespuesta', userId:'$userId'}]}
                    },
			        totalRepuestas:{$sum:"$totalRepuestas"},
			        totalUno:{$sum:"$totalUno"}
			    }
			},
	 		 
		], callback);
 	}
 
 	getPublicados(planId, userId, callback){
 		let userIds = mongoose.Types.ObjectId(userId);
 		planId = mongoose.Types.ObjectId(planId);
		encuestaSchema.aggregate([
			{
	 		    $match:{
	 		        userId:{
						$ne:userIds
					},
					planId:planId
	 		    }
	 		},	 		 
	 		{
 		      $lookup:{
 		         from:"respuestas",
 		         localField:'_id',
 		         foreignField:"idEncuesta", 
 		         as:"RespuestaData"
 		      }
	 		}, 
	 		{
	 			$unwind:
	 			{
	 				path:'$RespuestaData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$project: {
	 				/////// info de la encuesta
	 				titulo: 1,
	 				tipo:   1,
	 				pregunta1:  1,
	 				pregunta2:  1,
	 				////// respuesta de cada encuesta
	 				valorRespuesta:'$RespuestaData.valor',
	 				userIdRespuesta:'$RespuestaData.userId',
	 				preguntaIdRespuesta:'$RespuestaData.idEncuesta',
	 				totalUno:{
	 					$cond:[{$eq:['$RespuestaData.valor',1]},1,0]
	 				},
	 				totalRepuestas:{
	 					$cond:[{$gte:['$RespuestaData.valor',0]},1,0]
	 				}
	 			}
	 		},
	 		{ 
	 			$sort : { _id : -1 } 
	 		},
	 		{
			    $group:{
			        _id:
				        {
				        	id:'$_id',
				        	 
				        	//abono:  "$abono",
				        },
					data: {
					$addToSet: {info:[{titulo:"$titulo",  tipo:"$tipo", pregunta1:"$pregunta1", pregunta2:"$pregunta2", valorRespuesta:"$valorRespuesta",  userIdRespuesta:"$userIdRespuesta", preguntaIdRespuesta:'$preguntaIdRespuesta', userId:'$userId'}]}
                    },
			        totalRepuestas:{$sum:"$totalRepuestas"},
			        totalUno:{$sum:"$totalUno"}
			    }
			},
	 		 
		], callback);
 	}
	create(encuestaData, id, callback){
		let encuesta 		 = new encuestaSchema();
		encuesta.titulo 	 = encuestaData.titulo	
		encuesta.descripcion = encuestaData.descripcion	
		encuesta.userId 	 = id	
		encuesta.planId 	 = encuestaData.planId	
		encuesta.save(callback)
	} 

	uploadImage(id, tipo, pregunta1, pregunta2, callback){
		encuestaSchema.findByIdAndUpdate(id, {$set: {
	        'tipo': tipo,
	        'pregunta1': pregunta1,
	        'pregunta2': pregunta2,
        }}, callback);	
	}

}


module.exports = new encuestaServices();



