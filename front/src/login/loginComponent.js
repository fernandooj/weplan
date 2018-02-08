import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, Alert, ScrollView, ImageBackground} from 'react-native'
import {LoginStyle} from '../login/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import Icon from 'react-native-fa-icons';

export default class LoginComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	 
	  };

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
           			placeholderTextColor="#ffffff" 
			    />
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#ffffff" 
			    />
			    <TouchableOpacity  style={LoginStyle.submit}>
			    	<Text  style={LoginStyle.textSubmit}>Sign In</Text>
			    </TouchableOpacity>
			    <View style={LoginStyle.logos}>
			    	<Text  style={LoginStyle.text}>Recuérdame</Text>
			    	<Text  style={LoginStyle.text}>¿Olvidaste tu contraseña?</Text>
			    </View>
			    <View style={LoginStyle.logos}>
			      <TouchableOpacity>
			        <Icon name='facebook' style={LoginStyle.facebook} />
			      </TouchableOpacity>
			      <TouchableOpacity>
			        <Icon name='google' style={LoginStyle.google} />
			      </TouchableOpacity>
			    </View>  
			    <Text style={LoginStyle.text}>¿Aún no haces parte de Weplan? </Text>	
			     <TouchableOpacity onPress={()=> navigate('Registro')}>
 					<Text style={LoginStyle.btnRegistro}>Registrate</Text>
 				</TouchableOpacity>
			</ImageBackground>
		)
	}
	 
}