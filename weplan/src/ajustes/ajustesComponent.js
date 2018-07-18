import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet, Modal, Alert} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
import CabezeraComponent from './cabezera.js'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {sendRemoteNotification} from '../push/envioNotificacion.js'

export default class ajustesComponent extends Component{
	state={
		menus:[
			{method:1, label:'Amigos', 		 	value:'ajustesAmigos', },
			{method:3, label:'Qr', 		 		value:'abrirQr', },
			{method:1, label:'Notificaciones',  value:'notificacion'},
			{method:1, label:'My Wallet', 	 	value:'wallet'},
			{method:1, label:'Metodos de Pago', value:'metodos'},
			{method:2, label:'Cerrar Sesion',   value:'closeSession'},
		],
		delay: 300,
      	result: 'No result',
      	modalVisible:false
	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user)
			this.setState({perfil:res.data.user.user})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	renderPerfil(){
		const {perfil} = this.state
		const {navigate} = this.props.navigation
		if (perfil!==undefined) {
			return(
				<TouchableOpacity style={AjustesStyle.perfil} onPress={()=>navigate('perfil')}>
					<Image source={{uri: perfil.photo}} style={AjustesStyle.avatar} />
					<Text style={AjustesStyle.username}>{perfil.nombre}</Text>
					<Text style={AjustesStyle.username}>{perfil.username}</Text>
					<Text style={AjustesStyle.separador}></Text>
				</TouchableOpacity>
			)
		}else{
			return(
				<Text>Cargando</Text>
			)
		}
	}
	renderMenu(){
		const {navigate} = this.props.navigation
		return this.state.menus.map((e, key)=>{
			return(
				<View key={key} >
					<TouchableOpacity style={AjustesStyle.btnMenu} onPress={e.method==1 ?() => navigate(e.value) :e.method==2 ?this.closeSession.bind(this) :this.abrirQr.bind(this)}>
						<Text>{e.label} </Text>
					</TouchableOpacity>
 
					{/* SEPARADOR */}
					<View style={AjustesStyle.separador}></View>
				</View>
			)
		})
	}
	abrirQr(){
		this.setState({modalVisible:true})
	}
	onSuccess(e) {
		if (e.data) {
			Alert.alert(
				'Hemos enviado la notificacion al admin del plan',
				'',
				[
					{text: 'Si, Enviar', onPress: () => this.handleSubmit(e.data) },
					{text: 'No, Mejor luego', onPress: () => console.log('OK Pressed')},
				],
				{ cancelable: false }
			)
		}
  	}

 
  	handleSubmit(id){
  		axios.get(`x/v1/users/getOneUser/${id}`)
  		.then(e=>{
  			console.log(e.data.user.tokenPhone)
  			if (e.data.code==1) {
				axios.post('/x/v1/ami/amigoUser', {asignado: id} )
				.then((e2)=>{
					 
					if (e2.data.status=='SUCCESS') {
						sendRemoteNotification(1, e.data.user.tokenPhone, "notificacion", 'Tienes una solicitud de amistad', ', Quiere agregarte como amigo', null)
						this.setState({modalVisible:false})
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
				.catch((err)=>{
					console.log(err)
				})
  			}
  		})

  	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// MODAL CON LA CAMARA DE QR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  	renderQr(){
  		return(
  			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					console.log('Modal has been closed.');
	        }}>
  			<QRCodeScanner
		        onRead={this.onSuccess.bind(this)}
		        topContent={
		          <Text style={AjustesStyle.centerText}>
		            Scanea el Qr de tu usuario
		          </Text>
		        }
		        bottomContent={
		          <View style={AjustesStyle.containerHecho}>
	    		<TouchableOpacity  style={AjustesStyle.btnHecho} onPress={()=>this.setState({modalVisible:false})}>
			    	<Text  style={AjustesStyle.hecho}>!Listo!</Text>
			    </TouchableOpacity>
			</View> 
		        }
		    />
		    
		    </Modal>
  		)
  	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={AjustesStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} />
				{this.renderQr()}		
				<View style={AjustesStyle.subContenedor}>
					{this.renderPerfil()}
					{this.renderMenu()}
				</View>	
			</View>
		)
	}






	closeSession(){
		const {navigate} = this.props.navigation
		axios.get('/x/v1/logout/')
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==1){
				saveInfo()
				navigate('Login')
			}else if (res.data.code==1){
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}

const saveInfo = async (userInfo)=>{
	try {
	    await AsyncStorage.setItem('userInfo', '0');
	} catch (error) {
	   console.log(error)
	}
}
 
