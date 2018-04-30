import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {ItemStyle} from '../item/style'
import Accordion from 'react-native-accordion-xg';
import axios from 'axios'
import CrearItemComponent from './crearItemComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';

 

export default class ItemComponent extends Component{
	state={
		show:false,
		misItems:[],
		items:[],
		itemsPlan:[],
		render:true
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		this.setState({planId})
		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
			console.log(e.data)
			let items=[]
			////////////////////////////////////////////////////////////////////////
			////////////////////		busco los pagos asignados		////////////////
			e.data.item.filter((e)=>{
				axios.get('/x/v1/pag/pago/suma/'+e._id)
				.then(res=>{
					res.data.pago.filter(item=>{
	   				items.push({
	   						deuda:item.monto, 
	   						id:e._id,
								titulo:e.titulo,
								nombre: e.userId.nombre,
								status: item.monto<0 ?'noAsignado' : 'asignado'
						})
					})
					this.setState({items})
				})
				.catch(err=>{
					console.log(err)
				})
			})
			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			let todosItems = e.data.item.map((e)=>{																				////
			let monto = e.asignados.length==0 ?e.valor :Math.ceil((e.valor/(e.asignados.length+1))/1000)*1000;	////																 
				return {																														////
					id:e._id,																												////	
					deuda:monto,																											////
					titulo:e.titulo,																										////
					nombre:e.userId.nombre,																								////
					status:monto<0 ?'noAsignado' : 'asignado' 																	////
				}																																////
			})
			this.setState({todosItems})
			//////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////
		})		 
		.catch(err=>{
			console.log(err)
		})	
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
	renderAcordeon() {
		const {render}=this.state
		return (
			<View>
			  	<View style={ItemStyle.headerCollapsable }>
			    	<TouchableOpacity onPress={()=>this.setState({render:true})}>
			    		<Text style={ItemStyle.headerText}>Mis Items</Text>
			    	</TouchableOpacity>
			    	{	render
			    		?this.renderMiItems()
			    		:null
			    	}
			  	</View>

			  	<View style={[ItemStyle.headerCollapsable, ItemStyle.headerCollapsableFirst]}>
			    	<TouchableOpacity onPress={this.joinItems.bind(this)}>
			    		<Text style={[ItemStyle.headerText, ItemStyle.headerTextFirst]}>Items</Text>
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
		console.log(this.state.planId)
		return (
			<View  style={ItemStyle.contentItem}>
				<CabezeraComponent navigate={navigate} url={'chat'} parameter={this.state.planId} />
				<ScrollView>
				  	{/*****   show the modal to create component	*****/}
					  	{
					  		show
					  		?<CrearItemComponent  
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
							<Text>Crear Item</Text>
					  	</TouchableOpacity>
					  	
					 	{this.renderAcordeon()}
				  	</View>
				</ScrollView>
			</View>
		);
	}
}
 