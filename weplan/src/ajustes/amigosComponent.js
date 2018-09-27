import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios'

import {style} from '../ajustes/style'
import CabezeraComponent 	  from './cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'

const KEYS_TO_FILTERS = ['nombre', 'username']
export default class ajustesAmigosComponent extends Component{
	state={
 		filteredData:[],
 		asignados:[],
 		amigosAsignados:[],
 		show:false,
	}
	componentWillMount(){
		/////////////////	OBTENGO LOS USUARIOS ACTIVOS 	/////////////////////
		axios.get('/x/v1/users/activos/sinPerfil')
		.then((res)=>{
			console.log(res.data)
			let todosUsuarios = res.data.usuarios.map((item)=>{
				return {
					id:item._id,
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
				 	console.log(res2.data.asignados)
					 
					/////////////////////////////////////////////////////////////////////////////////
					/////////////////////////////////////////////////////////////////////////////////
					////////////////////	CONCATENO LOS DOS ARRAYS  ////////////////////////////////
					const diffBy1 = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
					const makeSymmDiffFunc1 = (pred) => (a, b) => diffBy1(pred)(a, b).concat(diffBy1(pred)(b, a))
					const myDiff1 = makeSymmDiffFunc1((x, y) => x.id === y.id)
					const filteredData = myDiff1(res2.data.asignados, todosUsuarios)
					/////////////////////////////////////////////////////////////////////////////////
				 	console.log(filteredData)
					this.setState({filteredData, amigosAsignados:res2.data.asignados})
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
 		return(
			<View style={style.registro2}>
				<TouchableOpacity style={style.btnCabezera} >
					<Text style={[style.textCabezera, style.familia]}>Amigos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[style.btnCabezera, style.btnCabezeraActive]}>
					<Text style={[style.textCabezera, style.familia]}>Explorar</Text>
				</TouchableOpacity>
			</View>
 		)
 	}

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////			OBTENGO CADA UNO DE LOS REGISTROS						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getRow(){
 		const filteredEmails = this.state.filteredData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return filteredEmails.map((data, key)=>{
			return  <View style={style.registro} key={key} onPress={()=>this.updateState(data.id, data.estado, data.token)} > 
						<Image source={{ uri: data.photo}}  style={data.estado ?style.avatarA :style.avatarA2} /> 
						<Text style={style.textoAvatar}>{data.nombre}</Text>
						
						<TouchableOpacity style={style.btnHecho} onPress={(e)=>{this.handleSubmit(data.id, data.token)}} > 
							<Text style={style.hecho}>Agregar</Text>
						</TouchableOpacity> 
				    </View>
		})
	}
 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////		FILTRO LOS AMIGOS DEL INPUT					 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.username.search(regex)> -1)	
		})
		if (event.length>0){
			this.setState({filteredData:filtered, show:true})
		}else{
			this.setState({filteredData:[], show:false})
		}
		console.log(filtered)
	}
 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////	RENDER LISTADO AMIGOS						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigos(){
 		return(
 			<ScrollView style={style.contenedorLista}>
				{this.getRow()}
			</ScrollView>
 		)	
 	}

 	searchUpdated (term) {
 		if (term.length>0){
			this.setState({show:true})
		}else{
			this.setState({show:false})
		}
		this.setState({searchTerm: term})
	}
 	renderAmigosAsignados(){
 		const {navigate} = this.props.navigation
 		return this.state.amigosAsignados.map((e, key)=>{
 			if (e.estado) {
 				return(
		 			<TouchableOpacity key={key} style={style.registro} onPress={()=>navigate('profile', {userId:e._id, amigos:true})}>
		 				 <Image source={{uri: e.photo ?e.photo :`${URL}/public/img/plan.jpg`}}  style={style.avatarA} /> 
		 				 <Text style={[style.textoAvatar, style.familia]}>{e.nombre}</Text>
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
		const {show, token} = this.state
		const {navigate} = this.props.navigation
		return(
			<View style={style.contenedorA}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Amigos' />
				<ScrollView>
					{this.renderCabezera()}
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
							   <TouchableOpacity style={style.btnBuscar} onPress={this.handleSubmit.bind(this)}>
							   	<Image source={require('../assets/images/agregar.png')} style={style.btnAgregar} />
							   </TouchableOpacity>
							</View>
							{
								show
								?this.renderAmigos()
								:this.renderAmigosGrupos()
							}
						</View>	
					</View>
				</ScrollView>	
			</View>
		)
	}

	
	updateState(id, estado, token){
		console.log(token)
		let filteredData = this.state.filteredData.map(item=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData, idAsignado:id, token})
		if (estado) {
			this.setState({asignados: this.state.asignados.concat([id])})
		}else{
			this.setState({asignados:this.state.asignados.filter(function(val){return val != id}) })
		}
	}

	
	handleSubmit(idAsignado, token){
		axios.post('/x/v1/ami/amigoUser', {asignado: idAsignado} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.setState({show:false, username:''})
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
			return e.id!==idAsignado
		})
		this.setState({filteredData})
	}
}