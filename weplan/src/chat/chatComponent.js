import React, {Component} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {ChatStyle} from '../chat/style'
import update from 'react-addons-update';
import moment from 'moment'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


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
		let planId = '5b0b87577ea08b5b42740212'	
		console.log(planId) 
		this.socket = SocketIOClient(URL);
		this.socket.on('userJoined'+planId, this.onReceivedMessage);

		/////////////////	OBTENGO EL PLAN
		axios.get('/x/v1/pla/plan/getbyid/'+planId) 
		.then((res)=>{
			console.log(res.data)
			this.setState({planId, imagen: res.data.plan[0].imagen[0], nombrePlan: res.data.plan[0].nombre, planId})
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
				let idPregunta= e.encuestaId ?e.encuestaId._id :1
				axios.get('/x/v1/res/respuesta/'+idPregunta)
				.then(res=>{ 

					mensajes.push({
						id           : e._id,
						userId       : e.userId._id,
						nombre 		 : e.userId.nombre,
						photo 		 : e.userId.photo,
						token 		 : e.userId.tokenPhone,
						mensaje 	 : e.mensaje,
						asignadoItem : e.itemId ?e.itemId.asignados.includes(this.state.id) :null,
						esperaItem   : e.itemId ?e.itemId.espera.includes(this.state.id) :null,
						itemId 		 : e.itemId ?e.itemId._id :null ,
						titulo 		 : e.itemId ?e.itemId.titulo :null,
						descripcion  : e.itemId ?e.itemId.descripcion :null,
						rutaImagen	 : e.itemId ?e.itemId.rutaImagen :null,
						valor 		 : e.itemId ?e.itemId.valor :null,
						encuestaId	 : e.encuestaId ?e.encuestaId._id :null,
						pTitulo		 : e.encuestaId ?e.encuestaId.titulo :null,
						pDescripcion : e.encuestaId ?e.encuestaId.descripcion :null,
						pregunta1	 : e.encuestaId ?e.encuestaId.pregunta1 :null,
						pregunta2	 : e.encuestaId ?e.encuestaId.pregunta2 :null,
						respuesta1   : res.data.porcentaje1,
						respuesta2   : res.data.porcentaje2,
						tipoEncuesta : e.encuestaId ?e.encuestaId.tipo :null,
						tipoChat	 : e.tipo,
						estado       : e.estado,
						porcentaje1  : res.data.porcentaje1,
						porcentaje2  : res.data.porcentaje2,
						asignado     : res.data.asignado
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
 


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////// 		RENDERIZA LA CABEZERA CON EL NOMBRE DEL PLAN Y LOS ICONOS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderCabezera(){
		const {planId, imagen, nombrePlan} = this.state
		const {navigate} = this.props.navigation
		return(
			<View>
				<View style={ChatStyle.cabezera}>
					<TouchableOpacity onPress={() => navigate('misPlanes')} style={ChatStyle.iconContenedor}>
						<Text style={ChatStyle.regresar}>&#60;</Text>		
					</TouchableOpacity> 
					<Text style={ChatStyle.nombrePlan}>{nombrePlan ?nombrePlan.substring(0, 60) :''}</Text>
					<TouchableOpacity onPress={() => navigate('encuesta', planId)}  style={ChatStyle.iconContenedor}>
						<Image source={require('./preguntar.png')} style={ChatStyle.icon}  />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigate('item', planId)} style={ChatStyle.iconContenedor}>
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
	dynamicSort(property) {
	    var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	renderMensajes(){
		const {navigate} = this.props.navigation
		const {id, mensajes} = this.state
		let   data = mensajes.sort(this.dynamicSort('id'))
		return data.map((e,key)=>{
			if (e.tipoChat===1) {
				return (
					<View key={key} style={ChatStyle.contenedorBox}>
						<View style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}>
							<View style={ChatStyle.tituloTipoChat}>
								<Text style={e.userId== id ?ChatStyle.nombreTipoChat :[ChatStyle.nombreTipoChat, ChatStyle.nombreTipoChatLeft]}>{e.nombre}</Text>
							</View>
							<View style={ChatStyle.mensajeTipoChat}>
								<Text style={ChatStyle.mensaje}>{e.mensaje}</Text>
								<Text style={e.userId== id ?ChatStyle.fecha :[ChatStyle.fecha, ChatStyle.fechaLeft]}>{e.fecha}</Text>
							</View>
						</View>
						<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?ChatStyle.btnAvatarC : [ChatStyle.btnAvatarC, ChatStyle.btnAvatarCLeft]}>
							<Image
								style={ChatStyle.photo}
								width={50}
								height={50}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
					</View>	
				)
			}else if(e.tipoChat===2){
				return (
					<View style={ChatStyle.container} key={key} >
			         	<View style={ChatStyle.modalIn}>
			         		<ImageBackground source={require('./item2.png')} style={e.userId== id ?ChatStyle.fondoHeaderItem :[ChatStyle.fondoHeaderItem, ChatStyle.fondoHeaderItemLeft]}>	 
						      {/* imagen avatar */}
						         <Text style={e.userId== id ?ChatStyle.nombreIt :[ChatStyle.nombreIt, ChatStyle.nombreItLeft]}>{e.nombre}</Text>

						      {/* imagen avatar */}
						      		<TouchableOpacity  onPress={e.userId== id ?null :()=> navigate('profile', e.userId)}>
									<Image source={{uri: e.photo}}
										style={e.userId== id ?ChatStyle.iconAvatar :[ChatStyle.iconAvatar, ChatStyle.iconAvatarLeft]} 
									/>
									</TouchableOpacity>
									</ImageBackground>	
							   {/* fotografia item */}
						         <Image source={{uri: e.rutaImagen}}
						         	style={e.userId== id ?ChatStyle.fotografia :[ChatStyle.fotografia, ChatStyle.fotografiaLeft]}
						         />
	  							
					         {/* rest modal  
					         <View style={[ChatStyle.box, ChatStyle.modal]}>*/} 
					         <View style={e.userId== id ?ChatStyle.contenedorItem :[ChatStyle.contenedorItem, ChatStyle.contenedorItemLeft]}>
					             <Text style={e.userId== id ?ChatStyle.titulo :[ChatStyle.titulo, ChatStyle.tituloLeft]}>{e.titulo}</Text>
					             <Text style={e.userId== id ?ChatStyle.descripcion :[ChatStyle.descripcion, ChatStyle.descripcionLeft]}>{e.descripcion}</Text>  
					             <Text style={e.userId== id ?ChatStyle.valor :[ChatStyle.valor, ChatStyle.valorLeft] }>
					             	{'$ '+Number(e.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
					             </Text>  
					       	</View>
					       	{
					       		(!e.asignadoItem && !e.esperaItem)  && e.userId !== id
					       		?<View style={e.userId== id ?ChatStyle.contenedorInteres :[ChatStyle.contenedorInteres, ChatStyle.contenedorInteresLeft]}>
							       	<TouchableOpacity onPress={()=> this.ingresarItem(e.token, e.itemId, e.id)} style={ChatStyle.btnInteres} >
							       		<Image source={require('./me_interesa.png')} style={ChatStyle.imagenInteres} />
							       		<Text style={ChatStyle.textoInteres}>Me Interesa</Text>
							       	</TouchableOpacity>
							      </View> 	
							      :!e.asignadoItem && e.esperaItem
							      ?<View style={e.userId== id ?ChatStyle.contenedorInteres :[ChatStyle.contenedorInteres, ChatStyle.contenedorInteresLeft]}>
							      	<Image source={require('./espera.png')} style={ChatStyle.imagenEspera} />
							      </View>
							      :null
					       	}
			      		</View>
		     		</View>
				)
			}else{
				return(
					<View key={key} style={e.userId== id ?ChatStyle.contenedorEncuesta :[ChatStyle.contenedorEncuesta, ChatStyle.contenedorEncuestaLeft]}>
						<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)}>
							<Image
								style={e.userId== id ?ChatStyle.pPhoto : [ChatStyle.pPhoto, ChatStyle.pPhotoLeft]}
								width={50}
								height={50}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
						<View style={ChatStyle.contenedorTitulos}>
							<Text style={ChatStyle.pNombre}>{e.nombre}</Text>
							<Text style={ChatStyle.pTitulo}>{e.pTitulo}</Text>
							<View style={ChatStyle.contenedorDescripcion}>
								<Image source={require('../encuesta/item4.png')} style={ChatStyle.decoracion} />
								<Text style={ChatStyle.pDescripcion}>{e.pDescripcion}</Text>
								<Image source={require('../encuesta/item4.png')} style={ChatStyle.decoracion} />
							</View>
						</View>
						
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={ChatStyle.contenedorOpciones}>
								 	<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado 
											?<View style={ChatStyle.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={ChatStyle.imagenRespuesta} />
												<Text style={ChatStyle.textoPregunta}>{e.respuesta1} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta1}} style={ChatStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado
											?<View style={ChatStyle.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={ChatStyle.imagenRespuesta} />
												<Text style={ChatStyle.textoPregunta}>{e.respuesta2} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta2}} style={ChatStyle.imagenPregunta} />
										}
									</TouchableOpacity>
								 </View> 
								:e.tipoEncuesta==2
								?<View style={ChatStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={ChatStyle.btnInteres} >
								  		{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:e.tipoEncuesta==3
								?<View style={ChatStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}>
												<Image source={{uri:e.pregunta1}} style={ChatStyle.imagenRespuesta} />
												<Text style={ChatStyle.textoPregunta}>{e.respuesta1} %</Text>
												</View> 
											:<Image source={{uri:e.pregunta1}} style={ChatStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={ChatStyle.btnInteres} >
								  		{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:<View style={ChatStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={ChatStyle.btnInteres} >
										{
											e.asignado 
											?<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={ChatStyle.contenedorPregunta}><Text style={ChatStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!e.asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={ChatStyle.btnInteres} >
								  		{
											e.asignado
											?<View style={ChatStyle.contenedorPregunta}>
												<Image source={{uri:e.pregunta2}} style={ChatStyle.imagenRespuesta} />
												<Text style={ChatStyle.textoPregunta}>{e.respuesta2} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta2}} style={ChatStyle.imagenPregunta} />  
										}
									</TouchableOpacity>
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
				<ImageBackground source={require('./fondo.png')} style={ChatStyle.fondo}>	
					<ScrollView ref="scrollView"
								style={ChatStyle.contenedorChat} 
								onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
						{this.renderMensajes()}		
					</ScrollView>
				</ImageBackground>
				<View style={ChatStyle.footer}>
					<View style={ChatStyle.footer1}>
						<TouchableOpacity onPress={() => this.uploadFiles(this)} style={ChatStyle.opcionesBtn}>
							<Image source={require('./opciones.png')} style={ChatStyle.opciones}  />
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
						<TouchableOpacity onPress={() => this.handleSubmit(this)}  style={ChatStyle.enviarBtn} >
							<Image source={require('./enviar.png')} style={ChatStyle.enviar}  />
						</TouchableOpacity>
					</View>
				</View>
			</View>	
		)
	}
	opciones(){
		console.log("opciones")
	}
	uploadFiles(){
 		DocumentPicker.show({
	      filetype: [DocumentPickerUtil.allFiles()],
	    },(error,res) => {
	      // Android
	      console.log(
	         res.uri,
	         res.type, // mime type
	         res.fileName,
	         res.fileSize
	      );
	      // axios.post('/x/v1/test/test', res)
	      // .then(e=>{
	      // 	console.log(e.data)
	      // })
	    });
 	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// SI EL USUARIO HACE CLICK EN ME INTERESA, ENVIA LA NOTIFICACION AL CREADOR DEL ITEM PARA DARLE PERMISO DE INGRESAR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	ingresarItem(token, itemId, id){
		axios.put('x/v1/ite/item', {itemId})
		.then(e=>{
			if (e.data.code==1) {
				sendRemoteNotification(3, token, "notificacion")
				let mensajes = this.state.mensajes.filter(e=>{
					if (e.id==id) {e.esperaItem=true}
						return e
				})
 				this.setState({mensajes})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////// ENVIO LA RESPUESTA EN LAS ENCUESTAS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmitPregunta(idPregunta, valor, idChat){
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

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////// ENVIO EL MENSAJE DEL CHAT 
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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