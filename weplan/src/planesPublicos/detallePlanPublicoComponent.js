import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Picker, Alert, Dimensions} from 'react-native'

import {CreatePlanStyle} from '../createPlan/style'
import axios from 'axios'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import Slideshow from 'react-native-slideshow';


import RestriccionesPlanComponent from '../createPlan/restricciones.js'
import MapaPlanComponent 		  from '../createPlan/mapa.js'
import AgregarAmigosComponent     from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  	  from '../takePhoto/takePhotoComponent.js'
import CabezeraComponent 		  from '../ajustes/cabezera.js'
import {sendRemoteNotification}   from '../push/envioNotificacion.js'
import AlertInput 				  from 'react-native-alert-input';
 

const screenWidth = Dimensions.get('window').width;
const influencia = [
	{label:'1 Km',  key:1000},
	{label:'5 km',  key:5000},
	{label:'7 km',  key:7000},
	{label:'15 km', key:15000},
	{label:'30 km', key:30000}
]

export default class detallePlanPublicoComponent extends Component{
	constructor(props){
		super(props);
		this.state={
 			textMonth:'Mes',
 			textDate:'Dia',
 			textYear:'Año',
 			fechaHoy:moment().format('YYYY-MM-DD h:mm'),
 			asignados:[],
 			usuariosAsignados:[],
 			restricciones:[],
 			restriccionesAsignadas:[],
 			misUsuarios:[],
 			misRestricciones:[],
 			imagen:null,
 			adjuntarAmigos:false,
 			mapa:false,
 			tipo:'',
 			area:0,
 			restriccion:false,
 			iconCreate:true,
 			cargaPlan:false,
 			showAlertUbicacion:false,
 			position: 1,
	      	interval: null,
	      	imagenes:[],
	      	tipoPlan:null, //// modal que muestra el tipo del plan
	      	publico:null,  //// determina si el plan va a ser publico o privado
		}
	}

	componentWillMount(){
		let planId = this.props.navigation.state.params
		// let planId = '5b751f02c6d5f6448c680311'
		console.log(planId) 
		axios.get('/x/v1/pla/plan/'+planId)
		.then((e)=>{
			console.log(e.data.plan[0])
			let imagenes = []
			e.data.plan[0].imagenResize.map(e=>{
				imagenes.push({url:e})
			}) 
			let data = e.data.plan[0]

			// this.setState({imagen:data.imagenMiniatura[0], iconCreate:false, restriccion:false, restriccionesAsignadas:e.data.plan[0].restricciones , restricciones:e.data.plan[0].restricciones, planPadre:this.props.navigation.state.params, imagenes, tipoPlan:false })
			this.setState({imagen:data.imagenMiniatura[0], nombre:data.nombre, descripcion:data.descripcion, fechaLugar:data.fechaLugar, direccion:data.lugar, loc:data.loc.coordinates, area:data.area, restriccionesAsignadas:data.restricciones , restricciones:data.restricciones, planId, costo:(data.area*2000)/300 })
		})
		.catch(err=>{
			console.log(err)
		})
	}
 

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////  ACTUALIZA LA UBICACION //////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateX(lat,lng, direccion, area, costo){
		if (direccion) {
			this.setState({lat,lng, area, costo, direccion, mapa:false})
		}else{
			let direccion1 = lat+','+lng 
			this.setState({lat,lng, area, costo, direccion:'', mapa:false, showAlertUbicacion:true})
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////   	SI LA UBICACION NO TIENE NOMBRE MUESTRA UNA ALERTA PARA QUE LO INSERTE
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderAlertNombreEvento(){
		return(
			<AlertInput 
				show={this.state.showAlertUbicacion} 
				cancelText
				title='Digita el nombre de lugar de tu evento.' 
				cancelText={false}
				submitText='Guardar'
				onSubmit={(direccion)=>this.setState({showAlertUbicacion:false, direccion })} 
			/>)
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////   	MUESTRA EL MODAL PARA EL TIPO DE PLAN
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	tipoMapa(){
		return(
			<View style={CreatePlanStyle.tipoPlan}>
				<TouchableOpacity onPress={() => this.setState({tipoPlan:false, publico:true})} style={CreatePlanStyle.btnModal}> 
	    			<Text style={CreatePlanStyle.textModal}>CREAR PLAN PÚBLICO</Text>
				</TouchableOpacity>	
				<TouchableOpacity onPress={() => this.setState({tipoPlan:false, publico:false})} style={CreatePlanStyle.btnModal}> 
	    			<Text style={CreatePlanStyle.textModal}>CREAR PLAN PRIVADO</Text>
				</TouchableOpacity>	
			</View>
		)
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////  	RENDER  	/////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	render(){
		const {nombre, direccion, fechaLugar, lugar, loc, area,    restricciones, asignados, imagen, adjuntarAmigos, mapa, restriccion, iconCreate, cargaPlan, imagenes, usuariosAsignados, fechaHoy, tipoPlan, publico, costo} = this.state
		const {navigate} = this.props.navigation
		console.log(loc)
		return (
			<ScrollView style={CreatePlanStyle.contenedorGeneral} > 
				{/* si la ubicacion no tiene */}
				{this.renderAlertNombreEvento()}
				{
					tipoPlan
					&&this.tipoMapa()
				}

				<CabezeraComponent navigate={navigate} url={'planesPublicos'} texto='Activar Plan' />
				<TakePhotoComponent fuente={'cam.png'} fuente2={imagen} ancho={screenWidth} alto={160} updateImagen={(imagen) => {this.setState({imagen})}}   />
				<View style={CreatePlanStyle.textoCargado2}>
					<TextInput
						style={[CreatePlanStyle.nombreCargado, CreatePlanStyle.familia]}
						onChangeText={(nombre) => this.setState({nombre,iconCreate:false})}
						value={nombre}
						underlineColorAndroid='transparent'
						placeholder="NOMBRE DE TU PLAN"
						placeholderTextColor="#ffffff" 
						maxLength={30}
				    />
				</View>
					 
			   <View style={CreatePlanStyle.contenedor} >
					{/* Descripcion  */}	
				 	<View style={CreatePlanStyle.cajaInpunts}>
						<TextInput
							style={[CreatePlanStyle.textarea, CreatePlanStyle.familia]}
							onChangeText={(descripcion) => this.setState({descripcion})}
							value={this.state.descripcion}
							underlineColorAndroid='transparent'
							placeholder="descripcion"
							placeholderTextColor="#c9c9c9" 
							multiline={true}
							maxLength={60}
						/>
					</View>
				{/* fecha  */}
				   <View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('../assets/images/fecha.png')} style={CreatePlanStyle.iconInput} />
					   <DatePicker
				   		minDate={this.state.fechaHoy}
			    			customStyles={{
	                        dateInput: {
	                            borderLeftWidth: 0,
	                            borderRightWidth: 0,
	                            borderTopWidth: 0,
	                            borderBottomWidth: 0,
	                            alignItems: 'flex-start',
	                        },
	                        dateText: { 
	                        	color: '#969696'
	                        },
	                        btnTextConfirm: {
						            color: '#969696',
						         },
						         btnTextCancel: {
						            color: '#969696',
						         } 
	                    }}
							date={fechaLugar}
							style={CreatePlanStyle.inputs}
							mode="datetime"
							placeholder="Mes / Dia / Año / Hora"
							format="YYYY-MM-DD h:mm"
							showIcon={false}
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							androidMode='spinner'
							onDateChange={(fechaLugar) => {this.setState({fechaLugar})}}
					   />
					</View> 
		 			
		 			{/*  mapa  */}
					<View style={CreatePlanStyle.cajaInpunts}>
			    		<Image source={require('../assets/images/map.png')} style={CreatePlanStyle.iconInput} />
				    	<TouchableOpacity onPress={() => this.setState({mapa:true})}  style={direccion ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
				    		<Text style={direccion ?[CreatePlanStyle.textos, CreatePlanStyle.familia] :[CreatePlanStyle.textosActivo, CreatePlanStyle.familia]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
				    	</TouchableOpacity>
					</View>	
					 
					{
						mapa &&<MapaPlanComponent 
							inputValor
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion, area, costo)=>this.updateStateX(lat, lng, direccion, area, costo)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={{infoplan:true, lat:parseFloat(loc[1]), lng:parseFloat(loc[0]), area, muestraBtnHecho:true}}
						/> 
					}
				

				{/*  restricciones  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('../assets/images/denied.png')} style={CreatePlanStyle.iconInput} />
					    {
					    	restricciones.length==0
					    	?<TouchableOpacity onPress={()=>this.setState({ restriccion:true})} style={restricciones.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
						    	<Text style={restricciones.length>0 ?[CreatePlanStyle.textos, CreatePlanStyle.familia] :[CreatePlanStyle.textosActivo, CreatePlanStyle.familia]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Restricciones'}</Text>
						    </TouchableOpacity>
					    	:<View style={CreatePlanStyle.contentAdd}>
					    		<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderRestriccionesAsignados()} 
						    	</View>
						    	{
						    		!this.props.navigation.state.params
						    		&&<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={CreatePlanStyle.addBtn}>
							    		<Image source={require('../assets/images/add.png')} style={CreatePlanStyle.add} />
							    	</TouchableOpacity>
						    	}
						    </View>
						}
						{
							restriccion 
							?<RestriccionesPlanComponent  
							    restriccion={(restricciones, restriccionesAsignadas, misRestricciones)=>this.setState({restricciones, restriccionesAsignadas, misRestricciones, restriccion:false})}
							    restricciones={this.state.restricciones}
							    restriccionesAsignadas={this.state.restriccionesAsignadas}
							    misRestricciones={this.state.misRestricciones}
						    />
						     
						    :null
						}
					</View>

				 
					
				{/* Area de influencia  */}
				 
				<View style={CreatePlanStyle.cajaInpunts}>
					<Image source={require('../assets/images/area.png')} style={CreatePlanStyle.iconInputArea} />	
				    <View style={CreatePlanStyle.contenedorArea}>
				    	<Text style={[CreatePlanStyle.costoPlan, CreatePlanStyle.familia]}>Costo plan: {'$ '+Number(costo).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
		          </View>
		        </View>
				
				
				{/*  Crear Plan  */}
					<TouchableOpacity onPress={this.handleSubmit.bind(this)} style={CreatePlanStyle.btnHecho}>
					   <Text style={[CreatePlanStyle.hecho, CreatePlanStyle.familia]}>Activar</Text>
					</TouchableOpacity>
				 
			    </View>	
			</ScrollView>
		)
	}
 	renderUsuariosAsignados(){
 		return this.state.usuariosAsignados.map((e, key)=>{
 			if (key<4) {
 				return(
	 				<View key={key} >
	 					<Image source={{uri:e.photo}} style={CreatePlanStyle.avatar} />
	 					<Image source={require('../assets/images/agregado.png')} style={CreatePlanStyle.iconAgregado} />
	 					<Text style={CreatePlanStyle.textoAgregado} >{e.nombre}</Text>
	 				</View>
	 			)
 			}
 		})
 	}
 	renderRestriccionesAsignados(){
 		return this.state.restriccionesAsignadas.map((e, key)=>{
 			if (key<4) {
 				return(
	 				<View key={key} >
	 					<Image source={{uri:e.ruta}} style={CreatePlanStyle.avatar} />
	 					<Image source={require('../assets/images/deneid1.png')} style={CreatePlanStyle.banResActiveAdd} />
	 					 
	 				</View>
	 			)
 			}
 		})
 	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, usuariosAsignados, restricciones, imagen, tipo, cargaPlan, planPadre, direccion, area, publico, costo, planId} = this.state

		// nombre 		= cargaPlan.nombre ?cargaPlan.nombre :nombre
		// descripcion = cargaPlan.descripcion ?cargaPlan.descripcion :descripcion
		// lat 		= cargaPlan.lat ?cargaPlan.lat :lat
		// lng 		= cargaPlan.lng ?cargaPlan.lng :lng
		// fechaLugar  = cargaPlan.fechaLugar ?cargaPlan.fechaLugar :fechaLugar
		// let lugar   = cargaPlan ?cargaPlan.lugar :direccion
		// imagen 		= cargaPlan.imagenResize ?cargaPlan.imagenResize[0] :imagen
		// tipo        = publico ? 'pago' :'suscripcion'
		// area        = cargaPlan ?cargaPlan.area :area
		// let activo  = publico ? false : true
		 
		if (!direccion) {
			Alert.alert(
			  'Selecciona un lugar',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}
		else if (area==='' || !area) {
			Alert.alert(
			  'El area no puede ser vacia',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}
		else{
			this.activarPlan(costo, navigate, planId)
		}
	}
	activarPlan(costo, navigate, id){
		console.log(costo)
		axios.get('/x/v1/pag/pagopublico/byuser') 
		.then((res)=>{
			if (res.data.pago[0].saldo<costo) {
				Alert.alert(
					`Tu saldo es insuficiente`,
					'',
				[
					{text: 'Salir', onPress: () => navigate('inicio')},
					{text: 'Recargar', onPress: () => navigate('facturacion')},
				],
					{ cancelable: false }
				)
			}else{
				axios.put('/x/v1/pla/plan/cambiarestado', {id, activo:true})
				.then(data=>{
					if(data.data.code==1){
						axios.post('/x/v1/pag/pagopublico', {monto:-Math.abs(costo), planId:id, userId:res.data.pago[0]._id})
						.then(res2=>{
							if (res2.data.code==1) {
								Alert.alert(
									`Tu plan ha sido activado`,
									'ya puedes verlo en el home',
								[
									{text: 'Cerrar', onPress: () => navigate('inicio')},
									 
								],
									{ cancelable: false }
								)
							}
						})
					}
				})
				
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	editarPlan(){
		if (!imagen) {
				let data = new FormData();
				axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, restricciones, lugar:direccion, area, activo})
				.then(e=>{
					if(e.data.code==1){	
						let id = e.data.message._id;
						data.append('imagen', imagen);
						data.append('id', e.data.message._id);
						axios({
							method: 'put', //you can set what request you want to be
							url: '/x/v1/pla/plan',
							data: data,
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'multipart/form-data'
							}
						})
						.then((res)=>{
							console.log(res.data)
							if(res.data.status=="SUCCESS"){
							usuariosAsignados.map(e=>{
								sendRemoteNotification(2, e.token, 'misPlanes', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, res.data.rutaImagenResize[0])
							})
								if (!publico) {
									navigate('chat', id)
								}else{
									Alert.alert(
										`Tu plan ha sido creado`,
										'puedes activarlo ahora por las proximas 24 horas, o activarlo luego desde ajustes',
									[
										{text: 'Mejor Luego', onPress: () => navigate('inicio')},
										{text: 'Activar', onPress: () => this.activarPlan(costo, navigate, id)},
									],
										{ cancelable: false }
									)
								}
								
							}
						})
						.catch((err)=>{
							console.log(err)
						})
					}

				})
				.catch(err=>{
					alert('error intenta nuevamente')
					console.log(err)
				})
			}else{
				axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, area, restricciones, tipo, activo, imagenOriginal:imagen, imagenResize:imagen, imagenMiniatura:imagen, planPadre})
				.then(e=>{
					if(e.data.code==1){	
						let id = e.data.message._id;
						usuariosAsignados.map(e=>{
							sendRemoteNotification(2, e.token, 'misPlanes', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, imagen)
						})
						navigate('chat', id)
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
	}

}			