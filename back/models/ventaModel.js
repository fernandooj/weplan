'use strict';
//////////////////////////////////////////////////////////////////////
///////////***********     llamo a moongoose        ****//////////////
//////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let moment   = require('moment');
let Schema   = mongoose.Schema;

//////////////////////////////////////////////////////////////////////////////
////////***********     creo el esquema / categorias        ****//////////////
//////////////////////////////////////////////////////////////////////////////
let Venta = new Schema({
	direccion:      String,
	telefono:       String,
	email:          String,
	mensaje:        String,
	estado:         String,
	tipo:           String,
	libroId:        { type: Schema.ObjectId, ref:'Libro'},
	libroId2:       { type: Schema.ObjectId, ref:'Libro'},
	tituloId:       { type: Schema.ObjectId, ref:'Titulo'},
	tituloId2:      { type: Schema.ObjectId, ref:'Titulo'},
	usuarioId:      { type: Schema.ObjectId, ref:'User'},
	usuarioId2:     { type: Schema.ObjectId, ref:'User'},
	conversacionId: { type: Schema.ObjectId, ref:'Conversacion'},
	createdAt:  { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	updatedAt:  { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
});

//////////////////////////////////////////////////////////////////////////////
////////***********    exporto el esquema        ****/////////////////////////
//////////////////////////////////////////////////////////////////////////////
module.exports= mongoose.model('Venta', Venta)