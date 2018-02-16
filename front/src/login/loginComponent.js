import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert, ScrollView, ImageBackground, Linking} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FBSDK, {LoginManager} from 'react-native-fbsdk';


export default class LoginComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 
	  };

	}

	componentWillMount() {
    	GoogleSignin.configure({
	        webClientId: '986592850899-ha783khufam6ta5oad6hamb9lqpf3280.apps.googleusercontent.com',
	        offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
	    });
		GoogleSignin.currentUserAsync().then((user) => {
	      console.log('USER', user);
	      this.setState({user: user});
	    }).done();
	}
	_signInGoogle(){
		console.log('2')
		 GoogleSignin.signIn()
		.then((user) => {
		  console.log(user);
		  this.setState({user: user});
		})
		.catch((err) => {
		  console.log('WRONG SIGNIN', err);
		})
		.done();
	}
	_signInFacebook(){
		console.log('eeee')
		  LoginManager.logInWithReadPermissions(['public_profile']).then(
			  function(result) {
			    if (result.isCancelled) {
			      console.log('Login cancelled');
			    } else {
			      console.log('Login success with permissions: '
			        +result.grantedPermissions.toString());
			    }
			  },
			  function(error) {
			    console.log('Login fail with error: ' + error);
			  }
			);
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
