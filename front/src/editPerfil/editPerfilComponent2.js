import React, {Component} from 'react'
import {View, Text,  TouchableOpacity, TextInput, ScrollView, Picker, ImageBackground, StyleSheet, PixelRatio} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';


export default class editPerfilComponent2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		cofre:[
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Rumba', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cafe', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Viajes', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cine', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Teatro', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Deportes', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Rumba', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cafe', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Viajes', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cine', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Teatro', estado:'false'},
		{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Deportes', estado:'false'},
		]
	  };
	}
	componentWillMount(){
		axios.get('/x/v1/user/profile')
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
 
 	renderCofres(){
 		return this.state.cofre.map((e, key)=>{
 			return(
 				<TouchableOpacity key={key} style={LoginStyle.imagenes}>
					 
					<Image
						style={LoginStyle.imagenCofre}
						width={100}
						source={{uri: e.imagen }}
				    />
				    <Text>{e.texto}</Text>
 				</TouchableOpacity>
 			)
 		})
 	}
	render(){
		return(
			<ScrollView>
				<View style={LoginStyle.fondo}>
					<View>
						<Image
							style={LoginStyle.image}
							width={380}
							source={require('./encabezado2.png')}
					    />
					</View> 
			    </View>
			     <View  style={LoginStyle.contenedorCofres}>{this.renderCofres()}</View>
			    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.btnRegistro}>Editar</Text>
			    </TouchableOpacity>
			</ScrollView>
		)
	}
	handleChangeOption(val) {
 
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		navigate('editPerfil1') 
	}
	 
}

 








