'use strict'

let mongoose = require('mongoose')
let moment = require('moment')
let Schema = mongoose.Schema;

 

let chatSchema = Schema({
	userId     : {type: Schema.Types.ObjectId, ref:'User'},
	planId     : {type: Schema.Types.ObjectId, ref: 'Plan'},
	mensaje    : String,
	tipo       : Number,
	estado     : Boolean,
	itemId     : {type: Schema.Types.ObjectId, ref: 'Item'}, 
	encuestaId : {type: Schema.Types.ObjectId, ref: 'Encuesta'},
	contactoId : {type: Schema.Types.ObjectId, ref: 'User'},
	lat        : String,
	lng        : String,
	documento  : String,
	createdAt  :  {type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
})


module.exports = mongoose.model('Chat', chatSchema)


// itemId     si se guarda un item 		 ===> tipo 2
// encuestaId si se guarda una encuesta  ===> tipo 3
// contactoId si se guarda un contacto   ===> tipo 4
// lat lng    si se envio un mapa        ===> tipo 5
// documento  si se envio una imagen  	 ===> tipo 6
// documento  si se envio un documento   ===> tipo 7


 