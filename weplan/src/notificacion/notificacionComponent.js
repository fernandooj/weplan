import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {NotiStyle} from '../notificacion/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'


export default class notificacionComponent extends Component{
	state={
		notificacion:[]
	}
	componentWillMount(){
 		axios.get('/x/v1/not/notificacion/user/get/')
 		.then(e=>{ 
 			console.log(e.data.notificacion)
 			let notificacion = e.data.notificacion 
 			this.setState({notificacion})
 		}) 
 		.catch(err=>{
 			console.log(err)
 		})
	}
 
	renderNotificacion(){
 		return this.state.notificacion.map((e, key)=>{
 			if (e.estado==true) {
	 				return(
		 				<View key={key}>
			 				<View style={NotiStyle.contenedorNoti}>
				 				<Image source={{uri: e.tipo==1 ?e.photo :e.tipo==2 ?e.imagenPlan :e.tipo==3 ?e.imagenItem :null}} style={NotiStyle.avatar} />
			 					<View>
					 				<Text style={NotiStyle.tituloNoti}>{e.nombre}</Text> 
					 				<Text style={NotiStyle.textoNoti}>
					 					{
					 						e.tipo==1 
					 						?'Te quiere agregar como amigo' 
					 						:e.tipo==2 ?`Te agrego al plan: ${e.nombrePlan}`  
					 						:e.tipo==3 ?`Te agrego al item: ${e.nombreItem}` :null}
					 				</Text>
					 				<View style={NotiStyle.contenedorNoti}>
						 				<TouchableOpacity  style={NotiStyle.btnNoti} 
						 					onPress={
						 						e.tipo==1
						 						?()=>this.handleSubmit(e.id, e.idAmigoUser, 1, e.token, e.idUser, 'Home', 'Te aceptaron como amigo',  'Acepto tu solicitud', e.photo)
						 						:e.tipo==2
						 						?()=>this.handleSubmit(e.id, e.idPlan, 2, e.token, e.idUser, 'Home', 'Aceptaron ser parte del plan',  `Acepto tu solicitud para pertener al plan: ${e.nombrePlan}`, e.imagenPlan)
						 						:e.tipo==3
						 						?()=>this.handleSubmit(e.id, e.idItem, 3, e.token, e.idUser, 'Home', 'Aceptaron ser parte del item',  `Acepto tu solicitud para pertener al item: ${e.nombreItem}`, e.imagenItem)

						 						:null
						 					}>
						 					<Text  style={NotiStyle.textoNoti}> Agregar</Text>
						 				</TouchableOpacity>
						 				<TouchableOpacity  style={NotiStyle.btnNoti}>
						 					<Text style={NotiStyle.textoNoti} onPress={this.declinar}> Declinar</Text>
						 				</TouchableOpacity>
						 			</View>
					 			</View>
				 			</View>
				 			<View style={NotiStyle.separador}></View>
				 		</View>
	 				)
 			}else{
 				return(null) }
 		})
	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={NotiStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} texto={'Notificaciones'} />
				<View style={NotiStyle.subContenedor}>
					{this.renderNotificacion()}
				</View>	
			</View>
		)
	}
	declinar(){

	}
	handleSubmit(idNotificacion, idTipo, tipo, token, idUser, pagina, titulo, mensaje, imagen){
 
		axios.put('/x/v1/not/notificacion/'+idNotificacion+'/'+idTipo+'/'+tipo+'/'+idUser)
		.then(e=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.updateStado(idNotificacion)
				sendRemoteNotification(tipo, token, pagina, titulo, mensaje, imagen)
			}else{
				Alert.alert(
				  'Opss!! revisa tus datos que falta algo',
				  '',
				  [
				    {text: 'OK', onPress: () => console.log('OK Pressed')},
				  ],
				  { cancelable: false }
				)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	updateStado(id){
		let notificacion = this.state.notificacion.filter(e=>{
			return e.id!=id
		})
		this.setState({notificacion})
	}
	 
}