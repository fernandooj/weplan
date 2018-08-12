module.exports = function(server){

	let io = require('socket.io')(server)
	let redis = require('redis');
	let cliente = redis.createClient()

	cliente.subscribe('chat')
	cliente.subscribe('notificacion')
	cliente.subscribe('editaPago')


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
	})
}