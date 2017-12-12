import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, ImageBackground} from 'react-native'
import {SplashStyle} from '../splash/style'

 

export default class splashComponent extends Component{
	render(){
		return(
			<View style={SplashStyle.contenedor}>
				<View style={SplashStyle.cabezera}>
					<Text>configuracion</Text>
					<Text>mi cuenta</Text>
					<Text>Editar</Text>
				</View>
			</View>
		)
	}
}