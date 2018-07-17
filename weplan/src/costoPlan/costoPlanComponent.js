import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {costoPlanStyle} from '../costoPlan/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'

import CabezeraMenuComponent from '../cabezeraFooter/cabezeraComponent'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class costoPlanComponent extends Component{
	state={
 		plan:{},
 		valor:0,
 		show:false,
 		usuarios:[]
 	}
	componentWillMount(){
 		// console.log(this.props.navigation.state.params)
	 	let planId = this.props.navigation.state.params
	 	// let planId = '5b47c7489f436157e1cd6646'
	 	axios.get('x/v1/user/deudaUsuarioPorPlan/'+planId)
	 	.then(e=>{
	 		console.log(e.data.plan[0].imagenMiniatura[0])
	 		this.setState({usuarios:e.data.usuarios, plan:e.data.plan[0], planId})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	 

	renderItem(){
		const {plan, valor} = this.state
		console.log(plan)
			if (plan.nombre) {
		return(
			<View>
				{/* ITEM INFORMACION */}
					<View style={costoPlanStyle.contenedorItem}>
						<View >
							<Image source={{uri:plan.imagenMiniatura[0]}} style={costoPlanStyle.imagen}/>
						</View>
						<View>	
							<Text style={costoPlanStyle.titulo}>{plan.nombre}</Text>
							<Text style={costoPlanStyle.descripcion}>{plan.descripcion}</Text>
							<Text style={costoPlanStyle.nombre}>Creador {plan.idUsuario.nombre}</Text>
							<View style={costoPlanStyle.contenedorValor}>
								<Text style={costoPlanStyle.valorTexto}>Ubicacion</Text>
								<Text style={costoPlanStyle.valorTexto}>{plan.lugar}</Text>
							</View>
						</View>
					</View>

				{/* SEPARADOR */}
					<View style={costoPlanStyle.separador}></View>
				</View>
			)
		}else{
			return(<Text>Cargando...</Text>)
		}
	}
	 
	// renderAsignados(){
	// 	return this.state.usuarios.map((e, key)=>{
	// 		let deuda = e.deuda-(Math.ceil((this.state.item.valor/(this.state.item.asignados.length+1))/100)*100)
	// 		let data = e.data[0].info[0]
	// 		return(
	//  			<TouchableOpacity  key={key} onPress={()=>this.setState({show:true, userId:e._id, photo:data.photo, nombre:data.nombre, monto:e.deuda})}>
	//  				<View style={costoPlanStyle.pagoDeudaContenedor}>
	// 	 				<Image source={{uri: data.photo}} style={costoPlanStyle.pagoDeudaAvatar} />
	// 	 				<Text style={costoPlanStyle.pagoDeudaNombre}>{data.nombre}</Text> 
	// 	 				<Text style={costoPlanStyle.pagoDeudaMonto}>{'$ '+Number(deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
	// 	 			</View>
	//  				<View>	
	// 	 				{ 
	// 	 					e.data.map((e2, key2)=>{
	// 	 						return(
	// 	 							<View key={key2} style={costoPlanStyle.infoAbonoDeuda}>
	// 	 								<Text style={costoPlanStyle.textAbonoDeuda}>Abono: </Text>
	// 	 								<Text style={costoPlanStyle.textAbonoDeuda}>{e2.info[0].fecha} / </Text>
	// 	 								<Text style={costoPlanStyle.textAbonoDeuda}>{'$ '+Number(e2.info[0].monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
	// 	 							</View>
	// 	 						)
	// 	 					})
	// 	 				}
	// 	 			</View>
	//  				<View style={costoPlanStyle.separador}></View>
	//  			</TouchableOpacity>
	// 		)
	// 	})
	// }
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId, usuarios} = this.state
 		let sum = 100
		return (
			<ScrollView style={costoPlanStyle.container}>
				<View style={costoPlanStyle.contentItem}>
					<CabezeraComponent navigate={navigate} url={'wallet'} parameter={this.state.planId} />
					 
					<View style={costoPlanStyle.contenedor}>
						{this.renderItem()}
						{/*this.renderAsignados()*/}
						
					</View>	
					{
			    		<View style={costoPlanStyle.contenedorTotal}>
			    			<Text style={costoPlanStyle.textoTotal}>Total</Text>
			    			<Text style={sum>=0 ?costoPlanStyle.valueTotal :costoPlanStyle.valueNoAsignadoTotal}>
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