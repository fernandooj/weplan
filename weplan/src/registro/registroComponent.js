import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {style} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import CabezeraComponent from '../ajustes/cabezera.js'
import Toast from 'react-native-simple-toast'; 

export default class RegistroComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
			codigo:null,
			tokenPhone: "",
			username:''
	  };
	}

	render(){
		const {codigo, username} = this.state 
		const {navigate} = this.props.navigation
		return(
			<ImageBackground style={style.fondo}  >
				<CabezeraComponent navigate={navigate} url={'Login'} texto='Registro'  />
				<View>
					<Image
						style={style.image}
						width={140} // height will be calculated automatically
						source={require('../assets/images/logo.png')}
				   />
				</View>
				<TextInput
			        style={[style.input, style.familia]}
			        onChangeText={(username) => this.setState({username})}
			        value={username}
			        underlineColorAndroid='transparent'
           			placeholder="Email / Telefono"
           			placeholderTextColor="#8F9093"
           			autoCapitalize = 'none' 
			    />		

			    <TouchableHighlight  style={style.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={[style.textSubmit, style.familia]}>Sign Up</Text>
			    </TouchableHighlight>
			    {
			    	codigo==3
			    	?<Text style={[style.textAlert, style.familia]}>Este usuario ya existe, pero esta innactivo, te acabamos de enviar un nuevo codigo</Text>
			    	:codigo==2	
			    	?<Text style={[style.textAlert, style.familia]}>Este usuario ya existe</Text>
			    	:codigo==1	
			    	?<Text style={[style.textAlert, style.familia]}>Te hemos enviado un codigo, por favor insertalo</Text>
			    	:codigo==0	
			    	?<Text style={[style.textAlert, style.familia]}>Houston, tenemos un problema, no se pudo crear el usuario, intentalo de nuevo</Text>
			    	:null
			    }	
			</ImageBackground>
		)
	}

	handleSubmit(){
		const {navigate} = this.props.navigation
		const tokenPhone = this.props.navigation.state.params.tokenPhone
		let username = this.state.username;
		if (username.length===0) {
			Toast.show('El campo usuario es obligatorio.')
		}
		let tipo = username.includes("@") ?1 :2;
		let acceso = 'suscriptor'
		
	  	axios.post('/x/v1/user/sign_up', {username, tipo, acceso, tokenPhone})
		.then((res)=>{
			console.log(res.data.code)
			let data = res.data.code
			if(data==0){
				this.setState({codigo:0})
			}else if(data==1){
				this.setState({codigo:1})
				navigate('insertCode', username)
				setTimeout(function(){ 
					console.log('papi')
					navigate('insertCode', username) },  
				3000);
			}else if(data==2){
				this.setState({codigo:2})
			}
			else if(data==3){
				this.setState({codigo:3})
				navigate('insertCode', username)
				setTimeout(function(){ 
					navigate('insertCode', username) }, 
				3000);
			}
		})
		.catch((err)=>{
			console.log(err)
		})	
	}
}












