import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput, Platform} from 'react-native'
import {style} 					  from './style'
import axios 					  from 'axios'
import DatePicker 				  from 'react-native-datepicker'
import moment 					  from 'moment'
import AlertInput 				  from 'react-native-alert-input';
import Lightbox 				  from 'react-native-lightbox';
import { Popup } 	  from 'react-native-map-link'
import RestriccionesPlanComponent from '../createPlan/restricciones.js'
import MapaPlanComponent 		  from '../createPlan/mapa.js'
import AgregarAmigosComponent     from '../agregarAmigos/agregarAmigos.js'
import TakePhotoComponent 	  	  from '../takePhoto/takePhotoComponent.js'
 
import {sendRemoteNotification}   from '../push/envioNotificacion.js'
 

export default class infoPlanComponent extends Component{
	constructor(props) {
		super(props);
		this.state={
	  		mapa:false,
	  		restriccion:false,
	  		adjuntarAmigos:false,
	  		mapaVisible:false,
	  		exitoso:false,  	  ///// muestra el mensaje de guardado exitoso
	  		guardado:false,       ///// cuando los cambios no se han guardado y se va para atras
	  		planId:'',
	  		nombre:'',
	  		descripcion:'',
	  		fechaLugar:'',
			loc:'',
			img1:true,
	  		lugar:'',
	  		restricciones:[],
	  		restriccionesAsignadas:[],
	  		asignados:[],
	  		usuariosAsignados:[],
	  		notificaciones:'',
	  		misUsuarios:[],
	  		fechaHoy:moment().format('YYYY-MMM-DD h:mm'),
	  	}
	}
	componentWillMount(){
 		let restricciones1  = []  /////  variablae para guardar los id de las restricciones
 		let asignados1 		= []  /////  variablae para guardar los id de los asignados
 		let notificaciones1 = []  /////  variablae para guardar los id de los users en notificaciones
 	 
 		const {restricciones, asignados, loc, planId, nombre, descripcion, fechaLugar, lugar, notificaciones, _id} = this.props.navigation.state.params.plan
 	 
 		restricciones.map(e=>{
 			restricciones1.push(e._id)
 		})
 		asignados.map(e=>{
 			asignados1.push(e._id)
 		})
 		notificaciones.map(e=>{
 			notificaciones1.push(e._id)
 		})
 		console.log("notificaciones")
 		console.log(notificaciones)
 		console.log(notificaciones1)
 		///// asignadosInicial es para identificar los primeros usuarios y comparar con los nuevos mirar linea 396 handlesubmit, en caso de que se cambien los usuarios asignados al plan
 		this.setState({restricciones:restricciones1, asignados:asignados1, asignadosInicial:asignados1, planId:_id, restriccionesAsignadas:restricciones, usuariosAsignados:asignados, lat:loc.coordinates[1], lng:loc.coordinates[0], loc, nombre, descripcion, fechaLugar, lugar, notificaciones:notificaciones1})
 	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////  ACTUALIZA LA UBICACION //////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateX(lat,lng, direccion, area, costo){
		if (direccion) {
			this.setState({lat,lng, area, costo, direccion, mapa:false, guardado:true})
		}else{
			let direccion1 = lat+','+lng 
			this.setState({lat,lng, area, costo, direccion:'', mapa:false, showAlertUbicacion:true, guardado:true})
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
 	renderModalAbrirMapa(lat, lng, lugar){
		return(
			<Popup
			    isVisible={this.state.mapaVisible}
			    onCancelPressed={() => this.setState({ mapaVisible: false })}
			    onAppPressed={() => this.setState({ mapaVisible: false })}
			    onBackButtonPressed={() => this.setState({ mapaVisible: false })}
			    modalProps={{ // you can put all react-native-modal props inside.
			        animationIn: 'slideInUp'
			    }}
			   
			    options={{ latitude: lat,
				    longitude: lng,
				    title: lugar,  // optional
				    googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
				    dialogTitle: 'Abrir Con', // optional (default: 'Open in Maps')
				    dialogMessage: '', // optional (default: 'What app would you like to use?')
				    cancelText: 'Cancelar', // optional (default: 'Cancel')
				    appsWhiteList: ['google-maps'] }}
			    style={{ /* Optional: you can override default style by passing your values. */ }}
			/>
		)	
	}
	goBack(){
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, asignadosInicial, notificaciones, lugar, restricciones, planId, usuariosAsignados, guardado} = this.state
		const {plan}  = this.props.navigation.state.params
		if ((nombre =plan.nombre || descripcion != plan.descripcion || fechaLugar != plan.fechaLugar || lat != plan.lat || lng != plan.lng || lat != asignados.lat || lng != asignados.lng) &&guardado){
			Alert.alert(
				'Opss!! no has guardado tus datos',
				'¿estas seguro? Que quieres salir',
			[
				{text: 'Ir atras', onPress: () => this.props.navigation.navigate("chat", planId)},
				{text: 'Cerrar', onPress: () => console.log("ok")},
			],
				{ cancelable: false }
			)
		}else{
			 this.props.navigation.navigate("chat", planId)
		}
	}
	render(){
	let data = this.props.navigation.state.params.plan
	let id   = this.props.navigation.state.params.id
 	let permiteEditar = id==data.idUsuario._id ?true :false;
	let {navigate} = this.props.navigation
 
	let notifica = []
	this.state.notificaciones.map(e=>{
		notifica.push(e._id)
	})
 
	let notificacionActiva = this.state.notificaciones.includes(id)
	let menus = [
		{funcion:()=>this.silenciar(id), texto:'Silenciar Plan', show: notificacionActiva ?true :false },
		{funcion:()=>this.cancelarSilenciar(id), texto:'Cancelar Silenciar Plan', show: notificacionActiva ?false :true },
		{funcion:()=>salir(data._id, navigate), texto:'Salir del Plan', show: id==data.idUsuario._id ?false :true },
		{funcion:()=>finalizar(data._id, navigate, data), texto:'Finalizar Plan', show: id==data.idUsuario._id ?true :false }
	]
	const {nombre, descripcion, fechaLugar, lat, lng, direccion, mapa, loc, lugar, restricciones, restriccion, asignados, adjuntarAmigos, exitoso, img1, imagen} = this.state
	console.log(asignados)
	return (
		<ScrollView  style={style.contenedorGeneral}>
			{/* si la ubicacion no tiene */}
			{this.renderAlertNombreEvento()}

			<View style={style.contenedor}> 
				<View style={ Platform.OS==='android' ?style.contenedorBack :[{marginTop:30}, style.contenedorBack] }>
					<TouchableOpacity onPress={()=> this.goBack()} style={style.btnBack}>
						<Image source={require('../assets/images/back.png')} style={style.imgBack} />
					</TouchableOpacity>
					 <View style={style.contenedorTexto}><Text style={[style.textBack, style.familia]}>Detalle Plan</Text></View>
			   </View>
				{/*<CabezeraComponent navigate={navigate} url={'chat'} parameter={data._id} texto='Info Plan' />*/}
				<View style={style.encabezadoPlan}>
				   	<View style={!img1 ?{height:210} :null}>
				   		<View style={imagen ?style.avatar2 :style.avatar3} >
					   		<TakePhotoComponent 
								fuente={'camPerfil.png'} 
								ancho={!imagen ?100 :100} alto={!imagen ?50 :100} 
								border={50}
								updateImagen={(photo) => {this.setState({photo, imagen:true})}} 
								img1={(img1) => {this.setState({img1})}} 
							/>
						</View> 
				   		<Lightbox 
					      	renderContent={() => (
					        <Image 
					        	source={{uri: data.imagenOriginal[0] }}
					        	style={{ width: "100%", height:400}}
					        />
					       )}
					    >
						  	<Image
							    source={{ uri: data.imagenOriginal[0]  }}
							    style={style.imagenPlan}
						  	/>
					  	</Lightbox>		 
					</View>
					<View style={!img1  ?{height:210} :null}>
						{
							permiteEditar
							?<TextInput
								style={[style.titulo, style.familia]}
								onChangeText={(nombre) => this.setState({nombre, guardado:true})}
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
								style={[style.descripcion, style.familia]}
								onChangeText={(descripcion) => this.setState({descripcion, guardado:true})}
								value={descripcion}
								underlineColorAndroid='transparent'
								placeholder="Descripcion"
								placeholderTextColor="#bbbbbb" 
								maxLength={60}
								multiline={true}
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
								date={fechaLugar.length==13 ?moment(JSON.parse(fechaLugar)).format("DD-MMM-YYYY h:mm") :fechaLugar}
								style={[style.btnInputs, style.btnInputs2]}
								mode="datetime"
								placeholder="Dia / Mes / Año / Hora"
								format="DD-MMM-YYYY h:mm"
								showIcon={false}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								androidMode='spinner'
								onDateChange={(fechaLugar) => {fechaLugar!=this.state.fechaLugar &&this.setState({guardado:true}); this.setState({fechaLugar})}}
						   />
						   :<Text style={[style.btnInputs,  style.familia]}>{fechaLugar.length==13 ?moment(JSON.parse(fechaLugar)).format("YYYY-MM-DD h:mm a") :fechaLugar}</Text>
						}
						
					</View>
					
				{/*  ubicacion   */}
				{  
					permiteEditar
					?<View style={style.cajaInpunts}>
			    		<Image source={require('../assets/images/map.png')} style={style.iconInput} />
				    	<TouchableOpacity onPress={() => this.setState({mapa:true})}  style={direccion ?style.btnInputs :[style.btnInputs]}>
				    		<Text style={direccion ?[style.textos, style.familia] :[style.textosActivo, style.familia]}>{direccion ?direccion.substr(0,60) :'Ubicación'}</Text>
				    	</TouchableOpacity>
					</View>
				   :<TouchableOpacity onPress={() => this.setState({mapaVisible:true})} style={style.cajaInpunts}> 
		    			<Image source={require('../assets/images/map.png')} style={style.iconInput} />
		    			<View style={direccion ?style.btnInputs :[style.btnInputs]}>
				    		<Text style={[style.textosActivo]}>{lugar}</Text>
				    	</View>
		    			
					</TouchableOpacity>	
				}
				{this.renderModalAbrirMapa(lat, lng, lugar)}
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
					    	<Text style={restricciones.length>0 ?[style.textos, style.familia] :[style.textosActivo, style.familia]}>{restricciones.length>0 ?'tienes: '+restricciones.length+' Restricciones' :'Este plan no tiene restricciones'}</Text>
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
						    restriccion={(restricciones, restriccionesAsignadas)=>{this.setState({restricciones, restriccionesAsignadas, restriccion:false}); restricciones!=this.state.restricciones &&this.setState({guardado:true})}}
						    arrayRestricciones={this.state.restricciones}
						    restriccionesAsignadas={this.state.restriccionesAsignadas}
						    noEdit={permiteEditar ?true :false}
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
				    		?<TouchableOpacity onPress={() => this.setState({adjuntarAmigos:true})} style={[style.btnInputs,style.btnColor2Input]}>
						    	<Text style={[style.textosActivo, style.familia]}>{asignados.length>0 ?'tienes: '+asignados.length+' Amigos' :' Invitar Amigos'}</Text>
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
							    		<Image source={require('../assets/images/dots.png')} style={style.add2} />
							    	</TouchableOpacity>
						    	}
						    </View>
				    	}
				    	{
				    		adjuntarAmigos 
				    		?<AgregarAmigosComponent 
				    			noEdita={permiteEditar?false:true}
				                titulo='Asignar Amigos'
				                close={(e)=>this.setState({adjuntarAmigos:false})} 
				                updateStateAsignados={(asignados, usuariosAsignados)=>{this.setState({asignados, usuariosAsignados, adjuntarAmigos:false}); asignados!=this.state.asignados &&this.setState({guardado:true})}}
								asignados={this.state.asignados}
								// crearArticulo={asignadosPlan}
								usuariosAsignados={this.state.usuariosAsignados}
								agregarTemporales
				            /> 
				            :null 
				        } 
					</View>
				}
				</View>
				{
		    		exitoso
			    	&&<Text style={style.exitoso}>Plan Actualizado</Text>
			    }
				{
					permiteEditar
					&&<TouchableOpacity onPress={() => { this.handleSubmit()} } style={style.btnHecho}>
						<Text style={[style.hecho, style.familia]}>Guardar Cambios !</Text>
					</TouchableOpacity>	
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
		let {nombre, descripcion, fechaLugar, lat, lng, asignados, asignadosInicial, notificaciones, lugar, restricciones, planId, usuariosAsignados, photo} = this.state
		console.log(photo)
		/////   1--  identificar los que se eliminaron, comparando el nuevo array con el asignadosInicial el que guarda los asignados iniciales y guardarlos en un array
		let eliminados = asignadosInicial.filter(x=> !asignados.includes(x))

		////    2--  identifico los nuevos asignados   
		let nuevos  = asignados.filter(x=> !asignadosInicial.includes(x))
		
		////   3--  identifico los nuevos asignados con su respectivo token   
		let notificacionToken = usuariosAsignados.filter(x=> !asignadosInicial.includes(x._id))
		
		////   4--  elimino al usuario de la notificacion  
		let nuevaNotificacion = notificaciones.filter(x=> !eliminados.includes(x))

		////   5--  agrego los nuevos usuarios a la notificacion
		notificaciones =  nuevaNotificacion.concat(nuevos)

		axios.put('/x/v1/pla/plan/editar', {nombre, descripcion, fechaLugar, lat, lng, asignados, lugar, restricciones, planId, notificaciones, area:0})
		.then(e=>{
			console.log(e.data)
			if(e.data.code==1){	
				this.setState({exitoso:true, guardado:false})
				setTimeout(()=>{
					this.setState({exitoso:false})
				},2000)

				notificacionToken.map(e=>{
					sendRemoteNotification(2, e.token, 'misPlanes', 'Te han agregado a un plan', `, Te agrego a ${nombre}`, null)
				})
				if (photo) {
					let data = new FormData();
					let id = e.data.plan._id;
					data.append('imagen', photo);
					data.append('id', id);
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
					})
				}
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	silenciar(id){
		
		const {notificaciones, planId} = this.state
		console.log(id)
		console.log(notificaciones)
		let data = notificaciones.filter(e=>{return e!==id})
 
		 
		console.log(data)
	 
		axios.put('x/v1/pla/plan/silenciar', {data, planId:planId})
		.then(res=>{
			// console.log(res.data)
			if (res.data.code==1) {
				this.setState({notificaciones:data})
			}
		})
	}
	cancelarSilenciar(id){
		const {notificaciones, planId} = this.state
		let data = {_id:id, tokenPhone:null}
		data = [data, ...notificaciones]
		
		 
		let newData = []
		data.map(e=>{
			newData.push(e._id)
		})
		
		axios.put('x/v1/pla/plan/silenciar', {data:newData, planId:planId})
		.then(res=>{
			console.log(res.data)
			if (res.data.code==1) {
				this.setState({notificaciones:newData})
			}
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
 