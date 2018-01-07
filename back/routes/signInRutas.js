'use strict';

let signInServices = require('./../services/signInServices.js');
let express = require('express');
let router = express.Router();


router.post('/', function(req,res){
	signInServices.post(req.body, function(err, Users){
		if(err || err==null){
			return res.send({"FAILURE":"ERROR EN LOS DATOS"})
		}else{
			return res.send(Users)
		}
	})
})

module.exports = router;