'use strict';

//////////////////////////////////////////////////////////////////////
///////////***********     llamo a moongoose        ****//////////////
//////////////////////////////////////////////////////////////////////

let mongoose = require('mongoose');
let moment   = require('moment');
let Schema = mongoose.Schema;


//////////////////////////////////////////////////////////////////////////////
////////***********     creo el esquema / categorias        ****//////////////
//////////////////////////////////////////////////////////////////////////////
let Categoria = new Schema({
	name:        String,
	slug:        String,
	descripcion: String,
	estatus:     Boolean,
	Categoria: {type: Schema.Types.ObjectId, ref:"Categoria"},
	UsuarioCrea: {type: Schema.Types.ObjectId, ref:"User"},
	UsuarioModifica: {type: Schema.Types.ObjectId, ref:"User"},
	createdAt: {type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
});



//////////////////////////////////////////////////////////////////////////////
////////***********    exporto el esquema        ****/////////////////////////
//////////////////////////////////////////////////////////////////////////////
module.exports= mongoose.model('Categoria', Categoria)