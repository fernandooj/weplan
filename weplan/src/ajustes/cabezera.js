import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Platform, BackHandler} from 'react-native'
import {style} from '../ajustes/style'
import axios from 'axios'

export default class CabezeraComponent extends Component{
	componentDidMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}
	handleBackPress = () => {
		const {navigate, show, url, parameter, texto, margin} = this.props
	    navigate(url, parameter)
	    return true;
  	}

	render(){
		const {navigate, show, url, parameter, texto, margin} = this.props
		return(	  
			<View style={ Platform.OS==='android' ?style.contenedorBack :[{marginTop:22}, style.contenedorBack] }>
				<TouchableOpacity onPress={()=> navigate(url, parameter)} style={style.btnBack}>
					<Image source={require('../assets/images/back.png')} style={style.imgBack} />
				</TouchableOpacity>
				{
					texto
					?<Text style={[style.textBack, style.familia]}>{this.props.texto}</Text>
					:null
				}
				{
					show
					?<TouchableOpacity onPress={()=> navigate(url)} style={style.btnEdit}>
						<Image source={require('../assets/images/back.png')} style={style.imgBack} />
					</TouchableOpacity>
					:null
				}
				
		   </View>
		)
	}

 
}