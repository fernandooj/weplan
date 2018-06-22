import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Alert, Platform, ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

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
    	////////////////////////////////////////////////////////////////////////////////////
    	GoogleSignin.configure({
    		webClientId: '744639294163-194p4cc8a9hlfreaoef9u1091pccb452.apps.googleusercontent.com',
	        offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
	    })
    	.then(()=>{
			GoogleSignin.currentUserAsync().then((user) => {
				this.setState({user: user});
			}).done();	   
    	})
	}
	 
	_signInRedes(e){
		const {navigate} = this.props.navigation 	
		const {token} = this.state
		if (e===1) {
			FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
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
								navigate('inicio') 
							}else{
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
			})	
		}else{
			GoogleSignin.signIn()
			.then((result) => {
				console.log(result);
				let accessToken = result.accessToken
				let idUser = result.id
				let nombre = result.name
				let photo = result.photo
				let email = result.email
				let username = result.email
				let tipo = 'google'
				let acceso = 'suscriptor'
				console.log({accessToken, idUser, nombre, photo, email, tipo})
				axios.post('/x/v1/user/facebook', {accessToken, idUser, nombre, photo, email, tipo, username, acceso, tokenPhone:this.state.token})
				.then((e)=>{
					if (e.data.code==1) {
						if (e.data.user.categorias.length>1) {
							navigate('inicio') 
						}else{
							navigate('editPerfil2	') 
						}
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			})
			.catch((err) => {
				console.log('WRONG SIGNIN', err);
			})
			.done();
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
		return(
			<ImageBackground style={LoginStyle.fondo} source={require('./fondo.png')} >
				<View>
					<Image
						style={LoginStyle.image}
						width={220} // height will be calculated automatically
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
			    	<Text style={LoginStyle.text}>Recuérdame</Text>
			    	<Text style={LoginStyle.text}>¿Olvidaste tu contraseña?</Text>
			    </View>
			    <View style={LoginStyle.logos}>
			      <TouchableOpacity onPress={()=>this._signInRedes(1)} >
			        <Icon name='facebook' style={LoginStyle.facebook} />
			      </TouchableOpacity>
			      <TouchableOpacity onPress={()=>this._signInRedes(2)} >
			        <Icon name='google' style={LoginStyle.google} />
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
			console.log(res.data.code)
			if(res.data.code==0){
				alert('error en los datos')
			}else if (res.data.code==1){
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


 

