import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput} from 'react-native'

import {style} from '../infoPlan/style'
import axios from 'axios'
import Icon from 'react-native-fa-icons';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import AlertInput from 'react-native-alert-input';


import RestriccionesPlanComponent from '../createPlan/restricciones.js'
import MapaPlanComponent 		  from '../createPlan/mapa.js'
import AgregarAmigosComponent     from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  	  from '../takePhoto/takePhotoComponent.js'
import CabezeraComponent 		  from '../ajustes/cabezera.js'
import {sendRemoteNotification}   from '../push/envioNotificacion.js'


export default class infoPlanComponent extends Component{
	constructor(props) {
		super(props);
		this.state={
	  		mapa:false,
	  		restriccion:false,
	  		adjuntarAmigos:false,
	  		exitoso:false,
	  		planId:this.props.navigation.state.params.plan._id,
	  		nombre:this.props.navigation.state.params.plan.nombre,
	  		descripcion:this.props.navigation.state.params.plan.descripcion,
	  		fechaLugar:this.props.navigation.state.params.plan.fechaLugar,
	  		loc:this.props.navigation.state.params.plan.loc,
	  		lugar:this.props.navigation.state.params.plan.lugar,
	  		restricciones:this.props.navigation.state.params.plan.restricciones,
	  		restriccionesAsignadas:this.props.navigation.state.params.plan.restricciones,
	  		asignados:this.props.navigation.state.params.plan.asignados,
	  		usuariosAsignados:this.props.navigation.state.params.plan.asignados,
	  		misRestricciones:[],
	  		misUsuarios:[],
	  		fechaHoy:moment().format('YYYY-MM-DD h:mm'),
	  	}
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
	//////////////////////   	RENDER LAS RESTRICCIONES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderRestriccionesAsignados(){
 		return this.state.restriccionesAsignadas.map((e, key)=>{
 			if (key<4) {
 				return(
	 				<View key={key} >
	 					<Image source={{uri:e.ruta}} style={style.avatar} />
	 					<Image source={require('../assets/images/deneid1.png')} style={style.banResActiveAdd} />
	 					 
	 				</View>
	 			)
 			}
 		})
 	}
 	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////   	RENDER LAS RESTRICCIONES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderUsuariosAsignados(){
 		return this.state.usuariosAsignados.map((e, key)=>{
 			if (key<4) {
 				return(
	 				<View key={key} >
	 					<Image source={{uri:e.photo}} style={style.avatar} />
	 					<Image source={require('../assets/images/agregado.png')} style={style.iconAgregado} />
	 					<Text style={[style.textoAgregado, style.familia]} >{e.nombre.substr(0,20)}</Text>
	 				</View>
	 			)
 			}
 		})
 	}
	render(){
	let data = this.props.navigation.state.params.plan
	console.log(data)
	let id   = this.props.navigation.state.params.id
 	let permiteEditar = id==data.idUsuario._id ?true :false;
	let {navigate} = this.props.navigation
	let menus = [
		{funcion:()=>salir(data._id, navigate), texto:'Salir del Plan', show: id==data.idUsuario._id ?false :true },
		{funcion:()=>finalizar(data._id, navigate, data), texto:'Finalizar Plan', show: id==data.idUsuario._id ?true :false }
	]
	const {nombre, descripcion, fechaLugar, lat, lng, direccion, mapa, loc, lugar, restricciones, restriccion, asignados, adjuntarAmigos, exitoso} = this.state
	console.log(this.state.misRestricciones)
	return (
		<ScrollView  style={style.contenedorGeneral}>
			{/* si la ubicacion no tiene */}
			{this.renderAlertNombreEvento()}
			<View style={style.contenedor}> 
				<CabezeraComponent navigate={navigate} url={'chat'} parameter={data._id}  />
				<View style={style.encabezadoPlan}>
				   	<View> 
				   		<Image source={{uri: data.imagenOriginal[0]}} style={style.imagenPlan} />			 
					</View>
					<View>
					{
						permiteEditar
						?<TextInput
							style={[style.titulo, style.familia]}
							onChangeText={(nombre) => this.setState({nombre})}
							value={nombre}
							underlineColorAndroid='transparent'
							placeholder="NOMBRE DE TU PLAN"
							placeholderTextColor="#ffffff" 
							maxLength={30}
					    />
					    :<Text style={[style.titulo, style.familia]}>
							{nombre} 
						</Text>
					}
					{
						permiteEditar
						?<TextInput
							style={[style.descripcionfaef, style.familia]}
							onChangeText={(descripcion) => this.setState({descripcion})}
							value={descripcion}
							underlineColorAndroid='transparent'
							placeholder="Descripcion"
							placeholderTextColor="#ffffff" 
							maxLength={60}
					    />
					    :<Text  style={[style.descripcion, style.familia]}>
							{data.descripcion}
						</Text>
					}
						
					{
						!permiteEditar
						&&<Text  style={[style.autor, style.familia]}>
							Por {data.idUsuario.nombre}
						</Text>
					}	
						
					</View> 
				</View>
					   
			   <View style={style.contenedor} >
					 
					
				{/* fecha  */}
				  	<View style={style.cajaInpunts}>
						<Image source={require('../assets/images/fecha.png')} style={style.iconInput} />
						{
							permiteEditar
							?<DatePicker
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
								style={[style.btnInputs, style.btnInputs2]}
								mode="datetime"
								placeholder="Mes / Dia / Año / Hora"
								format="YYYY-MM-DD h:mm"
								showIcon={false}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								androidMode='spinner'
								onDateChange={(fechaLugar) => {this.setState({fechaLugar})}}
						   />
						   :<Text style={[style.btnInputs,  style.familia]}>{fechaLugar}</Text>
						}
						
					</View>

					{  
						permiteEditar
						?<View style={style.cajaInpunts}>
				    		<Image source={require('../assets/images/map.png')} style={style.iconInput} />
					    	<TouchableOpacity onPress={() => this.setState({mapa:true})}  style={direccion ?style.btnInputs :[style.btnInputs]}>
					    		<Text style={direccion ?[style.textos, style.familia] :[style.textosActivo, style.familia]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
					    	</TouchableOpacity>
						</View>
					   :<TouchableOpacity onPress={() => this.setState({mapa:true})} style={style.cajaInpunts}> 
			    			<Image source={require('../assets/images/map.png')} style={style.iconInput} />
			    			<View style={direccion ?style.btnInputs :[style.btnInputs]}>
					    		<Text style={[style.textosActivo]}>{lugar}</Text>
					    	</View>
			    			
						</TouchableOpacity>	
					}
					{
						mapa &&<MapaPlanComponent 
							inputValor= {false}
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion, area, costo)=>this.updateStateX(lat, lng, direccion, area, costo)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={!permiteEditar ?{infoplan:true, lat:parseFloat(loc.coordinates[1]), lng:parseFloat(loc.coordinates[0])} :{infoplan:false, muestraBtnHecho:true}}
							guardaUbicacion={{lat, lng, direccion}}
						/> 
					}
				 
					

				{/*  restricciones   */}
				<View style={style.cajaInpunts}>
			    	<Image source={require('../assets/images/denied.png')} style={style.iconInput} />
				    {
				    	restricciones.length==0
				    	?<TouchableOpacity onPress={()=>this.setState({ restriccion:true})} style={restricciones.length>0 ?style.btnInputs :[style.btnInputs,style.btnColor2Input]}>
					    	<Text style={restricciones.length>0 ?[style.textos, style.familia] :[style.textosActivo, style.familia]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Restricciones'}</Text>
					    </TouchableOpacity>
				    	:<View style={style.contentAdd}>
				    		<View style={style.agregadosContenedor}>
					    		{this.renderRestriccionesAsignados()} 
					    	</View>
					    	{
					    		permiteEditar
					    		&&<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={style.addBtn}>
						    		<Image source={require('../assets/images/add.png')} style={style.add} />
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

				{/*   amigos   */}
				{
					 <View style={style.cajaInpunts}>
				    	<Image source={require('../assets/images/friends.png')} style={style.iconInput} />
				    	{	
				    		asignados.length==0
				    		?<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})}>
						    	<Text style={[style.btnInputs,style.btnColor2Input, style.familia]}>{asignados.length>0 ?'tienes: '+asignados.length+' Amigos' :' Invitar Amigos'}</Text>
						    </TouchableOpacity>
						    :<View style={style.contentAdd}>
						    	<View style={style.agregadosContenedor}>
						    		{this.renderUsuariosAsignados()} 
						    	</View>
						    	{
						    		permiteEditar
						    		?<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={style.addBtn}>
							    		<Image source={require('../assets/images/add.png')} style={style.add} />
							    	</TouchableOpacity>
							    	:<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={style.addBtn}>
							    		<Image source={require('../assets/images/add.png')} style={style.add} />
							    	</TouchableOpacity>
						    	}
						    	
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
				</View>
				{
					permiteEditar
					&&<TouchableOpacity onPress={() => { this.handleSubmit()} } style={style.btnHecho}>
						<Text style={[style.hecho, style.familia]}>Editar !</Text>
					</TouchableOpacity>	
				}
				{
		    		exitoso
			    	&&<Text style={style.exitoso}>Plan Actualizado</Text>
			    }
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
	handleSubmit(){
		const {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, restricciones, planId} = this.state
		axios.put('/x/v1/pla/plan/editar', {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, restricciones, planId, area:0})
		.then(e=>{
			console.log(e.data)
			if(e.data.code==1){	
				this.setState({exitoso:true})
				// let id = e.data.message._id;
				// usuariosAsignados.map(e=>{
				// 	sendRemoteNotification(2, e.token, 'misPlanes', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, imagen)
				// })
				// navigate('chat', id)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}	
const finalizar = (id, navigate, data)=>{
	Alert.alert(
		'Opss!! Vas a finalizar este plan',
		'¿estas seguro? Después no podras abrirlo',
	[
		{text: 'Mejor después', onPress: () => console.log('OK Pressed')},
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
 