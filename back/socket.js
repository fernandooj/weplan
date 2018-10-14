module.exports = function(server){

	let io = require('socket.io')(server)
	let redis = require('redis');
	let cliente = redis.createClient()

	cliente.subscribe('chat')          		      ////// actualiza el chat
	cliente.subscribe('notificacion')  	     	  ////// actualiza el punto de notificaciones
	cliente.subscribe('editaPago')     		 	  ////// actualiza el pago del chat 
	cliente.subscribe('notificacionCosto')   	  ////// actualiza el pago en la pagina notificaciones
	cliente.subscribe('itemCosto')                ////// actualiza el pago en la pagina items
	cliente.subscribe('notificacionCostoCreador') ////// actualiza la informacion de la pagina notificaciones cuando el creador va a aceptar los usuarios


	io.on('connection', (socket)=>{
	 

	})

	cliente.on('message', (canal, info)=>{
		if (canal=='chat') {
			console.log('+++++++++++++++')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit('chat'+newInfo.planId, JSON.parse(info))
		}
		if (canal==='notificacion'){
			console.log('----------------')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`editProfile${newInfo.userId}`, true)
		}
		if (canal==='editaPago'){
			console.log('**************')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`editPago${newInfo.planId}`, JSON.parse(info))
		}
		if (canal==='notificacionCosto'){
			console.log('##############')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`notificacion`, JSON.parse(info))
		}
		if (canal==='itemCosto'){
			console.log('///////////////')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`itemCosto${newInfo.planId}`, JSON.parse(info))
		}
		if (canal==='notificacionCostoCreador'){
			console.log('&&&&&&&&&&&&&&&')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`notificacionCostoCreador`, JSON.parse(info))
		}
	})
}