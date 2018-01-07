let express = require('express')
let router = express.Router();
let resumenServices = require('./../services/resumenServices.js')


///////////////////		obtiene todos los resumenes //////////////////////
router.get('/:usuarioId', function(req,res){
	if(req.params.usuarioId=='1'){
		if(req.user){
			/////////////////////		TOTAL LIBROS 		/////////////////////////////
		resumenServices.totalLibros(req.user._id, function(err, totalLibros){
			if (!err) {

				/////////////////////		TOTAL VENDIDO USUARIO 1 		/////////////////////////////
				resumenServices.vendido1(req.user._id, function(err, totalVendido1){
					if (!err) {

						/////////////////////		TOTAL VENDIDO USUARIO 2 		/////////////////////////////
						resumenServices.vendido2(req.user._id, function(err, totalVendido2){
							if (!err) {

								/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
								resumenServices.compartido1(req.user._id, function(err, totalCompartido1){
									if (!err) {

										/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
										resumenServices.compartido2(req.user._id, function(err, totalCompartido2){
											if (!err) {

												/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
												resumenServices.perfil(req.user._id, function(err, perfil){
													if (!err) {
														res.json({ status: 'SUCCESS', infoUsuario: [{totalLibros, totalVendido: (totalVendido1+totalVendido2), totalCompartido: (totalCompartido1+totalCompartido2), perfil }]});
													}else{
														res.json({ status: 'FAIL', message: 'err' });
													}
												})		
											}else{
												res.json({ status: 'FAIL', message: 'err' });
											}
										})	
									}else{
										res.json({ status: 'FAIL', message: 'err' });
									}
								})	
							}else{
								res.json({ status: 'FAIL', message: 'err' });
							}
						})
					}else{
						res.json({ status: 'FAIL', message: 'err' }); 
					}
				}) 
			}else{
				res.json({ status: 'FAIL', message: 'err' }); 
			}
		})
		}else{
			res.json({ status: 'FAIL', message: 'Usuario no logueado' }); 
		}
		
	}else{
		/////////////////////		TOTAL LIBROS 		/////////////////////////////
		resumenServices.totalLibros(req.params.usuarioId, function(err, totalLibros){
			if (!err) {

				/////////////////////		TOTAL VENDIDO USUARIO 1 		/////////////////////////////
				resumenServices.vendido1(req.params.usuarioId, function(err, totalVendido1){
					if (!err) {

						/////////////////////		TOTAL VENDIDO USUARIO 2 		/////////////////////////////
						resumenServices.vendido2(req.params.usuarioId, function(err, totalVendido2){
							if (!err) {

								/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
								resumenServices.compartido1(req.params.usuarioId, function(err, totalCompartido1){
									if (!err) {

										/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
										resumenServices.compartido2(req.params.usuarioId, function(err, totalCompartido2){
											if (!err) {

												/////////////////////		TOTAL COMPARTIDO USUARIO 1 		/////////////////////////////
												resumenServices.perfil(req.params.usuarioId, function(err, perfil){
													if (!err) {
														res.json({ status: 'SUCCESS', infoUsuario: [{totalLibros, totalVendido: (totalVendido1+totalVendido2), totalCompartido: (totalCompartido1+totalCompartido2), perfil }]});
													}else{
														res.json({ status: 'FAIL', message: 'err' });
													}
												})		
											}else{
												res.json({ status: 'FAIL', message: 'err' });
											}
										})	
									}else{
										res.json({ status: 'FAIL', message: 'err' });
									}
								})	
							}else{
								res.json({ status: 'FAIL', message: 'err' });
							}
						})
					}else{
						res.json({ status: 'FAIL', message: 'err' }); 
					}
				}) 
			}else{
				res.json({ status: 'FAIL', message: 'err' }); 
			}
		})
	}	
})


router.get('/:usuarioId/:tipo', function(req,res){
	if(req.params.usuarioId=='1'){
		if(req.user){
			resumenServices.libros(req.user._id, function(err, libros){
				if(!err){
					resumenServices.deseados(req.user._id, function(err, deseados){
						if(!err){
							res.json({status:'SUCCESS', libros, deseados})
						}else{
							res.json({ status: 'FAIL', message: err }); 
						}
					})
				}else{
					res.json({ status: 'FAIL', message: err }); 
				}
			})
		}else{
			res.json({ status: 'FAIL', message: 'Usuario no logueado' }); 
		}
	}else{
		if(req.params.tipo==0){
			resumenServices.libros(req.params.usuarioId, function(err, libros){
				if(!err){
					resumenServices.deseados(req.params.usuarioId, function(err, deseados){
						if(!err){
							res.json({status:'SUCCESS', libros, deseados})
						}else{
							res.json({ status: 'FAIL', message: err }); 
						}
					})
				}else{
					res.json({ status: 'FAIL', message: err }); 
				}

			})
		}
	}

})
 
module.exports = router;


