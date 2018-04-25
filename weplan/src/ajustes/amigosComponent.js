import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
 


export default class ajustesAmigosComponent extends Component{
	state={
 		allList:[],
 		filteredData:[],
 		asignados:[],
 		amigosAsignados:[],
 		show:false
	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL /////////////////////
		axios.get('/x/v1/users/activos')
		.then((res)=>{
			console.log(res.data)
			let todosUsuarios = res.data.usuarios.map((item)=>{
				return {
					id:item._id,
					username:item.username,
					photo: item.photo,
					nombre: item.nombre,
					estado: true,
					 
				}
			})

			//////////////////	 OBTENGO LOS USUARIOS ASIGNADOS  //////////////////////////
			axios.get('/x/v1/ami/amigoUser/id')
			.then((res)=>{
				let amigosAsignados=[]
				console.log(res.data)
				if(res.data.asignados[0]!=undefined){
					amigosAsignados = res.data.asignados[0].asignados.map((item)=>{
					return {
						id:item._id,
						username:item.username,
						photo: item.photo,
						nombre: item.nombre,
						estado: true,
						
					}
				})
				}
				
				/////////////////////////////////////////////////////////////////////////////////
				////////////////////	CONCATENO LOS DOS ARRAYS //////////////////////////////////
				const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
				const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))
				const myDiff = makeSymmDiffFunc((x, y) => x.id === y.id)
				const allList = myDiff(todosUsuarios, amigosAsignados)
				/////////////////////////////////////////////////////////////////////////////////
					this.setState({allList, amigosAsignados})
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
	////////////////////////////////					RENDERIZO LA CABEZERA						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderCabezera(){
 		return(
 			<View>
 				<View>
 					<Text>regresar </Text>
 				</View>
 				<View>
 					<TouchableOpacity>
 						<Text>Amigos</Text>
 					</TouchableOpacity>
 					<TouchableOpacity>
 						<Text>Explorar</Text>
 					</TouchableOpacity>
 				</View>
 			</View>
 		)
 	}

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////					OBTENGO CADA UNO DE LOS REGISTROS						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getRow(filteredData){
		return filteredData.map((data, key)=>{
			return  <TouchableOpacity style={AjustesStyle.registro} key={key} onPress={(e)=>this.updateState(data.id, data.estado)} > 
					<Image source={{ uri: data.photo}}  style={data.estado ?AjustesStyle.avatarA :AjustesStyle.avatarA2} /> 
					<Text style={AjustesStyle.textoAvatar}>{data.nombre}</Text>
					{!data.estado ?<Image source={require('./agregado.png')} style={AjustesStyle.agregado}/> :null} 
			    </TouchableOpacity>
		})
	}

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////					FILTRO LOS AMIGOS DEL INPUT						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.username.search(regex)> -1)	
		})
		if (event.length>0) {
			this.setState({filteredData:filtered, show:true})
		}else{
			this.setState({filteredData:[]})
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////					RENDER LISTADO AMIGOS						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigos(){
 		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
 		return(
 			<View style={AjustesStyle.lista}>
				{rows}
			</View>
 		)	
 	}


 	renderAmigosAsignados(){
 		const {amigosAsignados} = this.state
 		return amigosAsignados.map((e, key)=>{
 			return(
	 			<View key={key} style={AjustesStyle.registro}>
	 				 <Image source={{ uri: e.photo}}  style={AjustesStyle.avatarA} /> 
	 				 <Text style={AjustesStyle.textoAvatar}>{e.nombre}</Text>
	 			</View>
	 		)
 		})
 		
 	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////					RENDER AMIGOS AGREGADOS						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigosGrupos(){
 		return(
 			<View style={AjustesStyle.lista}>
				<TouchableOpacity>
					<Image source={require('./nuevo.png')} style={AjustesStyle.btnNuevoGrupo} />
					<Text>Crear Grupo</Text>
				</TouchableOpacity>
				<View style={AjustesStyle.separador}></View>
				<Text style={AjustesStyle.tituloGrupo}>Grupos</Text>
				<View style={AjustesStyle.separador}></View>
				<Text style={AjustesStyle.tituloGrupo}>Amigos</Text>

				{/*   listar amigos asignados  */}
				{this.renderAmigosAsignados()}
			</View>
 		)	
 	}


	render(){
		const {show} = this.state
		return(
			<View>
				{this.renderCabezera()}
				
				<View style={AjustesStyle.contenedor}>
					<View style={AjustesStyle.subContenedorA}>
						{/* buscador  */}
						<View style={AjustesStyle.contenedorBuscar}>
			 				<TextInput
								style={AjustesStyle.input}
								onChangeText={this.filteredData.bind(this)}
								value={this.state.username}
								underlineColorAndroid='transparent'
								placeholder="buscar amigos"
								placeholderTextColor="#8F9093" 
						   />
						   <Image source={require('../agregarAmigos/search.png')} style={AjustesStyle.btnSearch} />
						   <TouchableOpacity style={AjustesStyle.btnBuscar} onPress={this.handleSubmit.bind(this)}>
						   	<Image source={require('./agregar.png')} style={AjustesStyle.btnAgregar} />
						   </TouchableOpacity>
						</View>
						{
							show
							?this.renderAmigos()
							:this.renderAmigosGrupos()
						}
					</View>	
				</View>
			</View>
		)
	}

	
	updateState(id, estado){
		let filteredData = this.state.filteredData.map(item=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
		console.log({id, estado})

		if (estado) {
			this.setState({asignados: this.state.asignados.concat([id])})
		}else{
			this.setState({asignados:this.state.asignados.filter(function(val){return val != id}) })
		}
	}
	handleSubmit(){
		const {asignados} = this.state
		console.log({asignados})
		axios.post('/x/v1/ami/amigoUser', {asignados} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.setState({show:false})
			}else{
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}