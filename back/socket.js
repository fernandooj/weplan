module.exports = function(server){

	let io = require('socket.io')(server)
	let redis = require('redis');
	let cliente = redis.createClient()

	cliente.subscribe('chat')
	cliente.subscribe('notificacion')


	io.on('connection', (socket)=>{
	 

	})

	cliente.on('message', (canal, info)=>{
		if (canal=='chat') {
			console.log('+++++++++++++++')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit('userJoined'+newInfo.planId, JSON.parse(info))
		}
		if (canal==='notificacion'){
			console.log('----------------')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit(`editProfile${newInfo.userId}`, true)
		}
	})
}