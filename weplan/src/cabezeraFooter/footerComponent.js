import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Text} from 'react-native'
import {cabezeraFooterStyle} from '../cabezeraFooter/style'
import axios from 'axios'

export default class CabezeraComponent extends Component{
	state={notificacion:false}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user.notificacion)
			this.setState({notificacion:res.data.user.user.notificacion})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render(){
		const {navigate} = this.props	
		console.log(this.state.notificacion)
		return(
			<View style={cabezeraFooterStyle.footer3} >
				<TouchableOpacity onPress={()=> navigate('inicio')} style={cabezeraFooterStyle.btnFooter3}>
					<Image source={require('./home.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Home</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('wallet')} style={cabezeraFooterStyle.btnFooter3}>
					<Image source={require('./mi_wallet.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>My Wallet</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('createPlan')} style={[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Create]} >
					<Image source={require('./crear_plan.png')} style={cabezeraFooterStyle.iconFooter3Create} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Crear Plan</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('misPlanes')} style={cabezeraFooterStyle.btnFooter3} >
					<Image source={require('./mis_planes.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Planes</Text>*/} 
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> this.updatePerfilNotificacion()} style={cabezeraFooterStyle.btnFooter3} >
					<Image source={require('./notificaciones.png')} style={cabezeraFooterStyle.iconFooter3} />
					{
						this.state.notificacion
						&&<Text style={cabezeraFooterStyle.punto}>&#8226;</Text>
					}
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Notificacion</Text>*/}
				</TouchableOpacity>
			</View>
		)
	}
	updatePerfilNotificacion(){
		const {navigate} = this.props	
		axios.put('/x/v1/user/desactivaNotificacion') 
		.then((res)=>{
			console.log(res.data)
			res.data.code===1 &&navigate('notificacion');this.setState({notificacion:false})
		})
		.catch((err)=>{
			console.log(err)
		})
		// 
	}
	
}