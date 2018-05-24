import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import {profileStyle} from '../profile/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 
const getMatch = (a, b)=>{
   var matches = [];
   a.filter((aa, i)=>{
      b.filter((bb, e)=>{
            if ( aa._id === bb._id ) matches.push( aa );     
        })
   })
   return matches;
}
export default class profileComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			perfil:[],
			planesComun:[],
			esAmigo:null
		}
	}
	componentWillMount(){

		let userId = this.props.navigation.state.params
		//let userId = '5aec2ef4de7fa7694e1a1f3b'
		axios.get('/x/v1/pla/plan/'+userId) 
		.then((res)=>{
			/////////////////	OBTENGO MIS PLANES
			axios.get('/x/v1/pla/plan/getbyUserId/misPlanes') 
			.then((res2)=>{
				
				let planesComun = getMatch(res.data.message, res2.data.planes);
				this.setState({planesComun})
			})
			.catch((err)=>{
				console.log(err)
			})
		})
		.catch((err)=>{
			console.log(err)
		})
		
		/////////////////	OBTENGO EL PERFIL DEL USUARIO
		axios.get('/x/v1/users/getOneUser/'+userId) 
		.then((res)=>{
			this.setState({perfil: res.data.user})
		})
		.catch((err)=>{
			console.log(err)
		})

		/////////////////	OBTENGO MIS AMIGOS ASIGNADOS
		axios.get('/x/v1/ami/amigoUser/true')
		.then(res=>{
			console.log(res.data.asignados)
			let asignado = res.data.asignados.filter(e=>{
				return e.idUsuario._id==userId || e.asignado._id==userId 
			})
			if (asignado.length>0) {
				 asignado[0].estado ?this.setState({esAmigo:'si'}) :this.setState({esAmigo:'siEsperando'})
			}else{
				this.setState({esAmigo:'no'})
			}
		})

	}
	 
 	renderPerfil(){
		const {perfil} = this.state
			return(
				<View style={profileStyle.perfil}>
						<Image source={{uri: perfil.photo}} style={profileStyle.avatar} />
						<Text style={profileStyle.username}>{perfil.nombre}</Text>
						<Text style={profileStyle.ciudad}>{perfil.ciudad}</Text>
						<Text style={profileStyle.separador}></Text>
				</View>
			)
	}
	renderPlanes(){
		const {navigate} = this.props.navigation
		return this.state.planesComun.map((e, key)=>{
			return(
				<TouchableOpacity style={profileStyle.contenedorRegistros} key={key} onPress={()=>navigate('chat', e._id)}>
						<Image source={{uri: e.imagen}} style={profileStyle.imagen} />
						<Text style={profileStyle.nombre}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {navigate} = this.props.navigation
		console.log(this.state.perfil)
		return(	 
			<View style={profileStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='' />
				<ScrollView style={profileStyle.subContenedor}>
					{this.renderPerfil()}
					<Text  style={profileStyle.planesTitulo}>Planes en común</Text>
			 		{this.renderPlanes()}
			 		<View style={profileStyle.perfil}>
				 		{
							this.state.esAmigo==='no'
							?<TouchableOpacity onPress={()=>this.handleSubmit()} style={profileStyle.agregarBtn}>
								<Image source={require('./agregar.png')} style={profileStyle.agregar}/>
							</TouchableOpacity>
							:this.state.esAmigo==='siEsperando'
							?<Text style={profileStyle.agregar}>esta en espera de aceptar solicitud</Text>
							:null
						}
					</View>	
				</ScrollView>	
			</View> 

		)
	}
	handleSubmit(){
		const {_id, tokenPhone, nombre} = this.state.perfil
		console.log(_id)
		axios.post('/x/v1/ami/amigoUser', {asignado: _id} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.setState({show:false})
				sendRemoteNotification(1, tokenPhone, "notificacion")
				Alert.alert(
				  'se ha enviado la notificacion a: ' + nombre,
				  '',
				  [
				    {text: 'OK', onPress: () => console.log('OK Pressed')},
				  ],
				  { cancelable: false }
				)
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
		//sendRemoteNotification(1, this.state.perfil.tokenPhone, "notificacion")
	}
}