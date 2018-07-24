import React, {Component} 						 from 'react'
import {View, Text, TouchableOpacity, TextInput, CheckBox, Linking, Alert} from 'react-native'
import {LoginStyle} 							 from '../editPerfil/style'
import Image 									 from 'react-native-scalable-image';
import axios 									 from 'axios';

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import TakePhotoComponent 						from '../takePhoto/takePhotoComponent.js'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class editPerfilComponent1 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null,
		condiciones:false,
		photo:'',
		password:''
	  };
	}
	componentWillMount(){
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user._id)
			let id = res.data.user.user._id
			this.setState({id})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
	render(){
		console.log(this.state.condiciones)
		return(
			<View style={LoginStyle.fondo}>
				 
	           		<TakePhotoComponent fuente={'foto.png'} ancho={145} alto={10} updateImagen={(photo) => {this.setState({photo})}} />
	           	 
		        <TextInput
			        style={LoginStyle.input}
			        onChangeText={(textPassword) => this.setState({textPassword})}
			        value={this.state.textPassword}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry
			    />	
			    <TextInput
			        style={LoginStyle.input}
			        onChangeText={(textPassword1) => this.setState({textPassword1})}
			        value={this.state.textPassword1}
			        underlineColorAndroid='transparent'
           			placeholder="Repetir Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry
			    />	
			    <View style={LoginStyle.logos}>
			    	<CheckBox 
				    	onValueChange={(condiciones) => this.setState({condiciones})}
				    	value={this.state.condiciones}
			    	/>
			    	<TouchableOpacity onPress={()=>{ Linking.openURL('https://appweplan.com')}}>
			    		<Text style={LoginStyle.textoAcepto}>Acepto los terminos y condiciones</Text>
			    	</TouchableOpacity>
			    </View>
			    {
			    	this.state.condiciones
			    	?<TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.btnRegistro}>Guardar</Text>
				    </TouchableOpacity>
				    :<TouchableOpacity  style={LoginStyle.signup_btn_disabled}>
				    	<Text  style={LoginStyle.btnRegistroDisabled}>Guardar</Text>
				    </TouchableOpacity>
			    }
			    
		    </View>
		)
	}
 
	handleSubmit(){
		const {params} = this.props.navigation.state
		const {navigate} = this.props.navigation
		const {id, textPassword, photo} = this.state

		let nombre = params.textNombre + ' ' + params.textApellido
		let nacimiento = parseInt(params.textMonth) + '/' + parseInt(params.textDate) + '/' + parseInt(params.textYear)
		let ciudad = params.textCiudad
		let tipo = 'suscriptor'
		let pais = 10
		let password = textPassword
		
		let telefono = params.textTelefono
		let email = params.textEmail
		let sexo = params.textGenero
		let data = new FormData();
	
		data.append('nombre', nombre);
		data.append('email', email);
		data.append('nacimiento', nacimiento);
		data.append('ciudad', ciudad);
		data.append('tipo', tipo);
		data.append('pais', pais);
		data.append('password', password);
		data.append('sexo', sexo);
		data.append('telefono', telefono);
		data.append('imagen', photo);

 
		console.log({photo, nacimiento, ciudad, tipo, pais, password, sexo, telefono, email})
		if (photo==='' || password=='') {
			Alert.alert(
				'Opss!! revisa tus datos que falta algo',
				'El Avatar y la contraseña son obligatorios',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
				{ cancelable: false }
			)
		}else{
			axios({
			  method: 'put', //you can set what request you want to be
			  url: '/x/v1/user/update/'+id,
			  data: data,
			  headers: {
			   'Accept': 'application/json',
			    'Content-Type': 'multipart/form-data'
			  }
			})
			.then((res)=>{
	 
				if(res.data.status=="SUCCESS"){
					navigate('editPerfil2')
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		}

		
	}
}

 








