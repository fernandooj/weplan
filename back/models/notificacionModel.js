'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////

let mongoose = require('mongoose')
let moment   = require('moment')
let Schema = mongoose.Schema


/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////

let notificacionSchema = mongoose.Schema({
	idUsuario 			: { type: Schema.Types.ObjectId, ref:'User'},
	idUsuarioAsigna 	: { type: Schema.Types.ObjectId, ref:'User'},
	idAmigoUser 		: { type: Schema.Types.ObjectId, ref:'amigoUser'},
	idItem 				: { type: Schema.Types.ObjectId, ref:'Item'},
	idPlan 				: { type: Schema.Types.ObjectId, ref:'Plan'},
	idPago 				: { type: Schema.Types.ObjectId, ref:'Pago'},
	tipo      			: Number,
	activo    			: Boolean,
	eliminado  			: Boolean,
	createdAt 			: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
	updatedAt 			: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss')},
})


module.exports = mongoose.model('Notificacion', notificacionSchema)

/// idUsuario 		==> El usuario que se tiene asignado la notificacion
/// idUsuarioAsigna ==> El usuario quien crea la notificacion
/// tipo 1   ==> notificacion cuando se quiere agregar a un amigo
/// tipo 2   ==> notificacion cuando se le agrego a un plan
/// tipo 3   ==> notificacion cuando se le agrego a un item
/// tipo 4   ==> notificacion cuando se quiere ser parte de un item
/// tipo 5   ==> notificacion cuando acepto ser amigo 
/// tipo 6   ==> notificacion cuando se acepto ser parte del item 
/// tipo 7   ==> notificacion cuando te aceptaron como parte del item
/// tipo 8   ==> notificacion cuando se salio del plan 
/// tipo 9   ==> notificacion cuando se salio del item
/// tipo 10  ==> notificacion cuando se realizo pago en efectivo 
/// tipo 11  ==> notificacion cuando se acepto el pago en efectivo 
/// tipo 12  ==> notificacion cuando el dueño del item hizo un abono 
/// tipo 13  ==> notificacion cuando se cerro el plan
/// tipo 14  ==> notificacion cuando se quiere calificar un item
/// tipo 15  ==> notificacion cuando se edito el costo de un item
/// tipo 16  ==> notificacion cuando se envio un mensaje al chat
/// tipo 17  ==> notificacion cuando se envia una imagen al chat
/// tipo 17  ==> notificacion cuando se envio un mapa al chat
/// tipo 17  ==> notificacion cuando se envia un contacto al chat
/// tipo 17  ==> notificacion cuando se envia un documento al chat
/// tipo 17  ==> notificacion cuando se envia una encuensta al chat
/// tipo 17  ==> notificacion cuando se envia un articulo al chat

/// activo ===> queda la notificacion en estado innactivo si es false no muestra los botones
/// eliminado ===> elimina la notificacion del front, pero aca se sigue viendo