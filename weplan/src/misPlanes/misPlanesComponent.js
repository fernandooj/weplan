import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {MisPlanesStyle} from '../misPlanes/style'
import axios from 'axios'

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class MisPlanesComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/idUsuario')
		.then(e=>{
			let filteredData = e.data.message
			console.log(e.data.message)
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
		//this.setState({filteredData:filtered})
		if (event.length>0) {
			this.setState({filteredData:filtered})
		}else{
			this.setState({filteredData:this.state.allList})
		}	
	}
	getRow(filteredData){
		if(filteredData.length>0){
			return filteredData.map((e, key)=>{
			return  <TouchableOpacity onPress={()=>this.handleSubmit(e._id, e.imagen, e.nombre)} key={key} style={MisPlanesStyle.boxPlan}>
					<Image source={{uri: e.imagen}} style={MisPlanesStyle.background} />
					<View style={MisPlanesStyle.boxPlan1} >
						<Text style={MisPlanesStyle.nombre}>{e.nombre.length<27 ?e.nombre :e.nombre.substring(0, 27)+' ...'}</Text>
						<Text style={MisPlanesStyle.fechaLugar}>{e.fechaLugar}</Text>
					</View>
				</TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
	cabezera(){
		const {navigate} = this.props.navigation
		return(
			<View style={MisPlanesStyle.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('Home')} style={MisPlanesStyle.btnClose} >
					<Image source={require('../agregarAmigos/back.png')} style={MisPlanesStyle.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={MisPlanesStyle.input}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../agregarAmigos/search.png')} style={MisPlanesStyle.btnBuscar} />
			</View>
		)
	}
	// renderPlanes(){
	// 	console.log(this.state.planes)
	// 	return this.state.planes.map((e, key)=>{
	// 		return(
	// 			<TouchableOpacity onPress={()=>this.handleSubmit(e._id, e.imagen, e.nombre)} key={key} style={MisPlanesStyle.boxPlan}>
	// 				<Image source={{uri: e.imagen}} style={MisPlanesStyle.background} />
	// 				<View style={MisPlanesStyle.boxPlan1} >
	// 					<Text style={MisPlanesStyle.nombre}>{e.nombre}</Text>
	// 					<Text style={MisPlanesStyle.fechaLugar}>{e.fechaLugar}</Text>
	// 				</View>
	// 			</TouchableOpacity>
	// 		)
	// 	})
	// }
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={MisPlanesStyle.container}>
					{this.cabezera()}
				<ScrollView style={MisPlanesStyle.container}>
					{rows}	
				</ScrollView>	
			</View> 
		)
	}
	handleSubmit(planId, imagenPlan, nombre){
		const {navigate} = this.props.navigation
		let imagen = imagenPlan ?imagenPlan : URL+'fondoPlan.png'
		let dataPlan = {planId, imagen, nombre}
		let id = planId
		navigate('chat', id)
	}
}