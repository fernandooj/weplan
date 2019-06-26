import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, ScrollView, Platform, AsyncStorage, TextInput} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios 		   from 'axios'
import ImageProgress   from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Pie';
import Icon 		   from 'react-native-fa-icons';
import {URL, VERSION}  from '../../App.js';
import firebase 	   from 'react-native-firebase';
import {AmigosStyle}   from './style'
const KEYS_TO_FILTERS = ['nombre', 'username']
export default class AgregarAmigosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			filteredData:[],
		    asignados:[],
		    asignadosUsuarios:[],
		    modalVisible:true,
			searchTerm: '',
			modalUsuario:false,
			usuarioTemporal:[]
		}
	}
	async componentWillMount(){
		////////////////////////////////////////////// data info de analitycs ///////////////////////////////
		let userId = await AsyncStorage.getItem('userInfoId');
		let userNombre = await AsyncStorage.getItem('userNombre');
		firebase.analytics().setCurrentScreen("Agregar Amigos");
		firebase.analytics().setAnalyticsCollectionEnabled(true);
		firebase.analytics().logEvent("infoUser", {"username":userNombre,"userId":userId,"platform":Platform.OS, VERSION});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		const {asignados, usuariosAsignados, crearArticulo} = this.props
 		if (usuariosAsignados.length>0 ) {
 			axios.get('/x/v1/ami/amigoUser/asignados/true')
			.then((res)=>{
				let n = res.data.asignados.filter(e=>{
	 				return usuariosAsignados.filter(e2=>{
	 					if (e._id==e2._id) e.estado = false
	 						return e
	 				})
				 })
				 if(crearArticulo){
					let usuariosTemporales =  crearArticulo.filter(function(cv){
						return !n.find(function(e){
							return e._id == cv._id;
						});
					});
					usuariosTemporales = usuariosTemporales.map(e=>{
						return{
							_id:e._id,
							estado:false,
							nombre:e.nombre,
							photo:"https://muneo.co"
						}
					})
					this.setState({filteredData:usuariosTemporales.concat(n), asignados:asignados, asignadosUsuarios:usuariosAsignados})
				}else{
					this.setState({filteredData:n, asignados:asignados, asignadosUsuarios:usuariosAsignados})
				}
			})	
		}
		if (usuariosAsignados.length === 0) {
			axios.get('/x/v1/ami/amigoUser/asignados/true')
			.then((e)=>{ 
				crearArticulo ?this.setState({filteredData:crearArticulo}) :this.setState({filteredData:e.data.asignados})
			})	
			.catch((err)=>{
				console.log(err)
			})
		}

	}
	 
	getRow(){
		const filteredEmails = this.state.filteredData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		if (filteredEmails.length===0) {
			return (
				<View style={AmigosStyle.sinResultados}>
					<Text>No hemos encontrado amigos, pero puedes  agregar algunos</Text>
					<TouchableOpacity style={AmigosStyle.btnHecho} onPress={()=>{this.props.navigate("ajustesAmigos"); this.props.close()}} > 
						<Text style={AmigosStyle.hecho}>Agregar</Text>
					</TouchableOpacity> 
				</View>
			)
		}else{
			return filteredEmails.map((data, key)=>{
			return  <TouchableOpacity style={AmigosStyle.subLista} key={key} 
					onPress={!this.props.noEdita ?(e)=>{this.updateState(data._id, data.estado); this.updateStateAsignados(data.estado, data._id); this.updateStateUsuarios(data._id, data.estado, data)} :null} > 
					{
						data.acceso=="temporal"
						?<Image source={require('../assets/images/plan.jpg')} style={AmigosStyle.avatar2} />
						:<ImageProgress 
							resizeMode="cover" 
							renderError={ (err) => { return (<ImageProgress source={require('../assets/images/plan.jpg')} imageStyle={{height: 52, width: 52, borderRadius: 26, left:-30, borderWidth: 3.5, borderColor: '#C2E3EE'}}  />) }} 
							source={{ uri:  data.photo}} 
							 
							imageStyle={{height: 52, width: 52, borderRadius: 26, left:-30, borderWidth: 3.5, borderColor: '#C2E3EE'}}
						/>
					}
					{/* <ImageProgress 
					source={{ uri: 'http://loremflickr.com/640/480/dog' }} 
					indicator={ProgressBar.Pie} 
					style={{
						width: 320, 
						height: 240, 
					}}/> */}
					{/* <Image source={{ uri: data.photo ?data.photo :URL+'public/images/plan.jpg'}}  style={data.estado ?AmigosStyle.avatar :AmigosStyle.avatar2} />  */}
					<Text style={[AmigosStyle.textoAvatar, AmigosStyle.familia]}>{data.nombre}</Text>
					{
						data.acceso=="temporal"
						&&<Text style={[AmigosStyle.textUsuarios2, AmigosStyle.familia]}> / Temporal</Text>
					}
					{
						data.acceso=="temporal"
						&&<TouchableOpacity style={AmigosStyle.btnDeleteUsuarios} onPress={()=>this.deleteUser(data._id)}>
								<Icon name={'trash'} style={AmigosStyle.iconUsuarios} />
							</TouchableOpacity>
					}
					{!data.estado ?<Image source={require('../assets/images/agregado.png')} style={AmigosStyle.agregado}/> :null} 
			    	</TouchableOpacity>
				})
		}
	}
 
	renderUsuario(){
		const {nombre, modalUsuario} = this.state
		return(
			<Modal transparent visible={modalUsuario} animationType="fade" onRequestClose={() => {}} >
                <TouchableOpacity activeOpacity={1}  onPress={() => this.setState({ modalUsuario:false}) } >
                    <View style={AmigosStyle.contenedorModal}>
                        <View style={AmigosStyle.contenedorVentaModal}>
							<TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({modalUsuario:false})}} style={AmigosStyle.btnCloseModal} >
								<Icon name={'times-circle'} style={AmigosStyle.iconCerrar} />
							</TouchableOpacity>
                            <Text style={AmigosStyle.tituloUsuario}>Puedes agregar un usuario de forma temporal solo para este plan</Text>
							<TextInput
								style={[AmigosStyle.inputNombre, AmigosStyle.familia]}
								onChangeText={(nombre) => this.setState({nombre})}
								value={nombre}
								placeholder="Nombre usuario" 
						    />
							<TouchableOpacity style={AmigosStyle.btnHecho2} onPress={()=>this.guarduarUsuarioTemporal()}>
								<Text style={[AmigosStyle.hecho, AmigosStyle.familia]}>Guardar</Text>
							</TouchableOpacity>
						</View>
                    </View>
                </TouchableOpacity>
            </Modal>  
		)
	}
	modal(){
		const {asignados, asignadosUsuarios, filteredData, usuarioTemporal} = this.state
		console.log(usuarioTemporal)
		return(
			<Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
				{this.renderUsuario()}
				<View style={AmigosStyle.titulo}>
					<TouchableOpacity onPress={(e)=>{this.props.close()}}  style={AmigosStyle.btnClose} >
						<Image source={require('../assets/images/back.png')} style={AmigosStyle.imagenClose} />
					</TouchableOpacity>
					<Image source={require('../assets/images/friends.png')} style={AmigosStyle.imagenTitulo}/>
					<Text style={[AmigosStyle.text, AmigosStyle.familia]}>{this.props.titulo}</Text>
				</View>	
				{
					this.props.agregarTemporales
					&&<TouchableOpacity style={AmigosStyle.btnHecho2} onPress={()=>this.setState({modalUsuario:true})}>
						<Text style={[AmigosStyle.hecho, AmigosStyle.familia]}>Nuevo usuario temporal</Text>
					</TouchableOpacity>
				}
				<View style={AmigosStyle.contenedor}>
					<View style={AmigosStyle.separador}></View>
					<SearchInput
						style={[AmigosStyle.input, AmigosStyle.familia]}
						onChangeText={(searchTerm) => { this.setState({searchTerm}) }} 
						value={this.state.username}
						underlineColorAndroid='transparent'
						placeholder="Buscar"
						placeholderTextColor="#8F9093" 
					/>
					<Image source={require('../assets/images/search.png')} style={AmigosStyle.btnBuscar} />
				</View>
				<ScrollView style={AmigosStyle.contenedorLista} showsHorizontalScrollIndicator={false}>
					<View style={AmigosStyle.contenedorAmigos}>
						 
						{this.getRow()}
						{/* Btn Hecho */}
						{
							asignados.length>0
							?<View style={AmigosStyle.containerHecho}>
								<TouchableOpacity style={AmigosStyle.btnHecho} onPress={(e)=>{this.props.updateStateAsignados(asignados, asignadosUsuarios, filteredData)}} > 
									<Text style={AmigosStyle.hecho}>Hecho!</Text>
								</TouchableOpacity> 
							</View>	
							:null
						}
					</View>	
				</ScrollView>
			</Modal>  
		)
	}
	render(){
		console.log(this.state.filteredData)
 
		return(
			<View style={AmigosStyle.contenedor}>
				{this.modal()}
			</View>
		)
	}
	updateState(id, estado){
		console.log({id, estado})
		let filteredData = this.state.filteredData.map(item=>{
			if(item._id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////     GENERO EL ARRAY DE LOS ASIGNADOS  
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	guarduarUsuarioTemporal(){
		let {asignados, asignadosUsuarios, nombre, filteredData} = this.state
		axios.post("/x/v1/user/usuariosTemporales", {nombre})
		.then(res=>{
			asignados.push(res.data.user._id)
			res.data.user["estado"] = false
			asignadosUsuarios.unshift(res.data.user)
			filteredData.unshift(res.data.user)
			this.setState({asignados, asignadosUsuarios, modalUsuario:false, filteredData, nombre:""})
		})
		.catch(err=>console.log(err))

 
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////     ELIMINO USUARIOS DEL ARRAY
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	deleteUser(_id){
		let {filteredData, asignados, asignadosUsuarios} = this.state
		filteredData =filteredData.filter(e=>{
			return e._id!==_id
		})
		asignados = asignados.filter(e=>{
			return e!==_id
		})
		asignadosUsuarios =asignadosUsuarios.filter(e=>{
			return e._id!==_id
		})
		this.setState({filteredData, asignados, asignadosUsuarios})
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////     GENERO EL ARRAY DE LOS ASIGNADOS  
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateAsignados(estado, id){
		if (!estado) {
		  this.setState({asignados: this.state.asignados.concat([id])})
		}else{
		  this.setState({asignados:this.state.asignados.filter(function(val){return val != id}) })
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////      GENERO UN ARRAY CON LOS ICONOS Y LOS NOMBRES DE LOS ASIGNADOS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateUsuarios(id, estado, data){
		if (!estado) {
		  this.setState({asignadosUsuarios: this.state.asignadosUsuarios.concat(data)})
		}else{
		  this.setState({asignadosUsuarios:this.state.asignadosUsuarios.filter(function(val){return val._id != id}) })
		}
	}
 
}

 