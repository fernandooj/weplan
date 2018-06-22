import React, {Component} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {ChatStyle} from '../chat/style'
import update from 'react-addons-update';
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


import AgregarAmigosComponent from '../agregarAmigos/agregarAmigos.js'
import MapaPlanComponent 		from '../createPlan/mapa.js'
import PdfComponent           from '../pdf/pdfComponent.js'
import MapComponent           from '../mapa/mapComponent.js'
import {pedirImagen, pedirPdf, pedirContacto, pedirMapa} from './peticiones.js'		
import {URL} from '../../App.js'
export default class ChatComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			mensajes: [],
			mensaje:'',
			nombrePlan:'',
			lat:'',
			lng:'',
			showOpciones:false,
			adjuntarAmigos:false,
			mapa:false,
			showPdf:false,
			usuariosAsignados:[],
			planAsignados:[],
			
		}
		this.onReceivedMessage = this.onReceivedMessage.bind(this);
	}

	componentWillMount(){
		//let planId = this.props.navigation.state.params	
		let planId = '5b2b32449084f2675a5337cf'	 
		console.log(planId) 
		this.socket = SocketIOClient(URL);
		this.socket.on('userJoined'+planId, this.onReceivedMessage);


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

		/////////////////	OBTENGO TODOS LOS MENSAJES Y EL PLAN
		axios.get(`/x/v1/cha/chat/chatPlan/${planId}`)
		.then(e=>{
			console.log(e.data)	
			this.setState({mensajes:e.data.chat, planId, imagen: e.data.plan.imagenResize[0], nombrePlan: e.data.plan.nombre, planId, planAsignados:e.data.plan.asignados, plan:e.data.plan})		 
		})
		.catch(err=>{
			console.log(err)
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
					<TouchableOpacity onPress={() => navigate('misPlanes')} style={ChatStyle.iconRegresar}>
						<Text style={ChatStyle.regresar}>&#60;</Text>		
					</TouchableOpacity> 
					<Text style={ChatStyle.nombrePlan}>{nombrePlan ?nombrePlan.substring(0, 60) :''}</Text>
					<View style={ChatStyle.iconosHeaderContenedor}>
						<TouchableOpacity onPress={() => navigate('encuesta', planId)}  style={ChatStyle.iconContenedor}>
							<Image source={require('./preguntar.png')} style={ChatStyle.icon}  />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigate('item', planId)} style={ChatStyle.iconContenedor}>
							<Image source={require('./cuentas.png')} style={ChatStyle.icon}  />
						</TouchableOpacity>
					</View>
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
		const {id, mensajes, planAsignados, plan, showPdf} = this.state
 
		return mensajes.map((e,key)=>{
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
								width={45}
								height={45}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
					</View>	
				)
			}
			else if(e.tipoChat===2){
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
			}else if(e.tipoChat==3){
				return(
					<View key={key} style={e.userId== id ?ChatStyle.contenedorEncuesta :[ChatStyle.contenedorEncuesta, ChatStyle.contenedorEncuestaLeft]}>
						<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)}>
							<Image
								style={e.userId== id ?ChatStyle.pPhoto : [ChatStyle.pPhoto, ChatStyle.pPhotoLeft]}
								width={45}
								height={45}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
						<View style={ChatStyle.contenedorTitulos}>
							<Text style={ChatStyle.pNombre}>{e.nombre}</Text>
							<Text style={ChatStyle.pTitulo}>{e.eTitulo}</Text>
							<View style={ChatStyle.contenedorDescripcion}>
								<Image source={require('../encuesta/item4.png')} style={ChatStyle.decoracion} />
								<Text style={ChatStyle.pDescripcion}>{e.eDescripcion}</Text>
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
				}else if (e.tipoChat===4) {
					return (
						<View key={key} style={ChatStyle.contenedorBox}>
							<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?ChatStyle.cBtnAvatarC : [ChatStyle.cBtnAvatarC, ChatStyle.cBtnAvatarCLeft]}>
								<Image
									style={ChatStyle.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
							<Image
								style={e.userId==id ?ChatStyle.cPhoto :[ChatStyle.cPhoto, ChatStyle.cPhotoLeft]} 
								width={60}
								height={60}
								source={{uri: e.cPhoto}}
						   />
							<TouchableOpacity style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}>
								<View style={ChatStyle.tituloTipoChat}>
									<Text style={e.userId== id ?ChatStyle.cNombreTipoChat :[ChatStyle.cNombreTipoChat, ChatStyle.cNombreTipoChatLeft]}>{e.nombre}</Text>
								</View>
								<View style={ChatStyle.mensajeCChat}>
									<Text style={e.userId== id ?ChatStyle.cMensaje :[ChatStyle.cMensaje, ChatStyle.cMensajeLeft]}>{e.cNombre}</Text>
									<Text style={e.userId== id ?ChatStyle.cFecha   :[ChatStyle.cFecha,   ChatStyle.cFechaLeft]}>{e.fecha}</Text>
								</View>
								
								<View style={ChatStyle.botonesContacto}>
									<TouchableOpacity>
										<Text style={ChatStyle.cTextBotones}>Agregar Contacto</Text>
									</TouchableOpacity>
									{
										plan.idUsuario._id === id && !e.estaPlan && e.contactoId !=id
										&&<TouchableOpacity onPress={()=>this.agregarUsuarioPlan(e.contactoId, e.id)}>
											<Text style={ChatStyle.cTextBotones}>Agregar al plan</Text>
										</TouchableOpacity>
									}
								</View>
							</TouchableOpacity>
						</View>	
					)
				}else if (e.tipoChat===5) {
					return (
						<View key={key} style={ChatStyle.contenedorBox}>
							<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?ChatStyle.cBtnAvatarC : [ChatStyle.cBtnAvatarC, ChatStyle.cBtnAvatarCLeft]}>
								<Image
									style={ChatStyle.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
							<TouchableOpacity style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}  >
								<View style={ChatStyle.tituloTipoChat}>
									<Text style={e.userId== id ?ChatStyle.cNombreTipoChat :[ChatStyle.cNombreTipoChat, ChatStyle.cNombreTipoChatLeft]}>{e.nombre}</Text>
								</View>
								<View style={ChatStyle.mensajeCChat}>
			                  <MapComponent lat={parseFloat(e.lat)} lng={parseFloat(e.lng)} />
									<Text style={e.userId== id ?ChatStyle.cFecha   :[ChatStyle.cFecha,   ChatStyle.cFechaLeft]}>{e.fecha}</Text>
								</View>
							</TouchableOpacity>
						</View>	
					)	
				}else if (e.tipoChat===6) {
					return (
						<View key={key} style={ChatStyle.contenedorBox}>
							<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?ChatStyle.cBtnAvatarC : [ChatStyle.cBtnAvatarC, ChatStyle.cBtnAvatarCLeft]}>
								<Image
									style={ChatStyle.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />

							</TouchableOpacity>
							<TouchableOpacity style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]}  >
								<View style={ChatStyle.tituloTipoChat}>
									<Text style={e.userId== id ?ChatStyle.cNombreTipoChat :[ChatStyle.cNombreTipoChat, ChatStyle.cNombreTipoChatLeft]}>{e.nombre}</Text>
								</View>
								 
									<Image
										style={ChatStyle.Iphoto}
										width='100%'
										height={150}
										source={{uri: e.documento,cache:true}}
								    />
 
							</TouchableOpacity>
						</View>	
					)	
				}else if (e.tipoChat===7) {
					return (
						<View key={key} style={ChatStyle.contenedorBox}>
							<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?ChatStyle.cBtnAvatarC : [ChatStyle.cBtnAvatarC, ChatStyle.cBtnAvatarCLeft]}>
								<Image
									style={ChatStyle.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
							<Image
								style={e.userId==id ?ChatStyle.cPhoto :[ChatStyle.cPhoto, ChatStyle.cPhotoLeft]} 
								width={60}
								height={60}
								source={{uri: e.cPhoto}}
						   />
							<TouchableOpacity style={e.userId== id ?ChatStyle.box :[ChatStyle.box, ChatStyle.boxLeft]} 
								onPress={()=> this.setState({showPdf:true})} >
								<View style={ChatStyle.tituloTipoChat}>
									<Text style={e.userId== id ?ChatStyle.cNombreTipoChat :[ChatStyle.cNombreTipoChat, ChatStyle.cNombreTipoChatLeft]}>{e.nombre}</Text>
								</View>
								<View style={ChatStyle.mensajeCChat}>
			                  <Text style={e.userId== id ?ChatStyle.cDocumento :[ChatStyle.cDocumento, ChatStyle.cDocumentoLeft]}>{e.documento.slice(70, 100)}</Text>
									<Text style={e.userId== id ?ChatStyle.cFecha   :[ChatStyle.cFecha,   ChatStyle.cFechaLeft]}>{e.fecha}</Text>
								</View>
							</TouchableOpacity>
							{
								showPdf
								&&<PdfComponent documento={e.documento} close={()=>this.setState({showPdf:false})} />
							}
							
						</View>	
					)
				}
		})
	}


	agregarUsuarioPlan(id, idChat){
		console.log(idChat)
		let mensajes = this.state.mensajes.filter(e=>{
			if(e.id=idChat) e.estaPlan=true
			return e.id
		})
		console.log(mensajes)
		this.setState({mensajes})
		axios.put(`/x/v1/pla/plan/insertar/${this.state.planId}`, {id})
      .then(res=>{      
      	if(res.data.code==1){ 
      		this.setState({mensajes})
			}else{
			Alert.alert(
				'Opss!! revisa tus datos que falta algo',
				'',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
				{ cancelable: false }
			)
		}
     	})
      .catch(err=>{
      	console.log(err)
     	})
	}
	 
	render(){
		const {adjuntarAmigos, asignados, usuariosAsignados, mapa} = this.state
		return(
			<View style={ChatStyle.contenedorGeneral} > 
				{this.renderCabezera()}

			{/* AGREGAR IMAGENES */}
				<ImageBackground source={require('./fondo.png')} style={ChatStyle.fondo}>	
					<ScrollView ref="scrollView"
								style={ChatStyle.contenedorChat} 
								onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
						{this.renderMensajes()}		
					</ScrollView>
				</ImageBackground>

			{/* BOTONES OPCIONES */}
				{
					this.state.showOpciones
					&&<View style={ChatStyle.contenedorOpciones}>
						{this.opciones()}
					</View>
				}

			{/* MODUlO AGREGAR CONTACTOS */}
				{adjuntarAmigos &&<AgregarAmigosComponent 
					                titulo='Enviar Contacto'
					                close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
					                updateStateAsignados={(asignados, usuariosAsignados)=>{this.setState({adjuntarAmigos:false, showOpciones:false});pedirContacto(asignados, usuariosAsignados, this.state.planId)}}
				                /> }

			{mapa &&<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>{this.setState({mapa:false, showOpciones:false});pedirMapa(lat,lng, this.state.planId) }}// devuelve la posicion del marcador 
						/> }	

			{/* FOOTER INPUT / ENVIAR */}
				<View style={ChatStyle.footer}>
					<View style={ChatStyle.footer1}>
						<TouchableOpacity onPress={()=>this.setState({showOpciones:!this.state.showOpciones})} style={ChatStyle.opcionesBtn}>
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
						<TouchableOpacity onPress={this.state.mensaje.length>0 ?() => this.handleSubmit(this) :null}  style={ChatStyle.enviarBtn} >
							<Image source={require('./enviar.png')} style={ChatStyle.enviar}  />
						</TouchableOpacity>
					</View>
				</View>
			</View>	
		)
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// RENDER LAS OPCIONES
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	opciones(){
		const {planId, asignados, usuariosAsignados} = this.state
		let opciones=[
			{url:`${URL}public/img/opcion_1.png`, click:()=>{pedirImagen(planId); this.setState({showOpciones:false})}},
			{url:`${URL}public/img/opcion_2.png`, click:()=>this.setState({mapa:true})},
			{url:`${URL}public/img/opcion_3.png`, click:()=>this.setState({adjuntarAmigos:true})},
			{url:`${URL}public/img/opcion_4.png`, click:()=>{pedirPdf(planId); this.setState({showOpciones:false})}},
			{url:`${URL}public/img/opcion_5.png`, click:null}
		]
		return opciones.map((e, key)=>{
			return (
					<TouchableOpacity key={key} style={ChatStyle.btnIconoOpciones} onPress={e.click}>
							<Image source={{uri:e.url}} style={ChatStyle.opcionesIconos} /> 	
					</TouchableOpacity>
				)
		})
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
		axios.post('/x/v1/cha/chat', {planId, mensaje, fecha, tipo:1})
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}

