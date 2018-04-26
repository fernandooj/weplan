import React, {Component} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';

import {ChatStyle} from '../chat/style'
import update from 'react-addons-update';
import moment from 'moment'
import {URL} from '../../App.js'
export default class ChatComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			mensajes: [],
			nombrePlan:''
		}
		this.onReceivedMessage = this.onReceivedMessage.bind(this);

	}

	componentWillMount(){
		let planId = this.props.navigation.state.params	
		//let planId = '5ad68ae03f201846174bb61f'	
		console.log(planId)	 	 
		this.socket = SocketIOClient(URL);
		this.socket.on('userJoined'+planId, this.onReceivedMessage);

		/////////////////	OBTENGO EL PLAN
		axios.get('/x/v1/pla/plan/getbyid/'+planId) 
		.then((res)=>{
			this.setState({imagen: res.data.message[0].imagen, nombrePlan: res.data.message[0].nombre, planId})
		})
		.catch((err)=>{
			console.log(err)
		})


		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			let id = res.data.user.user._id
			let photo = res.data.user.user.photo
			let nombre = res.data.user.user.nombre
			this.setState({id, photo, nombre})
		})
		.catch((err)=>{
			console.log(err)
		})

		/////////////////	OBTENGO TODOS LOS MENSAJE
		axios.get('/x/v1/cha/chat/'+planId)
		.then(e=>{
			console.log(e.data.mensaje)
			let mensajes = e.data.mensaje.map((e)=>{
				return {
					id: e.userId._id,
					nombre:e.userId.nombre,
					photo:e.userId.photo,
					mensaje:e.mensaje,
					itemId: e.itemId ?e.itemId._id :null ,
					titulo:e.itemId ?e.itemId.titulo :null,
					descripcion:e.itemId ?e.itemId.descripcion :null,
					rutaImagen:e.itemId ?e.itemId.rutaImagen :null,
					valor:e.itemId ?e.itemId.valor :null
				}
			})
			this.setState({mensajes})
			console.log(mensajes)
		})
		.catch(res=>{
			console.log(res)
		})
	}
	componentWillReceiveProps(NextProps){
		console.log(this.props)
	}

	onReceivedMessage(messages) {
	 	this.setState({
		  mensajes: update(this.state.mensajes, {$push: [messages]})
		})
	 }
 
	renderCabezera(){
		const {planId, imagen, nombrePlan} = this.state
		const {navigate} = this.props.navigation
		return(
			<View>
				<View style={ChatStyle.cabezera}>
					<TouchableOpacity onPress={()=> navigate('misPlanes')} style={ChatStyle.iconContenedor}>
						<Text style={ChatStyle.regresar}>&#60;</Text>		
					</TouchableOpacity>
					<Text style={ChatStyle.nombrePlan}>{nombrePlan.substring(0, 60)}</Text>
					<TouchableOpacity onPress={() => this.opciones.bind(this)} style={ChatStyle.iconContenedor}>
						<Image source={require('./preguntar.png')} style={ChatStyle.icon}  />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('item', planId)} style={ChatStyle.iconContenedor}>
						<Image source={require('./cuentas.png')} style={ChatStyle.icon}  />
					</TouchableOpacity>
				</View>
				<Image
					style={ChatStyle.imagen}
					width={70}
					height={70}
					source={{uri: imagen}}
			    />	
			</View>
		)
	}
	renderMensajes(){
		const {navigate} = this.props.navigation
		return this.state.mensajes.map((e,key)=>{
			if (e.mensaje!==null) {
				
				return (
					<View key={key} style={ChatStyle.contenedorBox}>
						<View style={e.id== this.state.id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}>
							<Text style={e.id== this.state.id ?ChatStyle.nombre :[ChatStyle.nombre, ChatStyle.nombreLeft]}>{e.nombre}</Text>
							<Text style={ChatStyle.mensaje}>{e.mensaje}</Text>
							
						    <Text style={ChatStyle.fecha} >{e.fecha}</Text>
						</View>
						<Image
							style={e.id== this.state.id ?ChatStyle.photo : [ChatStyle.photo, ChatStyle.photoLeft]}
							width={50}
							height={50}
							source={{uri: e.photo}}
					    />
					</View>	
				)
			}else{
				return (
					<View style={ChatStyle.container} key={key} >
		         	<View style={ChatStyle.modalIn}>
			          	{/* imagen avatar */}
			            <Image source={require('./item2.png')} 
			            	style={e.id== this.state.id ?ChatStyle.header :[ChatStyle.header, ChatStyle.headerLeft]} 
			            	/>
							<Image source={{uri: e.photo}}
								style={e.id== this.state.id ?ChatStyle.iconAvatar :[ChatStyle.iconAvatar, ChatStyle.iconAvatarLeft]} 
							/>

				         {/* fotografia item */}
				         <Image source={{uri: e.rutaImagen}}
				         	style={e.id== this.state.id ?ChatStyle.fotografia :[ChatStyle.fotografia, ChatStyle.fotografiaLeft]}
				         />
  
				         {/* rest modal  
				         <View style={[ChatStyle.box, ChatStyle.modal]}>*/} 
				         <View style={e.id== this.state.id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft,  ChatStyle.modal]}>
				             <Text style={e.id== this.state.id ?ChatStyle.nombre :[ChatStyle.nombre, ChatStyle.nombreLeft]}>{e.nombre}</Text>
				             <Text style={e.id== this.state.id ?ChatStyle.titulo :[ChatStyle.titulo, ChatStyle.tituloLeft]}>{e.titulo}</Text>
				             <Text style={e.id== this.state.id ?ChatStyle.descripcion :[ChatStyle.descripcion, ChatStyle.descripcionLeft]}>{e.descripcion}</Text>  
				             <Text style={e.id== this.state.id ?ChatStyle.valor :[ChatStyle.valor, ChatStyle.valorLeft] }>
				             	{'$ '+Number(e.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
				             </Text>  
				       	</View>

				       	<View style={e.id== this.state.id ?ChatStyle.contenedorInteres :[ChatStyle.contenedorInteres, ChatStyle.contenedorInteresLeft]}>
					       	<TouchableOpacity onPress={()=> navigate('')} style={ChatStyle.btnInteres} >
					       		<Image source={require('./me_interesa.png')} style={ChatStyle.imagenInteres} />
					       		<Text style={ChatStyle.textoInteres}>Me Interesa</Text>
					       	</TouchableOpacity>
					       	<TouchableOpacity onPress={()=> navigate('')} style={ChatStyle.btnInteres} >
					       		<Image source={require('./no_me_interesa.png')} style={ChatStyle.imagenInteres} />
					       		<Text style={ChatStyle.textoInteres}>no me Interesa</Text>
					       	</TouchableOpacity>
					      </View> 	
		      		</View>
		     		</View>
				)
			}
			
		})
	}

	render(){

		return(
			<View style={ChatStyle.contenedorGeneral} > 
				{this.renderCabezera()}
				<ScrollView ref="scrollView"
							style={ChatStyle.contenedorChat} 
							onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
				{this.renderMensajes()}
				</ScrollView>
				<View style={ChatStyle.footer}>
					<View style={ChatStyle.footer1}>
						<TouchableOpacity onPress={() => this.opciones.bind(this)} style={ChatStyle.opciones}>
							<Image source={require('./opciones.png')} style={{width:'100%'}}  />
						</TouchableOpacity>
						<TextInput
							style={ChatStyle.textarea}
							onChangeText={(mensaje) => this.setState({mensaje})}
							value={this.state.mensaje}
							placeholderTextColor="#c9c9c9" 
							underlineColorAndroid='transparent'
							ref={input => { this.textInput = input }}
						/>
						<TouchableOpacity onPress={() => this.handleSubmit(this)}  style={ChatStyle.enviar} >
							<Image source={require('./enviar.png')} style={{width:'100%'}}  />
						</TouchableOpacity>
					</View>
				</View>
			</View>	
		)
	}
	opciones(){
		console.log("opciones")
	}

	handleSubmit(){
		const fecha = moment().format('h:mm')
		const {planId, mensaje, id, photo} = this.state
		
		axios.post('/x/v1/cha/chat', {planId, mensaje, fecha})
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(res.err)
		})
	}
}