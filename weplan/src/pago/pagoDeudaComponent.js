import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native'
import {style} from '../pago/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import AbonarComponent   from './abonarComponent.js'

export default class pagoDeudaComponent extends Component{
 	state={
 		item:{asignados:[], userId:{}},
 		valor:0,
 		show:false,
 		usuarios:[],
 		planId:''
 	}
	componentWillMount(){
 
	 	let itemId = this.props.navigation.state.params.id
	 	let planId = this.props.navigation.state.params.planId
	 	// let planId = '5aefdb91423c402001dbb329'
	 	// let itemId = '5af143b7076e9c07c4973aa8'
	 	axios.get('x/v1/user/porusuario/'+itemId)
	 	.then(e=>{
	 		console.log(e.data)
	 		this.setState({usuarios:e.data.usuarios, itemId, item:e.data.item[0], planId})
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
				<View style={style.contenedorItem}>
					<View >
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
			</View>
		)
	}
	 
	renderAsignados(){
		let pagos=[];
		let costoDividirPlan = Math.ceil((this.state.item.valor/(this.state.item.asignados.length+1))/100)*100
		return this.state.usuarios.map((e, key)=>{
			let deuda = e.deuda===costoDividirPlan ?costoDividirPlan :e.deuda
			let data = e.data[0].info[0]
			return(
	 			<TouchableOpacity  key={key} onPress={()=>this.setState({show:true, userId:e._id, photo:data.photo, nombre:data.nombre, monto:e.deuda, token:data.token})}>
	 				<View style={style.pagoDeudaContenedor}>
		 				<Image source={{uri: data.photo}} style={style.pagoDeudaAvatar} />
		 				<Text style={[style.pagoDeudaNombre, style.familia]}>{data.nombre}</Text> 
		 				<Text style={[style.pagoDeudaMonto, style.familia]}>{'$ '+Number(deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
		 			</View>
	 				<View>	
		 				{
		 					e.data.map((e2, key2)=>{
		 						if (e2.info[0].monto!==-costoDividirPlan) {
		 							return(
			 							<View key={key2} style={style.infoAbonoDeuda}>
			 								<Text style={[style.textAbonoDeuda, style.familia]}>Abono: </Text>
			 								<Text style={[style.textAbonoDeuda, style.familia]}>{e2.info[0].fecha} / </Text>
			 								<Text style={[style.textAbonoDeuda, style.familia]}>{'$ '+Number(e2.info[0].monto).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
			 							</View>
			 						)
		 						}
		 					})
		 				}
		 			</View>
	 				<View style={style.separador}></View>
	 			</TouchableOpacity>
			)
		})
	}
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId, usuarios, planId, token, item} = this.state
 		let costoDividirPlan = Math.ceil((this.state.item.valor/(this.state.item.asignados.length+1))/100)*100
 		console.log(userId)
		const add = (a, b)=>{
 			return a + b;
		}
		let suma=[]
		usuarios.filter(e=>{
			suma.push(e.deuda===costoDividirPlan ?costoDividirPlan :e.deuda)
		})
		var sum = suma.reduce(add, 0);
		if (planId.length!==0) {
			return (<ScrollView style={style.container}>
				<View style={style.contentItem}>
					<CabezeraComponent navigate={navigate} url={'item'} parameter={planId} />
					{
				  		show
				  		?<AbonarComponent
				  			photo={photo}
				  			nombre={nombre}
				  			valor={monto}
				  			itemId={itemId}
				  			planId={planId}
				  			userId={userId}
				  			token={token}
				  			imagen={item.imagenResize}
				  			titulo={item.titulo}
				  			updateItems={(id, monto)=>this.updateItems(id, monto)}
				  			close={()=>this.setState({show:false})}
				  		 />
				  		:null 
				  	}
					<View style={style.contenedor}>
						{this.renderItem()}
						{this.renderAsignados()}
						
					</View>	
					{
			    		<View style={style.contenedorTotal}>
			    			<Text style={[style.textoTotal, style.familia]}>Total</Text>
			    			<Text style={sum>=0 ?[style.valueTotal, style.familia] :[style.valueNoAsignadoTotal, style.familia]}>
								{'$ '+Number(sum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
			    		</View>
			    	}		  
				</View>
			</ScrollView>)
		}else{
			return <Text></Text>
		}
	}
	updateItems(id, monto){
		console.log({id, monto})
		console.log(parseInt(monto))
		let usuarios = this.state.usuarios.filter(e=>{
			if(e._id==id) {e.deuda=parseInt(e.deuda)+parseInt(monto)}
			return e   
		})
		this.setState({usuarios, show:false})
	}
}





 