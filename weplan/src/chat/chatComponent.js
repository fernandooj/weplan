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
		//let planId = this.props.navigation.state.params	
		let planId = '5ae236db9455a84f5576a175'	
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
			let mensajes=[]
			/////////////////////////////   filtro mensajes con porcentajes  /////////////////
			e.data.mensaje.map((e)=>{
				let idPregunta= e.preguntaId ?e.preguntaId._id :1
				axios.get('/x/v1/res/respuesta/'+idPregunta)
				.then(res=>{ 

					mensajes.push({
						id: 		    e._id,
						userId: 	    e.userId._id,
						nombre 		:e.userId.nombre,
						photo 		:e.userId.photo,
						mensaje 	   :e.mensaje,
						itemId 		:e.itemId ?e.itemId._id :null ,
						titulo 		:e.itemId ?e.itemId.titulo :null,
						descripcion :e.itemId ?e.itemId.descripcion :null,
						rutaImagen	:e.itemId ?e.itemId.rutaImagen :null,
						valor 		:e.itemId ?e.itemId.valor :null,
						preguntaId	:e.preguntaId ?e.preguntaId._id :null,
						pTitulo		:e.preguntaId ?e.preguntaId.titulo :null,
						pDescripcion:e.preguntaId ?e.preguntaId.descripcion :null,
						pregunta1	:e.preguntaId ?e.preguntaId.pregunta1 :null,
						pregunta2	:e.preguntaId ?e.preguntaId.pregunta2 :null,
						respuesta1  :res.data.porcentaje1,
						respuesta2  :res.data.porcentaje2,
						tipoPregunta:e.preguntaId ?e.preguntaId.tipo :null,
						tipoChat	   :e.tipo,
						estado      :e.estado,
						porcentaje1 :res.data.porcentaje1,
						porcentaje2 :res.data.porcentaje2,
						asignado    :res.data.asignado
					})
					console.log(mensajes)
					this.setState({mensajes})
				})
				.catch(err=>{
					console.log(err)
				})
			})
			/////////////////////////////////////////////////////////////////////////////////
			
			 
		})
		.catch(res=>{
			console.log(res)
		})
	}
	componentWillReceiveProps(NextProps){
		console.log(this.props)
	}

	onReceivedMessage(messages) {
		console.log(messages)
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
					<Text style={ChatStyle.nombrePlan}>{nombrePlan ?nombrePlan.substring(0, 60) :''}</Text>
					<TouchableOpacity onPress={()=> navigate('pregunta', planId)}  style={ChatStyle.iconContenedor}>
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
		const {id, mensajes} = this.state
		return mensajes.map((e,key)=>{
			if (e.tipoChat==1) {
				return (
					<View key={key} style={ChatStyle.contenedorBox}>
						<View style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}>
							<Text style={e.userId== id ?ChatStyle.nombre :[ChatStyle.nombre, ChatStyle.nombreLeft]}>{e.nombre}</Text>
							<Text style={ChatStyle.mensaje}>{e.mensaje}</Text>
							
						    <Text style={ChatStyle.fecha} >{e.fecha}</Text>
						</View>
						<Image
							style={e.userId== id ?ChatStyle.photo : [ChatStyle.photo, ChatStyle.photoLeft]}
							width={50}
							height={50}
							source={{uri: e.photo}}
					    />
					</View>	
				)
			}else if(e.tipoChat==2){
				return (
					<View style={ChatStyle.container} key={key} >
			         	<View style={ChatStyle.modalIn}>
				          	{/* imagen avatar */}
				            <Image source={require('./item2.png')} 
				            	style={e.userId== id ?ChatStyle.header :[ChatStyle.header, ChatStyle.headerLeft]} 
				            	/>
								<Image source={{uri: e.photo}}
									style={e.userId== id ?ChatStyle.iconAvatar :[ChatStyle.iconAvatar, ChatStyle.iconAvatarLeft]} 
								/>

					         {/* fotografia item */}
					         <Image source={{uri: e.rutaImagen}}
					         	style={e.userId== id ?ChatStyle.fotografia :[ChatStyle.fotografia, ChatStyle.fotografiaLeft]}
					         />
	  
					         {/* rest modal  
					         <View style={[ChatStyle.box, ChatStyle.modal]}>*/} 
					         <View style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft,  ChatStyle.modal]}>
					             <Text style={e.userId== id ?ChatStyle.nombre :[ChatStyle.nombre, ChatStyle.nombreLeft]}>{e.nombre}</Text>
					             <Text style={e.userId== id ?ChatStyle.titulo :[ChatStyle.titulo, ChatStyle.tituloLeft]}>{e.titulo}</Text>
					             <Text style={e.userId== id ?ChatStyle.descripcion :[ChatStyle.descripcion, ChatStyle.descripcionLeft]}>{e.descripcion}</Text>  
					             <Text style={e.userId== id ?ChatStyle.valor :[ChatStyle.valor, ChatStyle.valorLeft] }>
					             	{'$ '+Number(e.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
					             </Text>  
					       	</View>

					       	<View style={e.userId== id ?ChatStyle.contenedorInteres :[ChatStyle.contenedorInteres, ChatStyle.contenedorInteresLeft]}>
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
			}else{
				return(
					<View key={key} style={ChatStyle.contenedorPreguntas} >
					<Text>{e.pTitulo}</Text>
					<Text>{e.pDescripcion}</Text>
						<View >
							{
								e.tipoPregunta==1 
								?<View style={ChatStyle.contenedorOpciones}>
								 	<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.preguntaId, 1, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<Image source={{uri:e.pregunta1}} style={ChatStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.preguntaId, 2, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<Image source={{uri:e.pregunta2}} style={ChatStyle.imagenPregunta} />
										}
									</TouchableOpacity>
								 </View> 
								:e.tipoPregunta==2
								?<View style={ChatStyle.contenedorOpciones}>
								  <Text style={ChatStyle.textoPregunta}>{e.pregunta1}</Text> 
								  <Text style={ChatStyle.textoPregunta}>{e.pregunta2}</Text> 
								 </View> 
								:e.tipoPregunta==3
								?<View style={ChatStyle.contenedorOpciones}>
								  <Image source={{uri:e.pregunta1}} style={ChatStyle.imagenPregunta} />
								  <Text  style={ChatStyle.textoPregunta}>{e.pregunta2}</Text> 
								 </View> 
								:<View style={ChatStyle.contenedorOpciones}	>
								  <Text  style={ChatStyle.textoPregunta}>{e.pregunta1}</Text>
								  <Image source={{uri:e.pregunta2}} style={ChatStyle.imagenPregunta} /> 
								</View> 
							}	
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
							multiline = {true}
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
	handleSubmitPregunta(idPregunta, valor, idChat){
		console.log(idChat)
		axios.post('/x/v1/res/respuesta', {valor, idPregunta, idChat})
		.then(res=>{
			console.log(res.data)
			let mensajes = this.state.mensajes.filter((e)=>{
				if (e.id==idChat) {e.respuesta1=res.data.porcentaje1; e.respuesta2=res.data.porcentaje2; e.asignado=true}
				return e
			})
			this.setState({mensajes})
		})
		.catch(err=>{
			console.log(err)
		})
 
	}
	handleSubmit(){
		const fecha = moment().format('h:mm')
		const {planId, mensaje, id, photo} = this.state
		this.textInput.clear()
		axios.post('/x/v1/cha/chat', {planId, mensaje, fecha})
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}