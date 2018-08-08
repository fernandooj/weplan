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
 		total:0,
 		show:false,
 		debo:[],
 		meDeben:[],
 	}
	componentWillMount(){
 		// console.log(this.props.navigation.state.params)
	 	let planId = this.props.navigation.state.params
	 	// let planId = '5b653497d1bd7e0d78a17a9e'
	 	console.log(planId)
	 	axios.get('x/v1/pla/plan/'+planId)
	 	.then(e=>{
	 		console.log(e.data)
	 		this.setState({plan:e.data.plan[0]})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	 	axios.get('x/v1/ite/item/deudaPorUsuario/'+planId)
	 	.then(e=>{
	 		console.log(e.data)
	 		///////   Es lo que debo
	 		let debo = e.data.debo.map(e2=>{
	 			let data = e2.data[0].info[0]
			    return {
			    	 
					userId:data.userId,
					photo:data.photo,
					nombre:data.nombre,
					total:e2.total,
					deuda:100,
				    pagos:e.data.debo2.filter(e3=>{
				       return e2._id===e3.userIds
				    })
			  	}
			})
	 		//////	Es lo que me deben
			let meDeben = e.data.meDeben.map(e2=>{
	 			let data = e2.data[0].info[0]
			    return {
			    	 
					userId:data.userId,
					photo:data.photo,
					nombre:data.nombre,
					total:e2.total,
					deuda:100,
				    pagos:e.data.meDeben2.filter(e3=>{
				       return e2._id===e3.userId
				    })
			  	}
			})

	 		this.setState({debo, meDeben, planId, total:e.data.total})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	 

	renderPlan(){
		const {navigate} = this.props.navigation
		const {plan, valor, planId} = this.state
		if (plan.nombre) {
			return(
				<View>
					{/* ITEM INFORMACION */}
					<View style={costoPlanStyle.contenedorItem}>
						<View style={costoPlanStyle.contenedorAvatar}>
							<Image source={{uri:plan.imagenMiniatura[0]}} style={costoPlanStyle.imagen}/>
							<TouchableOpacity onPress={()=>navigate('chat', planId)} style={costoPlanStyle.btnChat}>
								<Text>Abrir Chat</Text>	
							</TouchableOpacity>
						</View>
						<View>	
							<Text style={costoPlanStyle.titulo}>{plan.nombre}</Text>
							<Text style={costoPlanStyle.descripcion}>{plan.descripcion}</Text>
							<Text style={costoPlanStyle.autor}>Creador {plan.idUsuario.nombre}</Text>
							<View style={costoPlanStyle.contenedorValor}>
								<Text style={costoPlanStyle.ubicacion}>Ubicacion</Text>
								<Text style={costoPlanStyle.lugar}>{plan.lugar}</Text>
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
	 
	renderDebo(){
		return this.state.debo.map((e, key)=>{			
			return(
	 			<TouchableOpacity  key={key} onPress={()=>this.setState({show:true, userId:e._id, photo:e.photo, nombre:e.nombre, monto:e.deuda})}>
	 				<View style={costoPlanStyle.pagoDeudaContenedor}>
		 				<Image source={{uri: e.photo}} style={costoPlanStyle.pagoDeudaAvatar} />
		 				<Text style={costoPlanStyle.pagoDeudaNombre}>{e.nombre}</Text> 
		 				<Text style={costoPlanStyle.pagoDeudaMonto}>{'$ '+Number(e.total).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
		 			</View>
	 				<View>	
		 				{
		 					e.pagos.map((e2, key2)=>{
		 						if (e2.monto>0) {
		 							return(
			 							<View key={key2} style={costoPlanStyle.infoAbonoDeuda}>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>Abono: </Text>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>{e2.createdAt} / </Text>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>{'$ '+Number(e2.monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
			 							</View>
			 						)
		 						}
		 					})
		 				}
		 			</View>
	 				<View style={costoPlanStyle.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}

	renderMeDeben(){
		return this.state.meDeben.map((e, key)=>{			
			return(
	 			<TouchableOpacity  key={key} onPress={()=>this.setState({show:true, userId:e._id, photo:e.photo, nombre:e.nombre, monto:e.deuda})}>
	 				<View style={costoPlanStyle.pagoDeudaContenedor}>
		 				<Image source={{uri: e.photo}} style={costoPlanStyle.pagoDeudaAvatar} />
		 				<Text style={costoPlanStyle.pagoDeudaNombre}>{e.nombre}</Text> 
		 				<Text style={costoPlanStyle.pagoDeudaMontoActive}>{'$ '+Math.abs((e.total)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
		 			</View>
	 				<View>	
		 				{
		 					e.pagos.map((e2, key2)=>{
		 						if (e2.monto>0) {
		 							return(
			 							<View key={key2} style={costoPlanStyle.infoAbonoDeuda}>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>Abono: </Text>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>{e2.createdAt} / </Text>
			 								<Text style={costoPlanStyle.textAbonoDeuda}>{'$ '+Number(e2.monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
			 							</View>
			 						)
		 						}
		 					})
		 				}
		 			</View>
	 				<View style={costoPlanStyle.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}

 
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId, debo, total} = this.state
		return (
			<View style={costoPlanStyle.container}>
				<ScrollView >
					<View style={costoPlanStyle.contentItem}>
						<CabezeraComponent navigate={navigate} url={'wallet'} parameter={this.state.planId} texto='Mi Wallet' />
						<View style={costoPlanStyle.contenedor}>
							{this.renderPlan()}
							<Text style={costoPlanStyle.tituloDeuda}>Cuanto Debo</Text>
							{this.renderDebo()}
							<Text style={costoPlanStyle.tituloDeuda}>Cuanto Me Deben</Text>
							{this.renderMeDeben()}
						</View>	
					</View>
				</ScrollView>
					 
	    		<View style={costoPlanStyle.contenedorTotal}>
	    			<Text style={costoPlanStyle.textoTotal}>Total</Text>
	    			<Text style={total>=0 ?costoPlanStyle.valueTotal :costoPlanStyle.valueNoAsignadoTotal}>
						{'$ '+Number(total).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
					</Text>
	    		</View>
			    	 		  
			</View>	
		);
	}
}