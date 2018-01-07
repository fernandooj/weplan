let express = require('express')
let router = express.Router();

let resenaServices = require('../services/resenaService.js')


router.get('/', function(req,res){
	resenaServices.get(function(err, resena){
		if (!err) {
			res.json({ status: 'SUCCESS', resena }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

router.get('/:tituloId', function(req,res){
	resenaServices.getByIdTitulo(req.params.tituloId, function(err, resena){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', resena }); 
		}
	})
})

router.post('/', function(req, res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		resenaServices.create(req.body, req.user, function(err, resena){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', message: 'Titulo Creado', resena });
			}
		})
	}		
})
router.put('/', function(req, res){

})
router.delete('/', function(req,res){

})

module.exports = router;