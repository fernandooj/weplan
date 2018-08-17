import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {style} from '../encuesta/style'

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
				<View style={style.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==1 ?0 :1)}>
			    		<Text style={[style.headerText, style.familia]}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Mis Encuestas</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	&&this.misEncuestas()
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
				<View  style={style.contentItem}>
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
						<View style={style.subContentItem}>
						{/*****   boton para mostrar crear item	*****/}
						  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={style.contenedorNuevo}>
								<Image source={require('../assets/images/nuevo.png')} style={style.btnNuevoGrupo} />
								<Text style={[style.CrearEncuesta, style.familia]}>Crear Encuesta</Text>
						  	</TouchableOpacity>
						  	
						 	{this.renderAcordeon()}
					  	</View>
				</View>
			</ScrollView>
		);
	}
	 
}
 