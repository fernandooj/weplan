import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'

import {CreatePlanStyle} from '../createPlan/style'
import axios from 'axios'
import Modal from 'react-native-modalbox';
import Icon from 'react-native-fa-icons';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import Button from 'react-native-button';


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
 			restricciones:[],
 			imagen:null,
 			adjuntarAmigos:false,
 			mapa:false,
 			tipo:'suscripcion',
 			restriccion:false,
 			iconCreate:true
		}
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
		const {nombre, direccion, restricciones, asignados, imagen, adjuntarAmigos, mapa, restriccion, iconCreate} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView style={CreatePlanStyle.contenedorGeneral} > 
				<CabezeraComponent navigate={navigate} url={'Home'} parameter={this.state.planId} />
				<View style={CreatePlanStyle.encabezadoPlan}>
					<TakePhotoComponent fuente={'cam.png'} ancho={170} alto={120} updateImagen={(imagen) => {this.setState({imagen})}} />
					<TextInput
						style={CreatePlanStyle.input}
						onChangeText={(nombre) => this.setState({nombre,iconCreate:false})}
						value={nombre}
						underlineColorAndroid='transparent'
						placeholder="NOMBRE DE TU PLAN"
						placeholderTextColor="#8F9093" 
				    />
				</View>	   
			   <View style={CreatePlanStyle.contenedor} >
					{/* Descripcion  */}	
					<View style={CreatePlanStyle.cajaInpunts}>
						 
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
				{/* fecha  */}
				    <View style={CreatePlanStyle.cajaInpunts}>
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

				{/*  mapa  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	 <Image source={require('./map.png')} style={CreatePlanStyle.iconInput} />
					     <TouchableOpacity onPress={() => this.setState({mapa:true})}>
					    	<Text style={direccion ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
					    </TouchableOpacity>
					    {mapa ?<MapaPlanComponent 
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion)=>this.updateStateX(lat,lng, direccion)}  /////////	me devuelve la posicion del marcador 
						/>: null }	
					</View>

				{/*  restricciones  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('./denied.png')} style={CreatePlanStyle.iconInput} />
					    <TouchableOpacity onPress={(restricciones)=>this.setState({restricciones, restriccion:true})}>
					    	<Text style={restricciones.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Restricciones'}</Text>
					    </TouchableOpacity>
					    {restriccion 
					    	?<RestriccionesPlanComponent  
						    restriccion={(restricciones)=>this.setState({restricciones, restriccion:false})} />
						    :null
						}
					</View>

				{/*   amigos  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('./friends.png')} style={CreatePlanStyle.iconInput} />
					    <TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})}>
					    	<Text style={asignados.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>{asignados.length>0 ?'tienes: '+asignados.length+' Amigos' :' Invitar Amigos'}</Text>
					    	 {adjuntarAmigos ?<AgregarAmigosComponent 
				                titulo='Asignar Amigos'
				                close={(asignados)=>this.setState({adjuntarAmigos:false, asignados:asignados})} 
				                updateStateAsignados={(estado, id)=>this.updateStateAsignados(estado, id)}/> :null }
					    </TouchableOpacity>
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
 
	handleSubmit(){
		const {navigate} = this.props.navigation
		const {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, imagen,tipo} = this.state
		let data = new FormData();
		axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones,tipo})
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
	}
}			

















