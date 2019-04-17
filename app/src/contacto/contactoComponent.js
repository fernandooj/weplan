import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import {style} 			 from './style'
import axios 			 from 'axios'
import Toast 			 from 'react-native-simple-toast';
import CabezeraComponent from '../ajustes/cabezera.js'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class contactoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			 
		}
	}
 
 	renderForm(){
 		return(
 			<View>
 				<TextInput
					style={[style.textarea, style.familia]}
					onChangeText={(mensaje) => this.setState({mensaje})}
					value={this.state.mensaje}
					placeholder="Motivo"
					placeholderTextColor="#c9c9c9" 
					underlineColorAndroid='transparent'
					ref={input => { this.textInput = input }}
				/>
				<TextInput
					style={[style.textarea2, style.familia]}
					onChangeText={(mensaje) => this.setState({mensaje2})}
					value={this.state.mensaje2}
					multiline = {true}
					placeholder="Mensaje"
					placeholderTextColor="#c9c9c9" 
					underlineColorAndroid='transparent'
					ref={input => { this.textInput = input }}
				/>
				<TouchableOpacity style={style.btnHecho}>
					<Text style={style.hecho}>Enviar</Text>
				</TouchableOpacity>

 			</View>
 		)
 	}

	render(){
 		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Contacto'  />
				<ScrollView style={style.subContenedor}>
					<Text style={[style.titulo, style.familia]}>Si tienes dudas o inquitedes llena el siguiente formulario o puedes enviarnos un correo a contacto@appweplan.com</Text>
					{this.renderForm()}	
				</ScrollView>
				<FooterComponent navigate={this.props.navigation} />		
			</View> 
		)
	}
}