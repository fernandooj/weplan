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
		let userId = this.props.navigation.state.params.userId
		// let userId = '5b37d5c226d7c9175c24ddbd'
		axios.get(`/x/v1/pla/plan/getbyid/${userId}`) 
		.then((res)=>{
	 
			/////////////////	OBTENGO MIS PLANES
			axios.get('/x/v1/pla/plan/getbyUserId/misPlanes') 
			.then((res2)=>{
				let planesComun = getMatch(res.data.plan, res2.data.planes);
				this.setState({planesComun})
			})
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
		axios.get(`/x/v1/ami/amigoUser/${userId}`)
		.then(res=>{
			if (res.data.asignados.length>0) {
				 res.data.asignados[0].estado ?this.setState({esAmigo:'si'}) :this.setState({esAmigo:'siEsperando'})
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
						<Image source={{uri: e.imagenMiniatura[0]}} style={profileStyle.imagen} />
						<Text style={profileStyle.nombre}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {navigate} = this.props.navigation
 
		return(	 
			<View style={profileStyle.contenedor}>	
				<CabezeraComponent navigate={navigate} url={this.props.navigation.state.params.planId ?'chat' :this.props.navigation.state.params.amigos? 'ajustesAmigos':'notificacion'} texto='' parameter={this.props.navigation.state.params.planId ?this.props.navigation.state.params.planId._id :null} /> 
			 	<ScrollView style={profileStyle.subContenedor}>
					{this.renderPerfil()}
					<Text  style={profileStyle.planesTitulo}>Planes en común</Text>

			 		{
			 			this.state.planesComun.length==0
			 			?<Text style={profileStyle.sinPlanes}>No tienen planes en común</Text>
			 			:this.renderPlanes()
			 		}
			 		<View style={profileStyle.perfil}>
				 		{
							this.state.esAmigo==='no'
							?<TouchableOpacity onPress={()=>this.handleSubmit()} style={profileStyle.agregarBtn}>
								<Text style={profileStyle.sinPlanes}>Agregar como amigo</Text>
								<Image source={require('../assets/images/agregar.png')} style={profileStyle.agregar}/>
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