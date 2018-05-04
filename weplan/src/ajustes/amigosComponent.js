import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Platform} from 'react-native'
import {AjustesStyle} from '../ajustes/style'
import axios from 'axios'
import CabezeraComponent from './cabezera.js'
import firebaseClient from  "../push/FirebaseClient";


export default class ajustesAmigosComponent extends Component{
	state={
 		allList:[],
 		filteredData:[],
 		asignados:[],
 		amigosAsignados:[],
 		show:false
	}
	componentWillMount(){
		/////////////////	OBTENGO LOS USUARIOS ACTIVOS 	/////////////////////
		axios.get('/x/v1/users/activos')
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
							token: item.tokenPhone,
							estado: true,
							
						}
					})
				}

				axios.get('/x/v1/user/profile') 
				.then((res)=>{
					let usuario = res.data.user.user
					let miPerfil = []
					miPerfil.push({id:usuario._id, username:usuario.username, photo: usuario.photo, nombre: usuario.nombre, estado: true})
		 			this.setState({nombre:usuario.nombre, photo:usuario.photo})
					/////////////////////////////////////////////////////////////////////////////////
					////////////////////	CONCATENO LOS DOS ARRAYS //////////////////////////////////
					const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
					const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))
					const myDiff = makeSymmDiffFunc((x, y) => x.id === y.id)
					const allList1 = myDiff(todosUsuarios, amigosAsignados)
					/////////////////////////////////////////////////////////////////////////////////
					/////////////////////////////////////////////////////////////////////////////////
					////////////////////	CONCATENO LOS DOS ARRAYS  ////////////////////////////////
					const diffBy1 = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
					const makeSymmDiffFunc1 = (pred) => (a, b) => diffBy1(pred)(a, b).concat(diffBy1(pred)(b, a))
					const myDiff1 = makeSymmDiffFunc1((x, y) => x.id === y.id)
					const allList = myDiff1(allList1, miPerfil)
					/////////////////////////////////////////////////////////////////////////////////
				 	console.log(amigosAsignados)
					this.setState({allList, amigosAsignados})

				})
				.catch((err)=>{
					console.log(err)
				})
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
			<View style={AjustesStyle.registro}>
				<TouchableOpacity style={AjustesStyle.btnCabezera} >
					<Text style={AjustesStyle.textCabezera}>Amigos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[AjustesStyle.btnCabezera, AjustesStyle.btnCabezeraActive]} onPress={()=>this.sendRemoteNotification('fepWwtFhjF4:APA91bH1Q7YQg6Fz0-HQEriIeIfWV9lvtRdpW_b2wbToaG3aL-1DjoUDDE0nnSFB0ZyoUp5PEQbZ68C-M8k_KT3IXGOFb0ICwBEDtRD6yUn9Ml-1pry6AfILgidkjQXD_cR-QJs_u4HG')}>
					<Text style={AjustesStyle.textCabezera}>Explorar</Text>
				</TouchableOpacity>
			</View>
 		)
 	}

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////					OBTENGO CADA UNO DE LOS REGISTROS						/////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getRow(filteredData){
		return filteredData.map((data, key)=>{
			return  <TouchableOpacity style={AjustesStyle.registro} key={key} onPress={()=>this.updateState(data.id, data.estado, data.token)} > 
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
		if (event.length>0){
			this.setState({filteredData:filtered, show:true})
		}else{
			this.setState({filteredData:[], show:false})
		}
		console.log(filtered)
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
	////////////////////////////////				RENDER AMIGOS AGREGADOS					/////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	renderAmigosGrupos(){
 		return(
 			<View style={AjustesStyle.lista}>
				<TouchableOpacity  style={AjustesStyle.registro}>
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
		const {show, token} = this.state
		const {navigate} = this.props.navigation
		console.log(token)
		return(
			<View style={AjustesStyle.contenedorA}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} />
				<ScrollView>
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

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////					ENVIO LA NOTIFICACION						///////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	sendRemoteNotification() {
		const {nombre, token, photo} = this.state
	    let body;

	    if(Platform.OS === 'android'){
	      body = {
	        "to": token,
	      	"data": {
	            custom_notification: JSON.stringify({
	              body: 'Alguien quiere agregarte comoo amigo',
	              title: 'Message title',
	              priority:"high",
	              icon:"ic_notif",
	              title: "test title",
	              color:"#00ACD4",
	              big_picture:photo,
	              picture:photo,
	              image:photo,
	              show_in_foreground: true
	            })
	        },
	    		"priority": 10
	      }
	    } else {
				body = {
					registration_ids: tokens,
					data: {
			            custom_notification: JSON.stringify({
			              body: 'Message bodysss',
			              title: 'Message title',
			              priority:"high",
			              icon:"ic_notif",
			              title: "test title",
			              color:"#00ACD4",
			              big_picture:'https://image.path.com/data/apps/app-home2.png',
			              picture:'https://image.path.com/data/apps/app-home2.png',
			              image:'https://image.path.com/data/apps/app-home2.png',
			              show_in_foreground: true
			            })
			        }
        		}
	         
				 
			
			}
	    firebaseClient.send(JSON.stringify(body), "notification");
	}
	handleSubmit(){
		const {idAsignado} = this.state
	 
		axios.post('/x/v1/ami/amigoUser', {asignado: idAsignado} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.setState({show:false})
				this.sendRemoteNotification()
			}else{
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}