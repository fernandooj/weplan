import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert, ScrollView, ImageBackground, Linking} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FBSDK, {LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

// let accessToken = ''
// let id 	  = ''
// let name  = ''
// let photo = ''
// let email = ''
// let tipo  = ''
export default class LoginComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 facebook:null,
	  	 google:null
	  };

	}

	componentWillMount() {
		const {facebook, google} = this.state
		////////////////////////////////////////////////////////////////////////////////////
		/////////////////////		LOAD FACEBOOK DATA 	///////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////
		if (facebook) {
	    	AccessToken.getCurrentAccessToken().then(
	          (data) => {
	          	console.log(data)
	            const infoRequest = new GraphRequest(
	              '/me?fields=name,picture,id,email,friends&access_token',
	              null,
	              this._responseInfoCallback
	            );
	            new GraphRequestManager().addRequest(infoRequest).start();
	          }
	        )
	    }	
    	////////////////////////////////////////////////////////////////////////////////////
    	/////////////////////		LOAD GOOGLE DATA 	///////////////////////////////////
    	////////////////////////////////////////////////////////////////////////////////////
    	GoogleSignin.configure({
    		webClientId: '986592850899-ha783khufam6ta5oad6hamb9lqpf3280.apps.googleusercontent.com',
	        offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
	    })
    	.then(()=>{
    		if (google) {
    			GoogleSignin.currentUserAsync().then((user) => {
    				console.log(user);
    				this.setState({user: user});
    			}).done();	
    		}   
    	})
		 
	}
	_signInGoogle(){
		const {navigate} = this.props.navigation
		GoogleSignin.signIn()
		.then((result) => {
			console.log(result);
			let accessToken = result.accessToken
			let idUser = result.id
			let name = result.name
			let photo = result.photo
			let email = result.email
			let tipo = 'google'
			console.log({accessToken, idUser, name, photo, email, tipo})
			axios.post('/x/v1/user/google', {accessToken, idUser, name, photo, email, tipo})
			.then((e)=>{
				console.log(e)
				if (e.data.code==1) {
					navigate('editPerfil2') 
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
	_signInFacebook(){
		console.log('fa')
		LoginManager.logInWithReadPermissions(['public_profile'], (error, data) => {
			console.log(data)
			if (!error) {
				resolve(data.credentials.token);
				console.log(data)
			} else {
				reject(error);
			}
		})
		AccessToken.getCurrentAccessToken().then(
          (data) => {
          	console.log(data)
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture,id,email',
              null,
              this._responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        )
	}
	_responseInfoCallback = (error, result) => {
		const {navigate} = this.props.navigation
		AccessToken.getCurrentAccessToken().then(
			(data) => {
				if (error) {
					console.log('Error fetching data: ' + error.toString());
				} else {
					let accessToken1 = data.accessToken
					let idUser1 = result.id
					let name1 = result.name
					let photo1 = result.picture.data.url
					let email1 = result.email
					let tipo1 = 'facebook'
					console.log({accessToken:accessToken1, idUser:idUser1, name:name1, photo:photo1, email:email1, tipo:tipo1})
					axios.post('/x/v1/user/facebook', {accessToken:accessToken1, idUser:idUser1, name:name1, photo:photo1, email:email1, tipo:tipo1})
					.then((e)=>{
						console.log(e)
						if (e.data.code==1) {
							navigate('editPerfil2') 
						}
					})
					.catch((err)=>{
						console.log(err)
					})
				}
			}
		)
		
	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<ImageBackground style={LoginStyle.fondo}	source={require('./fondo.png')} >
			 	 	 
				<View>
					<Image
						style={LoginStyle.image}
						width={220} // height will be calculated automatically
						source={require('./logo.png')}
				   />
				</View>
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Email / Telefono"
           			placeholderTextColor="#8F9093" 
			    />
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#8F9093" 
			    />
			    <TouchableOpacity  style={LoginStyle.submit}>
			    	<Text  style={LoginStyle.textSubmit}>Sign In</Text>
			    </TouchableOpacity>
			    <View style={LoginStyle.logos}>
			    	<Text  style={LoginStyle.text}>Recuérdame</Text>
			    	<Text  style={LoginStyle.text}>¿Olvidaste tu contraseña?</Text>
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
			     <TouchableOpacity onPress={()=> navigate('Registro')} >
 					<Text style={LoginStyle.btnRegistro}>Registrate</Text>
 				</TouchableOpacity>
			</ImageBackground>
		)
	}




	 
}
