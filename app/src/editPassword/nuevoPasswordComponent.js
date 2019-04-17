import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ImageBackground, Platform} from 'react-native'
import {EditPasswordStyle} from '../editPassword/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
 

export default class nuevoPasswordComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 codigo:null,
	  	 token: "",
	  };
	}
	 
	render(){
		const {navigate} = this.props.navigation
		const {codigo} = this.state 
		return(
			<ImageBackground style={EditPasswordStyle.fondo} >
				<View>
					<Image
						style={EditPasswordStyle.image}
						width={140} // height will be calculated automatically
						source={require('../assets/images/logo.png')}
				   />
				</View> 
				<TextInput
			        style={EditPasswordStyle.input}
			        onChangeText={(password) => this.setState({password})}
			        value={this.state.password}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry
           
			    />	
			    <TextInput
			        style={EditPasswordStyle.input}
			        onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
			        value={this.state.passwordConfirm}
			        underlineColorAndroid='transparent'
           			placeholder="Confirmar Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry
           
			    />			 
			    <TouchableHighlight  style={EditPasswordStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={EditPasswordStyle.textSubmit}>!Hecho</Text>
			    </TouchableHighlight>
			    {
			    	codigo==0
			    	?<Text style={EditPasswordStyle.textAlert}>Codigo Incorrecto</Text>
			    	:null
			    }
			</ImageBackground>
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		const username = this.props.navigation.state['params']
		let {password, token} = this.state;

		axios.post('/x/v1/user/password', {password, token})
		.then((res)=>{
			console.log(res.data)
			if(res.data.status=='SUCCESS'){
				navigate('inicio') 
			}else{
				this.setState({codigo:0})
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
}












