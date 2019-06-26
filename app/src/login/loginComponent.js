import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Alert, Platform, ImageBackground, ScrollView, AsyncStorage, Keyboard, Modal} from 'react-native'
import {style} from './style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
import {GoogleSignin} from 'react-native-google-signin';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import FCM, {NotificationActionType} from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "../push/Listeners";
import {PagedContacts} from 'react-native-paged-contacts';
let pg = new PagedContacts(); 
registerKilledListener(); 
export default class LoginComponent extends Component{
	constructor(props) {
	 super(props);
		this.state = {
			facebook:null,
			google:null,
			showPassword:false,
			modalVisible:false,
			token: "",
		};
	}

	async componentWillMount() {
		pg.requestAccess().then((granted) => {
			console.log(granted)
		});
		const {google} = this.state
		GoogleSignin.configure()
    	 
	}
	_signInRedes(e){
		const {navigate} = this.props.navigation 	
		const {token} = this.state
		if (e===1) {
			FBLoginManager.loginWithPermissions(["email"], function(error, data){
				/////////////////////////////////////////////    SAVE INFO IF IS ANDROID PLATFORM /////////////////////////////////////////////////////////
				if(Platform.OS === 'android'){
					if (!error) {
						let result = JSON.parse(data.profile);
						let accessToken1 = null
						let idUser1 = result.id
						let name1 = result.name
						let photo1 = result.picture.data.url
						let email1 = result.email
						let tipo1 = 'facebook'
						let acceso = 'suscriptor'
						console.log({accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, tipo:tipo1, tokenPhone:token})
						axios.post('/x/v1/user/facebook', {accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, username:email1, tipo:tipo1, acceso, tokenPhone:token})
						.then((e)=>{
							console.log(e.data)
							if (e.data.status==='SUCCESSNOEXISTE') {
								saveInfo(e.data.user)
								navigate('Terminos', {redes:true}) 
							}else{
								saveInfo(e.data.user)
								navigate('misPlanes') 
							}
							// if (e.data.code==1) {
							// 	if (e.data.user.categorias.length>1) {
							// 		saveInfo(e.data.user)
							// 		navigate('inicio') 
							// 	}else{
							// 		saveInfo(e.data.user)
							// 		navigate('editPerfil2') 
							// 	}
							// }
						})
						.catch((err)=>{
							console.log(err)
						})
					} else {
						console.log("Error: ", error);
					}
				}else{
					if (!error) {
						fetch(`https://graph.facebook.com/v2.12/me?fields=id,name,birthday,email,gender,picture.type(large)&access_token=${data.credentials.token}`)
				        .then((response) => response.json())
				        .then((result) => {
				        	let accessToken1 = null
							let idUser1 = result.id
							let name1 = result.name
							let photo1 = result.picture.data.url
							let email1 = result.email
							let tipo1 = 'facebook'
							let acceso = 'suscriptor'
							console.log({accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, tipo:tipo1, tokenPhone:token})
							axios.post('/x/v1/user/facebook', {accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, username:email1, tipo:tipo1, acceso, tokenPhone:token})
							.then((e)=>{
								console.log(e.data.user)
								if (e.data.status==='SUCCESSNOEXISTE') {
									saveInfo(e.data.user)
									navigate('Terminos', {redes:true}) 
								}else{
									saveInfo(e.data.user)
									navigate('misPlanes') 
								}
							})
				        })
				        .catch(() => {
				          console.log('ERROR')
				        })
				    }
				}
			})
			 	
		}else{
			GoogleSignin.signIn()
			.then((result) => {
				let {name, photo, email, id} = result.user
				// axios.post("user/redes", {tokenPhone, token:result.accessToken, username:email, email, tipo:'google', nombre:name, avatar:photo}).then((e)=>{
				// 	if (e.data.code==1) {
				// 		e.data.status ?this.props.login() :alert("Intenta Nuevamente")
				// 	}
				// })
				axios.post('/x/v1/user/facebook', {accessToken: result.accessToken, idUser: id, nombre:name, photo, email, tipo:"google", username:email, acceso:"suscriptor", tokenPhone:token})
				.then((e)=>{
					if (e.data.code==1) {
						if (e.data.user.categorias.length>1) {
							saveInfo()
							navigate('inicio') 
						}else{
							navigate('editPerfil2') 
						}
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			})
			.catch((err) => {
				alert(JSON.stringify(err))
			})
			.done();
		}
	}
	 
	async componentDidMount(){
	    registerAppListener(this.props.navigation);

	    try{
	      let result = await FCM.requestPermissions({badge: true, sound: true, alert: true});
	    } catch(e){
	      console.error(e);
	    }

	    FCM.getFCMToken().then(token => {
	    	this.setState({token: token || ""})
	    	console.log(token)
	    });

	    if(Platform.OS === 'ios'){
	      FCM.getAPNSToken().then(token => {
	        console.log("APNS TOKEN (getFCMToken)", token);
	          
	      });
	    }

	}
	 
	render(){
		const {navigate} = this.props.navigation
		const {showPassword, username, password, token} = this.state
		const {num} = this.props.screenProps
		console.log(num)
		return(
				<ScrollView keyboardDismissMode='on-drag' style={style.container}>
				 
				<ImageBackground style={style.fondoLogin}  source={num===0 ?require('../../splash0.jpg') :num===1 ?require('../../splash1.jpg') :num===2 ?require('../../splash2.jpg') :num===3 ?require('../../splash3.jpg') :num===4 &&require('../../splash4.jpg')} >
					<TouchableOpacity onPress={()=>navigate("Home")}>
						<Image
							style={style.imageLogin}
							width={140} // height will be calculated automatically
							source={require('../assets/images/logo.png')}
					   />
					</TouchableOpacity>
					<TextInput
				        style={[style.input, style.familia]}
				        onChangeText={(username) => this.setState({username})}
				        value={username}
				        underlineColorAndroid='transparent'
	           			placeholder="Email / Telefono"
	           			placeholderTextColor='#8F9093' 
	           			autoCapitalize = 'none'
	           			keyboardType='email-address'
	           			 
				    />
					<TextInput 
				        style={[style.input, style.familia]}
				        onChangeText={(password) => this.setState({password})}
				        value={password}
				        underlineColorAndroid='transparent'
	           			placeholder="Contraseña"
	           			placeholderTextColor="#8F9093" 
	           			secureTextEntry={showPassword ?false :true}
	           			autoCapitalize = 'none'
				    />
				    <TouchableOpacity onPress={()=>this.setState({showPassword:!showPassword})} style={style.BtniconPass}> 
				    	 <Icon name={showPassword ?'eye-slash' :'eye'} allowFontScaling style={style.iconPass} />
				    </TouchableOpacity>
				    <TouchableOpacity style={style.submit} onPress={this.handleSubmit.bind(this)}>
				    	<Text style={[style.textSubmit, style.familia]}>Iniciar Sesión</Text>
				    </TouchableOpacity>
				    <View style={style.logos}>
				    	{/*<Text style={style.text}>Recuérdame</Text>*/}
				    	<TouchableOpacity onPress={()=>navigate('editPassword')}>
				    		<Text style={[style.text, style.familia]}>¿Olvidaste tu contraseña?</Text>
				    	</TouchableOpacity>
				    </View>
				    <View style={style.logos}>
				      <TouchableOpacity onPress={()=>this._signInRedes(1)} >
				        <Image
							style={style.imageLogos}
							width={60} // height will be calculated automatically
							source={require('../assets/images/facebook.png')}
					    />
				      </TouchableOpacity>
				      <TouchableOpacity onPress={()=>this._signInRedes(2)} >
				       <Image
							style={style.imageLogos}
							width={60} // height will be calculated automatically
							source={require('../assets/images/google.png')}
					    />
				      </TouchableOpacity>
				    </View>  
				    <Text style={[style.text, style.familia]}>¿Aún no haces parte de Muneo? </Text>	
				     <TouchableOpacity onPress={()=> navigate('Registro', {tokenPhone:token})} style={style.signup_btn}>
	 					<Text style={[style.btnRegistro, style.familia]}>Registrate</Text>
	 				</TouchableOpacity>
				</ImageBackground>
				</ScrollView>
		)
	}
 
	handleSubmit(){
		const {username, password, token} = this.state
		const {navigate} = this.props.navigation
		axios.post('/x/v1/user/login/', {username, password, tokenPhone:token} )
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==0){
				Alert.alert(
	            'Opss!! Error',
	            'Datos incorrectos',
	              [
	                {text: 'OK', onPress: () => console.log('OK Pressed')},
	              ],
	              { cancelable: false }
	            )
			}else if (res.data.code==1){
				saveInfo(res.data.user)
				navigate('misPlanes')
			}else{
				Alert.alert(
	            'Revisa tus datos',
	            'Datos incorrectos',
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
}

const saveInfo = async (userInfo)=>{
	let id = JSON.stringify(userInfo._id)
	let nombre = JSON.stringify(userInfo.username)
	let notificacion = userInfo.notificacion ?JSON.stringify(userInfo.notificacion) :''
	try {
	    await AsyncStorage.setItem('userInfoId', id);
	    await AsyncStorage.setItem('userNombre', nombre);
	    await AsyncStorage.setItem('userInfoNotificacion', notificacion);
	} catch (error) {
	   console.log(error)
	}
}
 

