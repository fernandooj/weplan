import React, {Component} 						 from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import {LoginStyle} 							 from '../editPerfil/style'
import Image 									 from 'react-native-scalable-image';
import axios 									 from 'axios';
import ImagePicker 								 from 'react-native-image-picker';

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
		photo:{}
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
		return(
				<View style={LoginStyle.fondo}>
					<View>
						<Image
							style={LoginStyle.image}
							width={400}
							source={require('./encabezado1.png')}
					    />
					</View> 
		           {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
		           			          <View style={[LoginStyle.avatarContainer, LoginStyle.avatar]}>
		           			          { this.state.avatarSource === null ?<TakePhotoComponent fuente={'./foto.png'} ancho={120} alto={120} style={LoginStyle.image} />
		           			            :<Image width={120} style={LoginStyle.avatar} source={this.state.avatarSource} />
		           			          }
		           			          </View>
		           			        </TouchableOpacity> */ }
		           	<TakePhotoComponent fuente={'foto.png'} ancho={170} alto={80} updateImagen={(photo) => {this.setState({photo})}} />
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
				    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.btnRegistro}>Editar</Text>
				    </TouchableOpacity>
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
		let sexo = params.textGenero
		let data = new FormData();
	
		data.append('nombre', nombre);
		data.append('nacimiento', nacimiento);
		data.append('ciudad', ciudad);
		data.append('tipo', tipo);
		data.append('pais', pais);
		data.append('password', password);
		data.append('sexo', sexo);
		data.append('imagen', photo);

		console.log(id)
		console.log({nombre, nacimiento, ciudad, tipo, pais, password, sexo, data} )
		  

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
			console.log(res)
			if(res.data.status=="SUCCESS"){
				navigate('editPerfil2')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}

 








