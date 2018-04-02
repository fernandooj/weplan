module.exports = function(server){

let io = require('socket.io')(server)
let redis = require('redis');
let cliente = redis.createClient()

cliente.subscribe('chat')


conexion = 0; 
io.on('connection', (socket)=>{
	// conexion ++;
	// console.log('hay: ' + conexion + ' conexiones')

	// 	///////////////////// CADA VEZ QUE UN USUARIO SALE
	// socket.on('disconnect', (dis)=>{
	// 	conexion --;
 //    	console.log('disconnected, quedan: ' +conexion+ ' conexiones')
 //    })

})

	///////////////////// CADA VEZ QUE UN USUARIO INGRESA
	//socket.on('userJoined', (mensaje)=>{})
		//conexion ++;
		// console.log('mensaje: ' + mensaje)
		// console.log('hay: ' + conexion + ' conexiones')
		// io.emit('userJoined', JSON.parse(mensaje))
		

		cliente.on('message', (canal, info)=>{
			if (canal=='chat') {
				console.log('+++++++++++++++')
				let newInfo = JSON.parse(info)
				console.log(newInfo)
			io.emit('userJoined'+newInfo.planId, JSON.parse(info))
			}
			
		})
	



 







  // io.on('connection', (socket)=>{
  //   console.log('connected')
  //   // socket.on('disconnect', (dis)=>{
  //   //  console.log('disconnected')
  //   // })

  //   socket.on('userJoined', (mensaje)=>{
  //     console.log('mensaje: ' + mensaje)
  //     io.emit('userJoined', mensaje)
  //   })
  // })


}