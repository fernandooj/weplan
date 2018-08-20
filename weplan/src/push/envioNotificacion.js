import {Platform} from 'react-native'
import firebaseClient from  "./FirebaseClient";
import axios from 'axios'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////	ENVIO LA NOTIFICACION						
//////////////	tipo 1==> quiere ser amigo, tipo 2 ==> acepta ser amigo	, tipo 3 ==> quiere acceder a un item, tipo 4 ==> Aceptaron a un usuario dentro de un item						
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sendRemoteNotification = (tipo, token, targetScreen, titulo, mensaje, imagen)=> {

	axios.get('/x/v1/user/profile') 
	.then((res)=>{
	    let body;
	    let nombre = tipo==14 ?'' :res.data.user.user.nombre
	    let photo  = res.data.user.user.photo
	    imagen = imagen==null ? photo :imagen
	    if(Platform.OS === 'android'){
	    	console.log({tipo, token, targetScreen, titulo, mensaje, imagen})
	        body = {
	        "to": token,
	      	"data": {
	            "custom_notification": {
					//title: tipo==1 ?'Tienes una solicitud de amistad' :tipo==2 ?'Te aceptaron como amigo' :tipo==3 ?'Un usuario quiere acceder a un item' :tipo==4 ?'te han aceptado en el item' :null,
					title: titulo,
					//body : tipo==1 ?`${nombre}, quiere agregarte como amigo` :tipo==2 ?`${nombre}, acepto tu solicitud` :tipo==3 ?`${nombre}, te incluyo en el item` :null,
					body : `${nombre} ${mensaje}`,
					priority:"high",
					icon:"ic_notif",
					targetScreen:targetScreen,
					color:"#00ACD4",
					big_picture:imagen,
					picture:imagen,
					image:imagen,
					large_icon: imagen,
					show_in_foreground: true
	            }
	        },
	    		"priority": 10
	      }
	    } else {
	    	 console.log('ios')
			body = {
				to: token,
				notification: {
		          title: "Simple FCM Client",
		          body: "Click me to go to detail",
		          sound: "default"
		        },
		        data: {
		          targetScreen: "detail"
		        },
		        priority: 10
    		}
		}
    	firebaseClient.send(JSON.stringify(body), "notification");
    })
    .catch(err=>{
    	console.log(err)
    })
}