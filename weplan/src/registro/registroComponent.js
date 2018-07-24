import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
 
 

export default class RegistroComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 codigo:null,
	  	 tokenPhone: "",
	  };
	}

	render(){
		const {codigo} = this.state 
		return(
			<ImageBackground style={LoginStyle.fondo}  >
				<View>
					<Image
						style={LoginStyle.image}
						width={140} // height will be calculated automatically
						source={require('../login/logo.png')}
				   />
				</View>
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Email / Telefono"
           			placeholderTextColor="#8F9093"
           			autoCapitalize = 'none' 
			    />		

			    <TouchableHighlight  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.textSubmit}>Sign Up</Text>
			    </TouchableHighlight>
			    {
			    	codigo==3
			    	?<Text style={LoginStyle.textAlert}>Este usuario ya existe, pero esta innactivo, te acabamos de enviar un nuevo codigo</Text>
			    	:codigo==2	
			    	?<Text style={LoginStyle.textAlert}>Este usuario ya existe</Text>
			    	:codigo==1	
			    	?<Text style={LoginStyle.textAlert}>Te hemos enviado un codigo, por favor insertalo</Text>
			    	:codigo==0	
			    	?<Text style={LoginStyle.textAlert}>Houston, tenemos un problema, no se pudo crear el usuario, intentalo de nuevo</Text>
			    	:null
			    }	
			</ImageBackground>
		)
	}

	handleSubmit(){
		const {navigate} = this.props.navigation
		const tokenPhone = this.props.navigation.state.params.tokenPhone
		let username = this.state.text;
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
				setTimeout(function(){ 
					navigate('insertCode', username) },  
				3000);
			}else if(data==2){
				this.setState({codigo:2})
			}
			else if(data==3){
				this.setState({codigo:3})
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












