
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {ItemStyle} from '../item/style'
 
import axios from 'axios'
import CrearItemComponent from './crearItemComponent'
import CabezeraComponent from '../ajustes/cabezera.js'
import update from 'react-addons-update';

 

export default class ItemComponent extends Component{
	state={
		show:false,
		misItems:[],
		deuda:[],
		pago:[],
		itemsPlan:[],
		render:true,
		total:0
	}
	componentWillMount(){
		let planId = this.props.navigation.state.params	
		// let planId = '5b287e0394d7f72f1988c011'	
		this.setState({planId})
		axios.get('/x/v1/ite/item/'+planId)
		.then(e=>{
		 	console.log(e.data.deuda)
			this.setState({pago:e.data.pago, deuda:e.data.deuda, total:e.data.total})
		})		 
		.catch(err=>{
			console.log(err)
		})	
	}
	renderAcordeon() {
		const {render, total}=this.state
		return (
			<View>
			  	<View style={ItemStyle.headerCollapsable }>
			    	<TouchableOpacity onPress={()=>this.setState({render:true})}>
			    		<Text style={ItemStyle.headerText}>Mis Items</Text>
			    	</TouchableOpacity>
			    	{	render
			    		?<View>{this.renderPagos()}{this.renderDeuda()}</View>
			    		:null
			    	}
			    	{
			    		<View style={ItemStyle.contenedorTotal}>
			    			<Text style={ItemStyle.textoTotal}>Total</Text>
			    			<Text style={total>=0 ?ItemStyle.valueTotal :ItemStyle.valueNoAsignadoTotal}>
								{'$ '+Number(total).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
			    		</View>
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
		console.log(deuda)
		const pago = {id, deuda, titulo}
		this.setState({
		  pago: update(this.state.pago, {$unshift: [pago]}),
		  show:false
		}) 
	}
	joinItems(){
		// const {todosItems, items} = this.state
		// const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))								
		// const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))
		// const myDiff = makeSymmDiffFunc((x, y) => x.id === y.id)													
		// const itemsPlan = myDiff(items, todosItems)																					   									 				
		// this.setState({itemsPlan, render:false})
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
	renderPagos() {
	   const {navigate} = this.props.navigation
 
	   	return this.state.pago.map((e, key)=>{
			return (
			   <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]} 
			  			onPress={e.deuda<0 ?()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId}) :e.deuda==0 ?null :()=>navigate('pagoDeuda', {id:e.id, planId:this.state.planId})}>
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
	}
	renderDeuda() {
	   const {navigate} = this.props.navigation
 
	   	return this.state.deuda.map((e, key)=>{
			return (
			   <View style={ItemStyle.content} key={key}>
			  		<TouchableOpacity style={!key==0 ?ItemStyle.boton: [ItemStyle.boton, ItemStyle.botonFirst]} 
			  			onPress={e.deuda<0 ?()=>navigate('pago', {id:e.id, valor:e.deuda, planId:this.state.planId}) :e.deuda==0 ?null :()=>navigate('pagoDeuda', {id:e.id, planId:this.state.planId})}>
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
	}


  	render() {
		const {show, items, itemsPlan} = this.state
		const {navigate} = this.props.navigation
		console.log(this.state.pago)
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
							<Text style={ItemStyle.CrearItem}>Crear Item</Text>
					  	</TouchableOpacity>
					  	
					 	{this.renderAcordeon()}
				  	</View>
				</ScrollView>
			</View>
		);
	}
}
 