import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {perfilStyle} from '../perfil/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class perfilComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			perfil:[]
		}
	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user)
			this.setState({perfil: res.data.user.user})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
	 
 	renderPerfil(){
		const {perfil} = this.state
		const {navigate} = this.props.navigation
		if (perfil) {
			return(
				<View style={perfilStyle.perfil}>
					<Image source={{uri: perfil.photo}} style={perfilStyle.avatar} />
					<View style={perfilStyle.contenedorRegistros}>
						<Text style={perfilStyle.atributo}>Nombre</Text>
						<Text style={perfilStyle.valor}>{perfil.nombre}</Text>
					</View>
					<View style={perfilStyle.contenedorRegistros}>
						<Text style={perfilStyle.atributo}>Email</Text>
						<Text style={perfilStyle.valor}>{perfil.email}</Text>
					</View>
					<View style={perfilStyle.contenedorRegistros}>
						<Text style={perfilStyle.atributo}>Ciudad</Text>
						<Text style={perfilStyle.valor}>{perfil.ciudad}</Text>
					</View>
					<View style={perfilStyle.contenedorRegistros}>
						<Text style={perfilStyle.atributo}>Nacimiento</Text>
						<Text style={perfilStyle.valor}>{perfil.nacimiento}</Text>
					</View>
					<View style={perfilStyle.contenedorRegistros}>
						<Text style={perfilStyle.atributo}>Genero</Text>
						<Text style={perfilStyle.valor}>{perfil.sexo=='m' ?'Masculino' :'Femenino'}</Text>
					</View>
					
					<Text style={perfilStyle.separador}></Text>
				</View>
			)
		}else{
			return(
				<Text>Cargando</Text>
			)
		}
		
	}
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<View style={perfilStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Perfil' />
				<ScrollView style={perfilStyle.subContenedor}>
					{this.renderPerfil()}
				</ScrollView>	
			</View> 
		)
	}
	handleSubmit(planId, imagenPlan, nombre){
		//navigate('chat', id)
	}
}