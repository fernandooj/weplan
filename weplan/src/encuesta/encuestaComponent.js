import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, AsyncStorage} from 'react-native'
import {style} from './style'
import axios from 'axios'
import update from 'react-addons-update';
import Icon from 'react-native-fa-icons';

import CrearEncuestaComponent from './crearEncuestaComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {URL}  from '../../App.js';
const TRACKER = new GoogleAnalyticsTracker("UA-129344133-1");
TRACKER.trackScreenView("encuesta");

export default class encuestaComponent extends Component{
	state={
		show:false,
		misEncuestas:[],
		encuestasPublicadas:[],
		render:0
	}
	async componentWillMount(){
		const {params} = this.props.navigation.state
		let planId = params.planId
		console.log(planId)
		let notificaciones = params.notificaciones
		let id = params.id
		let nombrePlan = params.nombrePlan
		let imagen = params.imagen

		// let planId = '5b8a278dc581676c62f30ca8'	
		let guia_inicio   = await AsyncStorage.getItem('encuesta');	
 		this.setState({planId, notificaciones, id, nombrePlan, imagen, guia_inicio})
		axios.get('/x/v1/enc/encuesta/'+planId)
		.then(e=>{
			this.setState({misEncuestas:e.data.encuesta})
		})		 
		.catch(err=>{
			console.log(err)
		})
 
		axios.get('/x/v1/enc/encuesta/publicados/'+planId)
		.then(e=>{
			this.setState({encuestasPublicadas:e.data.encuesta, id:e.data.id})
		})		 
		.catch(err=>{
			console.log(err)
		})
	}
	 
	peticiones(render){
		this.setState({render})
	}
	renderAcordeon() {
		const {render, total, misEncuestas, encuestasPublicadas}=this.state
		return (
			<View>
				<View style={style.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==1 ?0 :1)}>
			    		<Text style={[style.headerText, style.familia]}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Mis Encuestas</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	?misEncuestas.length==0
			    	 	?<Text style={[style.textoSinAsignados, style.familia]}>Aún no has creado ninguna encuesta! Empieza clickeando en "Crear Encuesta"</Text>
			    	 	:this.misEncuestas()
			    	 	:null
			    	 	// &&this.misEncuestas()
			    	}
			  	</View>
			  	 

			  	<View style={[style.headerCollapsable, style.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==2 ?0 :2)}>
			    		<Text style={[style.headerText, style.headerTextFirst, style.familia]}>
			    			<Icon name={render==3 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Encuestas Publicadas
			    		</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	render==2
			    	 	?encuestasPublicadas.length==0
			    	 	?<Text style={[style.textoSinAsignados, style.familia]}>Ninguno de tus amigos ha publicado encuestas, aqui podrás verlas e interesarte si así lo quieres! </Text>
			    	 	:this.encuestasPublicadas()
			    	 	:null
			    	 	// &&this.encuestasPublicadas()
			    	 }
			  	</View>
			</View>
		);
	}
	  
	
	misEncuestas(){
		return this.state.misEncuestas.map((e, key)=>{
			e.respuesta1= e.respuesta1==null ? 0:e.respuesta1  
			e.respuesta2= e.respuesta2==null ? 0:e.respuesta2  
			return(
					<View key={key} style={style.contenedorEncuesta}>
						<View style={style.contenedorTitulos}>
							<Text style={[style.pTitulo, style.familia]}>{e.eTitulo}</Text>
						</View>
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={style.contenedorOpciones}>
								 	<View  style={style.btnInteres} > 
										<Image source={{uri:e.pregunta1}} style={style.imagenRespuesta} />
									</View>
									<View style={style.btnInteres} >
										<Image source={{uri:e.pregunta2}} style={style.imagenRespuesta} />
									</View>
								 </View> 
								:e.tipoEncuesta==2
								?<View style={style.contenedorOpciones}>
									<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View> 
									<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View> 
								</View> 
								:e.tipoEncuesta==3
								?<View style={style.contenedorOpciones}>
									<TouchableOpacity style={style.btnInteres} > 
										<Image source={{uri:e.pregunta1}} style={style.imagenPregunta} />
									</TouchableOpacity>
									<TouchableOpacity style={style.btnInteres} >
										<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta2}</Text></View> 
									</TouchableOpacity>
								</View> 
								:<View style={style.contenedorOpciones}>
									<TouchableOpacity style={style.btnInteres} > 
										<View style={style.contenedorPregunta}><Text style={[style.textoPregunta, style.familia]}>{e.pregunta1}</Text></View> 
									</TouchableOpacity>
									<TouchableOpacity style={style.btnInteres} > 
										<Image source={{uri:e.pregunta2}} style={style.imagenPregunta} />  
									</TouchableOpacity>
								</View> 
							}	
						<View style={style.contenedorOpciones}>
							<View style={style.porcentajeContenedor}><Text style={[style.porcentaje, style.familia]}>{e.respuesta1} %</Text></View> 
							<View style={style.porcentajeContenedor}><Text style={[style.porcentaje, style.familia]}>{e.respuesta2} %</Text></View> 
						</View> 
						</View>
						<View style={style.separador}></View>
					</View>
				)
		})
	}

	encuestasPublicadas(){
		const {id} = this.state
		return this.state.encuestasPublicadas.map((e, key)=>{
			let asignado = e.asignados.includes(id)
			e.respuesta1= e.respuesta1==null ? 0:e.respuesta1  
			e.respuesta2= e.respuesta2==null ? 0:e.respuesta2  
			return(
					<View key={key} style={style.contenedorEncuesta}>
						<View style={style.contenedorTitulos}>
							<Text style={[style.pTitulo, style.familia]}>{e.eTitulo}</Text>
						</View>
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={style.contenedorOpciones}>
								 	<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(1, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(2, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(1, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(2, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(1, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(2, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(1, e.id) :null} style={style.btnInteres} >
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
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(2, e.id) :null} style={style.btnInteres} >
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
						</View>
						<View style={style.separador}></View>
					</View>
				)
		})
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////// ENVIO LA RESPUESTA EN LAS ENCUESTAS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmitPregunta(valor, idEncuesta){
		axios.post('/x/v1/res/respuesta', {valor, idEncuesta})
		.then(res=>{
	 
			let encuestasPublicadas = this.state.encuestasPublicadas.filter((e)=>{
				if (e.id==idEncuesta) {e.respuesta1=res.data.porcentaje1; e.respuesta2=res.data.porcentaje2; e.asignados.push(this.state.id)}
				return e
			})
			this.setState({encuestasPublicadas})
		})
		.catch(err=>{
			console.log(err)
		})
	}

	updateItems(titulo){
		const {notificaciones, planId, id, nombrePlan, imagen} = this.state
		let nuevaNotificacion = notificaciones.filter(e=>{
			return e._id!==id
		}) 
		nuevaNotificacion.map(e=>{
			sendRemoteNotification(15, e.tokenPhone, 'chat', `${nombrePlan}`,  `: envio la encuesta: ${titulo}`, imagen, planId)
		})
		axios.get('/x/v1/enc/encuesta/'+this.state.planId)
		.then(e=>{
			console.log(e.data)
			this.setState({misEncuestas:e.data.encuesta, show:false, render:1})
		})		 
		.catch(err=>{
			console.log(err)
		})
	}

  	render() {
		const {show, items, itemsPlan, render, planId, guia_inicio} = this.state
		console.log(planId)
		const {navigate} = this.props.navigation
		return (
				<View  style={style.contentItem}>
				{
					typeof guia_inicio!=='string'  &&<GuiaInicio number={9} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
				<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} texto='Encuestas' />
					<ScrollView>					
					  	{/*****   show the modal to create component	*****/}
						  	{
						  		show
						  		?<CrearEncuestaComponent  
						  			planId={planId}
						  			updateItems={(titulo)=>this.updateItems(titulo)}
						  			close={()=>this.setState({show:false})}
						  		 />
						  		:null 
						  	}
						<View style={style.subContentItem}>
						{/*****   boton para mostrar crear item	*****/}
						  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={style.contenedorNuevo}>
								<Image source={require('../assets/images/nuevo.png')} style={style.btnNuevoGrupo} />
								<Text style={[style.CrearEncuesta, style.familia]}>Crear Encuesta</Text>
						  	</TouchableOpacity>
						  	
						 	{this.renderAcordeon()}
					  	</View>
					</ScrollView>
				</View>
			
		);
	}
	 
}
 