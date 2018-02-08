import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';

export default class RegistroComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 codigo:null
	  };
	}
	render(){
		const {codigo} = this.state 
		return(
			<ImageBackground style={LoginStyle.fondo} source={require('../login/fondo.png')} >
				<View>
					<Image
						style={LoginStyle.image}
						width={220} // height will be calculated automatically
						source={require('../login/logo.png')}
				   />
				</View>
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Email / Telefono"
           			placeholderTextColor="#ffffff" 
			    />		

			    <TouchableHighlight  style={LoginStyle.submit} onPress={this.handleSubmit.bind(this)}>
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
		var username = this.state.text;
		var isEmail = username.includes("@");
		if(isEmail){
		    axios.post('/x/v1/user/sign_up', {username, tipo:1})
			.then((res)=>{
				console.log(res.data)
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
		// treat as email
		} else {
		  	axios.post('/x/v1/user/sign_up', {username, tipo:2})
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
		 // treat as phone
		}

	 
		
	}
	 
}












