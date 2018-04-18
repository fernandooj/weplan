import React, {Component} from 'react'
import {View, Text,  TouchableOpacity, TextInput, ScrollView, Picker, ImageBackground, StyleSheet, PixelRatio} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
 


export default class editPerfilComponent2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		cofre:[
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Rumba', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cafe', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Viajes', estado:false},

		],
		cofre2:[
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cine', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Teatro', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Deportes', estado:false},
			
		],
		cofre3:[
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Rumba', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Cafe', estado:false},
			{imagen:'https://image.ibb.co/fAQvOx/cofre.png', imagena:'https://image.ibb.co/doP5Ox/cofre_Abierto.png', texto:'Viajes', estado:false},
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
 			let estado = e.estado
 			return(
 				<TouchableOpacity key={key} style={LoginStyle.imagenes} onPress={(e)=>this.handleChangeState(key, estado)} >
					<Image
						style={LoginStyle.imagenCofre}
						width={70}
						height={55}
						source={{uri: !e.estado ?e.imagen :e.imagena}}
				    />
				    <Text style={!e.estado ?LoginStyle.textoCofre : LoginStyle.textoCofre2}>{e.texto}</Text>
 				</TouchableOpacity>
 			)
 		})
 	}
 	renderCofres2(){
 		return this.state.cofre2.map((e, key)=>{
 			let estado = e.estado
 			return(
 				<TouchableOpacity key={key} style={LoginStyle.imagenes} onPress={(e)=>this.handleChangeState2(key, estado)} >
					<Image
						style={LoginStyle.imagenCofre}
						width={70}
						height={55}
						source={{uri: !e.estado ?e.imagen :e.imagena}}
				    />
					<Text style={!e.estado ?LoginStyle.textoCofre : LoginStyle.textoCofre2}>{e.texto}</Text>
 				</TouchableOpacity>
 			)
 		})
 	}
 	renderCofres3(){
 		return this.state.cofre3.map((e, key)=>{
 			let estado = e.estado
 			return(
 				<TouchableOpacity key={key} style={LoginStyle.imagenes} onPress={(e)=>this.handleChangeState3(key, estado)} >
					<Image
						style={LoginStyle.imagenCofre}
						width={70}
						height={55}
						source={{uri: !e.estado ?e.imagen :e.imagena}}
				    />
					<Text style={!e.estado ?LoginStyle.textoCofre : LoginStyle.textoCofre2}>{e.texto}</Text>
 				</TouchableOpacity>
 			)
 		})
 	}
	render(){
		return(
			<ScrollView style={LoginStyle.fondoUltimo}>
				<View >
					<View>
						<Image
							style={LoginStyle.image}
							width={380}
							source={require('./encabezado2.png')}
					    />
					</View> 
			    </View>
			    <View style={LoginStyle.contenedorCofres}>{this.renderCofres()}</View>
			    <View style={LoginStyle.contenedorCofres}>{this.renderCofres2()}</View>
			    <View style={LoginStyle.contenedorCofres}>{this.renderCofres3()}</View>
			    <View style={LoginStyle.contenedorBtnlisto}>
				    <TouchableOpacity  style={LoginStyle.estasListoBtn} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.btnEstasListo}>!Estas Listo!</Text>
				    </TouchableOpacity>
				</View>    
			</ScrollView>
		)
	}
	handleChangeState(key, estado) {
 		let newData = this.state.cofre.map((e, index)=>{
 			if(key==index) e.estado = !estado
 			return e
 		})
 		this.setState({cofre:newData})
	}
	handleChangeState2(key, estado) {
 		let newData = this.state.cofre2.map((e, index)=>{
 			if(key==index) e.estado = !estado
 			return e
 		})
 		this.setState({cofre2:newData})
	}
	handleChangeState3(key, estado) {

 		let newData = this.state.cofre3.map((e, index)=>{
 			if(key==index) e.estado = !estado
 			return e
 		})
 		this.setState({cofre3:newData})
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		navigate('inicio') 
	}
	 
}

 








