import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity,  ScrollView,  Alert} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
//import Image from 'react-native-scalable-image';
import axios from 'axios';
 


export default class editPerfilComponent2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		    restriccionArray:[],
		    categoria:[],
		    activo:false
	  };
	}
	componentWillMount(){
		axios.get('x/v1/cat/categoriaPlan')
	 	.then(e=>{
	 		let categoria = e.data.categoria.map(e=>{
	 			return {
	 				id:e._id,
	 				icon:e.ruta,
	 				nombre:e.nombre,
	 				estado:false
	 			}
	 		})
	 		this.setState({categoria})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})

		axios.get('/x/v1/user/profile')
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
 
 		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  GENERO EL ARRAY DE LAS RESTRICCIONES //////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateRestriccion(id, estado){
		if (estado) {
			this.setState({restriccionArray: this.state.restriccionArray.concat([id])})
		}else{
			this.setState({restriccionArray:this.state.restriccionArray.filter(function(val){return val != id}) })
		}
	}

	renderCategoria(){
		return this.state.categoria.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={LoginStyle.touchRes} 
					onPress={(index)=> {this.updateState(e.id, e.estado); this.updateStateRestriccion(e.id, e.estado)} }>
					<Image source={{ uri: e.icon}} style={LoginStyle.iconRes} />
					{
						e.estado
						?<Image source={require('./categoriaCheck.png')} style={LoginStyle.banRes} />
						:<Image source={require('./categoriaCheckDisable.png')} style={LoginStyle.banRes} />
					}
					<Text style={LoginStyle.textoRes}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {activo} = this.state
		return(
			<ScrollView style={LoginStyle.fondoUltimo}>
				<View style={LoginStyle.contenedorRes}>
						<Image
							style={LoginStyle.image2}
							source={require('./eligePlanTitulo.png')}
					    />
			    </View>
			    <View style={LoginStyle.contenedorCofres}>
			    	{this.renderCategoria()}
			    </View>
			    
			    <View style={LoginStyle.contenedorBtnlisto}>
			    	{
			    		!this.state.restriccionArray.length>0
			    		?<TouchableOpacity  style={LoginStyle.estasListoBtn} onPress={this.selecciona.bind(this)}>
					    	<Text  style={LoginStyle.btnEstasListo}>!Estas Listo!</Text>
					    </TouchableOpacity>
					    :<TouchableOpacity  style={[LoginStyle.estasListoBtn, LoginStyle.estasListoBtnActivo]} onPress={this.handleSubmit.bind(this)}>
					    	<Text  style={[LoginStyle.btnEstasListo, LoginStyle.btnEstasListoActivo]}>!Hecho!</Text>
					    </TouchableOpacity>
			    	}
				    
				</View>    
			</ScrollView>
		)
	}
	updateState(id, estado, restricciones){
		let categoria = this.state.categoria.map((item, key)=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({categoria})
 
	}
	selecciona(){
		 
		Alert.alert(
		  'Selecciona al menos una categoria',
		  '',
		  [
		    {text: 'OK', onPress: () => console.log('OK Pressed')},
		  ],
		  { cancelable: false }
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		console.log(this.state.restriccionArray)
		axios.put('/x/v1/user/categoria', {categorias:this.state.restriccionArray})
		.then(e=>{
			if (e.data.code===1) {
				navigate('inicio') 
			}else{
				Alert.alert(
				  'Opss!! revisa tus datos que falta algo',
				  '',
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

 








