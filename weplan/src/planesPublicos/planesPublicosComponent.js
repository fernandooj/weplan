import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Keyboard} from 'react-native'
import {planes} from '../planesPublicos/style'
import axios from 'axios'

 
import FooterComponent 	 from '../cabezeraFooter/footerComponent'

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class planesPublicosComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			planesAsignados:0,
			allList:[]
		}
	}
	componentWillMount(){
		Keyboard.dismiss()
		axios.get('/x/v1/pla/plan/planespublicos/innactivos')
		.then(e=>{
			console.log(e.data)
			let filteredData = e.data.planes
			let planesAsignados = e.data.planes==0 ?1 :2
			this.setState({allList:filteredData, filteredData, planesAsignados})
		})
		.catch(res=>{
			console.log(res)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.nombrePlan.search(regex)> -1)	
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
			return  <TouchableOpacity onPress={()=>this.handleSubmit(e.id)} key={key} style={planes.boxPlan}>
					<Image source={{uri: e.imagen[0]}} style={planes.background} />
					<Text style={planes.nombre}>{e.nombrePlan.length<27 ?e.nombrePlan :e.nombrePlan.substring(0, 27)+' ...'}</Text>
					<View style={planes.boxPlan1} >
						<Text style={planes.fechaLugar}>{e.fecha}</Text>
						<Text style={e.total>0 ?planes.debe :[planes.debe, planes.noDebe]}></Text>
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
			<View style={planes.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('inicio')} style={planes.btnClose} >
					<Image source={require('../agregarAmigos/back.png')} style={planes.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={planes.input}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../agregarAmigos/search.png')} style={planes.btnBuscar} />
			</View>
		)
	}
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={planes.contenedor}>
		 
					{this.cabezera()}
				{
					this.state.planesAsignados==1
					?<Image source={require('./sinPlanes.png')} style={planes.sinPlanes} />
					:this.state.planesAsignados==2
					?<ScrollView showsVerticalScrollIndicator={false}>
						<View style={planes.container}>
						{rows}
						</View>	
					</ScrollView>
					:<View></View>
				}
				
				<FooterComponent navigate={navigate} />	
			</View> 
		)
	}
	handleSubmit(planId){
		const {navigate} = this.props.navigation
		let id = planId
		navigate('chat', id)
	}
}