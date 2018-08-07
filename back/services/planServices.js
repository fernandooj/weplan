'use strict'

let planSchema = require('../models/planModel.js')
let mongoose = require('mongoose')


class planServices {
	get(callback){
		planSchema.find({}, null, {sort: {_id: -1}}).populate('asignados').populate('restricciones').exec(callback)
	}
	/// sin populate
	getByIdPlan(_id, callback){
		planSchema.find({_id}).populate('idUsuario', 'nombre ciudad photo').populate('restricciones').exec(callback)
	}
	/// con populate
	getByIdPlanPopulate(_id, callback){
		planSchema.find({_id}).populate('idUsuario', 'nombre ciudad photo').populate('restricciones').populate('asignados').exec(callback)
	}

	getPublicos(idUsuario, acceso, callback){
		console.log(idUsuario)
		idUsuario = mongoose.Types.ObjectId(idUsuario);	
		if (acceso==='suscriptor') {
			planSchema.aggregate([
			    {
			    	$match:{
			    		idUsuario
			    	},
			    },
			    {
		 			$lookup: {
		 				from: "plans",
		 				localField: "_id",
		 				foreignField: "planPadre",
		 				as: "PlanData"
		 			}
		 		},
			    {
	 			$project:{
		 				_id:1,
		 				nombre:1,
		 				tipo:1,
		 				area:1,
		 				lugar:1,
		 				activo:1,
		 				planPadre:{ $size: "$PlanData._id" },
		 			},
		 		},
			], callback)
		}else{
			planSchema.aggregate([
			    {
		 			$lookup: {
		 				from: "plans",
		 				localField: "_id",
		 				foreignField: "planPadre",
		 				as: "PlanData"
		 			}
		 		},
			    {
	 			$project:{
		 				_id:1,
		 				nombre:1,
		 				tipo:1,
		 				area:1,
		 				lugar:1,
		 				activo:1,
		 				planPadre:{ $size: "$PlanData._id" },
		 			},
		 		},
			], callback)
		}
	}
	//// me devuelve los de pago, con lat y lng
	getByPagoLatLng(lat, lng, callback){
		planSchema.aggregate([
		    {
		    	$geoNear: {
			        near: { type: "Point", coordinates: [  parseFloat(lng) ,  parseFloat(lat) ] },
			        distanceField: "dist",
			      	query: { tipo: "pago" },
			        maxDistance: 30000,
			        num: 5,
			        spherical: true
			    }
		    },
		    {
		    	$sort:{
		    		_id:-1
		    	}
		    }
		], callback)
	}
	getByUserId(asignados, callback){
		planSchema.find({$or:[{'asignados':asignados, activo:true},{'idUsuario':asignados, activo:true}]}, null, {sort: {_id: -1}}).populate('idUsuario', 'nombre ciudad photo').populate('asignados', 'nombre ciudad photo').exec(callback)
	}
	create(planData, id, lat, lng, callback){
		let loc = {'type':'Point', "coordinates": [parseFloat(lng), parseFloat(lat)] }
		let plan 			 = new planSchema();
		plan.tipo 		     = planData.tipo	
		plan.nombre 		 = planData.nombre	
		plan.descripcion	 = planData.descripcion	
		plan.restricciones   = planData.restricciones	
		plan.activo          = true	
		plan.idUsuario 		 = id	
		plan.fechaLugar 	 = planData.fechaLugar
		plan.loc 			 = loc
		plan.area 			 = planData.area	
		plan.lugar 			 = planData.lugar	
		plan.asignados 		 = planData.asignados	
		plan.imagenOriginal  = planData.imagenOriginal	
		plan.imagenResize 	 = planData.imagenResize	
		plan.imagenMiniatura = planData.imagenMiniatura	
		plan.categorias      = planData.categorias	
		plan.planPadre       = planData.planPadre	
		plan.save(callback)
	}
	uploadImage(id, imagenOriginal, imagenResize, imagenMiniatura, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'imagenOriginal': imagenOriginal,
	        'imagenResize': imagenResize,
	        'imagenMiniatura': imagenMiniatura,
        }}, callback);	
	}
	getByPago(callback){
		planSchema.find({activo:true, tipo:'pago'}, null, {sort: {_id: -1}}).populate('restricciones').exec(callback)
	}
	insertaUsuarioPlan(id, asignados, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'asignados': asignados,
        }}, callback);
	}
	finalizar(id, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'activo': false,
        }}, callback);
	}
	salir(id, asignados, callback){
		planSchema.findByIdAndUpdate(id, {$set: {
	        'asignados': asignados,
        }}, callback);
	}
	sumaPlan(idUsuario, callback){
		idUsuario = mongoose.Types.ObjectId(idUsuario);	
 		planSchema.aggregate([
 			{
 			    $match:{
 			    	$or:[
 			    	    {idUsuario, tipo:'suscripcion'},
 			    	    {asignados:idUsuario, tipo:'suscripcion'},
 			    	]
 			    }
 			},
 			{
	 			$lookup: {
	 				from: "users",
	 				localField: "idUsuario",
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
	 			$project:{
	 				_id:1,
	 				nombreUsuario:'$UserData.nombre',
	 				idUsuario:'$UserData._id',
	 				imagenResize:1,
	 				nombre:1,
	 				fechaLugar:1,
	 				activo:1
	 			},
	 		},
	 		{
	 			$lookup: {
	 				from: "items",
	 				localField: "_id",
	 				foreignField: "planId",
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
	 			$project:{
	 				_id:1,
	 				nombre:1,
	 				idUsuario:1,
	 				imagenResize:1,
	 				nombreUsuario:1,
	 				fechaLugar:1,
	 				activo:1,
	 				itemId:'$ItemData._id',
	 				userItemId:'$ItemData.userId',
	 				itemTitulo: '$ItemData.titulo',
	 				valorItem:'$ItemData.valor'
	 			},
	 		}, 
			{
			    $lookup:{
			        from:"pagos",
			        localField:"itemId",
			        foreignField:"itemId",
			        as:"PagoData"
			    }
			},	
			{
				$unwind:
				{
	 				path:'$PagoData',
	 				preserveNullAndEmptyArrays: true
	 			}
			},
			{
			    $project:{
			        _id:1,
			        nombre:1,
			        imagenResize:1,
			        idUsuario:1,
			        nombreUsuario:1,
			        itemId:1,
			        itemTitulo:1,
			        userItemId:1,
			        valorItem:1,
			        fechaLugar:1,
			        activo:1,
			        monto: '$PagoData.monto',
			        abono: '$PagoData.abono',
			        userId: '$PagoData.userId',
			    }
			},
			{
			    $group:{
			        _id:
				        {
				        	id:'$_id',
				        	idItem: '$itemId',
				        	abono:  "$abono",
				        },
			        data: {
                        $addToSet: {info:["$idUsuario", "$nombreUsuario", '$abono', '$imagenResize', '$nombre', '$userItemId',  '$itemTitulo', '$valorItem', '$fechaLugar', '$activo']}
                    },
			        total:{ $sum :'$monto'}
			    }
			}
		], callback);
 	}

}


module.exports = new planServices();


















