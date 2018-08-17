import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native'
import {style} from '../pago/style'
import CabezeraComponent from '../ajustes/cabezera.js'
import axios from 'axios'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import { TextInputMask } from 'react-native-masked-text' 

export default class pagoComponent extends Component{
 	state={
 		item:{asignados:[], userId:{}},
 		cc:false,
 		debito:false,
 		efectivo:true,
 		valor:0,
 		metodo:3
 	}
	componentWillMount(){
	 	let itemId = this.props.navigation.state.params.id
	 	let valor  = this.props.navigation.state.params.valor
	 	let planId = this.props.navigation.state.params.planId
	 	axios.get('x/v1/ite/item/id/'+itemId)
	 	.then(e=>{
	 		console.log(e.data)
	 		this.setState({item:e.data.mensaje[0], itemId, valor, planId})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	 

	renderItem(){
		const {item, valor} = this.state
		console.log(item)
		return(
			<View>
			{/* ITEM INFORMACION */}
				<View style={style.contenedorItem}>
					<View style={style.contenedorImagen}>
						<Image source={{uri:item.imagenResize}} style={style.image}/>
					</View>
					<View>	
						<Text style={[style.titulo, style.familia]}>{item.titulo}</Text>
						<Text style={[style.descripcion, style.familia]}>{item.descripcion}</Text>
						<Text style={[style.nombre, style.familia]}>By {item.userId.nombre}</Text>
						<View style={style.contenedorValor}>
							<Text style={[style.valorTexto, style.familia]}>Valor</Text>
							<Text style={[style.valor, style.familia]}>{'$ '+Number(item.valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
						</View>
					</View>
				</View>

			{/* SEPARADOR */}
				<View style={style.separador}></View>
				
			{/* DEUDA */}
				<View style={style.contenedorDeuda}>
					<Text style={[style.tituloDeuda, style.familia]}>Deuda</Text>
					<Text style={[style.valorDeuda, style.familia]}>{'$ '+Number(valor).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
				</View>

			{/* SEPARADOR */}
				<View style={style.separador}></View>
				
			</View>
		)
	}
	getValor(e){
	    e = e.substr(1)
	    e = e.replace(/[^0-9]/g, '')    
	    this.setState({valorInicial:e, monto:Number(e)})
	}
	renderPago(){
		const {cc, debito, efectivo} = this.state
		return(
			<View>
			{/* FORMULARIO PAGAR */}
				<View style={style.contenedorDeuda}>
					<Text style={[style.montoTitulo, style.familia]}>Monto de Pago</Text>
					<TextInputMask
	                  ref="text"
	                  placeholder='Valor a Pagar'
	                  type={'money'}
	                  options={{ unit: '$', zeroCents:true, precision:0 }} 
	                  style={[style.inputValor, style.familia]}
	                  underlineColorAndroid='transparent'
	                  onChangeText={this.getValor.bind(this)} 
	                  value={this.state.valorInicial}
	                />
				</View>

			{/* SEPARADOR */}
				<View style={style.separador}></View>

			{/* METODO DE PAGO CC/DEBITO/EFECTIVO */}
				<Text style={[style.montoTitulo, style.familia]}>Metodo de Pago</Text>
				<View style={style.metodoContenedor}>
					{/*<TouchableOpacity onPress={(e)=>this.updateStateMetodo(1)} style={style.metodoBtn}>
						{!cc
						?<Image source={require('../assets/images/cc.png')} style={style.metodoImagen} />
						:<Image source={require('../assets/images/ccActivo.png')} style={style.metodoImagen} />
						}
						<Text sytle={style.familia}>Credito</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={(e)=>this.updateStateMetodo(2)} style={style.metodoBtn}>
						{!debito
						?<Image source={require('../assets/images/debito.png')} style={style.metodoImagen} />
						:<Image source={require('../assets/images/debitoActivo.png')} style={style.metodoImagen} />
						}
						<Text sytle={style.familia}>Debito</Text>
					</TouchableOpacity>*/}
					<TouchableOpacity onPress={(e)=>this.updateStateMetodo(3)} style={style.metodoBtn}>
						{!efectivo 
						?<Image source={require('../assets/images/efectivo.png')} style={style.metodoImagen} />
						:<Image source={require('../assets/images/efectivoActivo.png')} style={style.metodoImagen} />
						}
						<Text sytle={style.familia}>Efectivo</Text>
					</TouchableOpacity>
				</View>

			{/* SEPARADOR */}
				<View style={style.separador}></View>

			{/* INFO METODO DE PAGO */}
				<TextInput 
	                placeholder='Información del metodo de pago'
	                underlineColorAndroid='transparent'
	                placeholderTextColor="#8F9093" 
	                style={[style.inputInformacion, style.familia]}
	                onChangeText={(descripcion) => this.setState({descripcion})}
	            />
	        {/* ICON PAGAR */}
	        	<TouchableOpacity onPress={this.handleSubmit.bind(this)} style={style.pagarBtn}>
	        		<Image source={require('../assets/images/iconPagar.png')} style={style.pagarImagen} />
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
  		const {valor} = this.state
  		const {navigate} = this.props.navigation
		 
			return (
				<View>
					<CabezeraComponent navigate={navigate} url={'item'} parameter={this.state.planId} texto='Pago Deuda'/>
					<ScrollView>
						<View style={style.contentItem}>		
							<View style={style.contenedor}>
								{this.renderItem()}
								{this.renderPago()}
							</View>			  
						</View>
					</ScrollView>
				</View>
			);
		 
	}
	handleSubmit(e){
		let {monto, metodo, descripcion, itemId, planId, valor, item} = this.state
		montos=monto
		monto = parseInt(monto)
		valor = Math.abs(valor)
		descripcion = descripcion ? descripcion :'abono usuario'
		console.log(montos, monto, valor)
  		const {navigate} = this.props.navigation		
		if (monto> valor) {
			Alert.alert(
			  'el monto no puede ser mayor a tu deuda',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}else if(metodo==0){
			Alert.alert(
			  'Selecciona algun metodo de pago',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}else{
			axios.post('x/v1/pag/pago', {monto, metodo, descripcion, itemId, planId, abono:true, userId:null, userItem:item.userId._id})
			.then(e=>{
				console.log(e.data)
				if (e.data.code==1) {
					metodo==1 
					?sendRemoteNotification(5, item.userId.tokenPhone, 'notificacion', `Te pagaron ${montos}`, `, Te pagaron del item ${item.titulo}`, item.imagenResize)
					:sendRemoteNotification(6, item.userId.tokenPhone, 'notificacion', `Te pagaron ${montos}`, `, Te pagaron del item ${item.titulo}`, item.imagenResize)
						
					
					Alert.alert(
					  'tu pago fue actualizado',
					   metodo==3 &&'Se ha enviado una notificacion al dueño del item',
					  [
					    {text: 'OK', onPress: () => navigate('item', planId)},
					  ],
					  { cancelable: false }
					)
				}else{
					Alert.alert(
			            '!opss Artículo abierto',
			            'puedes hacer pagos hasta que el usuario cierre el item',
			            [  
			              {text: 'OK', onPress: () => console.log('OK Pressed')},
			            ],
			            { cancelable: false }
		          	)
				}
				
				
			})
			.catch(err=>{
				console.log(err)
			})
		}
			
	 
	}
}





 