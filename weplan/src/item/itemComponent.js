
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Alert, AsyncStorage} from 'react-native'
import {style} from './style'
 
import axios from 'axios'
import CrearItemComponent from './crearItemComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';
import Icon from 'react-native-fa-icons';
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'
import {sendRemoteNotification} from '../push/envioNotificacion.js' 
import SocketIOClient from 'socket.io-client';
import {URL} from '../../App.js'

export default class ItemComponent extends Component{
	constructor(props) {
	  	super(props);
	
		this.state={
			show:false,
			misItems:[],
			deuda:[],
			pago:[],
			itemsPlan:[],
			articulosPendientes:[],
			articulosPublicados:[],
			noasignados:[],
			pendientes:[],
			render:0,
			total:0
		}
	  	this.onReceivedMessage = this.onReceivedMessage.bind(this);
	}
	
	componentWillMount =async() =>{
		let planId = this.props.navigation.state.params.planId ?this.props.navigation.state.params.planId :this.props.navigation.state.params
		// let planId = '5b8f5155de373662367ae2eb'	
		let tipo = this.props.navigation.state.params.tipo ?this.props.navigation.state.params.tipo :await AsyncStorage.getItem('codeTab')
		tipo = parseInt(tipo)
		let guia_inicio   = await AsyncStorage.getItem('articulo');	
		this.setState({planId, guia_inicio, render:parseInt(tipo)})

		this.socket = SocketIOClient(URL);
		this.socket.on(`itemCosto${planId}`, this.onReceivedMessage);

		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
			console.log(e.data)
			this.setState({pago:e.data.pago, deuda:e.data.deuda, total:e.data.total, planId})
		})		 
		.catch(err=>{
			console.log(err)
		})
 
		axios.get('/x/v1/ite/item/pendientes/'+planId)
		.then(e=>{
			this.setState({articulosPendientes:e.data.pendientes})
		})		 
		.catch(err=>{
			console.log(err)
		})
 
		axios.get('/x/v1/ite/item/publicados/'+planId)
		.then(e=>{
			this.setState({articulosPublicados:e.data.publicados})
		})		 
		.catch(err=>{
			console.log(err)
		}) 
	}
	onReceivedMessage(messages){
		console.log(messages)
 		let articulosPendientes = this.state.articulosPendientes.filter((e)=>{
			if (e.id==messages.id) {e.deuda=messages.valor}
			return e
		})
		this.setState({articulosPendientes})
 	}
	peticiones(render){
		this.setState({render})
		saveTabNumber(render)
	}
	updateItems(id, deuda, titulo){
		deuda = parseInt(deuda)
		const pago = {id, deuda, titulo}
		this.setState({
		  pago: update(this.state.pago, {$unshift: [pago]}),
		  show:false,
		  total:this.state.total+deuda
		}) 
	}
	renderAcordeon() {
		const {render, total, articulosPendientes, pago, deuda, articulosPublicados}=this.state
 
		return (
			<View>
				<View style={style.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==1 ?0 :1)}>
			    		<Text style={[style.headerText, style.familia]}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Artículos Pendientes</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	?articulosPendientes.length==0
			    	 	?<Text style={[style.textoSinAsignados, style.familia]}>No te han asignado a ningún artículo!, aquí podras encontrar cuando te asignen a alguno!</Text>
			    	 	:<View>{this.articulosPendientes()}</View>
			    	 	:null
			    	}
			  	</View>
			  	<View style={style.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==2 ?0 :2)}>
			    		<Text style={[style.headerText, style.familia]}><Icon name={render==2 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Mis Artículos</Text>
			    	</TouchableOpacity>
			    	{	render==2
			    	  	?pago.length==0 && deuda.length==0
			    	  	?<Text style={[style.textoSinAsignados, style.familia]}>Aún no has creado ningún artículo! Empieza clickeando en "Crear artículo"</Text>
			    	  	:<View>
			    			<View>
			    				{this.articulosMios()}{this.articulosAsignados()}
			    			</View>
				    		<View style={style.contenedorTotal}>
				    			<Text style={[style.textoTotal, style.familia]}>Total</Text>
				    			<Text style={total>=0 ?[style.valueTotal, style.familia] :[style.valueNoAsignadoTotal, style.familia]}>
									{'$ '+Number(total).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
								</Text>
				    		</View>
				    	</View>
				    	:null
			    	}
			  	</View>

			  	<View style={[style.headerCollapsable, style.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==3 ?0 :3)}>
			    		<Text style={[style.headerText, style.headerTextFirst, style.familia]}><Icon name={render==3 ?'angle-down' :'angle-right'} allowFontScaling style={style.iconMenu} /> Artículos Publicados</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	render==3
			    	 	?articulosPublicados.length===0
			    	 	?<Text style={[style.textoSinAsignados, style.familia]}>Ninguno de tus amigos ha publicado artículos, aqui podrás verlos e interesarte si así lo quieres! </Text>
			    	 	:this.articulosPublicados()
			    	 	:null
			    	 }
			  	</View>
			</View>
		);
	}
	articulosPendientes(){
		console.log(this.state.articulosPendientes)
		return this.state.articulosPendientes.map((e, key)=>{
			return (
			    <View style={style.content} key={key}>
			  		<View style={!key==0 ?style.filaDeuda: [style.filaDeuda, style.filaDeuda]}>
				   		<View style={style.contentText}>
					   		<Text style={[style.tituloItem, style.familia]}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={[style.by, style.familia]}>By {e.nombre}</Text>  
				   		</View>	
				   		<View>
							<Text style={[style.valorPositivo, style.familia]}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
							<TouchableOpacity onPress={()=>this.aceptarItem(e.id, e.token, e.titulo, e.imagen, e.deuda, e.valor)} style={style.aceptarPendiente}>
								<Text style={style.familia}>Aceptar</Text>
							</TouchableOpacity>
						</View>
				   	</View>
			  	</View> 
			)
		})
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// SI ESTA EN LISTADO DE ESPERA Y EL USUARIO ACEPTA ENTRAR 
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	aceptarItem(idItem, token, titulo, imagen, monto){
		axios.put(`/x/v1/ite/item/activar/${idItem}`, {monto, planId:this.state.planId})
		.then(e=>{
			console.log(e.data)
			if (e.data.code==1) {
				sendRemoteNotification(4, token, 'Home', `Aceptaron tu item ${titulo}`,  ', esta dentro de tu item', imagen)
				this.setState({render:2})
				this.peticion(this.state.planId)
			}else if(e.data.code==2){
				this.alerta('Opss!! Articulo Cerrado', 'El dueño del articulo ya lo ha terminado, y ya no puedes ingresar')
			}else{
				this.alerta('Opss!! revisa tus datos que falta algo', '')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}


	peticion(planId){
		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
			this.setState({pago:e.data.pago, deuda:e.data.deuda, total:e.data.total})
		})		 
		.catch(err=>{
			console.log(err)
		})
	}
	articulosPublicados(){
		return this.state.articulosPublicados.map((e, key)=>{
			return (
			  <View style={style.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?style.filaDeuda: [style.filaDeuda, style.filaDeuda]}>
				   		<View style={style.contentText}>
					   		<Text style={[style.tituloItem, style.familia]}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={[style.by, style.familia]}>By {e.nombre}</Text>  
				   		</View>	
				   		<View>
							<Text style={[style.valorPositivo, style.familia]}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
							<TouchableOpacity onPress={()=>this.ingresarItem(e.id, e.token, e.titulo, e.imagen, e.deuda, e.valor)} style={style.aceptarPendiente}>
								{/*<Text style={style.familia}>Me Interesa</Text>*/}
								<Image style={style.meInteresa} source={require('../assets/images/me_interesa2.png')}  />
							</TouchableOpacity>
						</View>
				   	</TouchableOpacity>
			  	</View> 
			)
		})
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// SI EL USUARIO HACE CLICK EN ME INTERESA, ENVIA LA NOTIFICACION AL CREADOR DEL ITEM PARA DARLE PERMISO DE INGRESAR
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	ingresarItem(idItem, token, titulo, imagen){
		let articulosPublicados = this.state.articulosPublicados.filter(e=>{
			return e.id!=idItem
		})
		this.setState({articulosPublicados})
		axios.put('x/v1/ite/item', {idItem})
		.then(e=>{
			if (e.data.code==1) {
				sendRemoteNotification(4, token, "notificacion", 'Quieren acceder a un item', `, quiere acceder a ${titulo}`, imagen)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	articulosMios() {
	   const {navigate} = this.props.navigation
	   	return this.state.pago.map((e, key)=>{
			return (
			   <View style={style.content} key={key}>
			   		<View style={!key==0 ?style.boton: [style.boton, style.botonFirst]}>
				  		<TouchableOpacity style={style.infoItem} onPress={()=>navigate('pagoDeuda', {id:e.id, valor:e.deuda, planId:this.state.planId})}>
					   		<View style={style.contentText}>
						   		<Text style={[style.tituloItem, style.familia]}>
						   			{e.titulo}  
						   		</Text>
					   		</View>	
							<Text style={[style.valorPositivo, style.familia]}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
					   	</TouchableOpacity>
					   	{
					   		e.abierto
					   		&&<TouchableOpacity style={style.closeItem} onPress={()=>this.cerrarItem(e.id, e.titulo)}>
						   		<Text style={[style.textCloseItem, style.familia]}>Cerrar Artículo</Text>
						   	</TouchableOpacity>
					   	}
					</View>
			  	</View> 
			)
		})
	}
	articulosAsignados() {
	   const {navigate} = this.props.navigation
 
	   	return this.state.deuda.map((e, key)=>{
			return (
			   <View style={style.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?style.filaDeuda: [style.filaDeuda, style.filaDeuda]} 
			  			 onPress={()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId})}>
				   		<View style={style.contentText}>
					   		<Text style={[style.tituloItem, style.familia]}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={[style.by, style.familia]}>By {e.nombre}</Text>  
				   		</View>	
						<Text style={style.valorNegativo}>
							{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
						</Text>
				   	</TouchableOpacity>
			  	</View> 
			)
		})
	}


  	render() {
		const {show, items, itemsPlan, render, planId, guia_inicio} = this.state
		const {navigate} = this.props.navigation
		// alert(typeof (guia_inicio))
		return (
			<ScrollView>
				<View  style={style.contentItem}>
				{
					typeof guia_inicio!=='string'  &&<GuiaInicio number={11} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
					<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} texto='Artículos' />
					
					  	{/*****   show the modal to create component	*****/}
						  	{
						  		show
						  		?<CrearItemComponent  
						  			planId={planId}
						  			updateItems={(id, deuda, titulo)=>this.updateItems(id, deuda, titulo)}
						  			close={()=>this.setState({show:false})}
						  		 />
						  		:null 
						  	}
						<View style={style.subContentItem}>
						{/*****   boton para mostrar crear item	*****/}
						  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={style.contenedorNuevo}>
								<Image source={require('../assets/images/nuevo.png')} style={style.btnNuevoGrupo} />
								<Text style={[style.CrearItem, style.familia]}>Crear Artículo</Text>
						  	</TouchableOpacity>
						  	
						 	{this.renderAcordeon()}
					  	</View>
				</View>
			</ScrollView>
		);
	}
	cerrarItem(id, titulo){
		axios.get(`x/v1/ite/item/id/${id}`)
		.then(res=>{
			console.log(res.data.mensaje[0].asignados)
			let data = []
			res.data.mensaje[0].asignados.filter(e=>{
				data.push(e.nombre)
			})
			data = data.join('\n')
			Alert.alert(
				`Estas seguro de cerrar ${titulo}, luego no podras abrirlo`,
				`los usuarios que quedaran asignados son:\n ${data}`,
			[
				{text: 'Mejor Luego', onPress: () => console.log('OK Pressed')},
				{text: 'Si Cerrar', onPress: () => this.confirmaCerrarItem(id)},
			],
				{ cancelable: false }
			)
		})
		
	}
	confirmaCerrarItem(id){
		axios.post('x/v1/ite/item/cerrarItem', {id})
		.then(e=>{
			let pago = this.state.pago.filter(e=>{
				if (e.id==id) e.abierto=false
				return e
			})
			this.setState({pago})
		})
		.catch(err=>{
			console.log(err)
		})
		
	}
}
 
const saveTabNumber = async(code) =>{
	code = code.toString()
	try {
		await AsyncStorage.setItem('codeTab', code)
	} catch(e) {
		// statements
		console.log(e);
	}
}