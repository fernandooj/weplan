 import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native'
import {PagoStyle} from '../pago/style'
 
import axios from 'axios'
 
 

export default class pagoComponent extends Component{
 	state={
 		item:{asignados:[], userId:{}},
 		cc:false,
 		debito:false,
 		efectivo:false
 	}
	componentWillMount(){
	 	console.log(this.props.navigation.state.params)
	 	let itemId = this.props.navigation.state.params
	 	//let itemId = '5add22fdef82f12d625e9db6'
	 	axios.get('x/v1/ite/item/id/'+itemId)
	 	.then(e=>{
	 		this.setState({item:e.data.mensaje[0], itemId})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	 

	renderItem(){
		const {item} = this.state
		let valorDebe = Math.round((item.valor/(item.asignados.length+1))/1000)*1000
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
				
			{/* DEUDA */}
				<View style={PagoStyle.contenedorDeuda}>
					<Text style={PagoStyle.tituloDeuda}>Deuda</Text>
					<Text style={PagoStyle.valorDeuda}>{'$ '+Number(valorDebe).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
				</View>

			{/* SEPARADOR */}
				<View style={PagoStyle.separador}></View>
				
			</View>
		)
	}
	renderPago(){
		const {cc, debito, efectivo} = this.state
		return(
			<View>
			{/* FORMULARIO PAGAR */}
				<View style={PagoStyle.contenedorDeuda}>
					<Text style={PagoStyle.montoTitulo}>Monto de Pago</Text>
					<TextInput 
		                placeholder='Valor a Pagar'
		                underlineColorAndroid='transparent'
		                placeholderTextColor="#8F9093" 
		                style={PagoStyle.inputValor}
		                onChangeText={(monto) => this.setState({monto})}
		            />
				</View>

			{/* SEPARADOR */}
				<View style={PagoStyle.separador}></View>

			{/* METODO DE PAGO CC/DEBITO/EFECTIVO */}
				<Text style={PagoStyle.montoTitulo}>Metodo de Pago</Text>
				<View style={PagoStyle.metodoContenedor}>
					<TouchableOpacity onPress={(e)=>this.updateStateMetodo(1)} style={PagoStyle.metodoBtn}>
						{!cc
						?<Image source={require('./cc.png')} style={PagoStyle.metodoImagen} />
						:<Image source={require('./ccActivo.png')} style={PagoStyle.metodoImagen} />
						}
						<Text>Credito</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={(e)=>this.updateStateMetodo(2)} style={PagoStyle.metodoBtn}>
						{!debito
						?<Image source={require('./debito.png')} style={PagoStyle.metodoImagen} />
						:<Image source={require('./debitoActivo.png')} style={PagoStyle.metodoImagen} />
						}
						<Text>Debito</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={(e)=>this.updateStateMetodo(3)} style={PagoStyle.metodoBtn}>
						{!efectivo 
						?<Image source={require('./efectivo.png')} style={PagoStyle.metodoImagen} />
						:<Image source={require('./efectivoActivo.png')} style={PagoStyle.metodoImagen} />
						}
						<Text>Efectivo</Text>
					</TouchableOpacity>
				</View>

			{/* SEPARADOR */}
				<View style={PagoStyle.separador}></View>

			{/* INFO METODO DE PAGO */}
				<TextInput 
	                placeholder='Información del metodo de pago'
	                underlineColorAndroid='transparent'
	                placeholderTextColor="#8F9093" 
	                style={PagoStyle.inputInformacion}
	                onChangeText={(descripcion) => this.setState({descripcion})}
	            />
	        {/* ICON PAGAR */}
	        	<TouchableOpacity onPress={this.handleSubmit.bind(this)} style={PagoStyle.pagarBtn}>
	        		<Image source={require('./iconPagar.png')} style={PagoStyle.pagarImagen} />
	        	</TouchableOpacity>
			</View>
		)
	}
 	updateStateMetodo(e){
 		this.setState({cc:false,debito:false,efectivo:false})
	    switch(e) {
	    case 1:
	        this.setState({cc:true, metodo:1})
	        break;
	    case 2:
	        this.setState({debito:true,  metodo:2})
	        break;
	    case 3:
	        this.setState({efectivo:true,  metodo:3})
	        break;
	    }  
 	}
  	render() {
		return (
			<ScrollView>
				<View style={PagoStyle.contentItem}>
					<View><Text>atras</Text></View>
					<View style={PagoStyle.contenedor}>
						{this.renderItem()}
						{this.renderPago()}
					</View>			  
				</View>
			</ScrollView>
		);
	}
	handleSubmit(e){
		const {monto, metodo, descripcion, itemId, item} = this.state

		let valorDebe = Math.round((item.valor/(item.asignados.length+1))/1000)*1000
		console.log(monto, metodo, descripcion, itemId)

		if (monto>valorDebe) {
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
			.then(e=>
				console.log(e.data)
			)
			.catch(err=>{
				console.log(err)
			})
		}

		
	}
}





 