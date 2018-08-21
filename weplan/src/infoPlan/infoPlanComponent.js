import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'

import {style} from '../infoPlan/style'
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
 
	let {navigate} = this.props.navigation
	let menus = [
		{funcion:()=>salir(data._id, navigate), texto:'Salir del Plan', show: id==data.idUsuario._id ?false :true },
		{funcion:()=>finalizar(data._id, navigate, data), texto:'Finalizar Plan', show: id==data.idUsuario._id ?true :false }
	]
	return (
		<ScrollView  style={style.contenedorGeneral}>
			<View style={style.contenedor}> 
				<CabezeraComponent navigate={navigate} url={'chat'} parameter={data._id}  />
				<View style={style.encabezadoPlan}>
				   	<View> 
				   		<Image source={{uri: data.imagenOriginal[0]}} style={style.imagenPlan} />			 
					</View>
					<View>
						<Text style={[style.titulo, style.familia]}>
							{data.nombre} 
						</Text>
						<Text  style={[style.descripcion, style.familia]}>
							{data.descripcion}
						</Text>
						<Text  style={[style.autor, style.familia]}>
							Por {data.idUsuario.nombre}
						</Text>
					</View> 
				</View>
					   
			   <View style={style.contenedor} >
					{/* Descripcion  */}	
	 
						<View style={style.cajaInpunts}>
							<Text style={[style.textarea, style.familia]}>{data.descripcion}</Text>
						</View>
					
				{/* fecha  */}
				  	<View style={style.cajaInpunts}>
						<Image source={require('../assets/images/fecha.png')} style={style.iconInput} />
						<Text style={[style.btnInputs, style.familia]}>{data.fechaLugar}</Text>
					</View>

				{/*  mapa   */}
					<TouchableOpacity onPress={() => this.setState({mapa:true})} style={style.cajaInpunts}> 
			    		<Image source={require('../assets/images/map.png')} style={style.iconInput} />
				   		<Text style={[style.btnInputs, style.familia]}>{data.lugar}</Text>
					</TouchableOpacity>

					{
						this.state.mapa &&<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>this.updateStateX(lat,lng, direccion)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={{infoplan:true, lat:parseFloat(data.loc.coordinates[1]), lng:parseFloat(data.loc.coordinates[0])}}
						/> 
					}
				 
					

				{/*  restricciones   */}
					<View style={style.cajaInpunts}>
				    	<Image source={require('../assets/images/denied.png')} style={style.iconInput} />
					    <View style={style.contentAdd}>
					    		<View style={style.agregadosContenedor}>
						    		{
						    			data.restricciones.map((e, key)=>{
											if (key<4) {
												return(
													<View key={key} >
														<Image source={{uri:e.ruta}} style={style.avatar} />
														<Icon name='ban' allowFontScaling style={style.banResActiveAdd} />
													</View>
												)
											}
										})
									}
						    	</View>
						    </View>
					</View>

				{/*   amigos   */}
					<View style={style.cajaInpunts}>
				    	<Image source={require('../assets/images/friends.png')} style={style.iconInput} />
				    	{	
				    		 
						     <View style={style.contentAdd}>
						    	<View style={style.agregadosContenedor}>
						    		{
						    		 	data.asignados.map((e, key)=>{
								 			if (key<4) {
								 				return(
									 				<View key={key} >
									 					<Image source={{uri:e.photo}} style={style.avatar} />
									 					<Image source={require('../assets/images/agregado.png')} style={style.iconAgregado} />
									 					<Text style={[style.textoAgregado, style.familia]} >{e.nombre}</Text>
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
								return (<TouchableOpacity onPress={e.funcion} key={key} style={style.botones}>
										<Text style={key==1 ?[style.textoBotones, style.familia] :[style.textoBotones, style.textoBotonesLast, style.familia]}>{e.texto}</Text>
									</TouchableOpacity>)
							}
							
						})
					}
					 
			</View>
		</ScrollView>
		)
	}	
}	
const finalizar = (id, navigate, data)=>{
	Alert.alert(
		'Opss!! estas a punto de finalizar este plan',
		'estas seguro, despues no podras abrirlo',
	[
		{text: 'Mejor despues', onPress: () => console.log('OK Pressed')},
		{text: 'Si, Finalizar', onPress: () => handleFinalizar(id, navigate, data)},
	],
		{ cancelable: false }
	)
}		

const handleFinalizar = (id, navigate, data)=>{
	axios.put('x/v1/pla/plan/finalizar', {id, planPadre:data.planPadre})
	.then(res=>{
		if (res.data.total===0 &&res.data.code==1) {
			data.asignados.map(e=>{
				sendRemoteNotification(13, e.tokenPhone, 'notificacion', `Plan Cerrado`, `, ha cerrado el plan ${data.nombre}`, data.imagenMiniatura[0])
				data.planPadre &&sendRemoteNotification(14, e.tokenPhone, 'notificacion', `Califica tu plan`, `Califica el plan ${data.nombre}`, data.imagenMiniatura[0])
			})
			setTimeout(function(){ 
				navigate('inicio')
			}, 1000); 
		}
		if (res.data.total!==0 &&res.data.code==1) {
			Alert.alert(
				'Opss!! no puedes finalizar el plan',
				'algunos usuarios tienen deudas',
			[
				{text: 'Cerrar', onPress: () => console.log('OK Pressed')},
				//{text: 'Ver Deudas', onPress: () => navigate('costoPlan', id )},
			],
				{ cancelable: false }
			)
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
		if (e.data.total===0 &&e.data.code==1) {
			navigate('inicio')
		}
		if (e.data.total!==0 &&e.data.code==1) {
			Alert.alert(
				'Opss!! no puedes salirte por que tienes deudas',
				'',
			[
				{text: 'Cerrar', onPress: () => console.log('OK Pressed')},
				{text: 'Ver Deudas', onPress: () => navigate('costoPlan', id )},
			],
				{ cancelable: false }
			)
		}
	})
}
 