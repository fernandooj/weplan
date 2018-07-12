import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native'

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
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import AlertInput from 'react-native-alert-input';

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
 			misUsuarios:[],
 			misRestricciones:[],
 			imagen:null,
 			adjuntarAmigos:false,
 			mapa:false,
 			tipo:'',
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
		console.log(this.props.navigation.state.params) 
		if (this.props.navigation.state.params) {
			axios.get('/x/v1/pla/plan/getbyid/'+this.props.navigation.state.params)
			.then((e)=>{
				console.log(e.data.plan[0])
				let imagenes = []
				e.data.plan[0].imagenResize.map(e=>{
					imagenes.push({url:e})
				}) 
				this.setState({cargaPlan:e.data.plan[0], iconCreate:false, restriccion:false, restriccionesAsignadas:e.data.plan[0].restricciones , restricciones:e.data.plan[0].restricciones, planPadre:this.props.navigation.state.params, imagenes, tipoPlan:false })

			})
			.catch(err=>{
				console.log(err)
			})
		}else{
			this.setState({tipoPlan:true})
		}
		// this.setState({
	 //      interval: setInterval(() => {
	 //        this.setState({
	 //          position: this.state.position === this.state.imagenes.length ? 0 : this.state.position + 1
	 //        });
	 //      }, 2000)
	 //    });
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
			this.setState({lat,lng, direccion:'', mapa:false, showAlertUbicacion:true})
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
		const {nombre, direccion, restricciones, asignados, imagen, adjuntarAmigos, mapa, restriccion, iconCreate, cargaPlan, imagenes, usuariosAsignados, fechaHoy, tipoPlan, publico} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView style={CreatePlanStyle.contenedorGeneral} > 
				{/* si la ubicacion no tiene */}
				{this.renderAlertNombreEvento()}
				{
					tipoPlan
					&&this.tipoMapa()
				}

				<CabezeraComponent navigate={navigate} url={'inicio'} parameter={this.state.planId} texto={publico==true ?'Plan publico' :publico==false&&'plan privado'} />
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
							maxLength={30}
					    />
					</View>
					:<View style={CreatePlanStyle.encabezadoPlan2}>
						<Slideshow 
					      dataSource={imagenes}
					      position={this.state.position}
					      onPositionChanged={position => this.setState({ position })} 
					   />
					   	<View style={CreatePlanStyle.textoCargado}>
							<Text style={CreatePlanStyle.nombreCargado}>
								{cargaPlan.nombre} 
							</Text>
							<Text  style={CreatePlanStyle.ByCargado}>
								Por {cargaPlan.idUsuario.nombre}
							</Text>
						</View>
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
								maxLength={60}
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
						</View>
					   :<TouchableOpacity onPress={() => this.setState({mapa:true})} style={CreatePlanStyle.cajaInpunts}> 
			    			<Image source={require('./map.png')} style={CreatePlanStyle.iconInput} />
			    			<Text style={[CreatePlanStyle.btnInputs]}>{cargaPlan.lugar}</Text>
						</TouchableOpacity>	
					}
					{
						mapa &&<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>this.updateStateX(lat,lng, direccion)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={cargaPlan.lat ?{infoplan:true, lat:parseFloat(cargaPlan.lat), lng:parseFloat(cargaPlan.lng)} :{infoplan:false}}
						/> 
					}
				

				{/*  restricciones  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('./denied.png')} style={CreatePlanStyle.iconInput} />
					    {
					    	restricciones.length==0
					    	?<TouchableOpacity onPress={()=>this.setState({ restriccion:true})}>
						    	<Text style={restricciones.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Restricciones'}</Text>
						    </TouchableOpacity>
					    	:<View style={CreatePlanStyle.contentAdd}>
					    		<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderRestriccionesAsignados()} 
						    	</View>
						    	{
						    		!this.props.navigation.state.params
						    		&&<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={CreatePlanStyle.addBtn}>
							    		<Image source={require('./add.png')} style={CreatePlanStyle.add} />
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

				{/*   amigos  */}
				{
					!publico
					&&<View style={CreatePlanStyle.cajaInpunts}>
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
				    	{
				    		adjuntarAmigos 
				    		?<AgregarAmigosComponent 
				                titulo='Asignar Amigos'
				                close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
				                updateStateAsignados={(asignados, usuariosAsignados, misUsuarios)=>this.setState({asignados, usuariosAsignados, misUsuarios, adjuntarAmigos:false})}
				                asignados={this.state.asignados}
							    usuariosAsignados={this.state.usuariosAsignados}
							    misUsuarios={this.state.misUsuarios}
				            /> 
				            :null 
				        } 
					</View>
				}
					
				{/* Area de influencia */}
				{	publico
					&&<View style={CreatePlanStyle.cajaInpunts}>
						<Image source={require('./area.png')} style={CreatePlanStyle.iconInput} />	
					    <View style={CreatePlanStyle.contenedorArea}>
					    	<Picker
				                style={CreatePlanStyle.inputArea}
						        onValueChange={(area) => this.setState({area})}
						        selectedValue={this.state.area}
				            >
					          	<Picker.Item label='Area de Influencia *' value=''  />
					          	<Picker.Item label='1 Km' value='1'  />
					          	<Picker.Item label='5 Km' value='5'  />
					          	<Picker.Item label='7 Km' value='7'  />
					          	<Picker.Item label='15 Km' value='15'  />
					          	<Picker.Item label='30 Km' value='30'  />
				            </Picker>
			            </View>
			        </View>
				}
				
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
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, usuariosAsignados, restricciones, imagen, tipo, cargaPlan, planPadre, direccion, area, publico} = this.state

		nombre 		= cargaPlan.nombre ?cargaPlan.nombre :nombre
		descripcion = cargaPlan.descripcion ?cargaPlan.descripcion :descripcion
		lat 		= cargaPlan.lat ?cargaPlan.lat :lat
		lng 		= cargaPlan.lng ?cargaPlan.lng :lng
		fechaLugar  = cargaPlan.fechaLugar ?cargaPlan.fechaLugar :fechaLugar
		let lugar   = cargaPlan ?cargaPlan.lugar :direccion
		imagen 		= cargaPlan.imagenResize ?cargaPlan.imagenResize[0] :imagen
		tipo        = publico ? 'pago' :'suscripcion'
		area        = cargaPlan ?cargaPlan.area :area

		console.log(lugar)
		if (!cargaPlan) {
			let data = new FormData();
			axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, tipo, lugar, area})
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
			axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, area, restricciones, tipo, imagenOriginal:imagen, imagenResize:imagen, imagenMiniatura:imagen, planPadre})
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