import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Alert, Platform, ImageBackground, ScrollView, AsyncStorage} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
 
//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FCM, {NotificationActionType} from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "../push/Listeners";
 
registerKilledListener();
export default class LoginComponent extends Component{
	constructor(props) {
	 super(props);
		this.state = {
			facebook:null,
			google:null,
			token: "",
		};
	}

	componentWillMount() {
		const {google} = this.state
    	////////////////////////////////////////////////////////////////////////////////////
    	/////////////////////		LOAD GOOGLE DATA 	///////////////////////////////////
   //  	////////////////////////////////////////////////////////////////////////////////////
   //  	GoogleSignin.configure({
   //  		webClientId: '744639294163-194p4cc8a9hlfreaoef9u1091pccb452.apps.googleusercontent.com',
	  //       offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
	  //   })
   //  	.then(()=>{
			// GoogleSignin.currentUserAsync().then((user) => {
			// 	this.setState({user: user});
			// }).done();	   
   //  	})
	}
	 
	_signInRedes(e){
		const {navigate} = this.props.navigation 	
		const {token} = this.state
		if (e===1) {
			console.log(Platform)
			FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
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
							console.log(e.data.user)
							if (e.data.code==1) {
								if (e.data.user.categorias.length>1) {
									saveInfo(e.data.user)
									navigate('inicio') 
								}else{
									saveInfo(e.data.user)
									navigate('editPerfil2') 
								}
							}
						})
						.catch((err)=>{
							console.log(err)
						})
					} else {
						console.log("Error: ", error);
					}
				}else{
					fetch(`https://graph.facebook.com/v2.12/me?fields=id,name,birthday,email,address,age_range,gender,picture{url}&access_token=${data.credentials.token}`)
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
							if (e.data.code==1) {
								if (e.data.user.categorias.length>1) {
									navigate('inicio') 
									saveInfo(e.data.user)
								}else{
									saveInfo(e.data.user)
									navigate('editPerfil2') 
								}
							}
						})
			        })
			        .catch(() => {
			          reject('ERROR')
			        })
				}
			})	
		}else{
			// GoogleSignin.signIn()
			// .then((result) => {
			// 	console.log(result);
			// 	let accessToken = result.accessToken
			// 	let idUser = result.id
			// 	let nombre = result.name
			// 	let photo = result.photo
			// 	let email = result.email
			// 	let username = result.email
			// 	let tipo = 'google'
			// 	let acceso = 'suscriptor'
			// 	console.log({accessToken, idUser, nombre, photo, email, tipo})
			// 	axios.post('/x/v1/user/facebook', {accessToken, idUser, nombre, photo, email, tipo, username, acceso, tokenPhone:this.state.token})
			// 	.then((e)=>{
			// 		if (e.data.code==1) {
			// 			if (e.data.user.categorias.length>1) {
			// 				saveInfo()
			// 				navigate('inicio') 
			// 			}else{
			// 				navigate('editPerfil2') 
			// 			}
			// 		}
			// 	})
			// 	.catch((err)=>{
			// 		console.log(err)
			// 	})
			// })
			// .catch((err) => {
			// 	console.log('WRONG SIGNIN', err);
			// })
			// .done();
		}
	}
	 
	async componentDidMount(){
	    registerAppListener(this.props.navigation);

	    try{
	      let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
	    } catch(e){
	      console.error(e);
	    }

	    FCM.getFCMToken().then(token => {
	      console.log(token);
	      this.setState({token: token || ""})
	    });

	    if(Platform.OS === 'ios'){
	      FCM.getAPNSToken().then(token => {
	        console.log("APNS TOKEN (getFCMToken)", token);
	      });
	    }
	}

	
	render(){
		const {navigate} = this.props.navigation
		const {num} = this.props.screenProps
		console.log(num)
		return(
				<ImageBackground style={LoginStyle.fondo}  source={num===0 ?require('../../splash0.jpg') :num===1 ?require('../../splash1.jpg') :num===2 ?require('../../splash2.jpg') :num===3 ?require('../../splash3.jpg') :num===4 &&require('../../splash4.jpg')} >
					<View>
						<Image
							style={LoginStyle.image}
							width={140} // height will be calculated automatically
							source={require('./logo.png')}
					   />
					</View>
					<TextInput
				        style={LoginStyle.input}
				        onChangeText={(username) => this.setState({username})}
				        value={this.state.username}
				        underlineColorAndroid='transparent'
	           			placeholder="Email / Telefono"
	           			placeholderTextColor="#8F9093" 
	           			autoCapitalize = 'none'
				    />
					<TextInput
				        style={LoginStyle.input}
				        onChangeText={(password) => this.setState({password})}
				        value={this.state.password}
				        underlineColorAndroid='transparent'
	           			placeholder="Contraseña"
	           			placeholderTextColor="#8F9093" 
	           			secureTextEntry
	           			autoCapitalize = 'none'
				    />
				    <TouchableOpacity style={LoginStyle.submit} onPress={this.handleSubmit.bind(this)}>
				    	<Text style={LoginStyle.textSubmit}>Iniciar Sesión</Text>
				    </TouchableOpacity>
				    <View style={LoginStyle.logos}>
				    	{/*<Text style={LoginStyle.text}>Recuérdame</Text>*/}
				    	<TouchableOpacity onPress={()=>navigate('editPassword')}>
				    		<Text style={LoginStyle.text}>¿Olvidaste tu contraseña?</Text>
				    	</TouchableOpacity>
				    </View>
				    <View style={LoginStyle.logos}>
				      <TouchableOpacity onPress={()=>this._signInRedes(1)} >
				        <Image
							style={LoginStyle.image}
							width={60} // height will be calculated automatically
							source={require('./facebook.png')}
					    />
				      </TouchableOpacity>
				      <TouchableOpacity onPress={()=>this._signInRedes(2)} >
				       <Image
							style={LoginStyle.image}
							width={60} // height will be calculated automatically
							source={require('./google.png')}
					    />
				      </TouchableOpacity>
				    </View>  
				    <Text style={LoginStyle.text}>¿Aún no haces parte de Weplan? </Text>	
				     <TouchableOpacity onPress={()=> navigate('Registro', {tokenPhone:this.state.token})} style={LoginStyle.signup_btn}>
	 					<Text style={LoginStyle.btnRegistro}>Registrate</Text>
	 				</TouchableOpacity>
				</ImageBackground>
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
	            'revisa tus datos que falta algo',
	              [
	                {text: 'OK', onPress: () => console.log('OK Pressed')},
	              ],
	              { cancelable: false }
	            )
			}else if (res.data.code==1){
				saveInfo(res.data.user)
				navigate('inicio')
			}else{
				Alert.alert(
	            'Opss!! Error',
	            'revisa tus datos que falta algo',
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
	let notificacion = JSON.stringify(userInfo.notificacion)
	console.log(id)
	try {
	    await AsyncStorage.setItem('userInfoId', id);
	    await AsyncStorage.setItem('userInfoNotificacion', notificacion);
	} catch (error) {
	   console.log(error)
	}
}
 

