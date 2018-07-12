import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {walletStyle} from '../wallet/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'

import CabezeraMenuComponent from '../cabezeraFooter/cabezeraComponent'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class walletComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/suma/totales/plan')
		.then(e=>{
			this.setState({allList:e.data.result, filteredData:e.data.result})
		})
		.catch(res=>{
			console.log(res)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.data[0].info[5].search(regex)> -1)	
		})
		if (event.length>0) {
			this.setState({filteredData:filtered})
		}else{
			this.setState({filteredData:this.state.allList})
		}	
	}
	getRow(filteredData){
		if(filteredData.length>0){
			return filteredData.map((e, key)=>{
			return  <TouchableOpacity onPress={()=>this.handleSubmit(this)} key={key}>
					<View style={walletStyle.item}>
						<Image source={{uri: e.imagen[0]}} style={walletStyle.imagen} />
						<View style={walletStyle.boxPlan1} >
							<Text style={walletStyle.nombre}>{e.nombrePlan.length<30 ?e.nombrePlan :e.nombrePlan.substring(0, 30)+' ...'}</Text>
							<Text style={walletStyle.fechaLugar}>By {e.nombreUsuario} </Text>
							<View style={walletStyle.item}>	
								<Text style={walletStyle.textoTotal}>Total</Text>
								<Text style={walletStyle.total}>$ {e.total}</Text>
							</View>	
						</View>
						<Image source={require('./back_plan.png')} style={walletStyle.back} />
					</View>
					<View  style={walletStyle.separador}></View>
				</TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
	cabezera(){
		const {navigate} = this.props.navigation
		return(
			<View style={walletStyle.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('inicio')} style={walletStyle.btnClose} >
					<Image source={require('../agregarAmigos/back.png')} style={walletStyle.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={walletStyle.input}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../agregarAmigos/search.png')} style={walletStyle.btnBuscar} />
			</View>
		)
	}
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={walletStyle.contenedor}>
				<CabezeraMenuComponent navigate={navigate}  />
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='My Wallet' margin />
				<ScrollView style={walletStyle.subContenedor}>
					{rows}	
				</ScrollView>
				<FooterComponent navigate={navigate} />		
			</View> 
		)
	}
	handleSubmit(planId, imagenPlan, nombre){
		//navigate('chat', id)
	}
}