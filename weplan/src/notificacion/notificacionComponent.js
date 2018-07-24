import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import {NotiStyle} from '../notificacion/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'

export default class notificacionComponent extends Component{
	state={
		notificacion:[]
	}
	componentWillMount(){
 		axios.get('/x/v1/not/notificacion')
 		.then(e=>{ 
 			console.log(e.data.notificacion)
 			this.setState({notificacion: e.data.notificacion})
 		}) 
 		.catch(err=>{
 			console.log(err)
 		})
	}
 
	renderNotificacion(){
 		return this.state.notificacion.map((e, key)=>{
 			let valor = '$ '+Number(e.valorItem).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
 			if (e.activo==true) {
	 				return(
		 				<View key={key} style={NotiStyle.subContenedor}>
			 				<View style={NotiStyle.contenedorNoti2}>
				 				<Image source={{uri: e.photo}} style={NotiStyle.avatar} />
			 					<View>
					 				<Text style={NotiStyle.tituloNoti}>{e.nombre}</Text> 
					 				<Text style={NotiStyle.textoNotifica}>
					 					{
					 						e.tipo==1 ?'Te quiere agregar como amigo' 
					 						:e.tipo==2 ?`Te agrego al plan: ${e.titulo}` 
					 						:e.tipo==3 ?`Te agrego al item: ${e.titulo}. El valor para entrar es: ${valor}`
					 						:e.tipo==4 &&`Quiere acceder al item: ${e.titulo}. El valor para entrar es: ${valor}`
					 					}
					 				</Text>
					 				<View style={NotiStyle.contenedorNoti}>
						 				<TouchableOpacity  style={NotiStyle.btnNoti} 
						 					onPress={
						 						e.tipo==1
						 						?()=>this.handleSubmit(e.id, e.idTipo, 1, e.token, e.idUser)
						 						:e.tipo==2
						 						?()=>this.handleSubmit(e.id, e.idTipo, 2, e.token, e.idUser)
						 						:e.tipo==3
						 						?()=>this.handleSubmit(e.id, e.idTipo, 3, e.token, null, e.valorItem, e.titulo, e.photo) 
						 						:e.tipo==4
						 						?()=>this.handleSubmit(e.id, e.idTipo, 4, e.token, e.idUser, e.valorItem, e.titulo, e.photo) 
						 						:null  
						 					}>
						 					<Text  style={NotiStyle.textoNoti}> 
						 					{
						 						e.tipo==1  ? 'Agregar'
						 						:e.tipo==2 ? 'Entrarle'
						 						:e.tipo==3 ?'Entrarle'
						 						:e.tipo==4 &&'Aceptarlo'

						 					}
						 					</Text>
						 				</TouchableOpacity>
						 				<TouchableOpacity  style={NotiStyle.btnNoti}
						 					onPress={
						 						e.tipo==1
						 						?()=>this.handleCancel(e.id, e.idTipo, 1, null, e.idUser)
						 						:e.tipo==2
						 						?()=>this.handleCancel(e.id, e.idTipo, 2, null, e.idUser)
						 						:e.tipo==3
						 						?()=>this.handleCancel(e.id, e.idTipo, 3, e.token, e.idUser, e.valorItem, e.titulo, e.photo)
						 						:e.tipo==4
						 						?()=>this.handleCancel(e.id, e.idTipo, 4, null, e.idUser)
						 						:null

						 					}
						 				>
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
		return(	<View style={NotiStyle.contenedor}>
		 
					<CabezeraComponent navigate={navigate} url={'inicio'} texto={'Notificaciones'}  />
					<ScrollView style={NotiStyle.contenedorPlan}>
						{this.renderNotificacion()}
					</ScrollView>
					<FooterComponent navigate={navigate} />	
				</View>
			
		)
	}
	handleSubmit(idNotificacion, idTipo, tipo, token, idUser, monto, titulo, imagen){
		axios.put('/x/v1/not/notificacion/'+idNotificacion+'/'+idTipo+'/'+tipo+'/'+idUser, {monto})
		.then(e=>{
			if (e.data.code==1) {
				this.updateStado(idNotificacion)
				if (tipo==1) {
					sendRemoteNotification(tipo, token, 'Home', 'Aceptaron ser tu amigo',  ', te agrego como amigo', null)
				}
				if (tipo==3) {
					sendRemoteNotification(tipo, token, 'Home', `Aceptaron tu item ${titulo}`,  ', esta dentro de tu item', imagen)
				}
				else if (tipo==4) {
					sendRemoteNotification(tipo, token, 'Home', 'Estas dentro de un item',  `, te agrego al item ${titulo}`, imagen)
				}
				
			}else if(e.data.code==2){
				this.alerta('Opss!! Articulo Cerrado', 'El dueño del articulo ya lo ha terminado, y ya no puedes ingresar')
			}else{
				this.alerta('Opss!! revisa tus datos que falta algo', '')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	handleCancel(idNotificacion, idTipo, tipo, token, idUser, monto, titulo, imagen){
		axios.put('/x/v1/not/notificacion/cancelar/'+idNotificacion+'/'+idTipo+'/'+tipo+'/'+idUser, {monto})
		.then(e=>{
			if (e.data.code==1) {
				this.updateStado(idNotificacion)
				if (tipo==3) {
					sendRemoteNotification(tipo, token, 'Home', `no Aceptaron tu item`,  `, salio del item ${titulo}`, imagen)
				}
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
		console.log({notificacion, id})
		this.setState({notificacion})
	}
	alerta(titulo, subtitulo){
		Alert.alert(
			titulo,
			subtitulo,
			[
			{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
		)
	}
	 
}