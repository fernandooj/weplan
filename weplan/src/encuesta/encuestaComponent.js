import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {EncuestaStyle} from '../encuesta/style'

import axios from 'axios'
import CrearEncuestaComponent from './crearEncuestaComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';

 

export default class encuestaComponent extends Component{
	state={
		show:false,
		misItems:[],
		items:[],
		itemsPlan:[],
		render:true
	}
	componentWillMount(){
		// let planId = this.props.navigation.state.params	
		let planId = '5b36bfcdbcd56f35a3c2025a'
		console.log(planId)
	 	this.setState({planId})
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
	renderAcordeon() {
		const {render}=this.state
		return (
			<View>
			  	<View style={EncuestaStyle.headerCollapsable }>
			    	<TouchableOpacity onPress={()=>this.setState({render:true})}>
			    		<Text style={EncuestaStyle.headerText}>Mis Encuestas</Text>
			    	</TouchableOpacity>
			    	{	render
			    		?this.renderMiItems()
			    		:null
			    	}
			  	</View>

			  	<View style={[EncuestaStyle.headerCollapsable, EncuestaStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={this.joinItems.bind(this)}>
			    		<Text style={[EncuestaStyle.headerText, EncuestaStyle.headerTextFirst]}>Encuestas Publicadas</Text>
			    	</TouchableOpacity>
			    	 {
			    	 	!render
			    	 	?this.renderItemsPlan()
			    	 	:null
			    	 }
			  	</View>
			</View>
		);
	}
	updateItems(id, deuda, titulo){
		let status = 'asignado'
		const tomatela = {id, deuda, titulo, status}
		this.setState({
		  items: update(this.state.items, {$unshift: [tomatela]}),
		  show:false
		}) 
	}
	joinItems(){
		const {todosItems, items} = this.state
		const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))								
		const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))
		const myDiff = makeSymmDiffFunc((x, y) => x.id === y.id)													
		const itemsPlan = myDiff(items, todosItems)																					   									 				
		this.setState({itemsPlan, render:false})
	}
	renderItemsPlan(){
		return this.state.itemsPlan.map((e, key)=>{
			return (
			   <View style={EncuestaStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?EncuestaStyle.boton: [EncuestaStyle.boton, EncuestaStyle.botonFirst]}  >
			  			
				   		<View style={EncuestaStyle.contentText}>
					   		<Text style={EncuestaStyle.tituloItem}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={EncuestaStyle.by}>By {e.nombre}</Text> 
				   		</View>	
							<Text style={EncuestaStyle.valueItems}>
								{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
				   	</TouchableOpacity>
			  	</View> 
			)
		})
	}
	renderMiItems() {
	   const {navigate} = this.props.navigation
	   if(this.state.items.length>0){
	   	return this.state.items.map((e, key)=>{
				return (
				   <View style={EncuestaStyle.content} key={key}>
				  		<TouchableOpacity style={!key==0 ?EncuestaStyle.boton: [EncuestaStyle.boton, EncuestaStyle.botonFirst]} 
				  			onPress={e.status=='noAsignado' ?()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId}) :()=>navigate('pagoDeuda', {id:e.id, planId:this.state.planId})}>
					   		<View style={EncuestaStyle.contentText}>
						   		<Text style={EncuestaStyle.tituloItem}>
						   			{e.titulo}  
						   		</Text>
					   		{e.status=='noAsignado' ?<Text style={EncuestaStyle.by}>By {e.nombre}</Text> :null}
					   		</View>	
								<Text style={e.deuda>=0 ?EncuestaStyle.value :EncuestaStyle.valueNoAsignado}>
									{'$ '+Number(e.deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
								</Text>
					   	</TouchableOpacity>
				  	</View> 
				)
			})
	   }else{
	   	null
	   }
	}


  	render() {
		const {show, items, itemsPlan} = this.state
		const {navigate} = this.props.navigation
		return (
			<ScrollView  style={EncuestaStyle.contentItem}>
			  	<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} texto={'Encuestas'} />
			  	{/*****   show the modal to create component	*****/}
				  	{
				  		show
				  		?<CrearEncuestaComponent  
				  			planId={this.props.navigation.state.params}
				  			updateItems={(id, deuda, titulo)=>this.updateItems(id, deuda, titulo)}
				  			close={()=>this.setState({show:false})}
				  		 />
				  		:null 
				  	}
				<View style={EncuestaStyle.subContentItem}>
				{/*****   boton para mostrar crear item	*****/}
				  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={EncuestaStyle.contenedorNuevo}>
						<Image source={require('../ajustes/nuevo.png')} style={EncuestaStyle.btnNuevoGrupo} />
						<Text style={EncuestaStyle.CrearEncuesta}>Crear Encuesta</Text>
				  	</TouchableOpacity>
				  	
				 	{this.renderAcordeon()}
			  	</View>
			</ScrollView>
		);
	}
}
 