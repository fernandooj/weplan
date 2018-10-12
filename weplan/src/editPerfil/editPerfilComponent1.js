import React, {Component} 	from 'react'
import {View, Text, TouchableOpacity, Dimensions,
TextInput, Linking, Alert}  from 'react-native'
import {style} 				from '../editPerfil/style'
import Image 				from 'react-native-scalable-image';
 
import axios 				from 'axios';
import Icon 				from 'react-native-fa-icons';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import TakePhotoComponent 						from '../takePhoto/takePhotoComponent.js'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const size = Dimensions.get('window');
export default class editPerfilComponent1 extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null,
		photo:'',
		textPassword:''
	  };
	}
	componentWillMount(){
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user)
			let id = res.data.user.user._id
			this.setState({id})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
	render(){
		const {showPassword, textPassword, textPassword1, perfil, passwordRequired} = this.state
		let ancho = size>=361 ? 80 :173
		let alto = size>=361 ? 10 :1
		return(
			<View style={style.fondo}> 
					<Text style={{marginTop:50}}>  </Text>
	           		<TakePhotoComponent fuente={'foto.png'} ancho={ancho} alto={alto} updateImagen={(photo) => {this.setState({photo})}} border={70} />
		       	{perfil &&<Text style={style.obligatorio}>Foto de perfil Obligatorio</Text>}
		        <TextInput
			        style={[style.input, style.familia]}
			        onChangeText={(textPassword) => this.setState({textPassword})}
			        value={textPassword}
			        underlineColorAndroid='transparent'
           			placeholder="Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry={showPassword ?false :true}
			    />	
			   
		     	<TouchableOpacity onPress={()=>this.setState({showPassword:!this.state.showPassword})} style={style.BtniconPass}> 
			    	<Icon name={showPassword ?'eye-slash' :'eye'} allowFontScaling style={style.iconPass} />
			    </TouchableOpacity>
			    <TextInput
			        style={[style.input, style.familia]}
			        onChangeText={(textPassword1) => this.setState({textPassword1})}
			        value={textPassword1}
			        underlineColorAndroid='transparent'
           			placeholder="Repetir Contraseña"
           			placeholderTextColor="#8F9093" 
           			secureTextEntry={showPassword ?false :true}
			    />	
			    {passwordRequired &&<Text style={style.obligatorio}>Password Obligatorio</Text>}
		    	<TouchableOpacity  style={style.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={[style.btnRegistro, style.familia]}>Guardar</Text>
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
		if (photo==='') {
			this.setState({perfil:true})
		}else if(password===''){
			this.setState({passwordRequired:true})
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

 








