import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
import CabezeraComponent from './cabezera.js'
 


export default class ajustesComponent extends Component{
	state={
		menus:[
			{method:1, label:'Amigos', 		 	value:'ajustesAmigos', },
			{method:1, label:'Notificaciones',  value:'notificaciones'},
			{method:1, label:'My Wallet', 	 	value:'mi_wallet'},
			{method:1, label:'Metodos de Pago', value:'metodos'},
			{method:2, label:'Cerrar Sesion',   value:'closeSession'},
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
				<View key={key} >
					<TouchableOpacity style={AjustesStyle.btnMenu} onPress={e.method==1 ?() => navigate(e.value) :this.closeSession.bind(this)}>
						<Text>{e.label} </Text>
					</TouchableOpacity>
 
					{/* SEPARADOR */}
					<View style={AjustesStyle.separador}></View>
				</View>
			)
		})
	}
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={AjustesStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'Home'} />
				<View style={AjustesStyle.subContenedor}>
					{this.renderPerfil()}
					{this.renderMenu()}
				</View>	
			</View>
		)
	}
	closeSession(){
		const {navigate} = this.props.navigation
		axios.get('/x/v1/logout/')
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==1){
				navigate('Login')
			}else if (res.data.code==1){
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}