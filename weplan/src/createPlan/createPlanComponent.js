import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'

import {CreatePlanStyle} from '../createPlan/style'
import axios from 'axios'
import Modal from 'react-native-modalbox';
import Icon from 'react-native-fa-icons';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import Slideshow from 'react-native-slideshow';


import RestriccionesPlanComponent from './restricciones.js'
import MapaPlanComponent 		    from './mapa.js'
import AgregarAmigosComponent    from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  		 from '../takePhoto/takePhotoComponent.js'
import CabezeraComponent from '../ajustes/cabezera.js'



export default class createPlanComponent extends Component{
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
 			imagen:null,
 			adjuntarAmigos:false,
 			mapa:false,
 			tipo:'suscripcion',
 			restriccion:false,
 			iconCreate:true,
 			cargaPlan:false,
 			position: 1,
      	interval: null,
      	imagenes:[]
		}
	}

	componentWillMount(){
		if (this.props.navigation.state.params) {
			axios.get('/x/v1/pla/plan/getbyid/'+this.props.navigation.state.params)
			.then((e)=>{
				console.log(e.data.plan[0])
				let imagenes = []
				e.data.plan[0].imagen.map(e=>{
					imagenes.push({url:e})
				}) 
				this.setState({cargaPlan:e.data.plan[0], iconCreate:false, restriccion:false, restriccionesAsignadas:e.data.plan[0].restricciones , restricciones:e.data.plan[0].restricciones, planPadre:this.props.navigation.state.params, imagenes })

			})
			.catch(err=>{
				console.log(err)
			})
		}
		this.setState({
	      interval: setInterval(() => {
	        this.setState({
	          position: this.state.position === this.state.imagenes.length ? 0 : this.state.position + 1
	        });
	      }, 2000)
	    });
	}
	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////  ACTUALIZA LA UBICACION //////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateX(lat,lng, direccion){
		if (direccion) {
			this.setState({lat,lng, direccion, mapa:false})
		}else{
			let direccion1 = lat+','+lng 
			this.setState({lat,lng, direccion:direccion1, mapa:false})
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////  	RENDER  	/////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	render(){
		const {nombre, direccion, restricciones, asignados, imagen, adjuntarAmigos, mapa, restriccion, iconCreate, cargaPlan, imagenes} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView style={CreatePlanStyle.contenedorGeneral} > 
				<CabezeraComponent navigate={navigate} url={'inicio'} parameter={this.state.planId} />
				{
					!cargaPlan
					?<View style={CreatePlanStyle.encabezadoPlan}>
					<TakePhotoComponent fuente={'cam.png'} ancho={170} alto={120} ancho2={170} alto2={120} updateImagen={(imagen) => {this.setState({imagen})}} sinBorder />
						<TextInput
							style={CreatePlanStyle.input}
							onChangeText={(nombre) => this.setState({nombre,iconCreate:false})}
							value={nombre}
							underlineColorAndroid='transparent'
							placeholder="NOMBRE DE TU PLAN"
							placeholderTextColor="#8F9093" 
					    />
					</View>
					:<View style={CreatePlanStyle.encabezadoPlan2}>
						<Slideshow 
					      dataSource={imagenes}
					      position={this.state.position}
					      onPositionChanged={position => this.setState({ position })} 
					   />
						<Text style={CreatePlanStyle.textoCargado}>{cargaPlan.nombre}</Text>
					</View>
				}
					   
			   <View style={CreatePlanStyle.contenedor} >
					{/* Descripcion  */}	
					{
						!cargaPlan.descripcion
						?<View style={CreatePlanStyle.cajaInpunts}>
							<TextInput
								style={CreatePlanStyle.textarea}
								onChangeText={(descripcion) => this.setState({descripcion})}
								value={this.state.descripcion}
								underlineColorAndroid='transparent'
								placeholder="descripcion"
								placeholderTextColor="#c9c9c9" 
								multiline={true}
							/>
						</View>
						:<View style={CreatePlanStyle.cajaInpunts}>
							<Text style={CreatePlanStyle.textarea}>{cargaPlan.descripcion}</Text>
						</View>
					}
					
				{/* fecha  */}
					{
						!cargaPlan
						?<View style={CreatePlanStyle.cajaInpunts}>
					    	<Image source={require('./fecha.png')} style={CreatePlanStyle.iconInput} />
						   <DatePicker
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
									date={this.state.fechaLugar}
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
						:<View style={CreatePlanStyle.cajaInpunts}>
							<Image source={require('./fecha.png')} style={CreatePlanStyle.iconInput} />
							<Text style={CreatePlanStyle.btnInputs}>{cargaPlan.fechaLugar}</Text>
						</View>
					}
				   

				{/*  mapa  */}
					{  
						!cargaPlan.lugar
						?<View style={CreatePlanStyle.cajaInpunts}>
				    	 <Image source={require('./map.png')} style={CreatePlanStyle.iconInput} />
					     <TouchableOpacity onPress={() => this.setState({mapa:true})}>
					    	<Text style={direccion ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
					    </TouchableOpacity>
					    {mapa ?<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>this.updateStateX(lat,lng, direccion)}  /////////	me devuelve la posicion del marcador 
						/>: null }	
						</View>
					   :<View style={CreatePlanStyle.cajaInpunts}> 
				    		<Image source={require('./map.png')} style={CreatePlanStyle.iconInput} />
					   	<Text style={[CreatePlanStyle.btnInputs]}>{cargaPlan.lugar}</Text>
						</View>
					}
					

				{/*  restricciones  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('./denied.png')} style={CreatePlanStyle.iconInput} />
					    {
					    	restricciones.length==0
					    	?<TouchableOpacity onPress={(restricciones)=>this.setState({restricciones, restriccion:true})}>
						    	<Text style={restricciones.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Restricciones'}</Text>
						    </TouchableOpacity>
					    	:<View style={CreatePlanStyle.contentAdd}>
					    		<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderRestriccionesAsignados()} 
						    	</View>
						    	<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={CreatePlanStyle.addBtn}>
						    		<Image source={require('./add.png')} style={CreatePlanStyle.add} />
						    	</TouchableOpacity>
						    </View>
						}
						{
							restriccion 
							?<RestriccionesPlanComponent  
						    restriccion={(restricciones, restriccionesAsignadas)=>this.setState({restricciones, restriccionesAsignadas, restriccion:false})} />
						    :null
						}
					</View>

				{/*   amigos  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('./friends.png')} style={CreatePlanStyle.iconInput} />
				    	{	
				    		asignados.length==0
				    		?<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})}>
						    	<Text style={[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{asignados.length>0 ?'tienes: '+asignados.length+' Amigos' :' Invitar Amigos'}</Text>
						    </TouchableOpacity>
						    :<View style={CreatePlanStyle.contentAdd}>
						    	<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderUsuariosAsignados()} 
						    	</View>
						    	<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={CreatePlanStyle.addBtn}>
						    		<Image source={require('./add.png')} style={CreatePlanStyle.add} />
						    	</TouchableOpacity>
						    </View>
				    	}
				    	{adjuntarAmigos ?<AgregarAmigosComponent 
					                titulo='Asignar Amigos'
					                close={(asignados, usuariosAsignados)=>this.setState({adjuntarAmigos:false, asignados, usuariosAsignados})} 
					                updateStateAsignados={(estado, id)=>this.updateStateAsignados(estado, id)}/> :null }
					     
					</View>

				{/*  Crear Plan  */}
					{
						iconCreate
						?<Image source={require('./createDisable.png')} style={CreatePlanStyle.createIconDisable} />
						:<TouchableOpacity onPress={this.handleSubmit.bind(this)} style={CreatePlanStyle.create}>
							<Image source={require('./create.png')} style={CreatePlanStyle.createIcon} />
						</TouchableOpacity>
					}
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
	 					<Image source={require('./agregado.png')} style={CreatePlanStyle.iconAgregado} />
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
	 					<Icon name='ban' allowFontScaling style={CreatePlanStyle.banResActiveAdd} />
	 				</View>
	 			)
 			}
 		})
 	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, imagen, tipo, cargaPlan, planPadre} = this.state

		nombre 		= cargaPlan.nombre ?cargaPlan.nombre :nombre
		descripcion = cargaPlan.descripcion ?cargaPlan.descripcion :descripcion
		lat 			= cargaPlan.lat ?cargaPlan.lat :lat
		lng 			= cargaPlan.lng ?cargaPlan.lng :lng
		fechaLugar  = cargaPlan.fechaLugar ?cargaPlan.fechaLugar :fechaLugar
		imagen 		= cargaPlan.imagen ?cargaPlan.imagen :imagen
		console.log(nombre)

		if (!cargaPlan) {
			let data = new FormData();
			axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, tipo})
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
						console.log(res)
						if(res.data.status=="SUCCESS"){
							navigate('chat', id)
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
			axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, tipo, imagen, planPadre})
			.then(e=>{
				if(e.data.code==1){	
					let id = e.data.message._id;
					navigate('chat', id)
				}

			})
			.catch(err=>{
				console.log(err)
			})
		}
		
	}
}			

















