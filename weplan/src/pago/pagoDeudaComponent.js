import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, TextInput, ScrollView, Alert} from 'react-native'
import {style} from './style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import AbonarComponent   from './abonarComponent.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import { TextInputMask } from 'react-native-masked-text' 
export default class pagoDeudaComponent extends Component{
 	state={
 		item:{asignados:[], userId:{}},
 		valor:0,
 		show:false,
 		editCosto:false,
 		usuarios:[],
 		planId:'',
 		valorInicial:null
 	}
	componentWillMount(){
 
	 	let itemId = this.props.navigation.state.params.id
	 	let planId = this.props.navigation.state.params.planId
	 	// let planId = '5aefdb91423c402001dbb329'
	 	// let itemId = '5af143b7076e9c07c4973aa8'
	 	console.log(planId)
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
	getValor(valor, id){
		const {item, idPerfil} = this.state
	    valor = valor.substr(1)
	    valor = valor.replace(/[^0-9]/g, '')    
	    this.setState({editCosto:true, valorInicial:valor, monto:Number(valor)})
	    valor = -Math.abs(Number(valor))
	    let usuariosAsignados = Math.ceil((item.valor/(item.asignados.length))/100)*100 /// saco el divido de los usuarios que estan asignados
	    let costoPago  		  = Math.ceil((valor/(this.state.item.asignados.length))/100)*100 //// divido el costo del pago entre los usuarios asignados
	    let suma = usuariosAsignados + costoPago
	    let usuarios = this.state.usuarios.filter(e=>{
			if (e._id==id) {e.deuda= valor}else{e.deuda=-Math.abs(suma)}
			return e
		})
		let nuevaData = usuarios.map(e=>{
			return {
				id:e._id,
				deuda:e.deuda,
				token: e.data[0].info[0].token
			}
		})
		nuevaData.push({id:item.userId._id, deuda:suma, token:null })
		this.setState({usuarios, nuevaData})
	}
	editarDeuda(id){
		if (!this.state.item.abierto) {
			Alert.alert(
			  'No puedes editar los costos por que el item ya se cerro',
			  '',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}else{
			let usuarios = this.state.usuarios.filter(e=>{
				if (e._id==id) {e.estado=true}else{e.estado=false}
				return e
			})
			this.setState({usuarios, valorInicial:null})
		}
		
	}
	renderAsignados(){
		let pagos=[];
		let costoDividirPlan = Math.ceil((this.state.item.valor/(this.state.item.asignados.length+1))/100)*100
		const {usuarios, valorInicial, editCosto} = this.state
		return usuarios.map((e, key)=>{
			
			let deuda = editCosto ?e.deuda===costoDividirPlan ?costoDividirPlan :e.deuda :e.deuda
			let data  = e.data[0].info[0]
			return(
	 			<TouchableHighlight  key={key} onLongPress={()=>this.editarDeuda(e._id)} onPress={()=>this.setState({show:true, userId:e._id, photo:data.photo, nombre:data.nombre, monto:e.deuda, token:data.token})}>
	 				<View>
	 				<View style={style.pagoDeudaContenedor}>
		 				<Image source={{uri: data.photo}} style={style.pagoDeudaAvatar} />
		 				<Text style={[style.pagoDeudaNombre, style.familia]}>{data.nombre}</Text> 
		 				{
		 					!e.estado
		 					?<Text style={[style.pagoDeudaMonto, style.familia]}>{'$ '+Number(deuda).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
		 					:<TextInputMask
			                  ref="text"
			                  placeholder='Valor a Pagar'
			                  type={'money'}
			                  options={{ unit: '$', zeroCents:true, precision:0 }} 
			                  style={[style.inputValorEdit, style.familia]}
			                  underlineColorAndroid='transparent'
			                  onChangeText={(data)=>this.getValor(data, e._id)} 
			                  value={valorInicial ?valorInicial :deuda}
			                />
		 				}
		 				
		 			</View>
	 				<View>	
		 				{
		 					e.data.map((e2, key2)=>{
		 						if (e2.info[0].monto!==-deuda && e2.info[0].monto!==deuda && e2.info[0].monto>=0) {
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
	 				</View>
	 			</TouchableHighlight>
			)
		})
	}
 
  	render() {
  		const {navigate} = this.props.navigation
  		const {show, monto, photo, nombre, itemId, userId, usuarios, planId, token, item, editCosto} = this.state
 		let costoDividirPlan = Math.ceil((this.state.item.valor/(this.state.item.asignados.length+1))/100)*100
		const add = (a, b)=>{
 			return a + b;
		}
		let suma=[]
		usuarios.filter(e=>{
			suma.push(e.deuda===costoDividirPlan ?costoDividirPlan :e.deuda)
		})
		var sum = suma.reduce(add, 0);
		if (planId.length!==0) {
			return (
				<View style={style.contenedorPago}>

					<CabezeraComponent navigate={navigate} url={'item'} parameter={planId} />
					<ScrollView style={style.subContenedor}>
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
							editCosto
							&&<TouchableHighlight onPress={() => this.enviarEdicion() } style={style.btnHecho}>
								<Text style={[style.hecho, style.familia]}>Guardar !</Text>
							</TouchableHighlight>
						}
			    		<View style={style.contenedorTotal}>
			    			<Text style={[style.textoTotal, style.familia]}>Total</Text>
			    			<Text style={sum>=0 ?[style.valueTotal, style.familia] :[style.valueNoAsignadoTotal, style.familia]}>
								{'$ '+Number(sum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>
			    		</View>
			    	</ScrollView>	  
				</View>
			)
		}else{
			return <Text></Text>
		}
	}
	enviarEdicion(){
		const {nuevaData, itemId, usuarios, imagenResize, item} = this.state
		

		axios.put('x/v1/pag/pago', {data: nuevaData, itemId:itemId })
		.then(e=>{
			console.log(e.data)
			if (e.data.code===1) {

				nuevaData.map(e=>{
					sendRemoteNotification(15, e.token, 'notificacion', `pago editado a ${Math.abs(e.deuda)}`, `, edito el pago del item ${item.titulo}`, item.imagenResize)
				})
				let users = usuarios.filter(e=>{
					e.estado=false
					return e
				})
				console.log(usuarios)
				this.setState({editCosto:false, usuarios:users})
			}
		})
		.catch(err=>{
			console.log(err)
		})
		
		
	}
	updateItems(id, monto){
		let usuarios = this.state.usuarios.filter(e=>{
			if(e._id==id) {e.deuda=parseInt(e.deuda)+parseInt(monto)}
			return e   
		})
		this.setState({usuarios, show:false})
	}
}





 