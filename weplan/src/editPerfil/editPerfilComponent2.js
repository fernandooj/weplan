import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity,  ScrollView,  Alert} from 'react-native'
import {style} from '../editPerfil/style'
//import Image from 'react-native-scalable-image';
import axios from 'axios';
 
import QrComponent from '../qr/qrComponent.js'

export default class editPerfilComponent2 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		    restriccionArray:[],
		    categoria:[],
		    activo:false,
		    qr:true
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
				<TouchableOpacity key={key} style={style.touchRes} 
					onPress={(index)=> {this.updateState(e.id, e.estado); this.updateStateRestriccion(e.id, e.estado)} }>
					<Image source={{ uri: e.icon}} style={style.iconRes} />
					{
						e.estado
						?<Image source={require('../assets/images/categoriaCheck.png')} style={style.banRes} />
						:<Image source={require('../assets/images/categoriaCheckDisable.png')} style={style.banRes} />
					}
					<Text style={style.textoRes}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		const {activo, qr} = this.state
		console.log(this.state.restriccionArray.length)
		return(
			<ScrollView style={style.fondoUltimo}>
			{
				qr
				&&<QrComponent num={this.props.screenProps.num} close={()=>this.setState({qr:false})} />
			}
				
				<View style={style.contenedorRes}>
						<Image
							style={style.image2}
							source={require('../assets/images/eligePlanTitulo.png')}
					    />
			    </View>
			    <View style={style.contenedorCofres}>
			    	{this.renderCategoria()}
			    </View>
			    
			    <View style={style.contenedorBtnlisto}>
			    	{
			    		this.state.restriccionArray.length<3
			    		?<TouchableOpacity  style={style.estasListoBtn} onPress={this.selecciona.bind(this)}>
					    	<Text  style={style.btnEstasListo}>!Estas Listo!</Text>
					    </TouchableOpacity>
					    :<TouchableOpacity  style={[style.estasListoBtn, style.estasListoBtnActivo]} onPress={this.handleSubmit.bind(this)}>
					    	<Text  style={[style.btnEstasListo, style.btnEstasListoActivo]}>!Estas Listo!</Text>
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
		  'Selecciona al menos tres categorias',
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

 








