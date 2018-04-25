import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
 


export default class ajustesComponent extends Component{
	state={
		menus:[
			{label:'Amigos', 		 value:'ajustesAmigos'},
			{label:'Notificaciones', value:'notificaciones'},
			{label:'My Wallet', 	 value:'mi_wallet'},
			{label:'Metodos de Pago', value:'metodos'},
			{label:'Cerrar Sesion',   value:'cerrar_cesion'},
		],

	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user)
			this.setState({perfil:res.data.user.user})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	renderPerfil(){
		const {perfil} = this.state
		console.log(perfil)
		if (perfil!==undefined) {
			return(
				<View style={AjustesStyle.perfil}>
					<Image source={{uri: perfil.photo}} style={AjustesStyle.avatar} />
					<Text style={AjustesStyle.username}>{perfil.username}</Text>
					<Text style={AjustesStyle.separador}></Text>
				</View>
			)
		}else{
			return(
				<Text>Cargando</Text>
			)
		}
		
	}
	renderMenu(){
		const {navigate} = this.props.navigation
		return this.state.menus.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={AjustesStyle.btnMenu} onPress={() => navigate(e.value)}>
					<Text>{e.label} </Text>
				</TouchableOpacity>
			)
		})
		
	}
	render(){
		return(
			<View style={AjustesStyle.contenedor}>
				<View style={AjustesStyle.subContenedor}>
					{this.renderPerfil()}
					{this.renderMenu()}
				</View>	
			</View>
		)
	}
}