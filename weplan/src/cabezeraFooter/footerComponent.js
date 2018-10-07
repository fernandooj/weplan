import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Text, AsyncStorage} from 'react-native'
import {cabezeraFooterStyle} from './style'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';
import {URL} from '../../App.js'

export default class CabezeraComponent extends Component{
	constructor(props) {
	  super(props);
		
		this.state = {
	  		notificacion:'false',
		};
	  this.onReceivedMessage = this.onReceivedMessage.bind(this);
	}
 
	componentWillMount = async () => {
		/////////////////	OBTENGO EL PERFIL
		let userInfoId   = await AsyncStorage.getItem('userInfoId');
		let notificacion = await AsyncStorage.getItem('userInfoNotificacion');
		userInfoId =  JSON.parse(userInfoId)
		notificacion =  JSON.parse(notificacion)

		this.setState({notificacion})
		this.socket = SocketIOClient(URL);
		this.socket.on('editProfile'+userInfoId, this.onReceivedMessage);
	}
 
	onReceivedMessage = async (notificacion) =>{
		await AsyncStorage.setItem('userInfoNotificacion', 'true');
		this.setState({notificacion:true})
	}
	 
	render(){
		const {navigate, publico} = this.props
		const route = navigate.state.routeName
		return(
			<View style={cabezeraFooterStyle.footer3} >
				<TouchableOpacity onPress={()=> navigate.navigate('inicio')} style={route=='Home'||route=='inicio' ?[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Active] :[cabezeraFooterStyle.btnFooter3]} >
					<Image source={require('../assets/images/home.png')} style={cabezeraFooterStyle.iconFooter3} />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate.navigate('wallet')} style={route=='wallet' ?[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Active] :[cabezeraFooterStyle.btnFooter3]} >
					<Image source={require('../assets/images/mi_wallet.png')} style={cabezeraFooterStyle.iconFooter3} />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate.navigate('createPlan', publico)} style={route=='3' ?[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Create, cabezeraFooterStyle.btnFooter3Active] :[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Create]} >
					<Image source={require('../assets/images/crear_plan.png')} style={cabezeraFooterStyle.iconFooter3Create} />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate.navigate('misPlanes')} style={route=='misPlanes' ?[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Active] :[cabezeraFooterStyle.btnFooter3]} >
					<Image source={require('../assets/images/mis_planes.png')} style={cabezeraFooterStyle.iconFooter3} />
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> this.updatePerfilNotificacion()} style={route=='notificacion' ?[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Active] :[cabezeraFooterStyle.btnFooter3]} >
					<Image source={require('../assets/images/notificaciones.png')} style={cabezeraFooterStyle.iconFooter3} />
					{
						this.state.notificacion
						&&<Text style={cabezeraFooterStyle.punto}>&#8226;</Text>
					}
				</TouchableOpacity>
			</View>
		)
	}
	updatePerfilNotificacion = async ()=>{
		const {navigate} = this.props
		axios.put('/x/v1/user/desactivaNotificacion') 
		.then((res)=>{
			if(res.data.code===1){
				navigate.navigate('notificacion')
				this.setState({notificacion:false}) 
			}  
			 
		})
		.catch((err)=>{
			console.log(err)
		})
		try {
		    await AsyncStorage.setItem('userInfoNotificacion', 'false');
		} catch (error) {
		   console.log(error)
		}
	}
	
}