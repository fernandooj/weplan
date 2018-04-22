'use strict'


let express = require('express')
let router = express.Router();
let amigoUserService = require('../services/amigoUserServices.js');
let userServices 	 = require('./../services/usersServices.js') 

router.get('/', function(req, res){
	amigoUserService.get(function(err, respuesta){
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			res.json({status:'SUCCESS', mensaje:respuesta, code:1})    
		}
	})
})

router.get('/:id', function(req, res){
	let id = req.session.usuario.user._id
	amigoUserService.getById(id, function(err, asignados){
		if (err) {
			res.json({status:'FAIL', err, code:0})    
		}else{
			//todos(resultado[0].asignados)
			res.json({status:'SUCCESS', asignados, code:1})    
		}
	})
})

// let todos = function(asignados){
// 	userServices.getActivos(function(err, todos){

// 		let combinaUsuarios =  asignados.concat(todos)		 

// 		//console.log(result);
			
// 		if (err) {
// 		res.json({status:'FAIL', err, code:0})  
// 		}else{
// 			// const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
// 	// const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))

// 	// const myDiff = makeSymmDiffFunc((x, y) => x._id === y._id)

// 	// const result = myDiff(asignados, todos)

// 	// console.log(asignados)
// 	// console.log("+++++++")
// 	// console.log(todos)
// 	// console.log("+++++++")
// 	// console.log(result)
// 		}
// 		//res.json({status:'SUCCESS', asignados:asignados, code:1, noAsignados})    
// 	})
	
// }


router.post('/', function(req, res){
	let id = req.session.usuario.user._id
	amigoUserService.buscarUsuario(id, function(err, usuarios){
		if (usuarios) {
			var une = usuarios.asignados.concat(req.body.asignados)
			amigoUserService.update(une, id, function(err, usuarios){
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', mensaje:usuarios, code:1})    
				}
			})
		}else{
			amigoUserService.create(req.body, id, function(err, usuarios){
				if (err) {
					res.json({status:'FAIL', err, code:0})    
				}else{
					res.json({status:'SUCCESS', mensaje:usuarios, code:1})    
				}
			})
		}
	})
	 
	
})
module.exports = router