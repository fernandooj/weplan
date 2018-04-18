import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
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
			planes:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/idUsuario')
		.then(e=>{
			console.log(e.data.message)
			let planes = e.data.message
			this.setState({planes})
		})
		.catch(res=>{
			console.log(res)
		})
	}
	renderPlanes(){
		return this.state.planes.map((e, key)=>{
			return(
				<TouchableOpacity onPress={()=>this.handleSubmit(e._id, e.imagen, e.nombre)} key={key} style={MisPlanesStyle.boxPlan}>
					<ImageBackground source={{uri: e.imagen ?e.imagen :URL+'fondoPlan.png'}} style={MisPlanesStyle.boxPlan}>
						<View style={MisPlanesStyle.boxPlan1} >
							<Text style={MisPlanesStyle.nombre}>{e.nombre}</Text>
							<Text style={MisPlanesStyle.descripcion}>{e.descripcion}</Text>
							<Text style={MisPlanesStyle.fechaLugar}>{e.fechaLugar}</Text>
						</View>
					</ImageBackground>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<View style={MisPlanesStyle.container}>
				{this.renderPlanes()}
			 
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