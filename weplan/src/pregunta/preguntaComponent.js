import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {ItemStyle} from '../item/style'
import Accordion from 'react-native-accordion-xg';
import axios from 'axios'
import CrearPreguntaComponent from './crearPreguntaComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';

 

export default class PreguntaComponent extends Component{
	state={
		show:false,
		misItems:[],
		items:[],
		itemsPlan:[],
		render:true
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		//let planId = '5ae236db9455a84f5576a175'
		console.log(planId)
	 	this.setState({planId})
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
	renderAcordeon() {
		const {render}=this.state
		return (
			<View>
			  	<View style={ItemStyle.headerCollapsable }>
			    	<TouchableOpacity onPress={()=>this.setState({render:true})}>
			    		<Text style={ItemStyle.headerText}>Mis Preguntas</Text>
			    	</TouchableOpacity>
			    	{	render
			    		?this.renderMiItems()
			    		:null
			    	}
			  	</View>

			  	<View style={[ItemStyle.headerCollapsable, ItemStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={this.joinItems.bind(this)}>
			    		<Text style={[ItemStyle.headerText, ItemStyle.headerTextFirst]}>Preguntas</Text>
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
			   <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]}  >
			  			
				   		<View style={ItemStyle.contentText}>
					   		<Text style={ItemStyle.tituloItem}>
					   			{e.titulo}  
					   		</Text>
				   		 	<Text style={ItemStyle.by}>By {e.nombre}</Text> 
				   		</View>	
							<Text style={ItemStyle.valueItems}>
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
				   <View style={ItemStyle.content} key={key}>
				  		<TouchableOpacity style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]} 
				  			onPress={e.status=='noAsignado' ?()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId}) :()=>navigate('pagoDeuda', {id:e.id, planId:this.state.planId})}>
					   		<View style={ItemStyle.contentText}>
						   		<Text style={ItemStyle.tituloItem}>
						   			{e.titulo}  
						   		</Text>
					   		{e.status=='noAsignado' ?<Text style={ItemStyle.by}>By {e.nombre}</Text> :null}
					   		</View>	
								<Text style={e.deuda>=0 ?ItemStyle.value :ItemStyle.valueNoAsignado}>
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
			<ScrollView  style={ItemStyle.contentItem}>
			  	<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} />
			  	{/*****   show the modal to create component	*****/}
				  	{
				  		show
				  		?<CrearPreguntaComponent  
				  			planId={this.props.navigation.state.params}
				  			updateItems={(id, deuda, titulo)=>this.updateItems(id, deuda, titulo)}
				  			close={()=>this.setState({show:false})}
				  		 />
				  		:null 
				  	}
				<View style={ItemStyle.subContentItem}>
				{/*****   boton para mostrar crear item	*****/}
				  	<TouchableOpacity onPress={()=>this.setState({show:true})} style={ItemStyle.contenedorNuevo}>
						<Image source={require('../ajustes/nuevo.png')} style={ItemStyle.btnNuevoGrupo} />
						<Text>Crear Pregunta</Text>
				  	</TouchableOpacity>
				  	
				 	{this.renderAcordeon()}
			  	</View>
			</ScrollView>
		);
	}
}
 