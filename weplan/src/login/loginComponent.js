import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Alert,  ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import { GiftedChat } from 'react-native-gifted-chat';



export default class LoginComponent extends Component{
	constructor(props) {
	 super(props);
	  this.state = {
	  	 facebook:null,
	  	 google:null,
	  };
	}

	componentWillMount() {
		const {facebook, google} = this.state
    	////////////////////////////////////////////////////////////////////////////////////
    	/////////////////////		LOAD GOOGLE DATA 	///////////////////////////////////
    	////////////////////////////////////////////////////////////////////////////////////
   //  	GoogleSignin.configure({
   //  		webClientId: '932062372725-h6ekncc3jltm4320c1tj9hljfis26hpe.apps.googleusercontent.com',
	  //       offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
	  //   })
   //  	.then(()=>{
			// GoogleSignin.currentUserAsync().then((user) => {
			// 	console.log(user);
			// 	this.setState({user: user});
			// }).done();	   
   //  	})
	}
	_signInGoogle(){
		console.log('google')
		// const {navigate} = this.props.navigation 	
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
		// 	axios.post('/x/v1/user/google', {accessToken, idUser, nombre, photo, email, tipo, username, acceso})
		// 	.then((e)=>{
		// 		console.log(e)
		// 		if (e.data.code==1) {
		// 			navigate('editPerfil2') 
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
	_signInFacebook(){
		console.log('facebook')
		const {navigate} = this.props.navigation 
		FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
		if (!error) {
			var result = JSON.parse(data.profile);
			console.log(result);
			console.log(result.id);
			let accessToken1 = null
			let idUser1 = result.id
			let name1 = result.name
			let photo1 = result.picture.data.url
			let email1 = result.email
			let tipo1 = 'facebook'
			let acceso = 'suscriptor'
			console.log({accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, tipo:tipo1})
			axios.post('/x/v1/user/facebook', {accessToken:accessToken1, idUser:idUser1, nombre:name1, photo:photo1, email:email1, username:email1, tipo:tipo1, acceso})
			.then((e)=>{
				console.log(e) 
				if (e.data.code==1) {
					navigate('editPerfil2') 
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		} else {
			console.log("Error: ", error);
			}
		})		
	}
	
	render(){
		const {navigate} = this.props.navigation
		var user = { _id: this.state.userId || -1 };
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
			    />
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(password) => this.setState({password})}
			        value={this.state.password}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry
			    />
			    <TouchableOpacity style={LoginStyle.submit} onPress={this.handleSubmit.bind(this)}>
			    	<Text style={LoginStyle.textSubmit}>Sign In</Text>
			    </TouchableOpacity>
			    <View style={LoginStyle.logos}>
			    	<Text style={LoginStyle.text}>Recuérdame</Text>
			    	<Text style={LoginStyle.text}>¿Olvidaste tu contraseña?</Text>
			    </View>
			    <View style={LoginStyle.logos}>
			      <TouchableOpacity onPress={this._signInFacebook.bind(this)} >
			        <Icon name='facebook' style={LoginStyle.facebook} />
			      </TouchableOpacity>
			      <TouchableOpacity onPress={this._signInGoogle.bind(this)} >
			        <Icon name='google' style={LoginStyle.google} />
			      </TouchableOpacity>
			    </View>  
			    <Text style={LoginStyle.text}>¿Aún no haces parte de Weplan? </Text>	
			     <TouchableOpacity onPress={()=> navigate('Registro')} style={LoginStyle.signup_btn}>
 					<Text style={LoginStyle.btnRegistro}>Registrate</Text>
 				</TouchableOpacity>
			</ImageBackground>
		)
	}
 
	handleSubmit(){
		const {username, password} = this.state
		const {navigate} = this.props.navigation
		axios.post('/x/v1/user/login/', {username, password} )
		.then((res)=>{
			console.log(res.data.code)
			if(res.data.code==0){
				alert('error en los datos')
			}else if (res.data.code==1){
				navigate('inicio')
			}else{
				alert('error en los datos')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}	 
}


 

