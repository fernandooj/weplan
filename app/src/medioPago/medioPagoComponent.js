import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {style} from '../medioPago/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
 
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class medioPagoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[]
		}
	}
 
 
 	_onChange(data){
 		console.log(data)
 	}

	 
	 
 
	render(){
		 
		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				 
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Pagos'  />
				<ScrollView style={style.subContenedor}>
					<CreditCardInput onChange={this._onChange} />
					<Text style={style.separador}></Text>
					<Image source={{uri:'http://www.lebrija-santander.gov.co/Ciudadanos/PublishingImages/Paginas/Pagos-en-Linea/logo-pse.PNG'}} style={style.imagen}/>
				</ScrollView>
				<FooterComponent navigate={navigate} />		
			</View> 
		)
	}
	handleSubmit(planId, imagenPlan, nombre){
		//navigate('chat', id)
	}
}