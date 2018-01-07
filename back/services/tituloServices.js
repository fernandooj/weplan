///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Titulo = require('./../models/tituloModel.js');


//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////

class tituloServices{
	constructor(){

	}
	get(callback){
		Titulo.find({}).populate('genero').populate('categoria').exec(callback)
	}
	getBuscador(callback){
		Titulo.find({}, callback)
	}
	create(titulo, user, extension, callback){
		let newTitulo = new Titulo({
			name  : titulo.name, 
			slug  : titulo.slug,
			autor : titulo.autor,
			categoria : titulo.categoriaId,
			usuario : user,
			extension: extension
		})
		newTitulo.save(callback)
	}

}

module.exports = new tituloServices();