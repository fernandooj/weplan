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
	  	 
	  };
	}
	render(){
		const {navigate} = this.props.navigation
		console.log(this.props.navigation.state['params'])
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
           			placeholderTextColor="#ffffff" 
			    />			 
			    <TouchableHighlight  style={LoginStyle.submit} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.textSubmit}>Activar Cuenta</Text>
			    </TouchableHighlight>
			</ImageBackground>
		)
	}
	handleSubmit(){
		const username = this.props.navigation.state['params']
		console.log(username)
		let token = this.state.text;

		axios.post('/x/v1/user/token', {username, token})
		.then((res)=>{
			console.log(res)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
}












