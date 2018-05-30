'use strict'

let express = require('express')
let router = express.Router()
let planServices = require('../services/planServices.js')
let fs = require('fs')
let path = require('path')
let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')
let Jimp = require("jimp");
var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));


router.get('/', (req, res)=>{
	planServices.get((err, planes)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS',  planes, code:1 });	
		}
	})
})

router.get('/:pago', (req, res)=>{
	//console.log(req.session.usuario.categorias)
	if (req.params.pago==='pago') {
		planServices.getByPago((err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });
				//console.log(planes)	
			}
		})	
	}else{
		planServices.getById(req.params.clientes, (err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', message: planes, code:1 });	
			}
		})
	}
})
 


router.get('/getbyid/:userId', (req, res)=>{
	planServices.getByIdPlan(req.params.userId, (err, plan)=>{
		if (err) {
			res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
		}else{
			res.json({ status: 'SUCCESS', plan, code:1 });	
		}
	})
})


router.get('/getbyUserId/misPlanes', (req, res)=>{
	planServices.getById(req.session.usuario.user._id, (err, planes)=>{
			if (err) {
				res.json({ status: 'ERROR', message: 'no se pudo cargar los planes', code:0 });
			}else{
				res.json({ status: 'SUCCESS', planes, code:1 });	
			}
		})
})

 


router.post('/', function(req, res){
	if(req.session.usuario===undefined || req.session.usuario.user==null){
        res.json({status:'FAIL', user: 'SIN SESION', code:0 })
    }else{
    	planServices.create(req.body, req.session.usuario.user._id, (err, plan)=>{
			if(err){
				res.json({err})
			}else{
				res.json({ status: 'SUCCESS', message: plan, code:1 });	
			}
		})
    }
})

const ubicacion     =  '../../front/docs/public/uploads/plan/'
router.put('/web', (req, res)=>{
	let url = `${req.protocol}://${req.get('Host')}/public/uploads/`
	let id = req.body.id[0].length > 2 ?req.body.id[0] :req.body.id 
	let rutaImagenOriginal  = [] 
	let rutaImagenResize    = [] 
	let rutaImagenMiniatura = []  
	if (req.files.imagen) {
		req.files.imagen.forEach(e=>{
			let extension = e.name.split('.').pop()
			let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
			let fullUrl = `${ubicacion}Original_${fecha}_${randonNumber}.${extension}`
			

			fs.rename(e.path, path.join(__dirname, fullUrl))


			let rutasImagenOriginal = `${url}plan/Original_${fecha}_${randonNumber}.${extension}`
			let rutasImagenResize = `${url}plan/Resize_${fecha}_${randonNumber}.${extension}`
			let rutasImagenMiniatura = `${url}plan/Miniatura_${fecha}_${randonNumber}.${extension}`

			

			rutaImagenOriginal.push(rutasImagenOriginal)
			rutaImagenResize.push(rutasImagenResize)
			rutaImagenMiniatura.push(rutasImagenMiniatura)
			resizeImagenes(rutasImagenOriginal, randonNumber, extension)
		})	
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/plan.png'
	}
	planServices.uploadImage(id, rutaImagenOriginal, rutaImagenResize, rutaImagenMiniatura, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });		
		}
	})
})

router.put('/', (req, res)=>{

	let rutaImagenOriginal  = [] 
	let rutaImagenResize    = [] 
	let rutaImagenMiniatura = [] 
	
	if (req.files.imagen) {
		let extension = req.files.imagen.name.split('.').pop()
		let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
		let fullUrl = `${ubicacion}Original_${fecha}_${randonNumber}.${extension}`
			
		fs.rename(e.path, path.join(__dirname, fullUrl))

		let rutasImagenOriginal = `${url}plan/Original_${fecha}_${randonNumber}.${extension}`
		let rutasImagenResize = `${url}plan/Resize_${fecha}_${randonNumber}.${extension}`
		let rutasImagenMiniatura = `${url}plan/Miniatura_${fecha}_${randonNumber}.${extension}`


		rutaImagenOriginal.push(rutasImagenOriginal)
		rutaImagenResize.push(rutasImagenResize)
		rutaImagenMiniatura.push(rutasImagenMiniatura)
		resizeImagenes(rutasImagenOriginal, randonNumber, extension)
	
	}else{
		ruta = req.protocol+'://'+req.get('Host') + '/plan.png'
	}
	planServices.uploadImage(req.body.id, ruta, (err, plan)=>{
		if(err){
			res.json({err})
		}else{
			res.json({ status: 'SUCCESS', message: plan, code:1 });	
			
		}
	})
})

const ubicacionJimp =  '../front/docs/public/uploads/plan/'
const resizeImagenes = (ruta, randonNumber, extension) =>{
	console.log(ruta)
	Jimp.read(ruta, function (err, imagen) {
	    if (err) throw err;
	    imagen.resize(720, Jimp.AUTO)             
		.quality(90)                          
		.write(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`);
	});	

	setTimeout(function(){
		sizeOf(`${ubicacionJimp}Resize_${fecha}_${randonNumber}.${extension}`)
	    .then(dimensions => { 
	    	console.log(dimensions)
		  	let width  = dimensions.width
		  	let height = dimensions.height
		  	let x; 
		  	let y; 
		  	let w; 
		  	let h; 

		  	if (width>height) {
		  		console.log(1)
		  		x = (width*10)/100
			  	y = (width*10)/100
			  	w = (((height*100)/100)-y)
			  	h = (((height*100)/100)-y)
		  	}else{
				x = (height*10)/100
			  	y = (height*10)/100
			  	w = (width*90)/100
			  	h = (width*90)/100
		  	}
		  	
			Jimp.read(ruta, function (err, imagen) {
			    if (err) throw err;
			    imagen.resize(800, Jimp.AUTO)             
				.quality(90)                 
				.crop(x,y,w,h)                
				.write(`${ubicacionJimp}Miniatura_${fecha}_${randonNumber}.${extension}`);
			});	
		})
	.catch(err => console.error(err));
	},2000)
	

	 
 
}

 
router.get('/suma/totales/plan', (req, res)=>{
	planServices.sumaPlan(req.session.usuario.user._id, (err, pago)=>{
		if(err){
			res.json({status: 'FAIL', err, code:0})
		}else{
			
	 
			let abonoTrue = pago.filter(e=>{
				if (e._id.abono!==false) return e
			})

			let data1 = abonoTrue.filter(e=>{
				if(e.data[0].info[5]!=req.session.usuario.user._id) {e.total=e.total-e.data[0].info[7]}
				return e
			})
	 		let data = data1.map(e=>{
				return{
					id:e._id.id,
					nombrePlan:e.data[0].info[4],
					nombreUsuario:e.data[0].info[1],
					imagen:e.data[0].info[3],
					fecha:e.data[0].info[8],
					total: e.total
				}
			})

			let map = data.reduce((prev, next) =>{
			  if (next.id in prev) {
			    prev[next.id].total += next.total;
			  } else {
			     prev[next.id] = next;
			  }
			  return prev;
			}, {});

			let result = Object.keys(map).map(id => map[id]);

			res.json({result})
		}
	})
})




module.exports = router