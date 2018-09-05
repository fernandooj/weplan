import React, {Component} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, Keyboard, Modal, Dimensions, BackHandler, Platform, ActivityIndicator} from 'react-native'
import axios from 'axios'
import SocketIOClient from 'socket.io-client';
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {style} from '../chat/style'
import update from 'react-addons-update';
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Lightbox from 'react-native-lightbox';
import KeyboardListener from 'react-native-keyboard-listener';
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import AgregarAmigosComponent from '../agregarAmigos/agregarAmigos.js'
import MapaPlanComponent 	  from '../createPlan/mapa.js'
import PdfComponent           from '../pdf/pdfComponent.js'
import MapComponent           from '../mapa/mapComponent.js'
import {pedirImagen, pedirPdf, pedirContacto, pedirMapa} from './peticiones.js'		
import { showLocation, Popup } from 'react-native-map-link'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

import {URL} from '../../App.js'
export default class ChatComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			mensajes: [],
			nuevosMensajes: [],
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
			asignados:[],
			misUsuarios:[],
			mapaVisible: false, 		////// muestra el modal del mapa para abrirlo con alguna otra app
			scroll: 	 0, 		    ////// esto resuelve el bug de ir a bottom por parte del scroll 
			scrollState: false, 		 ////// esto resuelve el bug de ir a bottom por parte del scroll 
			modalQr: 	 false, 	    ////// muestra el modal del QR
			showMainFooter:false 		////// en ios, no se muestra el footer cuando se abre el keyboard
		}
		this.onReceivedMessage 	   = this.onReceivedMessage.bind(this);
		this.onReceivedMessagePago = this.onReceivedMessagePago.bind(this);
	}

	componentWillMount(){
		let planId = this.props.navigation.state.params	
		// let planId = '5b8b54be02e37b1e83c23520'	 
		console.log(this.props.navigation.state.params)
		console.log(planId)
		this.socket = SocketIOClient(URL);
		this.socket.on(`chat${planId}`, 	this.onReceivedMessage);
		this.socket.on(`editPago${planId}`, this.onReceivedMessagePago);
		this.setState({showIndicador:true})
  

		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			let id = res.data.user.user._id
			let photo = res.data.user.user.photo
			let nombre = res.data.user.user.nombre
			this.setState({id, photo, nombre, showIndicador:false})
		})
		.catch((err)=>{
			console.log(err)
		})

		/////////////////	OBTENGO TODOS LOS MENSAJES Y EL PLAN
		axios.get(`/x/v1/cha/chat/chatPlan/${planId}/${10}`)
		.then(e=>{
 			console.log(e.data)
			this.setState({mensajes:e.data.chat, planId, scrollState:1, limite:10, imagen: e.data.plan.imagenResize[0], nombrePlan: e.data.plan.nombre, planId, planAsignados:e.data.planAsignados, notificaciones:e.data.plan.notificaciones, plan:e.data.plan})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	componentDidMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	   	
 
	}
	handleBackPress = () => {
		const {navigate} = this.props.navigation
	    navigate('misPlanes')
	    return true;
  	}
	onReceivedMessage(messages) {
		console.log(messages)
	 	this.setState({
		  mensajes: update(this.state.mensajes, {$push: [messages]})
		})
	}
 	onReceivedMessagePago(messages){
 		let mensajes = this.state.mensajes.filter((e)=>{
			if (e.id==messages.id) {e.valor=messages.valor}
			return e
		})
		this.setState({mensajes})
 	}
 

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////// 		RENDERIZA LA CABEZERA CON EL NOMBRE DEL PLAN Y LOS ICONOS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderCabezera(){
		const {planId, imagen, nombrePlan, plan, id} = this.state
		const {navigate} = this.props.navigation
		return(
			<View>
				<View style={style.cabezera}>
					<TouchableOpacity onPress={() => navigate('misPlanes')} style={style.iconRegresar}>
						<Text style={style.regresar}>&#60;</Text>		
					</TouchableOpacity> 
					<TouchableOpacity onPress={() => navigate('infoPlan', {plan,id})}>
						<Text style={[style.nombrePlan, style.familia]}>{nombrePlan ?nombrePlan.substring(0, 60) :''}</Text>
					</TouchableOpacity>
					<View style={style.iconosHeaderContenedor}>
						<TouchableOpacity onPress={() => navigate('encuesta', planId)}  style={style.iconContenedor}>
							<Image source={require('../assets/images/preguntar.png')} style={style.icon}  />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigate('item', planId)} style={style.iconContenedor}>
							<Image source={require('../assets/images/cuentas.png')} style={style.icon}  />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity onPress={() => navigate('infoPlan', {plan,id})} style={style.btnImagenPlan}>
					<Image
						style={style.imagen}
						 
						source={{uri: imagen}}
				    />	
				</TouchableOpacity>
			</View>
		)
	}

	renderMensajes(){
		const {navigate} = this.props.navigation
		const {id, mensajes, planAsignados, plan, showPdf} = this.state
		return mensajes.map((e,key)=>{
			if (e.tipoChat===1) {
				return (
					<View key={key} style={style.contenedorBox}>
						<View style={e.userId== id ?style.box :[style.box, style.boxLeft]}>
							{
								e.userId!==id
								&&<View style={style.tituloTipoChat}>
									<Text style={e.userId== id ?[style.nombreTipoChat, style.familia] :[style.nombreTipoChat, style.nombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
								</View>
							}
							
							<View style={style.mensajeTipoChat}>
								<Text style={[style.mensaje, style.familia]}>{e.mensaje}</Text>
								<Text style={e.userId== id ?[style.fecha, style.familia] :[style.fecha, style.fechaLeft, style.familia]}>{e.fecha}</Text>
							</View>
						</View>
						{/*<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', e.userId)} style={e.userId== id ?style.btnAvatarC : [style.btnAvatarC, style.btnAvatarCLeft]}>
							<Image
								style={style.photo}
								width={45}
								height={45}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>*/}
					</View>	
				)
			}
			else if(e.tipoChat===2){
				let esperaItem = e.esperaItem.includes(id)
				let asignadoItem = e.asignadoItem.includes(id)
				return (
					<View key={key} style={style.contenedorBox}>
						{
							e.userId!==id
				      		&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarItem : [style.cBtnAvatarItem, style.cBtnAvatarItemLeft]}>
					      		
								{/* imagen avatar */}
								<Image style={style.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}  />
							</TouchableOpacity>
						}
						 {/* texto avatar */}
						{
							e.userId!==id
				      		&&<View style={e.userId== id ?style.boxItem :[style.boxItem, style.boxLeft]}  >
								<View style={style.tituloTipoChat}>
									<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
								</View>
							</View>
						}
					
				      		
					   {/* fotografia item */}
				         <Image source={{uri: e.rutaImagen}}
				         	style={e.userId== id ?[style.fotografia, {top:22}] :[style.fotografia, style.fotografiaLeft]}
				         />
	  					<View style={e.userId== id ?style.boxItem2 :[style.boxItem2, style.boxLeft]} >
					         <View style={e.userId== id ?style.contenedorItem :[style.contenedorItem, style.contenedorItemLeft]}>
					             <Text style={e.userId== id ?[style.titulo, style.familia] :[style.titulo, style.tituloLeft, style.familia]}>{e.titulo}</Text>
					            {
					            	e.descripcion.length>0
					            	&&<Text style={e.userId== id ?[style.descripcion, style.familia] :[style.descripcion, style.descripcionLeft, style.familia]}>{e.descripcion.substring(0, 40)}</Text>  
					            }
					             <Text style={e.userId== id ?[style.valor, style.familia] :[style.valor, style.valorLeft, style.familia] }>
					             	{'$ '+Number(e.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
					             </Text>  
					       	</View>
					       	{
					       		(!asignadoItem && !esperaItem &&e.abierto)  && e.userId !== id
					       		?<View style={e.userId== id ?style.contenedorInteres :[style.contenedorInteres, style.contenedorInteresLeft]}>
							       	<TouchableOpacity onPress={()=> this.ingresarItem(e.token, e.itemId, e.id, e.titulo, e.rutaImagen, e.userId)} style={style.btnInteres} >
							       		<Image source={require('../assets/images/me_interesa.png')} style={style.imagenInteres} />
							       		<Text style={[style.textoInteres, style.familia]}>Me Interesa</Text>
							       	</TouchableOpacity>
							      </View> 	
							      :!asignadoItem && esperaItem
							      ?<View style={e.userId== id ?style.contenedorInteres :[style.contenedorInteres, style.contenedorInteresLeft]}>
							      	<Image source={require('../assets/images/espera.png')} style={style.imagenEspera} />
							      </View>
							      :null
					       	}
					    <Text style={e.userId== id ?[style.fecha, style.familia] :[style.fecha, style.fechaLeft, style.familia]}>{e.fecha}</Text>
			      		</View>
		     		</View>
				)
			}else if(e.tipoChat==3){
				let asignado = e.asignados.includes(id)
				e.respuesta1= e.respuesta1==null ? 0:e.respuesta1  
				e.respuesta2= e.respuesta2==null ? 0:e.respuesta2  
				return(
					<View key={key} style={style.contenedorBox}>
					{
						e.userId!==id
							&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarItem : [style.cBtnAvatarItem, style.cBtnAvatarItemLeft]}>
				      		
							{/* imagen avatar */}
							<Image style={style.photo}
								width={45}
								height={45}
								source={{uri: e.photo}}  />
						</TouchableOpacity>
					}
						
					{/* texto avatar */}
					{
					 	e.userId!==id
							&&<View style={e.userId== id ?style.boxItem :[style.boxItem, style.boxLeft]}  >
							<View style={style.tituloTipoChat}>
								<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
							</View>
						</View>
					}
						<View style={e.userId== id ?style.boxItem2 :[style.boxItem2, style.boxLeft]} > 
							<View style={style.contenedorDescripcion}>
								<Image source={require('../assets/images/item4.png')} style={style.decoracion} />
								 <Text style={[style.pDescripcion, style.familia]}>{e.eTitulo}</Text> 
								<Image source={require('../assets/images/item4.png')} style={style.decoracion} />
							</View>
						 				 
						
						
							{
								e.tipoEncuesta==1 
								?<View style={style.contenedorOpciones}>
								 	<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={style.btnInteres} >
										{
											asignado 
											?<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View> 
											:<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={style.btnInteres} >
										{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View> 
											:<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View> 
										}
									</TouchableOpacity>
								 </View> 
								:e.tipoEncuesta==2
								?<View style={style.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={style.btnInteres} >
										{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View>
											:<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View>
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={style.btnInteres} >
								  		{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View>
											:<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View>
										}
									</TouchableOpacity>
								</View> 
								:e.tipoEncuesta==3
								?<View style={style.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={style.btnInteres} >
										{
											asignado 
											?<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View> 
											:<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={style.btnInteres} >
								  		{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View>
											:<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View>
										}
									</TouchableOpacity>
								</View> 
								:<View style={style.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 1, e.id) :null} style={style.btnInteres} >
										{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View>
											:<View style={style.contenedorRespuesta}>
												<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View>
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta1} %</Text>
											</View>
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(e.encuestaId, 2, e.id) :null} style={style.btnInteres} >
								  		{
											asignado   
											?<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View> 
											:<View style={style.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={style.imagenRespuesta} />
												<Text style={[style.textoRespuesta, style.familia]}>{e.respuesta2} %</Text>
											</View>
										}
									</TouchableOpacity>
								</View> 
							}
							<Text style={e.userId== id ?[style.fecha, style.familia] :[style.fecha, style.fechaLeft, style.familia]}>{e.fecha}</Text>	
						</View>
					</View>
				)
			}else if (e.tipoChat===4) {
				let estaPlan = planAsignados.includes(e.contactoId) 
				return (
					<View key={key} style={style.contenedorBox}>
					{
					 	e.userId!==id
						&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarC : [style.cBtnAvatarC, style.cBtnAvatarCLeft]}>
							<Image
								style={style.photo}
								width={45}
								height={45}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
					}
						<TouchableOpacity style={e.userId==id ?[style.cPhotoContainer, {top:0}] :[style.cPhotoContainer, style.cPhotoLeft]} 
							onPress={e.contactoId== id ?null :()=> navigate('profile', {userId:e.contactoId, planId:plan})}>
							<Image
								style={style.cPhoto} 
								width={60}
								height={60}
								source={{uri: e.cPhoto}}
						   	/>
					   	</TouchableOpacity> 
						<TouchableOpacity style={e.userId== id ?style.box :[style.box, style.boxLeft]}
							onPress={e.contactoId== id ?null :()=> navigate('profile', {userId:e.contactoId, planId:plan})}>
							{
								e.userId!==id
								&&<View style={style.tituloTipoChat}>
									<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
								</View>
							}
							<View style={style.mensajeCChat}>
								<Text style={e.userId== id ?[style.cMensaje, style.familia] :[style.cMensaje, style.cMensajeLeft, style.familia]}>{e.cNombre}</Text>
								<Text style={e.userId== id ?[style.cFecha, style.familia]   :[style.cFecha, style.cFechaLeft, style.familia]}>{e.fecha}</Text>
							</View>
							
							<View style={style.botonesContacto}>
								{/*
									e.esAMigo
									&&<TouchableOpacity onPress={()=>this.agregarAmigo(e.id, e.contactoId, e.cToken)}>
										<Text style={style.cTextBotones}>Agregar Contacto</Text>
									</TouchableOpacity>
								*/}
								
								{
									plan.idUsuario._id === id && !estaPlan && e.contactoId !=id
									&&<TouchableOpacity onPress={()=>this.agregarUsuarioPlan(e.contactoId, e.id, e.cToken)}>
										<Text style={style.cTextBotones}>Agregar al plan</Text>
									</TouchableOpacity>
								}
							</View>
						</TouchableOpacity>
					</View>	
				)
			}else if (e.tipoChat===5) {
				return (
					<View key={key} style={style.contenedorBox}>
						{	
							e.userId!==id
							&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarC : [style.cBtnAvatarC, style.cBtnAvatarCLeft]}>
								<Image
									style={style.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
						}
						
						<TouchableOpacity style={e.userId== id ?style.box :[style.box, style.boxLeft]}  >
							{	
								e.userId!==id
								&&<View style={style.tituloTipoChat}>
									<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
								</View>
							}
							<View style={style.mensajeCChat}>
								<TouchableOpacity onPress={()=>this.setState({mapaVisible:true})}>
									<MapComponent lat={parseFloat(e.lat)} lng={parseFloat(e.lng)} />
									{this.renderModalAbrirMapa(e.lat, e.lng, e.lugar)}
								</TouchableOpacity>
								<Text style={e.userId== id ?[style.fechaMapa, style.familia] :[style.fechaMapa, style.fechaLeft, style.familia]}>{e.fecha}</Text>
							</View>

						</TouchableOpacity>
					</View>	
				)	
			}else if (e.tipoChat===6) {
				return (
					<View key={key} style={style.contenedorBox}>
						{	
							e.userId!==id
							&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarC : [style.cBtnAvatarC, style.cBtnAvatarCLeft]}>
								<Image
									style={style.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
						}
						<TouchableOpacity style={e.userId== id ?style.box :[style.box, style.boxLeft]}>
						{	
							e.userId!==id
							&&<View style={style.tituloTipoChat}>
								<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
							</View>
						}	
						     
							<Lightbox 
						      renderContent={() => (
						        <Image 
						          	source={{ uri: e.documento }}
						         	style={{ width: "100%", height:600}}
						         />
						       )}
						    >
							  <Image
							   	source={{ uri: e.documento }}
							    style={style.Iphoto}
							  />
							 </Lightbox>	
						<Text style={e.userId== id ?[style.fechaMapa, style.familia] :[style.fechaMapa, style.fechaLeft, style.familia]}>{e.fecha}</Text>
						</TouchableOpacity>
					</View>	
				)	
			}else if (e.tipoChat===7) {
				return (
					<View key={key} style={style.contenedorBox}>
						{	
							e.userId!==id
							&&<TouchableOpacity onPress={e.userId== id ?null :()=> navigate('profile', {userId:e.userId, planId:plan})} style={e.userId== id ?style.cBtnAvatarC : [style.cBtnAvatarC, style.cBtnAvatarCLeft]}>
								<Image
									style={style.photo}
									width={45}
									height={45}
									source={{uri: e.photo}}
							    />
							</TouchableOpacity>
						}
						{/*<Image
							style={e.userId==id ?style.cPhoto :[style.cPhoto, style.cPhotoLeft]} 
							width={60}
							height={60}
							source={{uri: e.cPhoto}}
					   />*/}
						<TouchableOpacity style={e.userId== id ?style.box :[style.box, style.boxLeft]} 
							onPress={()=> this.setState({showPdf:true})} >
							{	
								e.userId!==id
								&&<View style={style.tituloTipoChat}>
									<Text style={e.userId== id ?[style.cNombreTipoChat, style.familia] :[style.cNombreTipoChat, style.cNombreTipoChatLeft, style.familia]}>{e.nombre}</Text>
								</View>
							}
							<View style={style.mensajeCChat}>
		                  		<Text style={e.userId== id ?[style.cDocumento, style.familia] :[style.cDocumento, style.cDocumentoLeft, style.familia]}>{e.documento.slice(70, 100)}</Text>
								<Text style={e.userId== id ?[style.fechaMapa, style.familia] :[style.fechaMapa, style.fechaLeft, style.familia]}>{e.fecha}</Text> 
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

	agregarAmigo(id, idAsignado, token){
		axios.post('/x/v1/ami/amigoUser', {asignado: idAsignado} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				sendRemoteNotification(1, token, "notificacion", 'Tienes una solicitud de amistad', ', Quiere agregarte como amigo', null)
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
		.catch((err)=>{
			console.log(err)
		})
	}

	renderModalAbrirMapa(lat, lng, lugar){
		return(
			<Popup
			    isVisible={this.state.mapaVisible}
			    onCancelPressed={() => this.setState({ mapaVisible: false })}
			    onAppPressed={() => this.setState({ mapaVisible: false })}
			    onBackButtonPressed={() => this.setState({ mapaVisible: false })}
			    modalProps={{ // you can put all react-native-modal props inside.
			        animationIn: 'slideInUp'
			    }}
			   
			    options={{ latitude: lat,
				    longitude: lng,
				    //sourceLatitude: -8.0870631,  // optionally specify starting location for directions
				    //sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
				    title: lugar,  // optional
				    googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
				    
				    dialogTitle: 'Abrir Con', // optional (default: 'Open in Maps')
				    dialogMessage: '', // optional (default: 'What app would you like to use?')
				    cancelText: 'Cancelar', // optional (default: 'Cancel')
				    appsWhiteList: ['google-maps'] }}
			    style={{ /* Optional: you can override default style by passing your values. */ }}
			/>
		)	
	}
	handleScroll(event) {	
		if(event.nativeEvent.contentOffset.y===0){
			let limite = this.state.limite + 30
			this.setState({showIndicador:true, scroll2:this.state.scroll})
			axios.get(`/x/v1/cha/chat/chatPlan/${this.state.planId}/${limite}`)
			.then(e=>{
	 			 
	 				// let mensajes = [...e.data.chat, ...this.state.mensajes]
	 				// console.log('---------')
	 				// console.log(e.data.chat)
	 				// console.log(this.state.mensajes)
	 				// console.log(mensajes)
	 				// console.log('---------')

 
 					// e.data.chat.map(e=>{
						// 	this.setState({
						// 	mensajes: update(this.state.mensajes, {$push: [e]})
						// })
 					// })

					// this.setState({
					//   mensajes: update(this.state.mensajes, {$unshift: [e.data.chat[0]]}),
					//   limite, scrollState:2, showIndicador:false
					// })
 
	 				// this.setState({limite, scrollState:2, showIndicador:false})

	 				this.setState({mensajes:e.data.chat, scrollState:2, showIndicador:false})
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
   
	componentDidUpdate(){
		const {scrollState, scroll, scroll2, showMainFooter, mensajes } = this.state
		if (this.scrollView && scrollState===1 && scroll2===undefined) {
			this.scrollView.scrollTo({x:0, y:scroll-Dimensions.get('window').height+150, animated:true}) 
		}
		
		if (this.scrollView && scrollState===2 ) {	
			this.scrollView.scrollTo({x:0, y:scroll-scroll2, animated:true}) 
			
		}
		if (showMainFooter) {
			this.scrollView.scrollTo({x:0, y:this.state.scroll-Dimensions.get('window').height+700, animated:true}) 
		}
	}
 
	render(){
		const {adjuntarAmigos, asignados, usuariosAsignados, mapa, qr, planId, showMainFooter, showIndicador, scroll, scroll2, scrollState, notificaciones, imagen, nombrePlan, id} = this.state
 		console.log(showMainFooter)
		return(
			<View style={style.contenedorGeneral} > 
				{this.renderCabezera()}
				<KeyboardListener
					onWillShow={() => { this.setState({ showMainFooter: true }); }}
					onDidShow={() => { this.setState({ showMainFooter: true }); }}
					onWillHide={() => { this.setState({ showMainFooter: false }); }}
					onDidHide={() => { this.setState({ showMainFooter: false }); }}
				/>
			{/* AGREGAR IMAGENES */}
				{
				 	showIndicador
				 	&&<ActivityIndicator size="small" color="#148dc9" style={style.indicador} />
				}
				 <ImageBackground source={require('../assets/images/fondo.png')} style={showMainFooter ?style.fondoCorto :style.fondo }>	
					<ScrollView ref={scroll => { this.scrollView = scroll }}
								style={style.contenedorChat} 
								//keyboardDismissMode='on-drag'
								onScroll={this.handleScroll.bind(this)}
								onContentSizeChange={(width,height) => {this.setState({scroll:height}); }}>
						{this.renderMensajes()}		
					</ScrollView>
				</ImageBackground>

			{/* BOTONES OPCIONES */}
				{
					this.state.showOpciones
					&&<View style={showMainFooter ?[style.contenedorOpcionesBotones, style.contenedorOpcionesBotonesShow] : [style.contenedorOpcionesBotones]}>
						{this.opciones()}
					</View>
				}

			{/* MODUlO AGREGAR CONTACTOS */}
				{adjuntarAmigos &&<AgregarAmigosComponent 
					                titulo='Enviar Contacto'
					                close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
					                updateStateAsignados={(asignados, usuariosAsignados, misUsuarios)=>{this.setState({adjuntarAmigos:false, showOpciones:false});pedirContacto(usuariosAsignados, planId, notificaciones, imagen, nombrePlan, id)}}
					                //updateStateAsignados={(asignados, usuariosAsignados, misUsuarios)=>this.setState({asignados, usuariosAsignados, misUsuarios, adjuntarAmigos:false})}
					                asignados={this.state.asignados}
								    usuariosAsignados={this.state.usuariosAsignados}
								    misUsuarios={this.state.misUsuarios}
				                /> }

			{mapa &&<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>{this.setState({mapa:false, showOpciones:false});pedirMapa(lat,lng,planId, notificaciones, imagen, nombrePlan, id)}}// devuelve la posicion del marcador 
							ubicacionDefecto={{infoplan:false}}
							guardaUbicacion={{lat:null, lng:null, direccion:null}}
						/> }	


			{this.renderQr()}

			{/* FOOTER INPUT / ENVIAR */}
				<View style={showMainFooter ?[style.footer, style.showFooter] :[style.footer]}>
					<View style={style.footer1}>
						<TouchableOpacity onPress={()=>this.setState({showOpciones:!this.state.showOpciones})} style={style.opcionesBtn}>
							<Image source={require('../assets/images/opciones.png')} style={style.opciones}  />
						</TouchableOpacity>
						<TextInput
							onSubmitEditing={Keyboard.dismiss}
							style={[style.textarea, style.familia]}
							onChangeText={(mensaje) => this.setState({mensaje})}
							value={this.state.mensaje}
							multiline = {true}
							placeholderTextColor="#c9c9c9" 
							underlineColorAndroid='transparent'
							ref={input => { this.textInput = input }}

						/>
						<TouchableOpacity onPress={this.state.mensaje.length>0 ?() => this.handleSubmit(this) :null}  style={style.enviarBtn} >
							<Image source={require('../assets/images/enviar.png')} style={style.enviar}  />
						</TouchableOpacity>
					</View>
				</View>
			</View>	
		)
	}
 
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// MODAL CON LA CAMARA DE QR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderQr(){
  		return(
  			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalQr}
				onRequestClose={() => {
					console.log('Modal has been closed.');
	        }}>
	  			<QRCodeScanner
			        onRead={this.infoQr.bind(this)}
			        topContent={
			          <Text style={[style.centerText, style.familia]}>
			            Scanea el QR de tu amigo
			          </Text>
			        }
			        bottomContent={
			          	<View style={style.containerHecho}>
				    		<TouchableOpacity style={style.btnHecho} onPress={()=>this.setState({modalQr:false})}>
						    	<Text  style={[style.hecho, style.familia]}>!Cerrar!</Text>
						    </TouchableOpacity>
						</View> 
			        }
			    />
		    </Modal>
  		)
  	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// OBTENGO LA INFORMACION DEL USUARIO DEL CODIGO QR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  	infoQr(e){
  		if (e.data) {
  			axios.get(`x/v1/users/getOneUser/${e.data}`)
  			.then(e=>{
  				let infoUser = [{nombre:e.data.user.nombre, id:e.data.user._id, photo: e.data.user.photo}]
	  			 
	  			if (e.data.code==1) {
	  				pedirContacto(infoUser, this.state.planId)
 					this.setState({modalQr:false, showOpciones:false})
	  			}
	  		})
		}
  	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// RENDER LAS OPCIONES
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	opciones(){
		const {planId, notificaciones, imagen, nombrePlan, id} = this.state
		let opciones=[
			{url:`${URL}public/img/opcion_1.png`, click:()=>{pedirImagen(planId, notificaciones, imagen, nombrePlan, id); this.setState({showOpciones:false})}},
			{url:`${URL}public/img/opcion_2.png`, click:()=>this.setState({mapa:true})},
			{url:`${URL}public/img/opcion_3.png`, click:()=>this.setState({adjuntarAmigos:true})},
			{url:`${URL}public/img/opcion_4.png`, click:()=>{pedirPdf(planId, notificaciones, imagen, nombrePlan, id); this.setState({showOpciones:false})}},
			{url:`${URL}public/img/opcion_5.png`, click:()=>this.setState({modalQr:true})}
		]
		return opciones.map((e, key)=>{
			return (
					<TouchableOpacity key={key} style={style.btnIconoOpciones} onPress={e.click}>
							<Image source={{uri:e.url}} style={style.opcionesIconos} /> 	
					</TouchableOpacity>
				)
		})
	}
 

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// 	AGREGO UN CONTACTO AL PLAN
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	agregarUsuarioPlan(id, idChat, token){
 		const {imagen, nombrePlan} = this.state
 
		axios.put(`/x/v1/pla/plan/insertar/${this.state.planId}`, {id})
      	.then(res=>{      
      		console.log(res.data)
	      	if(res.data.code==1){ 
	      		this.setState({planAsignados: this.state.planAsignados.concat([id])})
	      		sendRemoteNotification(2, token, 'misPlanes', 'Te han agregado a un plan', `, Te agrego a ${nombrePlan}`, imagen)
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

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// SI EL USUARIO HACE CLICK EN ME INTERESA, ENVIA LA NOTIFICACION AL CREADOR DEL ITEM PARA DARLE PERMISO DE INGRESAR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	ingresarItem(token, idItem, id, titulo, imagen, userId){
		const {navigate} = this.props.navigation
		axios.put('x/v1/ite/item', {idItem, userId})
		.then(e=>{
			console.log(e.data)
			if (e.data.code==1) {
				sendRemoteNotification(4, token, "notificacion", 'Quieren acceder a un item', `, quiere acceder a ${titulo}`, imagen)
				let mensajes = this.state.mensajes.filter(e=>{
					if (e.id==id) {e.esperaItem.push(this.state.id)}
						return e
				})
 				this.setState({mensajes})
			}
			if(e.data.code==3){
				Alert.alert(
					'Opss!! ya se cerro el item',
					'pero crea tu propio item',
				[
					{text: 'Cancelar', onPress: () => console.log('OK Pressed')},
					{text: 'Crear Item', onPress: () => navigate('item', this.state.planId)},
				],
					{ cancelable: false }
				)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////// ENVIO LA RESPUESTA EN LAS ENCUESTAS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmitPregunta(idEncuesta, valor, idChat){
		axios.post('/x/v1/res/respuesta', {valor, idEncuesta, idChat})
		.then(res=>{
	 
			let mensajes = this.state.mensajes.filter((e)=>{
				if (e.id==idChat) {e.respuesta1=res.data.porcentaje1; e.respuesta2=res.data.porcentaje2; e.asignados.push(this.state.id)}
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
		// Keyboard.dismiss()
		const {planId, mensaje, id, photo, notificaciones, nombrePlan, imagen} = this.state
		let nuevaNotificacion = notificaciones.filter(e=>{
			return e._id!==id
		}) 
		nuevaNotificacion.map(e=>{
			sendRemoteNotification(15, e.tokenPhone, 'chat', `${nombrePlan}`,  `: ${mensaje}`, imagen, planId)
		})
		
		const fecha = moment().format('h:mm')

		this.textInput.clear()
		axios.post('/x/v1/cha/chat', {planId, mensaje, fecha, tipo:1})
		.then((res)=>{
			if (res.data.code==1) {

			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}

