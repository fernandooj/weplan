import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import {ItemStyle} from '../item/style'
import Accordion from 'react-native-accordion-xg';
import axios from 'axios'
import CrearItemComponent from './crearItemComponent'
 


 

export default class ItemComponent extends Component{
	state={
		show:false,
		misItems:[],
		items:[]
	}
	componentWillMount(){
		//let planId = this.props.navigation.state.params	
		let planId = '5add2142ef82f12d625e9db1'
		console.log(planId)
		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
			let todosItemsPlan=[]
			e.data.item.filter((e)=>{
				axios.get('/x/v1/pag/pago/suma/'+e._id)
				.then(res=>{
					//console.log(res.data)
					res.data.pago.filter(item=>{
	   				todosItemsPlan.push({
	   					deuda:item.monto, id:e._id,
							titulo:e.titulo,
							valor:e.valor,
							rutaImagen: e.rutaImagen,
							descripcion: e.descripcion,
							userId: e.descripcion,
							nombre: e.userId.nombre,
							status: item.monto<0 ?'noAsignado' : 'asignado'
						})
					})
					console.log(todosItemsPlan)
					this.setState({items: todosItemsPlan})
				})
				.catch(err=>{
					console.log(err)
				})
			})		
		})
		.catch(err=>{
			console.log(err)
		})

		
	}
	renderAcordeon() {
		return (
			<View>
			  	<View style={ItemStyle.headerCollapsable }>
			    	<Text style={ItemStyle.headerText}>Mis Items</Text>
			    	{this.renderItems()}
			  	</View>

			  	<View style={[ItemStyle.headerCollapsable, ItemStyle.headerCollapsableFirst]}>
			    	<Text style={[ItemStyle.headerText, ItemStyle.headerTextFirst]}>Items</Text>
			    	 
			  	</View>
			</View>
		);
	}

	renderItems() {
	   const {navigate} = this.props.navigation
 
	   if(this.state.items.length>0){
	   	return this.state.items.map((e, key)=>{
				return (
					 
				   <View style={ItemStyle.content} key={key}>
				  		<TouchableOpacity style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]} 
				  				onPress={e.status=='noAsignado' ?()=>navigate('pago', e.id) :()=>navigate('deuda', e.id)}>
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
		return (
			<ScrollView  style={ItemStyle.contentItem}>
			  
			  	{/*****   show the modal to create component	*****/}
				  	{
				  		show
				  		?<CrearItemComponent close={(value)=>this.setState({show:value})} planId={this.props.navigation.state.params} />
				  		:null 
				  	}
				<View style={ItemStyle.subContentItem}>
				{/*****   boton para mostrar crear item	*****/}
				  	<TouchableOpacity onPress={()=>this.setState({show:true})}>
						<Text>+Crear Item</Text>
				  	</TouchableOpacity>
				  	
				 	{this.renderAcordeon()}
			  	</View>
			</ScrollView>
		);
	}
}
 