import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
 


export default class notificacionComponent extends Component{
	state={
		 

	}
	componentWillMount(){
		console.log('tomatela te digo')
 		axios.get('/x/v1/not/notificacion/user/get/')
 		.then(e=>{ 
 			console.log(e.data)
 		}) 
 		.catch(err=>{
 			console.log(err)
 		})
	}
	renderPerfil(){
 
		
	}
	renderMenu(){
 
	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={AjustesStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto={'Notificaciones'} />
				<View style={AjustesStyle.subContenedor}>
					{this.renderPerfil()}
					{this.renderMenu()}
				</View>	
			</View>
		)
	}
	 
}