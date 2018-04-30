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
 		show:false
 	}
	componentWillMount(){
	 	console.log(this.props.navigation.state)
	 	let itemId = this.props.navigation.state.params.id
	 	let planId = this.props.navigation.state.params.planId
	 	//let itemId = '5add22fdef82f12d625e9db6'
	 	axios.get('x/v1/ite/item/id/'+itemId)
	 	.then(e=>{
	 		this.setState({item:e.data.mensaje[0], itemId, planId})
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
						<Image source={{uri:item.rutaImagen}} style={PagoStyle.image}/>
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
	renderAsignados(){
		const valor = this.state.item.valor
		const nAsignados = this.state.item.asignados.length
		let monto = Math.ceil((valor/(nAsignados+1))/1000)*1000;
		console.log(this.state.item.asignados)	
		return this.state.item.asignados.map((e, key)=>{
			return(
	 			<TouchableOpacity style={PagoStyle.pagoDeudaContenedor} key={key} onPress={()=>this.setState({show:true,userId:e._id, photo:e.photo, nombre:e.nombre, monto})}>
	 				<Image source={{uri: e.photo}} style={PagoStyle.pagoDeudaAvatar}/>
	 				<Text style={PagoStyle.pagoDeudaNombre}>{e.nombre}</Text>
	 				<Text style={PagoStyle.pagoDeudaMonto}>{'$ '+Number(monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
	 				<View style={PagoStyle.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId} = this.state
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
				  			updateItems={(id, deuda, titulo)=>this.updateItems(id, deuda, titulo)}
				  			close={()=>this.setState({show:false})}
				  		 />
				  		:null 
				  	}
					<View style={PagoStyle.contenedor}>
						{this.renderItem()}
						{this.renderAsignados()}
						
					</View>			  
				</View>
			</ScrollView>
		);
	}
	handleSubmit(e){
		let {monto, metodo, descripcion, itemId, valor} = this.state
		monto = parseInt(monto)
		valor = Math.abs			(valor)
  		const {navigate} = this.props.navigation
		console.log(monto, metodo, descripcion, itemId, valor)
		console.log(Math.abs(valor))		
		if (monto> valor) {
			Alert.alert(
			  'el monto no puede ser mayor a tu deuda',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}else{
			axios.post('x/v1/pag/pago', {monto, metodo, descripcion, itemId})
			.then(e=>{
				Alert.alert(
				  'tu pago fue actualizado',
				  '',
				  [
				    {text: 'OK', onPress: () => navigate('item', {itemId, monto})},
				  ],
				  { cancelable: false }
				)
				
			})
			.catch(err=>{
				console.log(err)
			})
		}

		
	}
}





 