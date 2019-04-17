import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {EditPasswordStyle} from '../editPassword/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import CabezeraComponent from '../ajustes/cabezera.js' 
import Toast from 'react-native-simple-toast'; 

export default class EditPasswordComponent extends Component{
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
			<ImageBackground style={EditPasswordStyle.fondo}  >
				<CabezeraComponent navigate={navigate} url={'Login'} texto='Recuperar Contraseña'  />
				<View>
					<Image
						style={EditPasswordStyle.image}
						width={140} // height will be calculated automatically
						source={require('../assets/images/logo.png')}
				   />
				</View>
				<TextInput
			        style={EditPasswordStyle.input}
			        onChangeText={(username) => this.setState({username})}
			        value={username}
			        underlineColorAndroid='transparent'
           			placeholder="Email / Telefono"
           			placeholderTextColor="#8F9093" 
           			autoCapitalize='none'
			    />		

			    <TouchableHighlight  style={EditPasswordStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={EditPasswordStyle.textSubmit}>Recuperar Contraseña</Text>
			    </TouchableHighlight>
			    {
			    	codigo==3
			    	?<Text style={EditPasswordStyle.textAlert}>Este usuario esta innactivo</Text>
			    	:codigo==2	
			    	?<Text style={EditPasswordStyle.textAlert}>Este usuario no existe</Text>
			    	:codigo==1	
			    	?<Text style={EditPasswordStyle.textAlert}>Te hemos enviado un codigo, por favor insertalo</Text>
			    	:codigo==0	
			    	?<Text style={EditPasswordStyle.textAlert}>Houston, tenemos un problema, no se pudo crear el usuario, intentalo de nuevo</Text>
			    	:null
			    }	
			</ImageBackground>
		)
	}

	handleSubmit(){
		const {navigate} = this.props.navigation
		let {username} = this.state;
		if (username.length===0) {
			Toast.show('El campo usuario es obligatorio.')
		}
		let tipo = username.includes("@") ?1 :2;
		let acceso = 'suscriptor'
	  	axios.post('/x/v1/user/recupera_contrasena', {username, tipo})
		.then((res)=>{
			console.log(res.data)
			let data = res.data.code
			if(data==0){
				this.setState({codigo:0})
			}else if(data==1){
				this.setState({codigo:1})
				setTimeout(function(){ 
					navigate('insertCode2', username) },  
				3000);
			}else if(data==2){
				this.setState({codigo:2})
			}
			else if(data==3){
				this.setState({codigo:3})
				setTimeout(function(){ 
					navigate('Registro') }, 
				3000);
			}
		})
		.catch((err)=>{
			console.log(err)
		})		
	}
}












