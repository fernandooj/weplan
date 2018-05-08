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
	 	axios.get('x/v1/ite/item/id/'+itemId)
	 	.then(e=>{
			///////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////		busco los pagos asignados de los usuarios del item
			///////////////////////////////////////////////////////////////////////////////////////////////////////
			let usuarios=[]
	 		e.data.mensaje[0].asignados.filter(e=>{
	 			axios.get('/x/v1/pag/pago/user/'+itemId+'/'+e._id)
				.then(res=>{
				 		console.log(res.data)
						usuarios.push({
							monto  : res.data.pago[0].monto<0 ?res.data.pago[0].monto :res.data.deuda[0].monto, 
							id     : e._id,
							nombre : e.nombre,
							photo  : e.photo
						})
				 
					console.log(usuarios)
					this.setState({usuarios})
				})
				.catch(err=>{
					return err
				})
	 		}) 	
	 		

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
 
 
		return this.state.usuarios.map((e, key)=>{
			return(
	 			<TouchableOpacity style={PagoStyle.pagoDeudaContenedor} key={key} 
	 				onPress={e.monto<0 ?()=>this.setState({show:true, userId:e.id, photo:e.photo, nombre:e.nombre, monto:e.monto}) :null}>
	 				<Image source={{uri: e.photo}} style={PagoStyle.pagoDeudaAvatar}/>
	 				<Text style={PagoStyle.pagoDeudaNombre}>{e.nombre}</Text>
	 				{
	 					e.monto<0
	 					?<Text style={PagoStyle.pagoDeudaMonto}>{'$ '+Number(e.monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
	 					:<Text style={PagoStyle.pagoDeudaMontoActive}>$ 0</Text>
	 				}
	 				
	 				<View style={PagoStyle.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId} = this.state
  		console.log(userId)
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





 