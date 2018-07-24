import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Text, AsyncStorage} from 'react-native'
import {cabezeraFooterStyle} from '../cabezeraFooter/style'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';
import {URL} from '../../App.js'

export default class CabezeraComponent extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {notificacion:false};
	  this.onReceivedMessage = this.onReceivedMessage.bind(this);
	}
 
	componentWillMount = async () => {
		/////////////////	OBTENGO EL PERFIL
		
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			// console.log(res.data.user.user.notificacion)
			this.setState({notificacion:res.data.user.user.notificacion, id:res.data.user.user._id})
		})
		.catch((err)=>{
			console.log(err)
		})

		let value = await AsyncStorage.getItem('userInfo');
		value =  JSON.parse(value)
		 console.log(value._id);
		this.socket = SocketIOClient(URL);
		this.socket.on('editProfile'+value._id, this.onReceivedMessage);
		// AsyncStorage.getItem('userInfo', (err, result) => {
	 //      console.log(result);
	 //    });

		//console.log(this.state.id)
	}
	// componentDidMount = async () => {
	//   try {
	//     const value = await AsyncStorage.getItem('userInfo');
	//     if (value !== null) {
	//       // We have data!!
	//       console.log(value);
	//     }
	//    } catch (error) {
	//       console.log(error);
	//    }
	// }
	onReceivedMessage(notificacion) {
		console.log(notificacion)
		this.setState({notificacion})
	}
	render(){
		const {navigate} = this.props	
		
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