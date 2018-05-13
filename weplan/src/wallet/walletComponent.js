import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {walletStyle} from '../wallet/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
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
		axios.get('/x/v1/pla/plan/pariente/ente/corriente/mente')
		.then(e=>{
 
			console.log(e.data)
 
		})
		.catch(res=>{
			console.log(res)
		})


		axios.get('/x/v1/pla/plan/idUsuario')
		.then(e=>{
			let filteredData = e.data.message
		 
			this.setState({allList:filteredData, filteredData})
		})
		.catch(res=>{
			console.log(res)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.nombre.search(regex)> -1)	
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
			return  <TouchableOpacity onPress={()=>this.handleSubmit(e._id, e.imagen, e.nombre)} key={key}>
					<View style={walletStyle.item}>
						<Image source={{uri: e.imagen}} style={walletStyle.imagen} />
						<View style={walletStyle.boxPlan1} >
							<Text style={walletStyle.nombre}>{e.nombre.length<30 ?e.nombre :e.nombre.substring(0, 30)+' ...'}</Text>
							<Text style={walletStyle.fechaLugar}>By {e.idUsuario.nombre}</Text>
							<View style={walletStyle.item}>	
								<Text style={walletStyle.textoTotal}>Total</Text>
								<Text style={walletStyle.total}>$ 1000</Text>
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
				<TouchableOpacity onPress={()=>navigate('Home')} style={walletStyle.btnClose} >
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
				<CabezeraComponent navigate={navigate} url={'Home'} texto='My Wallet' />
				<ScrollView style={walletStyle.subContenedor}>
					{rows}	
				</ScrollView>	
			</View> 
		)
	}
	handleSubmit(planId, imagenPlan, nombre){
		//navigate('chat', id)
	}
}