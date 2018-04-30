module.exports = function(server){

	let io = require('socket.io')(server)
	let redis = require('redis');
	let cliente = redis.createClient()

	cliente.subscribe('chat')


	io.on('connection', (socket)=>{
	 

	})

	cliente.on('message', (canal, info)=>{
		if (canal=='chat') {
			console.log('+++++++++++++++')
			let newInfo = JSON.parse(info)
			console.log(newInfo)
			io.emit('userJoined'+newInfo.planId, JSON.parse(info))
		}
	})
}