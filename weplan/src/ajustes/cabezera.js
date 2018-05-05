import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'

export default class CabezeraComponent extends Component{
	render(){
		const {navigate, show, url, parameter, texto} = this.props
		return(	 
			<View style={AjustesStyle.contenedorBack}>
				<TouchableOpacity onPress={()=> navigate(url, parameter)} style={AjustesStyle.btnBack}>
					<Image source={require('./atras.png')} style={AjustesStyle.imgBack} />
				</TouchableOpacity>
				{
					texto
					?<Text style={AjustesStyle.textBack}>{this.props.texto}</Text>
					:null
				}
				{
					show
					?<TouchableOpacity onPress={()=> navigate(url)} style={AjustesStyle.btnEdit}>
						<Image source={require('./atras.png')} style={AjustesStyle.imgBack} />
					</TouchableOpacity>
					:null
				}
				
		   </View>
		)
	}

 
}