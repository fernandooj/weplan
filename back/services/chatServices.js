'use strict'

let chatSchema = require('../models/chatModel.js');
let mongoose = require('mongoose')
 
class chatServices{
	// getByPlan(planId, iUser, callback){
	// 	console.log('------')
	// 	console.log(planId)
	// 	chatSchema.find({planId}).populate('itemId').populate('userId').populate('contactoId').populate('encuestaId').exec(callback)
	// }
	getByPlan(planId, idUsuario, callback){
		idUsuario = mongoose.Types.ObjectId(idUsuario);	
		chatSchema.aggregate([
			{
	 			$lookup: {
	 				from: "users",
	 				localField: "userId",
	 				foreignField: "_id",
	 				as: "UserData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$UserData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$lookup: {
	 				from: "items",
	 				localField: "itemId",
	 				foreignField: "_id",
	 				as: "ItemData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$ItemData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$lookup: {
	 				from: "users",
	 				localField: "contactoId",
	 				foreignField: "_id",
	 				as: "ContactoData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$ContactoData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
	 			$lookup: {
	 				from: "encuestas",
	 				localField: "encuestaId",
	 				foreignField: "_id",
	 				as: "EncuestaData"
	 			}
	 		},
	 		{
	 			$unwind:
	 			{
	 				path:'$EncuestaData',
	 				preserveNullAndEmptyArrays: true
	 			}
	 		},
	 		{
 		      $lookup:{
 		         from:"respuestas",
 		         localField:'encuestaId',
 		         foreignField:"idPregunta", 
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
	 				///////// info general del chat
	 				mensaje:1,
	 				createdAt:'$fecha',
	 				documento:1,
	 				lat:1,
	 				lng:1,
	 				tipo:1,
	 				////////// info usuario creador del chat
	 				userId:       '$UserData._id',
	 				nombre:       '$UserData.nombre',
	 				photo:        '$UserData.photo',
	 				token:        '$UserData.tokenPhone',
	 				//////// info del item 
	 				itemTitulo:  '$ItemData.titulo',
	 				asignados:   '$ItemData.asignados',
	 				espera:      '$ItemData.espera',
	 				itemDescripcion: '$ItemData.descripcion',
	 				itemValor:   '$ItemData.valor',
	 				///////  info del contacto
	 				contactoId: '$ContactoData._id',
	 				cNombre:    '$ContactoData.nombre',
	 				cPhoto:     '$ContactoData.photo',
	 				cToken:     '$ContactoData.tokenPhone',
	 				/////// info de la encuesta
	 				encuestaTitulo: '$EncuestaData.titulo',
	 				encuestaUserId: '$EncuestaData.userId',
	 				tipoEncuesta:   '$EncuestaData.tipo',
	 				encuestaId: '$EncuestaData._id',
	 				pregunta1:  '$EncuestaData.pregunta1',
	 				pregunta2:  '$EncuestaData.pregunta2',
	 				////// respuesta de cada encuesta
	 				valorRespuesta:'$RespuestaData.valor',
	 				userIdRespuesta:'$RespuestaData.userId',
	 				preguntaIdRespuesta:'$RespuestaData.idPregunta',
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
				        	encuestaId: '$encuestaId',
				        	//abono:  "$abono",
				        },
			         data: {
                     $addToSet: {info:[{mensaje:"$mensaje", fecha: "$createdAt", documento: "$documento", lat:"$lat", lng:"$lng", tipo:"$tipo", nombre:"$nombre", photo:"$photo", token:"$token", itemTitulo:"$itemTitulo", asignados:"$asignados", espera:"$espera", itemDescripcion:"$itemDescripcion", itemValor:"$itemValor", encuestaTitulo:"$encuestaTitulo", encuestaId:"$encuestaId", encuestaUserId:"$encuestaUserId", encuestaDescripcion:"$encuestaDescripcion", tipoEncuesta:"$tipoEncuesta", pregunta1:"$pregunta1", pregunta2:"$pregunta2", valorRespuesta:"$valorRespuesta", cNombre:"$cNombre", cPhoto:"$cPhoto", cToken:"$cToken", contactoId:"$contactoId", userIdRespuesta:"$userIdRespuesta", preguntaIdRespuesta:'$RespuestaData.idPregunta', userId:'$userId'}]}
                        //$addToSet: {info:[{titulo:'$titulo', userId:'$userId', abierto:'$abierto'}]},
                  },
			         totalRepuestas:{$sum:"$totalRepuestas"},
			         totalUno:{$sum:"$totalUno"}
			    }
			},
	 		 
		], callback);
	}
	create(data, id, tipo, documento, callback){
		console.log(data)
		let chat = new chatSchema();
		chat.userId      = id
		chat.planId      = data.planId
		chat.tipo        = tipo
		chat.estado      = true
		chat.mensaje     = data.mensaje
		chat.itemId      = data.itemId
		chat.encuestaId  = data.encuestaId
		chat.contactoId  = data.contactoId
		chat.lat  		 = data.lat
		chat.lng  		 = data.lng
		chat.documento   = documento
		chat.save(callback)
	}
	// innactiva(_id, callback){
	// 	chatSchema.findByIdAndUpdate(_id, {$set: {
	//         'estado': false,
 //        }}, callback);	
	// }
}

module.exports = new chatServices()


 
  