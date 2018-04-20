 import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import {PagoStyle} from '../pago/style'
 
import axios from 'axios'
 
 

export default class pagoComponent extends Component{
	state={
		show:false,
		item:{}
	}
	componentWillMount(){
		let id = this.props.navigation.state.params
		//let id = '5ad657f6ab0a3d27715f28d9'
		axios.get('/x/v1/ite/item/id/'+id)
		.then(e=>{
			console.log(e.data.mensaje[0])
			this.setState({item:e.data.mensaje[0]})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	renderItem(){
		const {item} = this.state
		console.log(item.rutaImagen)
		return(
			<View>
		 		<Image source={{uri: item.rutaImagen}} style={PagoStyle.image} />
				<View>
					<Text>{item.titulo}</Text>
					<Text>{item.descripcion}</Text>
					<Text>{item.value}</Text>
				</View>
			</View>
		)
	}

	renderPago(){
		return(
			<View>
				Deuda
			</View>
		)
	}

 
  	render() {
		return (
			<ScrollView  style={PagoStyle.contentItem}>
			  {this.renderItem()}
			</ScrollView>
		);
	}
}
 