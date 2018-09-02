import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, ScrollView} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import {AmigosStyle} from '../agregarAmigos/style'
import axios from 'axios'

const KEYS_TO_FILTERS = ['nombre', 'username']
export default class AgregarAmigosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			allList: [],
			filteredData:[],
		    asignados:[],
		    asignadosUsuarios:[],
		    modalVisible:true,
		    searchTerm: ''
		}
		this.searchUpdated = this.searchUpdated.bind(this)
	}
	componentWillMount(){
		console.log(this.props)
		const {asignados, usuariosAsignados} = this.props
 		if (usuariosAsignados.length>0 ) {
 			axios.get('/x/v1/ami/amigoUser/asignados/true')
			.then((res)=>{
				let n = res.data.asignados.filter(e=>{
	 				return usuariosAsignados.filter(e2=>{
	 					if (e._id==e2._id) e.estado = false
	 						return e
	 				})
	 			})
	 			console.log('++++++++++')
	 			console.log(usuariosAsignados)
	 			console.log(res.data.asignados)
	 			console.log(n)
				this.setState({filteredData:n, asignados:asignados, asignadosUsuarios:usuariosAsignados})
			})	

			// this.setState({filteredData:this.props.misUsuarios, asignados:this.props.asignados, asignadosUsuarios:this.props.usuariosAsignados})
		}
		if (usuariosAsignados.length === 0) {
			axios.get('/x/v1/ami/amigoUser/asignados/true')
			.then((e)=>{
				console.log(e.data.asignados)
				this.setState({filteredData:e.data.asignados, allList:e.data.asignados})
			})	
			.catch((err)=>{
				console.log(err)
			})
		}
	}
	 
	getRow(){
		const filteredEmails = this.state.filteredData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
	 	return filteredEmails.map((data, key)=>{
			return  <TouchableOpacity style={AmigosStyle.subLista} key={key} 
					onPress={(e)=>{this.updateState(data._id, data.estado); this.updateStateAsignados(data.estado, data._id); this.updateStateUsuarios(data._id, data.estado, data)}} > 
					<Image source={{ uri: data.photo}}  style={data.estado ?AmigosStyle.avatar :AmigosStyle.avatar2} /> 
					<Text style={[AmigosStyle.textoAvatar, AmigosStyle.familia]}>{data.nombre}</Text>
					{!data.estado ?<Image source={require('../assets/images/agregado.png')} style={AmigosStyle.agregado}/> :null} 
			    	</TouchableOpacity>
				})
	}
	updateState(id, estado){
		let filteredData = this.state.filteredData.map(item=>{
			if(item._id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
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
	searchUpdated (term) {
		this.setState({searchTerm: term})
	}
 
	render(){
		console.log(this.state.asignados)
		return(
			<View style={AmigosStyle.contenedor}>
				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            console.log('Modal has been closed.');
		        }}>
					<View style={AmigosStyle.titulo}>
						<TouchableOpacity onPress={(e)=>{this.props.close()}}  style={AmigosStyle.btnClose} >
							<Image source={require('../assets/images/back.png')} style={AmigosStyle.imagenClose} />
						</TouchableOpacity>
						<Image source={require('../assets/images/friends.png')} style={AmigosStyle.imagenTitulo}/>
		          		<Text style={[AmigosStyle.text, AmigosStyle.familia]}>{this.props.titulo}</Text>
		          	</View>	

		  			<View style={AmigosStyle.contenedor}>
		  				<View style={AmigosStyle.separador}></View>
	          			<SearchInput
	          				style={[AmigosStyle.input, AmigosStyle.familia]}
					        onChangeText={(term) => { this.searchUpdated(term) }} 
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
								this.state.asignados.length>0
								&&<View style={AmigosStyle.containerHecho}>
									<TouchableOpacity style={AmigosStyle.btnHecho} onPress={(e)=>{this.props.updateStateAsignados(this.state.asignados, this.state.asignadosUsuarios, this.state.filteredData)}} > 
										<Text style={AmigosStyle.hecho}>Hecho!</Text>
									</TouchableOpacity> 
								</View>	
							}
						</View>	
					</ScrollView>
				</Modal>   
			</View>
		)
	}
}

 