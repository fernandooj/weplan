import React, {Component} 			  from 'react'
import {View, Text, TouchableOpacity, Modal, ImageBackground,
TextInput, CheckBox, Linking, Alert}  from 'react-native'
import {style} 					  from '../qr/style'
import axios 						  from 'axios';
import QRCode from 'react-native-qrcode';

 

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
					style={style.contenedor}
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
		        }}>
		        <ImageBackground style={style.fondo}  source={num===0 ?require('../../splash0.jpg') :num===1 ?require('../../splash1.jpg') :num===2 ?require('../../splash2.jpg') :num===3 ?require('../../splash3.jpg') :num===4 &&require('../../splash4.jpg')} >
			        {
			        	titulo
			        	&&<Text style={[style.titulo, style.familia]}>Ya eres parte de weplan, Bienvenidos</Text>
			        }
					
					<View style={style.qr} >
						{/*<QRCode value={id} size={180} />*/}
						<QRCode
				          value={id}
				          size={200}
				          bgColor='black'
				          fgColor='white'
				        />
					</View>
					<Text style={[style.texto, style.familia]}>Este es tu Código QR unico e irrepetible, úsalo para agregar amigos y únirte a planes !</Text>
					
					<View style={style.containerHecho}>
			    		<TouchableOpacity  style={style.btnHecho} onPress={()=>this.props.close(planId)}>
					    	<Text  style={[style.hecho, style.familia]}>!Listo!</Text>
					    </TouchableOpacity>
					</View> 
				 </ImageBackground>
			</Modal>
		    
		)
	}
}

 








