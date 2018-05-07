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
 			let notificacion = e.data.notificacion.map((item)=>{
				return {
					id 		    : item._id,
					idAmigoUser : item.idAmigoUser ?item.idAmigoUser._id 				:null,
					idUser      : item.idUsuarioAsigna ?item.idUsuarioAsigna._id        :null,
					username    : item.idUsuarioAsigna ?item.idUsuarioAsigna.username   :null,
					photo   	: item.idUsuarioAsigna ?item.idUsuarioAsigna.photo      :null,
					nombre 	    : item.idUsuarioAsigna ?item.idUsuarioAsigna.nombre     :null,
					token  	 	: item.idUsuarioAsigna ?item.idUsuarioAsigna.tokenPhone :null,
					idItem   	: item.idItem  ?item.idItem._id    :null,
					nombreItem  : item.idItem  ?item.idItem.titulo :null,
					tipo 		: item.tipo,
					estado  	: item.estado,
				}
			})
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
				 				<Image source={{uri: e.photo}} style={NotiStyle.avatar} />
			 					<View>
					 				<Text style={NotiStyle.tituloNoti}>{e.nombre}</Text> 
					 				<Text style={NotiStyle.textoNoti}>{e.tipo==1 ?'Re quiere agregar como amigo' :e.tipo==2 ?`Quiere acceder al item: ${e.nombreItem}` :null}</Text>
					 				<View style={NotiStyle.contenedorNoti}>
						 				<TouchableOpacity  style={NotiStyle.btnNoti} 
						 					onPress={
						 						e.tipo==1
						 						?()=>this.handleSubmit(e.id, e.idAmigoUser, 1, e.token, e.idUser)
						 						:e.tipo==2
						 						?()=>this.handleSubmit(e.id, e.idItem, 2, e.token, e.idUser)
						 						:null
						 					}>
						 					<Text  style={NotiStyle.textoNoti}> Agregar</Text>
						 				</TouchableOpacity>
						 				<TouchableOpacity  style={NotiStyle.btnNoti}>
						 					<Text style={NotiStyle.textoNoti}> Declinar</Text>
						 				</TouchableOpacity>
						 			</View>
					 			</View>
				 			</View>
				 			<View style={NotiStyle.separador}></View>
				 		</View>
	 				)
 			}else{
 				return(null)
 			}
 		})
	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={NotiStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'Home'} texto={'Notificaciones'} />
				<View style={NotiStyle.subContenedor}>
					{this.renderNotificacion()}
				</View>	
			</View>
		)
	}
	handleSubmit(idNotificacion, idTipo, tipo, token, idUser){
		console.log(token)
		axios.put('/x/v1/not/notificacion/'+idNotificacion+'/'+idTipo+'/'+tipo+'/'+idUser)
		.then(e=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.updateStado(idNotificacion)
				sendRemoteNotification(4, token, 'Home')
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