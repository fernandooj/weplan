module.exports = function(server){

let io = require('socket.io')(server)
let redis = require('redis');
let cliente = redis.createClient()

cliente.subscribe('chat')


io.on('connection', (socket)=>{
 

})

	///////////////////// CADA VEZ QUE UN USUARIO INGRESA
 
		

		cliente.on('message', (canal, info)=>{
			if (canal=='chat') {
				console.log('+++++++++++++++')
				let newInfo = JSON.parse(info)
			io.emit('userJoined'+newInfo.planId, JSON.parse(info))
			}
			
		})
	

 


}