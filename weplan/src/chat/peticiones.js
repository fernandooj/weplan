import React, {Component} from 'react'
import { Alert } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import moment from 'moment'

export const pedirImagen = (planId) =>{
	console.log(planId)
	const options = {
		  quality: 1.0,
		  maxWidth: 500,
		  maxHeight: 500,
		  storageOptions: {
		    skipBackup: true
		  }
		};
	ImagePicker.showImagePicker(options, (res) => {
	  console.log('res = ', res);
		if (res.uri) {
		    let source = { uri: res.uri };
		    let imagen = {
			    uri: res.uri,
			    type: res.type,
			    name: res.fileName,
			    path: res.path
			};
			alerta(res.fileName, imagen, subirImagen, 6, planId )	 
		}
	});
}

export const pedirPdf = (planId) =>{
	let imagen = null;
	DocumentPicker.show({
      	filetype: [DocumentPickerUtil.pdf()],
   		},(error,res) => {
   			let imagen = {
			    uri: res.uri,
			    type: res.type,
			    name: res.fileName,
			    path: res.uri
			};
   			console.log(imagen)
			let data = new FormData();
			data.append('imagen', imagen);
			data.append('tipo', 7);
			data.append('planId', planId);
		    axios({
		          method: 'post', //you can set what request you want to be
		          url: '/x/v1/cha/chat/documento',
		          data: data,
		          headers: { 
		            'Accept': 'application/json',
		            'Content-Type': 'multipart/form-data'
		          }
		        })
		    .then(res=>{  
		      console.log(res.data)     
		      if(res.data.code!==1){ 
		        alertaError()
		      }
		    })
		    .catch(err=>{
		      console.log(err)
		    })

   //  	if (error) {
   //  		console.log(error)
   //  	}else{
   //  		let imagen = {
			//     uri: res.uri,
			//     type: res.type,
			//     name: res.fileName,
			//     path: res.uri
			// };
			// if (imagen!==null){
			// 	console.log(res.fileName)
			// 	alerta(res.fileName, imagen, subirDocumento, 7, planId )
			// }
   //  	}
   });	
}
 
export const pedirContacto = (asignados, usuariosAsignados, planId)=>{	
	let data = []
	usuariosAsignados.filter(e=>{
		data.push(e.nombre)
	})
	alerta(data.join(), usuariosAsignados, subirContacto, 4, planId )
}

export const pedirMapa = (lat, lng, planId)=>{
	Alert.alert(
		'Seguro deseas enviar este mapa',
		'',
	[
	    {text: 'Mejor despues', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	    {text: 'Enviar', onPress: () => handleSubmitMap(lat, lng, 5, planId)},
	],
		{ cancelable: false }
	)
 }

const alerta = (info, data, funcion, tipo, planId) =>{
	console.log(tipo)
	Alert.alert(
	  'Seguro deseas enviar',
	  info,
	  [
	    {text: 'Mejor despues', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	    {text: 'Enviar', onPress: () => funcion(data, tipo, planId)},
	  ],
	  { cancelable: false }
	);
}

const subirContacto=(usuariosAsignados, tipo, planId)=>{
	const fecha = moment().format('h:mm')
	console.log(planId)
	usuariosAsignados.map(e=>{
		axios.post('/x/v1/cha/chat/', {contactoId:e.id, cNombre:e.nombre, cPhoto:e.photo, tipo, fecha, planId})
	    .then(res=>{  
	     	console.log(res.data)     
	     	if(res.data.code!==1){ 
		        alertaError()
		    }
	    })
	    .catch(err=>{
	      console.log(err)
	    })
	}) 
}

const handleSubmitMap = (lat, lng, tipo, planId) =>{
	axios.post('/x/v1/cha/chat/', {lat, lng, tipo, planId})
    .then(res=>{  
      	console.log(res.data)     
      	if(res.data.code!==1){ 
        alertaError()
      }
    })
	.catch(err=>{
		console.log(err)
	})
}



const subirImagen = (imagen, tipo, planId)=>{
	let data = new FormData();
	data.append('imagen', imagen);
	data.append('tipo', tipo);
	data.append('planId', planId);
     axios({
          method: 'post', //you can set what request you want to be
          url: '/x/v1/cha/chat/documento',
          data: data,
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        })
    .then(res=>{  
      console.log(res.data)     
      if(res.data.code!==1){ 
        alertaError()
      }
    })
    .catch(err=>{
      console.log(err)
    })
}

const subirDocumento=(imagen, tipo, planId)=>{
	console.log(imagen)
	let data = new FormData();
	data.append('imagen', imagen);
	data.append('tipo', tipo);
	data.append('planId', planId);
     axios({
          method: 'post', //you can set what request you want to be
          url: '/x/v1/cha/chat/documento',
          data: data,
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        })
    .then(res=>{  
      console.log(res.data)     
      if(res.data.code!==1){ 
        alertaError()
      }
    })
    .catch(err=>{
      console.log(err)
    })
}


const alertaError = () =>{
	Alert.alert(
      'Opss!! revisa tus datos que falta algo',
      '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
}

export default {pedirImagen, pedirPdf, subirContacto, pedirMapa}