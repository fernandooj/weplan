let express = require('express')
let router = express.Router();

let paisServices = require('../services/paisServices.js')


router.get('/', function(req,res){
	paisServices.get(function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})
router.get('/:pais', function(req,res){
	paisServices.getCiudad(req.params.pais, function(err, titulo){
		if (!err) {
			res.json({ status: 'SUCCESS', titulo }); 
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports = router;