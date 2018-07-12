import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native'
import {PagoStyle} from '../pago/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import AbonarComponent   from './abonarComponent.js'

 
 

export default class pagoDeudaComponent extends Component{
 	state={
 		item:{asignados:[], userId:{}},
 		valor:0,
 		show:false,
 		usuarios:[]
 	}
	componentWillMount(){
 
	 	let itemId = this.props.navigation.state.params.id
	 	let planId = this.props.navigation.state.params.planId
	 	// let planId = '5aefdb91423c402001dbb329'
	 	// let itemId = '5af143b7076e9c07c4973aa8'
	 	axios.get('x/v1/pag/pago/porusuario/'+itemId)
	 	.then(e=>{
	 		console.log(e.data.item)
	 		this.setState({usuarios:e.data.pago, itemId, item:e.data.item[0], planId})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	 

	renderItem(){
		const {item, valor} = this.state
		return(
			<View>
			{/* ITEM INFORMACION */}
				<View style={PagoStyle.contenedorItem}>
					<View >
						<Image source={{uri:item.imagenResize}} style={PagoStyle.image}/>
					</View>
					<View>	
						<Text style={PagoStyle.titulo}>{item.titulo}</Text>
						<Text style={PagoStyle.descripcion}>{item.descripcion}</Text>
						<Text style={PagoStyle.nombre}>By {item.userId.nombre}</Text>
						<View style={PagoStyle.contenedorValor}>
							<Text style={PagoStyle.valorTexto}>Valor</Text>
							<Text style={PagoStyle.valor}>{'$ '+Number(item.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
						</View>
					</View>
				</View>

			{/* SEPARADOR */}
				<View style={PagoStyle.separador}></View>
			</View>
		)
	}
	renderPagosHechos(id){
		 axios.get('x/v1/pag/pago/pagoshechos/'+id)
	   	.then(res=>{	 
	   		return <Text>aaf </Text>
	   	})
	}
	renderAsignados(){
		return this.state.usuarios.map((e, key)=>{
			return(
	 			<TouchableOpacity style={PagoStyle.pagoDeudaContenedor} key={key} 
	 				onPress={()=>this.setState({show:true, userId:e.id, photo:e.photo, nombre:e.nombre, monto:e.monto})}>
	 				<Image source={{uri: e.photo}} style={PagoStyle.pagoDeudaAvatar}/>
	 				<Text style={PagoStyle.pagoDeudaNombre}>{e.nombre}</Text> 
	 				<Text style={PagoStyle.pagoDeudaMonto}>{'$ '+Number(e.monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
	 				<View>	
		 				{ 
		 					this.renderPagosHechos(e.id)
		 				}
		 			</View>
	 				<View style={PagoStyle.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId, usuarios} = this.state
 		console.log(usuarios)
		const add = (a, b)=>{
 			return a + b;
		}
		let suma=[]
		usuarios.filter(e=>{
			suma.push(e.monto)
		})
		var sum = suma.reduce(add, 0);
		return (
			<ScrollView style={PagoStyle.container}>
				<View style={PagoStyle.contentItem}>
					<CabezeraComponent navigate={navigate} url={'item'} parameter={this.state.planId} />
					{
				  		show
				  		?<AbonarComponent
				  			photo={photo}
				  			nombre={nombre}
				  			valor={monto}
				  			itemId={itemId}
				  			userId={userId}
				  			updateItems={(id, monto)=>this.updateItems(id, monto)}
				  			close={()=>this.setState({show:false})}
				  		 />
				  		:null 
				  	}
					<View style={PagoStyle.contenedor}>
						{this.renderItem()}
						{this.renderAsignados()}
						
					</View>	
					{
			    		<View style={PagoStyle.contenedorTotal}>
			    			<Text style={PagoStyle.textoTotal}>Total</Text>
			    			<Text style={sum>=0 ?PagoStyle.valueTotal :PagoStyle.valueNoAsignadoTotal}>
								{'$ '+Number(sum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
			    		</View>
			    	}		  
				</View>
			</ScrollView>
		);
	}
	updateItems(id, monto){
		console.log(id)
		console.log(parseInt(monto))
		let usuarios = this.state.usuarios.filter(e=>{
			if(e.id==id) {e.monto=parseInt(e.monto)+parseInt(monto)}
			return e   
		})
		this.setState({usuarios, show:false})
	}
}





 