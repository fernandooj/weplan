import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios'
import Toast 			 from 'react-native-simple-toast';
import {style} from '../ajustes/style'
import CabezeraComponent 	  from './cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {URL}  from '../../App.js';
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
const TRACKER = new GoogleAnalyticsTracker("UA-129344133-1");
TRACKER.trackScreenView("ajustesAmigos");
const KEYS_TO_FILTERS = ['nombre', 'username']
export default class ajustesAmigosComponent extends Component{
	state={
 		filteredData:[],
 		asignados:[],
 		amigosAsignados:[],
 		show:false,
 		searchTerm:"",
 		inicio:0,
 		final:10
	}
	componentWillMount(){
		/////////////////	OBTENGO LOS USUARIOS ACTIVOS 	/////////////////////
		axios.get('/x/v1/users/activos/sinPerfil')
		.then((res)=>{
			console.log(res.data)
			let todosUsuarios = res.data.usuarios.map((item)=>{
				return {
					_id:item._id,
					username:item.username,
					photo: item.photo,
					nombre: item.nombre,
					token: item.tokenPhone,
					estado: true,
				}
			})
			////////////////////////////////////////////////////////////////////////////////////
			//////////////////	 OBTENGO LOS USUARIOS ASIGNADOS  ///////////////////////////////
			axios.get('/x/v1/ami/amigoUser/asignados/null')
			.then((res2)=>{
					console.log(res2.data)
				 	if (res2.data.code===2) {
						this.props.navigation.navigate('Login')
						Toast.show('No éstas logueado')
					}else{
						/////////////////////////////////////////////////////////////////////////////////
						/////////////////////////////////////////////////////////////////////////////////
						////////////////////	CONCATENO LOS DOS ARRAYS  ////////////////////////////////
						const diffBy1 = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
						const makeSymmDiffFunc1 = (pred) => (a, b) => diffBy1(pred)(a, b).concat(diffBy1(pred)(b, a))
						const myDiff1 = makeSymmDiffFunc1((x, y) => x._id === y._id)
						let filteredData = myDiff1(res2.data.asignados, todosUsuarios)
						/////////////////////////////////////////////////////////////////////////////////
					 	filteredData = filteredData.filter((thing, index, self) =>
						  index === self.findIndex((t) => (
						    t._id === thing._id  
						  ))
						)
						this.setState({filteredData, usuarios:filteredData, amigosAsignados:res2.data.asignados})
					}
			})	
			.catch((err)=>{
				console.log(err)
			})
		})	
		.catch((err)=>{
			console.log(err)
		})
	}




	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////			RENDERIZO LA CABEZERA						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderCabezera(){
 		const {navigate} = this.props.navigation
 		return(
			<View style={style.registro2}>
				<TouchableOpacity style={style.btnCabezera} >
					<Text style={[style.textCabezera, style.familia]}>Amigos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[style.btnCabezera, style.btnCabezeraActive]} onPress={()=>navigate('importar', {amigos:true})}>
					<Text style={[style.textCabezera, style.familia]}>Explorar</Text>
				</TouchableOpacity>
			</View>
 		)
 	}

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////			OBTENGO CADA UNO DE LOS REGISTROS						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getRow(){
 		const {filteredData, inicio, final} = this.state
 		let newFilter = filteredData.slice(inicio, final)
 		const filter = newFilter.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
 		
		return filter.map((data, key)=>{
			return  <View style={style.registro} key={key} > 
						<Image source={{uri: data.photo ?data.photo :URL+'public/img/plan.jpg'}}  style={style.avatarA} /> 
						<View style={style.contentTextAvatar}>
							<Text style={[style.textoAvatar, style.familia]}>{data.nombre ?data.nombre :'We Plan'}</Text>
						</View>
						<TouchableOpacity style={style.btnHechoAmigos} onPress={(e)=>{this.handleSubmit(data._id, data.token)}} > 
							<Text style={style.hechoAmigos}>Agregar</Text>
						</TouchableOpacity> 
				    </View>
		})
	}
 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////	RENDER LISTADO AMIGOS						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigos(){
 		return(
 			<ScrollView style={style.contenedorLista} horizontal={true} onScroll={(e)=>this.onScroll(e)}>
				{this.getRow()}
			</ScrollView>
 		)	
 	}

 	onScroll(e){
 		const {final} = this.state
 		let paddingLeft = 10

 		paddingLeft += e.nativeEvent.layoutMeasurement.width;
 		if (e.nativeEvent.contentOffset.x >= e.nativeEvent.contentSize.width-paddingLeft) {
 			console.log(final)
 			if (final<41) {
 				this.setState({final:final+5})
 			}
 		}
 	}
 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////		FILTRO LOS AMIGOS DEL INPUT					 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	searchUpdated (term) {
 		if (term.length>1){
			this.setState({show:true, continuar:true})
		}else{
			this.setState({show:false, continuar:false})
		}
		this.setState({searchTerm: term})
	}

 	renderAmigosAsignados(){
 		const {navigate} = this.props.navigation
 		return this.state.amigosAsignados.map((e, key)=>{
 			if (e.estado) {
 				return(
		 			<TouchableOpacity key={key} style={style.registroAsignados} onPress={()=>navigate('profile', {userId:e._id, amigos:true})}>
		 				 <Image source={{uri: e.photo ?e.photo :`${URL}/public/img/plan.jpg`}}  style={style.avatarAsignados} /> 
		 				 <Text style={[style.textoAvatarAsignados, style.familia]}>{e.nombre}</Text>
		 			</TouchableOpacity>
		 		)
 			}
 		})	
 	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////				RENDER AMIGOS AGREGADOS					/////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigosGrupos(){
 		return(
 			<View style={style.lista}>
				{/*<TouchableOpacity  style={style.registro}>
					<Image source={require('../assets/images/nuevo.png')} style={style.btnNuevoGrupo} />
					<Text>Crear Grupo</Text>
				</TouchableOpacity>
				<View style={style.separador}></View>
				<Text style={style.tituloGrupo}>Grupos</Text>
				<View style={style.separador}></View>*/}
				<Text style={[style.tituloGrupo, style.familia]}>Amigos</Text>

				{/*   listar amigos asignados  */}
					{this.renderAmigosAsignados()}
			</View>
 		)	
 	}


	render(){
		const {show, token, continuar} = this.state
		const {navigate, state} = this.props.navigation
		
		return(
			<View style={style.contenedorA}>
				{ !this.props.navigation.state.params &&<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Amigos' /> }
				<ScrollView>
					{
						!state.params
						&&this.renderCabezera()
					}
					<View style={style.contenedor}>
						<View style={style.subContenedorA}>
							{/* buscador  */}
							<View style={style.contenedorBuscar}>
				 				<SearchInput
			          				style={[style.input, style.familia]}
							        onChangeText={(term) => { this.searchUpdated(term) }} 
							        value={this.state.username}
							        underlineColorAndroid='transparent'
				           			placeholder="Buscar"
				           			placeholderTextColor="#8F9093" 
				           			 
								    />
							    <Image source={require('../assets/images/search.png')} style={style.btnSearch} />
							    {
							    	state.params
							    	?<TouchableOpacity style={style.btnOmitir} onPress={()=>navigate('misPlanes')}>
								   		<Text style={style.txtOmitir}>{continuar ?'Continuar' :'Omitir'}</Text>
								    </TouchableOpacity>
								    :<TouchableOpacity style={style.btnBuscar} onPress={this.handleSubmit.bind(this)}>
								   		<Image source={require('../assets/images/agregar.png')} style={style.btnAgregar} />
								    </TouchableOpacity>
							    }
							    
							</View>
							{state.params &&<Text>Por que no agregas algunos amigos antes de empezar</Text>}
							
							{
								this.renderAmigos()
							}
							{
								this.renderAmigosGrupos()
							}
						</View>	
					</View>
				</ScrollView>	
			</View>
		)
	}
	
	handleSubmit(idAsignado, token){
		axios.post('/x/v1/ami/amigoUser', {asignado: idAsignado} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				// this.setState({show:false, username:''})
				sendRemoteNotification(1, token, "notificacion", 'Tienes una solicitud de amistad', ', Quiere agregarte como amigo', null)
			}else{
				Alert.alert(
				  'Opss!! revisa tus datos que falta algo',
				  '',
				  [
				    {text: 'OK', onPress: () => console.log('OK Pressed')},
				  ],
				  { cancelable: false }
				)
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		let filteredData = this.state.filteredData.filter(e=>{
			return e._id!==idAsignado
		})
		this.setState({filteredData})
	}
}