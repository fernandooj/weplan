import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Alert, Platform, ActivityIndicator} from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios'

import {style} from '../ajustes/style'
 
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import {PagedContacts} from 'react-native-paged-contacts';
let pg = new PagedContacts();
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
const TRACKER = new GoogleAnalyticsTracker("UA-129344133-1");
import {URL}  from '../../App.js';
TRACKER.trackScreenView("importar");


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
			console.log(granted)
		  if(granted !== true)
		  {
		    return; 
		  }

		  pg.getContactsCount().then( (count) => {
		    pg.getContactsWithRange(0, count, [PagedContacts.displayName, PagedContacts.phoneNumbers]).then((contacts) => {
		     
		      let contacto = contacts.map((e, key)=>{
		      		return {
		      			id:key,
		      			nombre:e.displayName,
		      			telefono: e.phoneNumbers ?e.phoneNumbers[0].value :0,
		      			state:true,
		      			cargando:false,
		      		}
		      })
		      this.setState({contacts: contacto})
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
				<View style={style.registroImp} key={key}> 
					<Text style={[style.textoAvatarImp, style.familia]}>{data.nombre}</Text>
					{
						data.state
						?<TouchableOpacity style={style.btnHechoImp} onPress={(e)=>{this.handleSubmit(data.id, data.telefono)}} > 
							<Text style={style.hechoImp}>{!data.cargando ?"Enviar invitación" :"Enviando..."}</Text>
						</TouchableOpacity> 
						:<TouchableOpacity style={style.btnHechoEnviado} > 
							<Text style={style.hecho}>Enviado!</Text>
						</TouchableOpacity> 
					}
			    </View>
			)
		})
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
							    {
							   		!this.props.navigation.state.params
								   	?<TouchableOpacity style={style.btnOmitir} onPress={()=>navigate('ajustesAmigos', {importar:true})}>
								   		<Text style={style.txtOmitir}>{continuar ?'Continuar' :'Omitir'}</Text>
								    </TouchableOpacity>
								    :<TouchableOpacity style={style.btnOmitir} onPress={()=>navigate('ajustesAmigos')}>
								   		<Text style={style.txtOmitir}>Terminar</Text>
								    </TouchableOpacity>
								}
							</View>
							{
								sinPermiso &&<Text>No Tenemos acceso a tus amigos</Text>
							}
		 
							<Text>Invita a tus contactos a usar We Plan</Text>	
				 			<Text>{this.state.contacts.length}</Text>
						 	{
						 		this.state.contacts.length==0
						 		?<ActivityIndicator size="small" color="#148dc9" style={style.indicador} />
						 		:this.getRow()
						 	}
						</View>	
					</View>
				</ScrollView>	
			</View>
		)
	}
	
	handleSubmit(id, telefono){
		let contacts = this.state.contacts.map(e=>{
			if (e.id===id) {e.cargando=true}
				return e
		})
		this.setState({contacts})
 
 
		axios.get(`/x/v1/user/enviarsmsamistad/${telefono}` )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				let contacts = this.state.contacts.map(e=>{
					if (e.id===id) {e.state=false}
						return e
				})
				console.log(contacts)
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
				let contacts2 = this.state.contacts.map(e=>{
					if (e.id===id) {e.cargando=false}
						return e
				})
				this.setState({contacts: contacts2})
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		 
	}
}