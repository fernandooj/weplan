let express = require('express')
let router = express.Router();

let ciudadServices = require('../services/ciudadServices.js')


router.get('/', (req,res)=>{
	ciudadServices.get((err, ciudad)=>{
		if (err) {
			res.json({ status: 'FAIL', message: err });			
		}else{
			ciudad = ciudad.map(e=>{
				return {label:e.name}
			})
			res.json({ status: 'SUCCESS', ciudad }); 
 
		}
	})
})
 

module.exports = router;