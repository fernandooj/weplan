import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions, Platform, AsyncStorage, ImageBackground, ActivityIndicator} from 'react-native'

import {CreatePlanStyle} 		  from '../createPlan/style'
import axios 					  from 'axios'
import DatePicker 				  from 'react-native-datepicker'
import moment 					  from 'moment'
import AlertInput 				  from 'react-native-alert-input'; 
import StarRating 				  from 'react-native-star-rating';
import Toast 			 		  from 'react-native-simple-toast';
import RestriccionesPlanComponent from './restricciones.js'
import MapaPlanComponent 		  from './mapa.js'
import AgregarAmigosComponent     from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  	  from '../takePhoto/takePhotoComponent.js'
import CabezeraComponent 		  from '../ajustes/cabezera.js'
import GuiaInicio 	 	 		  from '../guia_inicio/guia_inicio'
import {sendRemoteNotification}   from '../push/envioNotificacion.js'
import firebase from 'react-native-firebase';
import {URL, VERSION}  from '../../App.js'; 

const screenWidth = Dimensions.get('window').width;
 

export default class createPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			saldo:0,
			costo:0,
 			textMonth:'Mes',
 			textDate:'Dia',
 			textYear:'Año',
 			fechaHoy:moment().format('DD-MMM-YYYY h:mm'),
 			asignados:[],
 			usuariosAsignados:[],
 			restricciones:[],
 			restriccionesAsignadas:[],
 			misUsuarios:[],
 			imagen:null,
 			adjuntarAmigos:false,
 			mapa:false,
 			tipo:'',
 			restriccion:false,
 			iconCreate:true,
 			cargaPlan:false,
 			showAlertUbicacion:false,
 			position: 1,
 			nombre:'',
	      	interval: null,
	      	imagenes:[],
	      	showTipo:false, //// modal que muestra el tipo del plan
	      	publico:this.props.navigation.state.params===true ?true :false,  //// determina si el plan va a ser publico o privado
		}
	}

	async componentWillMount(){
		////////////////////////////////////////////// data info de analitycs ///////////////////////////////
		let userId = await AsyncStorage.getItem('userInfoId');
		let userNombre = await AsyncStorage.getItem('userNombre');
		let userDireccion = await AsyncStorage.getItem('userDireccion');
		firebase.analytics().setCurrentScreen("Crear Plan");
		firebase.analytics().setAnalyticsCollectionEnabled(true);
		firebase.analytics().logEvent("infoUser", {"username":userNombre,"userId":userId,"platform":Platform.OS, VERSION, userDireccion});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		let guia_inicio   = await AsyncStorage.getItem('crear_plan');
		let ganapuntos    = await AsyncStorage.getItem('ganapuntos');
		this.setState({guia_inicio, ganapuntos})
		axios.get('/x/v1/pag/pagoPublico/byuser' )
		.then((res)=>{
	 		if (res.data.code===2) {
	 			Toast.show('No éstas logueado')
				this.props.navigation.navigate('Login')
			}else{
				this.setState({saldo:res.data.saldo})
			}
		})
		.catch(err=>{
			console.log(err)
		})
		if (this.props.navigation.state.params) {
			axios.get('/x/v1/pla/plan/'+this.props.navigation.state.params)
			.then((e)=>{
				console.log(e.data)
				let imagenes = []
				e.data.plan[0].imagenResize.map(e=>{
					imagenes.push({url:e})
				}) 
				this.setState({cargaPlan:e.data.plan[0], iconCreate:false, restriccion:false, restriccionesAsignadas:e.data.plan[0].restricciones, imagenResize:e.data.plan[0].imagenResize[0], restricciones:e.data.plan[0].restricciones, planPadre:this.props.navigation.state.params, imagenes, tipoPlan:false })

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
	updateStateX(lat,lng, direccion, area, costo){
		if (costo<2000 && this.state.publico) {
			Alert.alert(
			  'El costo debe ser mayor a $2.000',
			  '',
			  [
			    {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
			  ],
			  { cancelable: false }
			)

		}else{
			if (direccion) {
				this.setState({lat,lng, area, costo, direccion, mapa:false})
			}else{
				let direccion1 = lat+','+lng 
				this.setState({lat,lng, area, costo, direccion:'', mapa:false, showAlertUbicacion:true})
			}
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
	/*tipoMapa(){
		return(
			<View style={CreatePlanStyle.tipoPlan}>
				<TouchableOpacity onPress={() => this.setState({tipoPlan:false, publico:true})} style={CreatePlanStyle.btnModal}> 
	    			<Text style={[CreatePlanStyle.textModal, CreatePlanStyle.familia]}>CREAR PLAN PÚBLICO</Text>
				</TouchableOpacity>	
				<TouchableOpacity onPress={() => this.setState({tipoPlan:false, publico:false})} style={CreatePlanStyle.btnModal}> 
	    			<Text style={[CreatePlanStyle.textModal, CreatePlanStyle.familia]}>CREAR PLAN PRIVADO</Text>
				</TouchableOpacity>	
			</View>
		)
	}*/

	getRandomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////  	RENDER  	/////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	render(){
		const {nombre, fechaLugar, direccion, restricciones, asignados, imagen, adjuntarAmigos, mapa, restriccion, iconCreate, cargaPlan, imagenes, usuariosAsignados, fechaHoy, tipoPlan, publico, area, costo, saldo, lat, lng, showTipo, guia_inicio, ganapuntos, guardandoPlan, imagenResize} = this.state
		const {navigate} = this.props.navigation
 		console.log(imagenResize)
		return (
			<ScrollView style={CreatePlanStyle.contenedorGeneral} keyboardDismissMode='on-drag'> 
				
				{/* si la ubicacion no tiene nombre */}
				{this.renderAlertNombreEvento()}
				{ typeof guia_inicio!=='string'  ?<View style={CreatePlanStyle.contenedorGeneral}><GuiaInicio number={15} guia_inicio={()=>this.setState({guia_inicio:'1'})} /></View> :null}
				{ typeof ganapuntos!=='string' &&publico  &&<GuiaInicio number={18} guia_inicio={()=>this.setState({ganapuntos:'1'})} /> }
				 
				{/*
					tipoPlan
					&&this.tipoMapa()
				*/}
				{
					cargaPlan
					?<CabezeraComponent navigate={navigate} url={'inicio'} parameter={this.state.planId}  />
					:<View style={ Platform.OS==='android' ?CreatePlanStyle.contenedorBack :[{marginTop:22}, CreatePlanStyle.contenedorBack]}>
						<TouchableOpacity onPress={()=> navigate('inicio')} style={CreatePlanStyle.btnBack}>
							<Image source={require('../assets/images/back.png')} style={CreatePlanStyle.imgBack} />
						</TouchableOpacity>
						<TouchableOpacity style={[CreatePlanStyle.contenedorTextBack]} onPress={() => this.setState({ showTipo:!this.state.showTipo})}>
							<View style={CreatePlanStyle.planesTitulo}>
								<Text style={[CreatePlanStyle.textBack, CreatePlanStyle.familia]}>
									{publico ?'Plan público' :'Plan privado'}
								</Text>	
								<View style={CreatePlanStyle.triangulo2}></View>
							</View>
						</TouchableOpacity>
				   </View>
				}
				

				
			   {
			   	showTipo
			    &&<View style={CreatePlanStyle.contenedorCambioTipo}>
				   	<View style={CreatePlanStyle.triangulo}></View>
				   	<TouchableOpacity style={CreatePlanStyle.btnCambioTipo} onPress={() => this.setState({publico:false, showTipo:false})}>
				   		<Text style={[CreatePlanStyle.familia, CreatePlanStyle.textoCambio]}>Plan privado</Text>
				   		{
				   			!publico &&<Image source={require('../assets/images/tipoPlan.png')} style={CreatePlanStyle.imgCambio} />
				   		}
				   	</TouchableOpacity>
				   	<TouchableOpacity style={CreatePlanStyle.btnCambioTipo2} onPress={() => this.setState({publico:true, showTipo:false})}>	
				   		<Text style={[CreatePlanStyle.familia, CreatePlanStyle.textoCambio]}>Plan público</Text>
				   		{
				   			publico &&<Image source={require('../assets/images/tipoPlan.png')} style={CreatePlanStyle.imgCambio} />
				   		}
				   	</TouchableOpacity>
				   </View>
			   }
			   
				{
					!cargaPlan
					?<View style={imagen ?CreatePlanStyle.encabezadoPlan2 :CreatePlanStyle.encabezadoPlan}>
						<TakePhotoComponent fuente={'cam.png'} ancho={screenWidth} alto={!imagen ?200 :screenWidth} updateImagen={(imagen) => {this.setState({imagen})}}   />
						<View style={CreatePlanStyle.textoCargado2}>
							<TextInput
								style={[CreatePlanStyle.nombreCargado, CreatePlanStyle.familia]}
								onChangeText={(nombre) => this.setState({nombre})}
								value={nombre}
								underlineColorAndroid='transparent'
								placeholder={publico ?"Nombre de tu publicación" :"Nombre de tu plan"}
								placeholderTextColor="#ffffff" 
								maxLength={60}
						    />
						</View>
					</View>
					:<View style={CreatePlanStyle.encabezadoPlan3}>
						{/*<Slideshow 
					      dataSource={imagenes}
					      position={this.state.position}
					      onPositionChanged={position => this.setState({ position })} 
					      height={screenWidth}
					   />*/}
					   {
					   	!imagenResize
					   	?<View style={{width:screenWidth, height:screenWidth, justifyContent: 'center'}}>
					   		<ActivityIndicator size="large" color="#148dc9" />
					   	</View>
					   	:<Image source={{uri:imagenResize}} style={{width:screenWidth, height:screenWidth}} />
					   }
					   	
					   
					   	<View style={CreatePlanStyle.textoCargado}>
							<Text style={[CreatePlanStyle.nombreCargado, CreatePlanStyle.familia, {color:this.getRandomColor()}]}>
								{cargaPlan.nombre.toUpperCase()} 
							</Text>
							<Text style={[CreatePlanStyle.ByCargado, CreatePlanStyle.familia]}>
								Por {cargaPlan.idUsuario.nombre}
							</Text>
							<View style={CreatePlanStyle.calificacion}>
								<StarRating
							        disabled={false}
							        maxStars={5}
							        rating={(cargaPlan.idUsuario.calificacion.reduce((a, b) => a + b, 0))/cargaPlan.idUsuario.calificacion.length}
							        starSize={14}
							        style={CreatePlanStyle.rating}
							        fullStarColor='#ffffff'
							        emptyStarColor='#ffffff'
							    />
							    <Text style={[CreatePlanStyle.votaciones, CreatePlanStyle.familia]}>{cargaPlan.idUsuario.calificacion.length} votaciones</Text>
							</View>
						</View>
					</View> 
				}
					   
			   <View style={CreatePlanStyle.contenedor} >
					{/* Descripcion  */}	
					{
						!cargaPlan
						?<View style={CreatePlanStyle.cajaInpunts}>
							<TextInput
								style={[CreatePlanStyle.textarea, CreatePlanStyle.familia]}
								onChangeText={(descripcion) => this.setState({descripcion})}
								value={this.state.descripcion}
								underlineColorAndroid='transparent'
								placeholder="Descripción"
								placeholderTextColor="#c9c9c9" 
								multiline={true}
								maxLength={100}
							/>
						</View>
						:<View style={CreatePlanStyle.cajaInpunts}>
							<View style={CreatePlanStyle.contenedorTextarea}>
								<Text style={[CreatePlanStyle.textarea2,CreatePlanStyle.familia]}>{cargaPlan.descripcion ?cargaPlan.descripcion :'Sin Descripción'}</Text>
							</View>
						</View>
					}
					
				{/* fecha  */}
					{
						!cargaPlan
						?<View style={CreatePlanStyle.cajaInpunts}>
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
			                        placeholderText:{
			                        	fontSize:18,
			                        	color:'#8F9093',
			                        },
			                        dateText: { 
			                        	fontSize:18,
			                        	color: '#8F9093'
			                        },
			                        btnTextConfirm: {
							            color: '#8F9093',
							         },
							         btnTextCancel: {
							            color: '#8F9093',
							         } 
			                    }}
								date={this.state.fechaLugar}
								style={CreatePlanStyle.inputs}
								mode="datetime"
								// placeholder="Dia / Mes / Año / Hora"
								placeholder={publico ?"Fecha y hora de tu publicación" :"Fecha y hora de tu plan"}
								format="DD-MMM-YYYY h:mm a"
								showIcon={false}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								androidMode='spinner'
								onDateChange={(fechaLugar) => {this.setState({fechaLugar})}}
						   />
						   <Text style={CreatePlanStyle.required}>*</Text>
						</View> 
						:<View style={CreatePlanStyle.cajaInpunts}>
							<Image source={require('../assets/images/fecha.png')} style={CreatePlanStyle.iconInput} />
							<TouchableOpacity style={[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
								<Text style={[CreatePlanStyle.textos, CreatePlanStyle.familia]}>{cargaPlan.fechaLugar ?moment(JSON.parse(cargaPlan.fechaLugar)).format("YYYY-MM-DD h:mm a") :'Sin fecha asignada'}</Text>
							</TouchableOpacity>
						</View>
					}
				   
 
				{/*  mapa  */}
					{  
						!cargaPlan
						?<View style={CreatePlanStyle.cajaInpunts}>
				    		<Image source={require('../assets/images/map.png')} style={CreatePlanStyle.iconInput} />
					    	<TouchableOpacity onPress={() => this.setState({mapa:true})}  style={direccion ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
					    		<Text style={direccion ?[CreatePlanStyle.textos, CreatePlanStyle.familia] :[CreatePlanStyle.textosActivo, CreatePlanStyle.familia]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
					    	</TouchableOpacity>
					    	<Text style={CreatePlanStyle.required}>*</Text>
						</View>
					   :<TouchableOpacity onPress={() => this.setState({mapa:true})} style={CreatePlanStyle.cajaInpunts}> 
			    			<Image source={require('../assets/images/map.png')} style={CreatePlanStyle.iconInput} />
			    			<View style={direccion ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
					    		<Text style={[CreatePlanStyle.textosActivo, CreatePlanStyle.familia, cargaPlan.lugar &&CreatePlanStyle.btnColor2Input]}>{cargaPlan.lugar}</Text>
					    	</View>
			    			
						</TouchableOpacity>	

					}
					{
						mapa &&<MapaPlanComponent 
							inputValor= {!cargaPlan && publico ?true :false}
							close={()=> this.setState({mapa:false})} 						   			/////////   cierro el modal
							updateStateX={(lat,lng, direccion, area, costo)=>this.updateStateX(lat, lng, direccion, area, costo)}  /////////	me devuelve la posicion del marcador 
							ubicacionDefecto={cargaPlan.loc ?{infoplan:true, area, lat:parseFloat(cargaPlan.loc.coordinates[1]), lng:parseFloat(cargaPlan.loc.coordinates[0])} :{infoplan:false,  muestraBtnHecho:true}}
							guardaUbicacion={{lat, lng, direccion}}
						/> 
					}
				

				{/*  restricciones  */}
					<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('../assets/images/denied.png')} style={CreatePlanStyle.iconInput} />
					    {
					    	restricciones.length==0
					    	?<TouchableOpacity onPress={!cargaPlan ?()=>this.setState({ restriccion:true}) :null} style={restricciones.length>0 ?CreatePlanStyle.btnInputs :[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
						    	<Text style={restricciones.length>0 ?[CreatePlanStyle.textos, CreatePlanStyle.familia] :[CreatePlanStyle.textosActivo, CreatePlanStyle.familia]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' : cargaPlan ?'Sin Restricciones asignadas' :'Restricciones'}</Text>
						    </TouchableOpacity>
					    	:<View style={CreatePlanStyle.contentAdd}>
					    		<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderRestriccionesAsignados()} 
						    	</View>
						    	{
						    		!this.props.navigation.state.params
						    		?<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={CreatePlanStyle.addBtn}>
							    		<Image source={require('../assets/images/add.png')} style={CreatePlanStyle.add} />
							    	</TouchableOpacity>
							    	:<TouchableOpacity onPress={() => this.setState({restriccion:true})} style={CreatePlanStyle.addBtn}>
							    		<Image source={require('../assets/images/dots.png')} style={CreatePlanStyle.add2} />
							    	</TouchableOpacity>
						    	}
						    </View>
						}
						{
							restriccion 
							?<RestriccionesPlanComponent  
							    restriccion={(restricciones, restriccionesAsignadas)=>this.setState({restricciones, restriccionesAsignadas, restriccion:false})}
							    arrayRestricciones={this.state.restricciones}
							    restriccionesAsignadas={this.state.restriccionesAsignadas}
							    // noEdit={this.props.navigation.state.params ?false :true}
							    noEdit={true}
						    />
						    :null
						}
					</View>

				{/*   amigos  */}
				{
					!publico
					&&<View style={CreatePlanStyle.cajaInpunts}>
				    	<Image source={require('../assets/images/friends.png')} style={CreatePlanStyle.iconInput} />
				    	{	
				    		asignados.length==0
				    		?<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={[CreatePlanStyle.btnInputs,CreatePlanStyle.btnColor2Input]}>
						    	<Text style={[CreatePlanStyle.textosActivo, CreatePlanStyle.familia]}>{asignados.length>0 ?'tienes: '+asignados.length+' Amigos' :' Invitar Amigos'}</Text>
						    </TouchableOpacity>
						    :<View style={CreatePlanStyle.contentAdd}>
						    	<View style={CreatePlanStyle.agregadosContenedor}>
						    		{this.renderUsuariosAsignados()} 
						    	</View>
						    	<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={CreatePlanStyle.addBtn}>
						    		<Image source={require('../assets/images/add.png')} style={CreatePlanStyle.add} />
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
							    navigate={navigate}
				            /> 
				            :null 
				        } 
					</View>
				}
					
				{/* Area de influencia  */}
				{	publico
					&&<View style={CreatePlanStyle.cajaInpunts}>
						<Image source={require('../assets/images/area.png')} style={CreatePlanStyle.iconInputArea} />	
					    <View style={CreatePlanStyle.contenedorArea}>
					    	<View>
					    		<Text style={[CreatePlanStyle.costoPlan, CreatePlanStyle.familia]}>Saldo actual: {'$ '+Number(saldo-costo).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
					    	</View>
					    	<View>
					    		<Text style={[CreatePlanStyle.costoPlan, CreatePlanStyle.familia]}>Costo de la publicación: {'$ '+Number(costo).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
					    	</View>
					    	{/*<ModalPicker
				                data={influencia}
				                initValue="Area de influencia"
				                color='#8F9093'
					            font={15}
				                onChange={(e)=> this.setState({area:e.key})} 
				                style={CreatePlanStyle.datePicker}
				            />*/}
			            </View>
			        </View>
				}
				
				{/*  Crear Plan  */}
					{
						nombre.length==0 && !cargaPlan
						?<ImageBackground source={require('../assets/images/createDisable.png')} style={CreatePlanStyle.createIconDisable}>
							<Text style={CreatePlanStyle.familia}>¡ CREA TU PLAN !</Text>
						</ImageBackground>
						:<TouchableOpacity onPress={guardandoPlan ?null :()=>this.handleSubmit()} >
							<ImageBackground source={require('../assets/images/create.png')} style={CreatePlanStyle.createIcon}>
							
								<Text style={[CreatePlanStyle.crearText, CreatePlanStyle.familia]}> {guardandoPlan ?'Guardando..' :'¡ CREA TU PLAN !'}</Text>
							</ImageBackground>	
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
	 					<Image source={require('../assets/images/agregado.png')} style={CreatePlanStyle.iconAgregado} />
	 					<Text style={CreatePlanStyle.textoAgregado, CreatePlanStyle.familia} >{e.nombre}</Text>
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
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, usuariosAsignados, restricciones, imagen, tipo, cargaPlan, planPadre, direccion, area, publico, costo} = this.state

		nombre 		= cargaPlan.nombre ?cargaPlan.nombre :nombre
		descripcion = cargaPlan.descripcion ?cargaPlan.descripcion :descripcion
		lat 		= cargaPlan.lat ?cargaPlan.lat :lat
		lng 		= cargaPlan.lng ?cargaPlan.lng :lng
		fechaLugar  = cargaPlan.fechaLugar ?cargaPlan.fechaLugar :fechaLugar
		let lugar   = cargaPlan ?cargaPlan.lugar :direccion
		imagen 		= cargaPlan.imagenResize ?cargaPlan.imagenResize[0] :imagen
		tipo        = publico ? 'pago' :'suscripcion'
		area        = cargaPlan ?cargaPlan.area :area
		let activo  = publico ? false : true
		 
		this.setState({iconCreate:true})

		if (!fechaLugar) {
			Alert.alert(
			  'La fecha es obligatoria',
			  '',
			  [
			    {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
			  ],
			  { cancelable: false }
			)
		}
		else if (!imagen &&tipo=='pago') {
			Alert.alert(
			  'La imagen es obligatoria',
			  '',
			  [
			     {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
			  ],
			  { cancelable: false }
			)
		}
		else if (!lugar &&tipo=='pago') {
			Alert.alert(
			  'Selecciona un lugar',
			  '',
			  [
			     {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
			  ],
			  { cancelable: false }
			)
		}
		else if ((area==='' || !area) &&tipo=='pago') {
			Alert.alert(
			  'El area no puede ser vacia',
			  '',
			  [
			     {text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
			  ],
			  { cancelable: false }
			)
		}
		else{
			this.setState({guardandoPlan:true})
			if (!cargaPlan) {
				let data = new FormData();
				axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, restricciones, tipo, lugar, area, activo, })
				.then(e=>{
					if(e.data.code==1){	
						let id = e.data.message._id;
						data.append('imagen', imagen);
						data.append('costo', costo);
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
							console.log(costo, navigate, id)
							if(res.data.code===1){
								usuariosAsignados.map(e=>{
									sendRemoteNotification(2, e.token, 'chat', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, res.data.rutaImagenResize[0], id)
								})
								if (!publico) {
									navigate('chat', id)
								}else{
									Alert.alert(
										'Tu plan ha sido creado',
										// 'puedes activarlo ahora por las proximas 24 horas, o activarlo luego desde ajustes',
										'ya puedes activarlo',
									[
										{text: 'Mejor Luego', onPress: () => navigate('inicio')},
										{text: 'Activar', onPress: () => this.activarPlan(costo, navigate, id)},
									],
										{ cancelable: false }
									)
								}
							}else{
								this.setState({guardandoPlan:false})
							}
						})
						.catch((err)=>{
							console.log(err)
							this.setState({iconCreate:false})
						})
					}
					this.setState({iconCreate:false})
				})
				.catch(err=>{
					this.setState({iconCreate:false})
					console.log(err)
				})
			}else{
				axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, area, restricciones, tipo, activo, imagenOriginal:imagen, imagenResize:imagen, imagenMiniatura:imagen, planPadre, costo})
				.then(e=>{
					if(e.data.code==1){	
						let id = e.data.message._id;
						usuariosAsignados.map(e=>{
							sendRemoteNotification(2, e.token, 'chat', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, imagen, id)
						})
						navigate('chat', id)
					}else{
						this.setState({guardandoPlan:false})
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		}
	}
	activarPlan(costo, navigate, id){
		axios.get('/x/v1/pag/pagopublico/byuser')  
		.then((res)=>{
		console.log(res.data)
		if (res.data.saldo<costo) {
				Alert.alert(
					`Tu saldo es insuficiente`,
					'Recarga ahora!',
				[
					{text: 'Mejor Luego', onPress: () => navigate('inicio')},
					{text: 'Recargar', onPress: () => navigate('facturacion')},
				],
					{ cancelable: false }
				)
			}
			else{
				axios.put('/x/v1/pla/plan/cambiarestado', {id, activo:true})
				.then(data=>{
					if(data.data.code==1){
						axios.post('/x/v1/pag/pagopublico', {monto:-Math.abs(costo), planId:id})
						.then(res2=>{
							if (res2.data.code==1) {
								Alert.alert(
									`Tu plan ha sido activado exitosamente`,
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
}			