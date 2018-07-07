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
		encuesta:[],
 
		render:1
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		// let planId = '5b3f9da239e97c7d2fd4a425'	
 
		axios.get('/x/v1/enc/encuesta/'+planId)
		.then(e=>{
			console.log(e.data)
			this.setState({misEncuestas:e.data.encuesta, id : 100, planId})
		})		 
		.catch(err=>{
			console.log(err)
		})
 
		// axios.get('/x/v1/ite/item/pendientes/'+planId)
		// .then(e=>{
		// 	this.setState({articulosPendientes:e.data.pendientes})
		// })		 
		// .catch(err=>{
		// 	console.log(err)
		// })
 
		// axios.get('/x/v1/ite/item/publicados/'+planId)
		// .then(e=>{
		// 	this.setState({articulosPublicados:e.data.publicados})
		// })		 
		// .catch(err=>{
		// 	console.log(err)
		// })
 
	}
	 
	 
	renderAcordeon() {
		const {render, total}=this.state
		return (
			<View>
				<View style={EncuestaStyle.headerCollapsable}>
			    	<TouchableOpacity >
			    		<Text style={EncuestaStyle.headerText}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={EncuestaStyle.iconMenu} /> Mis Encuestas</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	&&this.encuestas()
			    	}
			  	</View>
			  	 

			  	<View style={[EncuestaStyle.headerCollapsable, EncuestaStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity >
			    		<Text style={[EncuestaStyle.headerText, EncuestaStyle.headerTextFirst]}><Icon name={render==3 ?'angle-down' :'angle-right'} allowFontScaling style={EncuestaStyle.iconMenu} /> Encuestas Publicadas</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	render==2
			    	 	&&this.misEncuestas()
			    	 }
			  	</View>
			</View>
		);
	}
	  
	encuestas(){
		const {id} = this.state
		return this.state.misEncuestas.map((e, key)=>{
			let asignado = e.asignados.includes(id)
			e.respuesta1= e.respuesta1==null ? 0:e.respuesta1  
			e.respuesta2= e.respuesta2==null ? 0:e.respuesta2  
			return(
					<View key={key} style={e.userId== id ?EncuestaStyle.contenedorEncuesta :[EncuestaStyle.contenedorEncuesta, EncuestaStyle.contenedorEncuestaLeft]}>
						<TouchableOpacity >
							<Image
								style={e.userId== id ?EncuestaStyle.pPhoto : [EncuestaStyle.pPhoto, EncuestaStyle.pPhotoLeft]}
								width={45}
								height={45}
								source={{uri: e.photo}}
						    />
						</TouchableOpacity>
						<View style={EncuestaStyle.contenedorTitulos}>
							<Text style={EncuestaStyle.pTitulo}>{e.eTitulo}</Text>
						</View>
						
						<View>
							{
								e.tipoEncuesta==1 
								?<View style={EncuestaStyle.contenedorOpciones}>
								 	<TouchableOpacity  style={EncuestaStyle.btnInteres} >
										{
											asignado 
											?<View style={EncuestaStyle.contenedorRespuesta}>
												<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text>
											</View> 
											:<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
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
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										{
											asignado   
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
								  		{
											asignado   
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:e.tipoEncuesta==3
								?<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}>
												<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenRespuesta} />
												<Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text>
												</View> 
											:<Image source={{uri:e.pregunta1}} style={EncuestaStyle.imagenPregunta} />
										}
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
								  		{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta2} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta2}</Text></View> 
										}
									</TouchableOpacity>
								</View> 
								:<View style={EncuestaStyle.contenedorOpciones}>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
										{
											asignado  
											?<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.respuesta1} %</Text></View> 
											:<View style={EncuestaStyle.contenedorPregunta}><Text style={EncuestaStyle.textoPregunta}>{e.pregunta1}</Text></View> 
										}
									</TouchableOpacity>
									<TouchableOpacity style={EncuestaStyle.btnInteres} >
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
					</View>
				)
		})
	}
 
	updateItems(){
		axios.get('/x/v1/enc/encuesta/'+this.state.planId)
		.then(e=>{
			console.log(e.data)
			this.setState({misEncuestas:e.data.encuesta, show:false})
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
 