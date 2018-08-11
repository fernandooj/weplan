import React, {Component} 			  from 'react'
import {View, Text, TouchableOpacity, Modal, ImageBackground,
TextInput, CheckBox, Linking, Alert}  from 'react-native'
import {QrStyle} 					  from '../qr/style'
import axios 						  from 'axios';
import QRCode 						  from 'react-qr-code';

 

export default class QrComponent extends Component{
	state={
		id:'',
		modalVisible:true,
	}
	componentWillMount(){
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user._id)
			let id = res.data.user.user._id
			this.setState({id})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
	render(){
		const {id} = this.state
		const {num, titulo, planId} = this.props
		console.log(num)
		return(
			<Modal
					style={QrStyle.contenedor}
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
		        }}>
		        <ImageBackground style={QrStyle.fondo}  source={num===0 ?require('../../splash0.jpg') :num===1 ?require('../../splash1.jpg') :num===2 ?require('../../splash2.jpg') :num===3 ?require('../../splash3.jpg') :num===4 &&require('../../splash4.jpg')} >
			        {
			        	titulo
			        	&&<Text style={QrStyle.titulo}>Ya eres parte de weplan, Bienvenidos</Text>
			        }
					
					<View style={QrStyle.qr} >
						<QRCode value={id} size={180} />
					</View>
					<Text style={QrStyle.texto}>Este es tu Código QR unico e irrepetible, úsalo para agregar amigos y únirte a planes !</Text>
					
					<View style={QrStyle.containerHecho}>
			    		<TouchableOpacity  style={QrStyle.btnHecho} onPress={()=>this.props.close(planId)}>
					    	<Text  style={QrStyle.hecho}>!Listo!</Text>
					    </TouchableOpacity>
					</View> 
				 </ImageBackground>
			</Modal>
		    
		)
	}
}

 








