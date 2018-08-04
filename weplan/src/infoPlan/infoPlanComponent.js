import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'

import {InfoPlanStyle} from '../infoPlan/style'
import axios from 'axios'
import Icon from 'react-native-fa-icons';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
 


import RestriccionesPlanComponent from '../createPlan/restricciones.js'
import MapaPlanComponent 		  from '../createPlan/mapa.js'
import AgregarAmigosComponent     from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  	  from '../takePhoto/takePhotoComponent.js'
import CabezeraComponent 		  from '../ajustes/cabezera.js'
import {sendRemoteNotification}   from '../push/envioNotificacion.js'


export default class infoPlanComponent extends Component{
	state={mapa:false}
	render(){
	let data = this.props.navigation.state.params.plan
	console.log(data)
	let id   = this.props.navigation.state.params.id
	console.log(data.idUsuario._id)
	let {navigate} = this.props.navigation
	let menus = [
		{funcion:()=>salir(data._id, navigate), texto:'Salir del Plan', show: id==data.idUsuario._id ?false :true },
		{funcion:()=>finalizar(data._id, navigate), texto:'Finalizar Plan', show: id==data.idUsuario._id ?true :false }
	]
	return (
		<ScrollView  style={InfoPlanStyle.contenedorGeneral}>
			<View style={InfoPlanStyle.contenedor}> 
				<CabezeraComponent navigate={navigate} url={'chat'} parameter={data._id}  />
				<View style={InfoPlanStyle.encabezadoPlan}>
				   	<View> 
				   		<Image source={{uri: data.imagenOriginal[0]}} style={InfoPlanStyle.imagenPlan} />			 
					</View>
					<View>
						<Text style={InfoPlanStyle.titulo}>
							{data.nombre} 
						</Text>
						<Text  style={InfoPlanStyle.descripcion}>
							Por {data.descripcion}
						</Text>
						<Text  style={InfoPlanStyle.autor}>
							Por {data.idUsuario.nombre}
						</Text>
					</View> 
				</View>
					   
			   <View style={InfoPlanStyle.contenedor} >
					{/* Descripcion  */}	
	 
						<View style={InfoPlanStyle.cajaInpunts}>
							<Text style={InfoPlanStyle.textarea}>{data.descripcion}</Text>
						</View>
					
				{/* fecha  */}
				  	<View style={InfoPlanStyle.cajaInpunts}>
						<Image source={require('./fecha.png')} style={InfoPlanStyle.iconInput} />
						<Text style={InfoPlanStyle.btnInputs}>{data.fechaLugar}</Text>
					</View>

				{/*  mapa   */}
					<TouchableOpacity onPress={() => this.setState({mapa:true})} style={InfoPlanStyle.cajaInpunts}> 
			    		<Image source={require('./map.png')} style={InfoPlanStyle.iconInput} />
				   		<Text style={[InfoPlanStyle.btnInputs]}>{data.lugar}</Text>
					</TouchableOpacity>

					{
						this.state.mapa &&<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>this.updateStateX(lat,lng, direccion)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={{infoplan:true, lat:parseFloat(data.lat), lng:parseFloat(data.lng)}}
						/> 
					}
				 
					

				{/*  restricciones   */}
					<View style={InfoPlanStyle.cajaInpunts}>
				    	<Image source={require('./denied.png')} style={InfoPlanStyle.iconInput} />
					    <View style={InfoPlanStyle.contentAdd}>
					    		<View style={InfoPlanStyle.agregadosContenedor}>
						    		{
						    			data.restricciones.map((e, key)=>{
											if (key<4) {
												return(
													<View key={key} >
														<Image source={{uri:e.ruta}} style={InfoPlanStyle.avatar} />
														<Icon name='ban' allowFontScaling style={InfoPlanStyle.banResActiveAdd} />
													</View>
												)
											}
										})
									}
						    	</View>
						    </View>
					</View>

				{/*   amigos   */}
					<View style={InfoPlanStyle.cajaInpunts}>
				    	<Image source={require('./friends.png')} style={InfoPlanStyle.iconInput} />
				    	{	
				    		 
						     <View style={InfoPlanStyle.contentAdd}>
						    	<View style={InfoPlanStyle.agregadosContenedor}>
						    		{
						    		 	data.asignados.map((e, key)=>{
								 			if (key<4) {
								 				return(
									 				<View key={key} >
									 					<Image source={{uri:e.photo}} style={InfoPlanStyle.avatar} />
									 					<Image source={require('./agregado.png')} style={InfoPlanStyle.iconAgregado} />
									 					<Text style={InfoPlanStyle.textoAgregado} >{e.nombre}</Text>
									 				</View>
									 			)
								 			}
								 		})
							    	}
						    	</View>
						    	 
						    </View>
				    	}
					</View>
			    </View>	
			    {/* listado */}
					 
					{
						menus.map((e, key)=>{
							if(e.show){
								return (<TouchableOpacity onPress={e.funcion} key={key} style={InfoPlanStyle.botones}>
										<Text style={key==1 ?InfoPlanStyle.textoBotones :[InfoPlanStyle.textoBotones, InfoPlanStyle.textoBotonesLast]}>{e.texto}</Text>
									</TouchableOpacity>)
							}
							
						})
					}
					 
			</View>
		</ScrollView>
		)
	}	
}	
const finalizar = (id, navigate)=>{
	Alert.alert(
		'Opss!! estas a punto de finalizar este plan',
		'estas seguro, despues no podras abrirlo',
	[
		{text: 'Mejor despues', onPress: () => console.log('OK Pressed')},
		{text: 'Si, Finalizar', onPress: () => handleFinalizar(id, navigate)},
	],
		{ cancelable: false }
	)
}		

const handleFinalizar = (id, navigate)=>{
	axios.put('x/v1/pla/plan/finalizar', {id})
	.then(e=>{
		if (e.data.code==1) {
			navigate('inicio')
		}
	})
}

const salir = (id, navigate)=>{
	Alert.alert(
		'Opss!! estas a punto de salir este plan',
		'estas seguro, debes esperar a una nueva invitación',
	[
		{text: 'Mejor despues', onPress: () => console.log('OK Pressed')},
		{text: 'Si, Salir', onPress: () => handleSalir(id, navigate)},
	],
		{ cancelable: false }
	)
}

const handleSalir = (id, navigate)=>{
	axios.put('x/v1/pla/plan/salir', {id})
	.then(e=>{
		console.log(e.data)
		if (e.data.code==1) {
			navigate('inicio')
		}
	})
}
 