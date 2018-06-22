import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {EditPasswordStyle} from '../editPassword/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';

export default class insertCodeComponent2 extends Component{
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
			<ImageBackground style={EditPasswordStyle.fondo} >
				<View>
					<Image
						style={EditPasswordStyle.image}
						width={140} // height will be calculated automatically
						source={require('../login/logo.png')}
				   />
				</View> 
				<TextInput
			        style={EditPasswordStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Inserte su codigo"
           			placeholderTextColor="#8F9093" 
           			keyboardType='numeric'
           			maxLength={4} 
			    />			 
			    <TouchableHighlight  style={EditPasswordStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={EditPasswordStyle.textSubmit}>Insertar Codigo</Text>
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
		let token = this.state.text;

		axios.post('/x/v1/user/token', {username, token})
		.then((res)=>{
			console.log(res.data)
			if(res.data.status=='SUCCESS'){
				navigate('nuevoPassword') 
			}else{
				this.setState({codigo:0})
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
}












