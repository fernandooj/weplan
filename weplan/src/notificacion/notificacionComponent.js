import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, AsyncStorage} from 'react-native'
import {style} from '../notificacion/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
import StarRating from 'react-native-star-rating';
import SocketIOClient from 'socket.io-client';
import {URL}  from '../../App.js';
import Toast 			 from 'react-native-simple-toast';
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
const TRACKER = new GoogleAnalyticsTracker("UA-129344133-1");
TRACKER.trackScreenView("notificacion");
export default class notificacionComponent extends Component{
	constructor(props) {
	  	super(props);
	  	this.state={
			notificacion:[],
			eliminar:false, /// muestra el boton de eliminar cada notificacion
			rating:0,
			notificacionAsignados:0
		}
		this.onReceivedMessage = this.onReceivedMessage.bind(this);
		this.onReceivedMessageCreador = this.onReceivedMessageCreador.bind(this);
	}
	
	componentWillMount = async()=>{
		this.socket = SocketIOClient(URL);
		this.socket.on(`notificacion`, this.onReceivedMessage);
		this.socket.on(`notificacionCostoCreador`, this.onReceivedMessageCreador); /// si el dueño del item tiene varias opciones para ingresar usuarios

 		axios.get('/x/v1/not/notificacion')
 		.then(res=>{ 
 			if (res.data.code===2) {
				this.props.navigation.navigate('Login')
				Toast.show('No éstas logueado')
			}else{
				let notificacionAsignados = res.data.notificacion==0 ?1 :2
 				this.setState({notificacion: res.data.notificacion, id:res.data.id, notificacionAsignados})
 			}
 		}) 
 		.catch(err=>{
 			console.log(err)
 		})
	}
 	onReceivedMessage(messages){
 		let notificacion = this.state.notificacion.filter((e)=>{
			if (e.id==messages.id) {e.valorItem=messages.valor}
			return e
		})
		this.setState({notificacion})
 	}
 	onReceivedMessageCreador(messages){
 		console.log(messages)
 		let notificacion = this.state.notificacion.filter((e)=>{
			if (e.idTipo==messages.id) {e.valorItem=messages.valor}
			return e
		})
		this.setState({notificacion})
 	}
	renderNotificacion(){
		const {navigate} = this.props.navigation
		const {id, notificacion} = this.state
 		return notificacion.map((e, key)=>{
 			let valor = '$ '+Number(e.valorItem).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
 			let estaPlan = e.infoPlan ?e.infoPlan.asignados.includes(id) :[]
 			console.log(estaPlan)
			return(
 				<View key={key} style={style.subContenedor}>
	 				<View style={style.contenedorNoti2}>
	 					<TouchableOpacity 
	 						onPress={e.tipo==2 &&((estaPlan || e.infoPlan.idUsuario===id) && e.infoPlan.activo===true && e.infoPlan.tipo=='suscripcion') ?()=>navigate('chat', e.idTipo) 
	 								:e.tipo==1 || e.tipo==5 ?()=>navigate('profile', {userId:e.idUser, planId:null}) 
	 								:e.tipo==3 || e.tipo==6 ?()=>navigate('item', {planId:e.infoItem.planId, tipo:e.tipo==3 ?1 :2}) :null } >
		 					<Image source={e.photo ?{uri:e.photo} :{uri:'https://appweplan.com/public/assets/logo.png'}} style={style.avatar} />
	 					</TouchableOpacity>
	 					<View>
	 						<TouchableOpacity onPress={e.tipo==2 ?()=>navigate('chat', e.idTipo) :e.tipo==1 || e.tipo==5 ?()=>navigate('profile', {userId:e.idUser, planId:null}) :null } >
				 				<Text style={[style.tituloNoti, style.familia]}>{e.nombre}</Text> 
				 				<Text style={[style.textoNotifica, style.familia]}>
				 					{
				 						e.tipo==1 ?'Te quiere agregar como amigo' 
				 						:e.tipo==2 ?`Te agregó al plan: ${e.titulo}` 
				 						:e.tipo==3 ?`Te agregó al articulo: ${e.titulo}. El valor para entrar es: ${valor}`
				 						:e.tipo==4 ?`Quiere acceder al articulo: ${e.titulo}. El valor para entrar es: ${valor}`
				 						:e.tipo==5 ?`Aceptó ser tu amigo`
				 						:e.tipo==6 ?`Aceptó ser parte del articulo: ${e.titulo}`
				 						:e.tipo==7 ?`Te agregó al articulo: ${e.titulo}`
				 						:e.tipo==8 ?`Se salio del plan: ${e.titulo}`
				 						:e.tipo==9 ?`No le entro al artículo: ${e.titulo}`
				 						:e.tipo==10 ?`Te abono en efectivo: ${e.titulo}`
				 						:e.tipo==11 ?`Tu abono de: ${e.titulo}, fue Aprobado`
				 						:e.tipo==12 ?`Tu abono de: ${e.titulo}, fue Rechazado`
				 						:e.tipo==13 ?`Cerró el plan: ${e.titulo}`
				 						:e.tipo==14 ?`Califica el plan: ${e.titulo}`
				 						:e.tipo==15 &&`el costo del artículo ${e.titulo} cambio`
				 					}
				 				</Text>
				 			</TouchableOpacity>
			 				{
								e.activo && e.tipo==14
								?<View style={style.contenedorNoti}>
									<StarRating
								        disabled={false}
								        maxStars={5}
								        rating={this.state.rating}
								        starSize={25}
								        selectedStar={(rating)=>this.handleSubmit(e.id, rating, 14, null, e.idUser)}
								    />
								</View>
								:e.activo && e.tipo!==14
								?<View style={style.contenedorNoti}> 
								 <TouchableOpacity  style={style.btnNoti} 
					 					onPress={
					 						e.tipo==1
					 						?()=>this.handleSubmit(e.id, e.idTipo, 1, e.token, e.idUser)
					 						:e.tipo==2
					 						?()=>this.handleSubmit(e.id, e.idTipo, 2, e.token, e.idUser)
					 						:e.tipo==3
					 						?()=>this.handleSubmit(e.id, e.idTipo, 3, e.token, e.idUser, e.valorItem, e.titulo, e.photo) 
					 						:e.tipo==4
					 						?()=>this.handleSubmit(e.id, e.idTipo, 4, e.token, e.idUser, e.valorItem, e.titulo, e.photo)
					 						:e.tipo==10
					 						?()=>this.handleSubmit(e.id, e.idTipo, 11, e.token, e.idUser, e.valorItem, e.titulo, e.photo)  
					 						:null  
					 					}>
					 					<Text  style={[style.textoNoti, style.familia]}> 
					 					{
					 						e.tipo==1  ? 'Agregar'
					 						:e.tipo==3 ?'Entrarle'
					 						:e.tipo==4 ?'Aceptarlo'
					 						:e.tipo==10 &&'Aceptar Pago'

					 					}
					 					</Text>
					 				</TouchableOpacity>
					 				<TouchableOpacity style={style.btnNoti}
					 					onPress={
					 						e.tipo==1
					 						?()=>this.handleCancel(e.id, e.idTipo, 1, null, e.idUser)
					 						:e.tipo==2
					 						?()=>this.handleCancel(e.id, e.idTipo, 2, null, e.idUser)
					 						:e.tipo==3
					 						?()=>this.handleCancel(e.id, e.idTipo, 3, e.token, e.idUser, e.valorItem, e.titulo, e.photo)
					 						:e.tipo==4
					 						?()=>this.handleCancel(e.id, e.idTipo, 4, null, e.idUser)
					 						:e.tipo==10
					 						?()=>this.handleCancel(e.id, e.idTipo, 11, e.token, e.idUser, null, e.titulo, e.photo)
					 						:null

					 					}
					 				>
					 					<Text style={[style.textoNoti, style.familia]}> Declinar</Text>
					 				</TouchableOpacity>
					 				{/*<Image source={require('./puntos.png')} style={style.puntos} />*/}
					 			</View>
					 			:<View>
					 			{/* contenedor puntos */}
					 			{
					 				e.btnEliminar
					 				&&<TouchableOpacity style={style.eliminarBtn} onPress={()=>this.elimina(e.id)}>
						 				<Text style={[style.eliminar, style.familia]}>Eliminar</Text>	
						 			</TouchableOpacity>
					 			}
					 			
					 			<TouchableOpacity style={style.puntosBtn} onPress={()=>this.muestraBtnEliminar(e.id, e.btnEliminar)}>
					 				<Image source={require('../assets/images/puntos.png')} style={style.puntos} />
					 			</TouchableOpacity>
					 			</View>
			 				}
			 				
			 			</View>
		 			</View>
		 			<View style={style.separador}></View>
		 		</View>
			)		  
 		})
	}
	handleSubmit(idNotificacion, idTipo, tipo, token, idUser, monto, titulo, imagen){
		axios.put('/x/v1/not/notificacion/'+idNotificacion+'/'+idTipo+'/'+tipo+'/'+idUser, {monto})
		.then(e=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.updateStado(idNotificacion)
				if (tipo==1) {
					sendRemoteNotification(tipo, token, 'Home', 'Aceptó ser tu amigo',  ', te agregó como amigo', null)
				}
				if (tipo==3) {
					sendRemoteNotification(tipo, token, 'Home', `Aceptaron tu item ${titulo}`,  ', esta dentro de tu item', imagen)
				}
				else if (tipo==4) {
					sendRemoteNotification(tipo, token, 'Home', 'Estas dentro de un item',  `, te agregó al item ${titulo}`, imagen)
				}
				else if (tipo==11) {
					sendRemoteNotification(tipo, token, 'Home', 'Aceptaron tu pago',  `, Aceptó tu pago por: ${titulo} `, imagen)
				}
				
			}else if(e.data.code==2){
				this.alerta('Opss!! Artículo Cerrado', 'El dueño del artículo ya lo ha terminado, y ya no puedes ingresar')
			}else{
				this.alerta('Opss!! revisa tus datos que falta algo', '')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////  muestra boton de eliminar
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	muestraBtnEliminar(id, btnEliminar){
		let notificacion = this.state.notificacion.filter(e=>{
			if(e.id==id) e.btnEliminar=!btnEliminar  
			return e
		})
		this.setState({notificacion})
	}
	render(){
		const {navigate} = this.props.navigation
		const {notificacionAsignados} = this.state
		console.log(notificacionAsignados)
		return(	
			<View style={style.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} texto={'Notificaciones'}  />
				{
					notificacionAsignados==1
					?<Image source={require('../assets/images/sinNotificaciones.png')} style={style.sinPlanes} />
					:notificacionAsignados==2
					?<ScrollView style={style.contenedorPlan}>
						{this.renderNotificacion()}
					</ScrollView>
					:<View></View>
				}
				
				<FooterComponent navigate={this.props.navigation} />	
			</View>
		)
	}
	elimina(id){
		axios.delete(`/x/v1/not/notificacion/${id}`)
		.then(e=>{
			if (e.data.code==1) {
				let notificacion = this.state.notificacion.filter(e=>{
					return e.id!==id
				})
				this.setState({notificacion})
			}
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
				if (tipo==11) {
					sendRemoteNotification(tipo, token, 'Home', `no Aceptaron tu pago`,  `, rechazo tu pago de: ${titulo}`, imagen)
				}
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	updateStado(id){
		let notificacion = this.state.notificacion.filter(e=>{
			if(e.id==id) e.activo=false  
			return e
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