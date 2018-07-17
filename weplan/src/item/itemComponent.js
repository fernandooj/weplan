
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native'
import {ItemStyle} from '../item/style'
 
import axios from 'axios'
import CrearItemComponent from './crearItemComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';
import Icon from 'react-native-fa-icons';
import {sendRemoteNotification} from '../push/envioNotificacion.js' 

export default class ItemComponent extends Component{
	state={
		show:false,
		misItems:[],
		deuda:[],
		pago:[],
		itemsPlan:[],
		articulosPendientes:[],
		articulosPublicados:[],
		noasignados:[],
		pendientes:[],
		render:2,
		total:0
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		// let planId = '5b479935a767c75dcd41452c'	
		this.setState({planId})
 
		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
			console.log(e.data)
			this.setState({pago:e.data.pago, deuda:e.data.deuda, total:e.data.total})
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
	peticiones(render){
		this.setState({render})
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
		const {render, total}=this.state
		return (
			<View>
				<View style={ItemStyle.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==1 ?0 :1)}>
			    		<Text style={ItemStyle.headerText}><Icon name={render==1 ?'angle-down' :'angle-right'} allowFontScaling style={ItemStyle.iconMenu} /> Artículos Pendientes</Text>
			    	</TouchableOpacity>
			    	{
			    	 	render==1
			    	 	&&this.articulosPendientes()
			    	}
			  	</View>
			  	<View style={ItemStyle.headerCollapsable}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==2 ?0 :2)}>
			    		<Text style={ItemStyle.headerText}><Icon name={render==2 ?'angle-down' :'angle-right'} allowFontScaling style={ItemStyle.iconMenu} /> Mis Artículos</Text>
			    	</TouchableOpacity>
			    	{	render==2
			    		&&<View>
			    			<View>
			    				{this.articulosMios()}{this.articulosAsignados()}
			    			</View>
				    		<View style={ItemStyle.contenedorTotal}>
				    			<Text style={ItemStyle.textoTotal}>Total</Text>
				    			<Text style={total>=0 ?ItemStyle.valueTotal :ItemStyle.valueNoAsignadoTotal}>
									{'$ '+Number(total).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
								</Text>
				    		</View>
				    	</View>
			    	}
			  	</View>

			  	<View style={[ItemStyle.headerCollapsable, ItemStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={()=>this.peticiones(render==3 ?0 :3)}>
			    		<Text style={[ItemStyle.headerText, ItemStyle.headerTextFirst]}><Icon name={render==3 ?'angle-down' :'angle-right'} allowFontScaling style={ItemStyle.iconMenu} /> Artículos Publicados</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	render==3
			    	 	&&this.articulosPublicados()
			    	 }
			  	</View>
			</View>
		);
	}
	articulosPendientes(){
		return this.state.articulosPendientes.map((e, key)=>{
			return (
			    <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.filaDeuda: [ItemStyle.filaDeuda, ItemStyle.filaDeuda]}>
				   		<View style={ItemStyle.contentText}>
					   		<Text style={ItemStyle.tituloItem}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={ItemStyle.by}>By {e.nombre}</Text>  
				   		</View>	
				   		<View>
							<Text style={ItemStyle.valorPositivo}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
							<TouchableOpacity onPress={()=>this.aceptarItem(e.id, e.token, e.titulo, e.imagen, e.deuda, e.valor)} style={ItemStyle.aceptarPendiente}>
								<Text>Aceptar</Text>
							</TouchableOpacity>
						</View>
				   	</TouchableOpacity>
			  	</View> 
			)
		})
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////// SI ESTA EN LISTADO DE ESPERA Y EL USUARIO ACEPTA ENTRAR 
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	aceptarItem(idItem, token, titulo, imagen, monto){
		console.log({idItem, token, titulo, imagen, monto})
		axios.put(`/x/v1/ite/item/activar/${idItem}`, {monto})
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
			  <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.filaDeuda: [ItemStyle.filaDeuda, ItemStyle.filaDeuda]}>
				   		<View style={ItemStyle.contentText}>
					   		<Text style={ItemStyle.tituloItem}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={ItemStyle.by}>By {e.nombre}</Text>  
				   		</View>	
				   		<View>
							<Text style={ItemStyle.valorPositivo}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
							<TouchableOpacity onPress={()=>this.ingresarItem(e.id, e.token, e.titulo, e.imagen, e.deuda, e.valor)} style={ItemStyle.aceptarPendiente}>
								<Text>Me Interesa</Text>
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
		console.log(idItem)
		axios.put('x/v1/ite/item', {idItem})
		.then(e=>{
			if (e.data.code==1) {
				sendRemoteNotification(4, token, "notificacion", 'Quieren acceder a un item', `, quiere acceder a ${titulo}`, imagen)
				let articulosPublicados = this.state.articulosPublicados.filter(e=>{
					return e.id!=idItem
				})
 				this.setState({articulosPublicados})
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
			   <View style={ItemStyle.content} key={key}>
			   		<View style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]}>
				  		<TouchableOpacity style={ItemStyle.infoItem} onPress={()=>navigate('pagoDeuda', {id:e.id, valor:e.deuda, planId:this.state.planId})}>
					   		<View style={ItemStyle.contentText}>
						   		<Text style={ItemStyle.tituloItem}>
						   			{e.titulo}  
						   		</Text>
					   		</View>	
							<Text style={ItemStyle.valorPositivo}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
					   	</TouchableOpacity>
					   	{
					   		e.abierto
					   		&&<TouchableOpacity style={ItemStyle.closeItem} onPress={()=>this.cerrarItem(e.id, e.titulo)}>
						   		<Text style={ItemStyle.textCloseItem}>Cerrar Artículo</Text>
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
			   <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.filaDeuda: [ItemStyle.filaDeuda, ItemStyle.filaDeuda]} 
			  			 onPress={()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId})}>
				   		<View style={ItemStyle.contentText}>
					   		<Text style={ItemStyle.tituloItem}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={ItemStyle.by}>By {e.nombre}</Text>  
				   		</View>	
						<Text style={ItemStyle.valorNegativo}>
							{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
						</Text>
				   	</TouchableOpacity>
			  	</View> 
			)
		})
	}


  	render() {
		const {show, items, itemsPlan, render, planId} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView>
				<View  style={ItemStyle.contentItem}>
					<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} />
					
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
						<View style={ItemStyle.subContentItem}>
						{/*****   boton para mostrar crear item	*****/}
						  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={ItemStyle.contenedorNuevo}>
								<Image source={require('../ajustes/nuevo.png')} style={ItemStyle.btnNuevoGrupo} />
								<Text style={ItemStyle.CrearItem}>Crear Artículo</Text>
						  	</TouchableOpacity>
						  	
						 	{this.renderAcordeon()}
					  	</View>
				</View>
			</ScrollView>
		);
	}
	cerrarItem(id, titulo){
		Alert.alert(
				`Estas seguro de cerrar ${titulo}, luego no podras abrirlo`,
				'los usuarios que quedaran asignados son:',
			[
				{text: 'Mejor Luego', onPress: () => console.log('OK Pressed')},
				{text: 'Si Cerrar', onPress: () => this.confirmaCerrarItem(id)},
			],
				{ cancelable: false }
			)
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
 