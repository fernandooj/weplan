'use strict';

let User = require('./../models/usersModel.js');
let moment   = require('moment');
let mongoose = require('mongoose')
class userServices {
	get(callback){
		User.find({}, null, {sort: {_id: -1}}, callback)
	}
	getEmail(user, callback){
		User.findOne({'username':user.username}, callback)
	}
	getEmailFacebook(username, callback){
		User.findOne({'username':username}, callback)
	}
	login(user, callback){
		User.findOne({ 'username' :  user.username }, callback)
	}
	getActivos(callback){
		User.find({ 'estado' :  'activo', 'acceso':'suscriptor' }, callback)
	}
	getOneUser(_id,callback){
		User.findOne({_id},{nombre:1, photo:1, ciudad:1, tokenPhone:1}, callback)
	}
	
	create(user, randonNumber, callback ){ 
		let newUsuario = new User() 
		newUsuario.username = user.username, 
		newUsuario.token    = randonNumber,
		newUsuario.tokenPhone = user.tokenPhone
		newUsuario.estado   = "inactivo"
		newUsuario.tipo	    = "local"
		newUsuario.acceso   = user.acceso
		newUsuario.telefono = user.tipo==2 &&user.username
		newUsuario.email    = user.tipo==1 &&user.username
		newUsuario.save(callback);	 
	}
	facebook(user, callback){
		let newUsuario = new User() 
		newUsuario.token 	  = user.accessToken
		newUsuario.tokenPhone = user.tokenPhone
		newUsuario.email 	  = user.email
		newUsuario.username   = user.email
		newUsuario.nombre  	  = user.nombre
		newUsuario.photo 	  = user.photo
		newUsuario.idUser 	  = user.idUser
		newUsuario.tipo	 	  = user.tipo
		newUsuario.acceso     = user.acceso
		newUsuario.categorias = []
		newUsuario.estado     = "activo"
		newUsuario.save(callback)
	}
	 
	modificaCodigo(idUser, code, callback){
		User.findOne({'username':idUser.username}, function(err, user){
			User.findByIdAndUpdate(user._id, {$set:{
				'token':code
			}}, callback );	
		})
	}
	modificaUsuario(idUser, data, callback){
		User.findByIdAndUpdate(idUser, {$set:{
			'tokenPhone':data.tokenPhone,
			'nombre':data.nombre,
			'photo':data.photo,
		}}, callback );	
	}


	verificaToken(token, callback){
		User.findOne({'username':token.username, 'token': token.token}, callback)
	}
	activaUsuario(user, callback){
		User.findOne({'username':user.username}, function(err, data){
			User.findByIdAndUpdate(data._id, {$set:{
				'estado':'activo'
			}}, callback );	
		})
	}
	editaPassword(id, password, tokenPhone, callback){
		console.log(tokenPhone)
		let newUsuario = new User();
		User.findByIdAndUpdate(id, {$set:{
			'password': newUsuario.generateHash(password),
			'tokenPhone':tokenPhone,
		}}, callback );	
	}
	modificaTokenPhone(idUser, tokenPhone, callback){
		User.findByIdAndUpdate(idUser, {$set:{
			'tokenPhone':tokenPhone,
		}}, callback );	
	}
	enableDisable(user,callback){
		User.findByIdAndUpdate(user.id, {$set: {
		    'estado': 	  user.estado,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}
	edit(user, id, ruta, callback){
		let newUsuario = new User(); 
		if (user.password) {
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':         user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'password': 	  newUsuario.generateHash(user.password),
	            'sexo':       	  user.sexo,
	            'ciudad':     	  user.ciudad,
	            'telefono':   	  user.telefono,
	            'photo':   	  	  ruta,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}else{
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':       user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'sexo':       	  user.sexo,
	            'ciudad':     	  user.ciudad,
	            'telefono':   	  user.telefono,
	            'photo':   	  	  ruta,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}
	}
	editCategorias(id, categorias, callback){
		User.findByIdAndUpdate(id, {$set: {
		    'categorias': categorias,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}
	createUser(user, randonNumber, ruta, callback){
		let newUsuario = new User() 
		newUsuario.username = user.email
		newUsuario.email 	= user.email
		newUsuario.nombre 	= user.nombre
		newUsuario.password = newUsuario.generateHash(user.password)
		newUsuario.telefono = user.telefono
		newUsuario.estado   = user.estado
		newUsuario.sexo   	= user.sexo
		newUsuario.tipo	    = "local"
		newUsuario.acceso   = user.acceso
		newUsuario.ciudad   = user.ciudad
		newUsuario.pais     = user.pais
		newUsuario.token    = randonNumber
		newUsuario.photo    = ruta
		newUsuario.categorias = []
		newUsuario.save(callback);
	}
	avatar(id, extension, callback){
		User.findByIdAndUpdate(id, {$set: {
            extension    : extension,
            'updatedAt'   : new Date()
        }}, callback)
	}

	////////////////////////////////////////////////////////////////////////////////////////////////
	///////////	es la deuda de cada usuario por cada item, pantalla abonos por el creador del item
	////////////////////////////////////////////////////////////////////////////////////////////////
	deudaPorUsuario(userId, itemId, callback){
		let userIds = mongoose.Types.ObjectId(userId);
		itemId = mongoose.Types.ObjectId(itemId);
		User.aggregate([ 
			{
				$lookup:{
					from:"pagos",
					localField:"_id",
					foreignField:"userId",
					as:"PagoData"
				}
			}, 
			{
			    $unwind:{
			        path:"$PagoData",
			        preserveNullAndEmptyArrays:true
			    }
			},
			{
			$project:{
			        _id:1,
			        nombre:1,
			        photo:1,
			        pagoId:"$PagoData._id",
			        monto:"$PagoData.monto",
	 				itemId:"$PagoData.itemId",
	 				abono:"$PagoData.abono",
	 				fecha:"$PagoData.createdAt",
			    }
			},
			{
				$match:{
					abono:true,
					itemId,
					_id:{
						$ne:userIds
					},
				}
			},
			{
				$group : {
			       _id : '$_id',
			       deuda: { $sum: "$monto"}, 
			       count: { $sum: 1 }, // for no. of documents count
			       data: {
			       	$addToSet: {info:[{monto:'$monto', photo:'$photo', nombre:'$nombre', fecha:'$fecha', }]},
			       }
			    } 
			},
			// {
			// 	$lookup:{
			// 		from:"items",
			// 		localField:"itemId",
			// 		foreignField:"_id",
			// 		as:"ItemData"
			// 	}
			// }, 
			// {
			//     $unwind:{
			//         path:"$ItemData",
			//         preserveNullAndEmptyArrays:true
			//     }
			// },
			// {
			//     $project:{
			//         _id:1,
			//         userId:1,
			//         itemId:"$ItemData._id",
	 	// 			abono:1,
			//         monto:1,
			//         nombre:"$UserData.nombre",
			//         photo:"$UserData.photo",
			//         titulo:"$ItemData.titulo",
			//         valor:"$ItemData.valor",
			//         asignados:"$ItemData.asignados"
			//     }
			// },
			// {
			// 	$match:{
			// 		abono:true,
			// 		itemId,
			// 		userId:{
			// 			$ne:userIds
			// 		},
			// 	},
				
		 //    },
			// {
			//     $group : {
			//        _id : '$userId',
			//        deuda: { $sum: "$monto"}, 
			//        count: { $sum: 1 }, // for no. of documents count
			//        data: {
			//        	$addToSet: {info:[{nombre:'$nombre', photo:'$photo', valor:'$valor', asignados:'$asignados'}]},
			//        }
			//     } 
			// },
		], callback)
	}


}

module.exports = new userServices()