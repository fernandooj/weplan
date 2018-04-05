import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';

export default class insertCodeComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 codigo:null
	  };
	}
	render(){
		const {navigate} = this.props.navigation
		const {codigo} = this.state 
		return(
			<ImageBackground style={LoginStyle.fondo}	source={require('../login/fondo.png')} >
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
           			placeholder="Inserte su codigo"
           			placeholderTextColor="#8F9093" 
           			keyboardType='numeric'
           			maxLength={4} 
			    />			 
			    <TouchableHighlight  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.textSubmit}>Activar Cuenta</Text>
			    </TouchableHighlight>
			    {
			    	codigo==0
			    	?<Text style={LoginStyle.textAlert}>Codigo Incorrecto</Text>
			    	:null
			    }
			</ImageBackground>
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		const username = this.props.navigation.state['params']
		let token = this.state.text;

		axios.post('/x/v1/user/token', {username, token})
		.then((res)=>{
			console.log(res.data)
			if(res.data.status=='SUCCESS'){
				navigate('editPerfil') 
			}else{
				this.setState({codigo:0})
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
}












