'use strict'

let pagoPublicoSchema = require('../models/pagoPublicoModel.js');
let mongoose = require('mongoose')
let moment = require('moment')

class pagoPublicoServices{
	//////////////////////////////////////////////////////////////////////////////////////////
	////////   OBTENGO LA SUMA DE TODOS LOS PAGOS
	//////////////////////////////////////////////////////////////////////////////////////////
	getALL(callback){
		pagoPublicoSchema.aggregate([
	    	{
	    	    $group:{
	    	        _id:'$_id',
	    	        suma:  { $sum: '$monto'},
	    	        total: { $sum: 1 }
	    	    }
	    	}
 		])
	}


 	//////////////////////////////////////////////////////////////////////////////////////////
	////////   OBTENGO LA SUMA DE CADA USUARIO
	//////////////////////////////////////////////////////////////////////////////////////////
	getByidUSer(userId, callback){
		userId = mongoose.Types.ObjectId(userId);	
 		 
 		pagoPublicoSchema.aggregate([
 			{
	    	    $match:{
	    	        userId
	    	    }
	    	},
	    	{
	    	    $group:{
	    	        _id:'$userId',
	    	        saldo:  { $sum: '$monto'},
	    	        total: { $sum: 1 } 
	    	    }
	    	},
 		], callback)
 	}

	//////////////////////////////////////////////////////////////////////////////////////////
	////////   OBTENGO EL LISTADO DE PAGOS DE CADA USUARIO
	//////////////////////////////////////////////////////////////////////////////////////////
	getListByidUSer(userId, callback){
		userId = mongoose.Types.ObjectId(userId);	
 		pagoPublicoSchema.aggregate([
 			{
	    	    $match:{
	    	        userId,
	    	        monto: { $gt: 0 }
	    	    }
	    	},
	    	{
	    		$project:{
			        _id:1,
			        metodo:1,
			        referencia:1,
			        monto:1,
			        createdAt:1
			    }
			},
	    	{
	    	    $group:{
	    	        _id:'$_id',
	    	        saldo: { $sum: '$monto'},
	    	        total: { $sum: 1 }, 
	    	        data: {
		                $addToSet: {info:[{_id:'$_id',metodo:'$metodo', referencia:'$referencia', monto:'$monto', createdAt:'$createdAt'}]}
		            },
	    	    }
	    	},
	    	
 		], callback)
 	}

 	//////////////////////////////////////////////////////////////////////////////////////////
	////////   GUARDO EL PAGO
	//////////////////////////////////////////////////////////////////////////////////////////
	create(data, activo, callback){
		console.log(data)
		let pago = new pagoPublicoSchema();
		pago.monto  	  = data.monto
		pago.referencia   = data.referencia
		pago.metodo  	  = data.metodo
		pago.descripcion  = data.descripcion
		pago.activo  	  = activo
		pago.userId  	  = data.userId 
		pago.planId  	  = data.planId 
		pago.save(callback)
	}
}

module.exports = new pagoPublicoServices()