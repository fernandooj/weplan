import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, Alert, Keyboard, AsyncStorage, Platform} from 'react-native'
import {style} from '../ajustes/style'
import axios from 'axios'
import CabezeraComponent from './cabezera.js'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {URL} from '../../App.js'
import FCM  from "react-native-fcm";
import Share from 'react-native-share';
import Icon from 'react-native-fa-icons';
export default class ajustesComponent extends Component{
	state={
		menus:[
			{method:1, label:'Amigos', 		 	value:'ajustesAmigos'},
			{method:1, label:'Planes públicos', value:'planesPublicos'},
			{method:1, label:'Facturación', 	value:'facturacion'},
			{method:3, label:'Código QR', 		value:'abrirQr'},
			{method:1, label:'Contacto', 		value:'contacto'},
			//{method:1, label:'Privacidad',  	value:'privacidad'},
			//{method:1, label:'General', 	 	value:'general'},
			{method:2, label:'Cerrar sesión',   value:'closeSession'},
		],
		delay: 300,
      	result: 'No result',
      	modalVisible:false
	}
	async componentWillMount(){
		let guia_inicio   = await AsyncStorage.getItem('ajustes');
		this.setState({guia_inicio})
		Keyboard.dismiss()
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
				<TouchableOpacity style={style.perfil} onPress={()=>navigate('perfil')}>
					<Image source={{uri: perfil.photo ?perfil.photo :`${URL}/public/img/plan.jpg`}}  style={style.avatar} />
					<Text style={[style.username, style.familia]}>{perfil.nombre}</Text>
					<Text style={[style.username, style.familia]}>{perfil.username}</Text>
					 
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
					<TouchableOpacity style={style.btnMenu} onPress={e.method==1 ?() => navigate(e.value) :e.method==2 ?this.closeSession.bind(this) :this.abrirQr.bind(this)}>
						<Text style={[style.familia, style.txtMenu]}>{e.label} </Text>
					</TouchableOpacity>
 
					{/* SEPARADOR */}
					<View style={style.separador}></View>
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
		          <Text style={[style.centerText, style.familia]}>
		            Scanea el QR de tu amigo
		          </Text>
		        }
		        bottomContent={
		          <View style={style.containerHecho}>
	    		<TouchableOpacity  style={style.btnHecho} onPress={()=>this.setState({modalVisible:false})}>
			    	<Text  style={[style.hecho, style.familia]}>!Listo!</Text>
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
			<View style={style.contenedor}>
				{
					typeof this.state.guia_inicio!=='string'  &&<GuiaInicio number={14} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Ajustes' />
				{this.renderQr()}		
				<View style={style.subContenedor}>
					{this.renderPerfil()}
					{this.renderMenu()}
				</View>	
				<TouchableOpacity onPress={()=>this.share()}>
					<Icon name='share-alt' style={style.share} />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>this.share()}>
					<Text>Compartir</Text>
				</TouchableOpacity>
			</View>
		)
	}
	share(){
		let url = Platform.OS==='android' ?'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.weplan&ddl=1&pcampaignid=web_ddl_1' :"https://itunes.apple.com/us/app/we-plan/id1421335318?ls=1&mt=8"
		const shareOptions = {
		    title: 'Compartir',
		    url,
		    social: Share.Social.WHATSAPP
		};
		 Share.open(shareOptions)
		.then((res) => { console.log(res) })
		.catch((err) => { err && console.log(err); });
	}
	closeSession(){
		const {navigate} = this.props.navigation
		axios.get('/x/v1/logout/')
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==1){
				saveInfo()
				navigate('Login')
				FCM.setBadgeNumber(0);  
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
		await AsyncStorage.setItem('badge', '0');
		await AsyncStorage.setItem('badgeArray', '[]');
	    await AsyncStorage.setItem('userInfoId', '0');
	} catch (error) {
	   console.log(error)
	}
}
 
