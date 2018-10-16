import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios'

import {style} from '../ajustes/style'
 
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {PagedContacts} from 'react-native-paged-contacts';
let pg = new PagedContacts();




const KEYS_TO_FILTERS = ['nombre', 'telefono']
export default class importarComponent extends Component{
	constructor(props) {
	  	super(props);
	
	  	this.state={
	 		contacts:[],
	 		asignados:[],
	 		amigosAsignados:[],
	 		show:false,
	 		searchTerm:'',
	 		sinPermiso:false
		}
		this.searchUpdated = this.searchUpdated.bind(this)
	}
	
	async componentWillMount(){
		pg.requestAccess().then((granted) => {
		  if(granted !== true)
		  {
		    return; 
		  }

		  pg.getContactsCount().then( (count) => {
		    pg.getContactsWithRange(0, count, [PagedContacts.displayName, PagedContacts.thumbnailImageData, PagedContacts.phoneNumbers, PagedContacts.emailAddresses]).then((contacts) => {
		      contacts = contacts.map((e, key)=>{
		      		return {
		      			id:key,
		      			nombre:e.displayName,
		      			telefono: e.phoneNumbers[0].value
		      		}
		      })
		       console.log(contacts)
		      this.setState({contacts})
		    });
		  });
		});
	}

	 	

 	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////			OBTENGO CADA UNO DE LOS REGISTROS						 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	getRow(){
 		const filterData = this.state.contacts.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return filterData.map((data, key)=>{
			return  (
				<View style={style.registro} key={key}> 
					<Text style={[style.textoAvatar, style.familia]}>{data.nombre}</Text>
					<TouchableOpacity style={style.btnHecho} onPress={(e)=>{this.handleSubmit(data.id, data.telefono)}} > 
						<Text style={style.hecho}>Enviar invitación</Text>
					</TouchableOpacity> 
			    </View>
			)
		})
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
 

	render(){
		const {show, token, sinPermiso, continuar} = this.state
		const {navigate} = this.props.navigation
		return(
			<View style={style.contenedorA}>
				 
				<ScrollView>
			 
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
							   	<TouchableOpacity style={style.btnOmitir} onPress={()=>navigate('ajustesAmigos', {importar:true})}>
							   		<Text style={style.txtOmitir}>{continuar ?'Continuar' :'Omitir'}</Text>
							    </TouchableOpacity>
							</View>
							{
								sinPermiso &&<Text>No Tenemos acceso a tus amigos</Text>
							}
		 
							<Text>Invita a tus contactos a usar We Plan</Text>	
				 
						 	{
						 		this.state.contacts.length==0
						 		?<ActivityIndicator size="small" color="#148dc9" style={style.indicador} />
						 		:this.renderAmigos()
						 	}
							 
					 
						</View>	
					</View>
				</ScrollView>	
			</View>
		)
	}

	
	updateState(id, estado, token){
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

	
	handleSubmit(id, telefono){
		axios.get(`/x/v1/user/enviarsmsamistad/${telefono}` )
		.then((e)=>{
			console.log(id)
			if (e.data.code==1) {
				let contacts = this.state.contacts.filter(e=>{
					return e.id!==id
				})
				this.setState({contacts, continuar:true})
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
		 
	}
}