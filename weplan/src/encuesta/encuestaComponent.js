import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {EncuestaStyle} from '../encuesta/style'

import axios from 'axios'
import CrearEncuestaComponent from './crearEncuestaComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';
import Icon from 'react-native-fa-icons';
 

export default class encuestaComponent extends Component{
	state={
		show:false,
		misEncuestas:[],
		encuestasPublicadas:[],
		render:0
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		// let planId = '5b3f9da239e97c7d2fd4a425'	
 
		axios.get('/x/v1/enc/encuesta/'+planId)
		.then(e=>{
			this.setState({misEncuestas:e.data.encuesta, planId})
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
		const {render, total}=this.state
		console.log(this.state.encuestasPublicadas)
		return (
			<View>
				<View style={EncuestaStyle.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==1 ?0 :1)}>
			    		<Text style={EncuestaStyle.headerText}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={EncuestaStyle.iconMenu} /> Mis Encuestas</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	&&this.misEncuestas()
			    	}
			  	</View>
			  	 

			  	<View style={[EncuestaStyle.headerCollapsable, EncuestaStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==2 ?0 :2)}>
			    		<Text style={[EncuestaStyle.headerText, EncuestaStyle.headerTextFirst]}>
			    			<Icon name={render==3 ?'angle-down' :'angle-right'} allowFontScaling style={EncuestaStyle.iconMenu} /> Encuestas Publicadas
			    		</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	render==2
			    	 	&&this.encuestasPublicadas()
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
					<View key={key} style={EncuestaStyle.contenedorEncuesta}>
						<View style={EncuestaStyle.contenedorTitulos}>
							<Text style={EncuestaStyle.pTitulo}>{e.eTitulo}</Text>
						</View>
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={EncuestaStyle.contenedorOpciones}>
								 	<TouchableOpacity  style={EncuestaStyle.btnInteres} >
										 
										 <Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
								 
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										 
										 <Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenPregunta} />
									 
									</TouchableOpacity>
								 </View> 
								:e.tipoEncuesta==2
								?<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										 
											 <View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										 
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
								  		 
											 <View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
									 
									</TouchableOpacity>
								</View> 
								:e.tipoEncuesta==3
								?<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										 
											 <Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
										 
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
								  		  
										 <View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										 
									</TouchableOpacity>
								</View> 
								:<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										 
											 <View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										 
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
								  		 
											 <Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenPregunta} />  
										 
									</TouchableOpacity>
								</View> 
							}	
						<View style={EncuestaStyle.contenedorOpciones}>
							<View style={EncuestaStyle.porcentajeContenedor}><Text style={EncuestaStyle.porcentaje}>{e.respuesta1} %</Text></View> 
							<View style={EncuestaStyle.porcentajeContenedor}><Text style={EncuestaStyle.porcentaje}>{e.respuesta2} %</Text></View> 
						</View> 
						</View>
						<View style={EncuestaStyle.separador}></View>
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
					<View key={key} style={EncuestaStyle.contenedorEncuesta}>
						<View style={EncuestaStyle.contenedorTitulos}>
							<Text style={EncuestaStyle.pTitulo}>{e.eTitulo}</Text>
						</View>
						 
						
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={EncuestaStyle.contenedorOpciones}>
								 	<TouchableOpacity onPress={!asignado   ?()=> this.handleSubmitPregunta(1, e.id) :null} style={EncuestaStyle.btnInteres} >
										{
											asignado 
											?<View style={EncuestaStyle.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(2, e.id) :null} style={EncuestaStyle.btnInteres} >
										{
											asignado   
											?<View style={EncuestaStyle.contenedorRespuesta}>
												<Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenPregunta} />
										}
									</TouchableOpacity>
								 </View> 
								:e.tipoEncuesta==2
								?<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(1, e.id) :null} style={EncuestaStyle.btnInteres} >
										{
											asignado   
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado  ?()=> this.handleSubmitPregunta(2, e.id) :null} style={EncuestaStyle.btnInteres} >
								  		{
											asignado   
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:e.tipoEncuesta==3
								?<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(1, e.id) :null} style={EncuestaStyle.btnInteres} >
										{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}>
												<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text>
												</View> 
											:<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(2, e.id) :null} style={EncuestaStyle.btnInteres} >
								  		{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(1, e.id) :null} style={EncuestaStyle.btnInteres} >
										{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity onPress={!asignado ?()=> this.handleSubmitPregunta(2, e.id) :null} style={EncuestaStyle.btnInteres} >
								  		{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}>
												<Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta2}} style={EncuestaStyle.imagenPregunta} />  
										}
									</TouchableOpacity>
								</View> 
							}	
						</View>
						<View style={EncuestaStyle.separador}></View>
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

	updateItems(){
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
		const {show, items, itemsPlan, render, planId} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView>
				<View  style={EncuestaStyle.contentItem}>
					<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} />
					
					  	{/*****   show the modal to create component	*****/}
						  	{
						  		show
						  		?<CrearEncuestaComponent  
						  			planId={planId}
						  			updateItems={(id, deuda, titulo)=>this.updateItems(id, deuda, titulo)}
						  			close={()=>this.setState({show:false})}
						  		 />
						  		:null 
						  	}
						<View style={EncuestaStyle.subContentItem}>
						{/*****   boton para mostrar crear item	*****/}
						  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={EncuestaStyle.contenedorNuevo}>
								<Image source={require('../ajustes/nuevo.png')} style={EncuestaStyle.btnNuevoGrupo} />
								<Text style={EncuestaStyle.CrearEncuesta}>Crear Encuesta</Text>
						  	</TouchableOpacity>
						  	
						 	{this.renderAcordeon()}
					  	</View>
				</View>
			</ScrollView>
		);
	}
	 
}
 