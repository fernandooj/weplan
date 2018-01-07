let express = require('express')
let router = express.Router();
let fs = require('fs');
let path = require('path');

let tituloServices = require('../services/tituloServices.js')


router.get('/', function(req,res){
	tituloServices.get(function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

router.get('/:buscador', function(req,res){
	tituloServices.getBuscador(function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo: titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

router.post('/:name/:autor/:categoriaId', function(req, res){
	let extension = req.files.files.name.split('.').pop();
	console.log(req.files)
	tituloServices.create(req.params, req.user._id, extension, function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Titulo Creado', titulo });
			fs.rename(req.files.files.path, path.join(__dirname, "../../front/docs/public/uploads/libro/"+titulo._id+"."+extension));
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})	
})
router.put('/', function(req, res){

})
router.delete('/', function(req,res){

})

module.exports = router;