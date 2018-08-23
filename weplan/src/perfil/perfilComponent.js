import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Picker} from 'react-native'
import {style} from '../perfil/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import DatePicker from 'react-native-datepicker'
import moment from 'moment' 
import ModalSelector from 'react-native-modal-selector'
import StarRating from 'react-native-star-rating';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
import TakePhotoComponent 	from '../takePhoto/takePhotoComponent.js'
import QrComponent from '../qr/qrComponent.js'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 
const generos = [
	{label:'Masculino', key:1},
	{label:'Femenino', key:2}
]
export default class perfilComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			perfil:[],
			ciudades:[],
			ciudad:'',
			calificacion:[],
			nombre:'',
			sexo:'',
			password:'',
			photo:'https://appweplan.com/public/assets/logo.png',
			fechaHoy:moment().format('YYYY-MM-DD h:mm'),
			imagen:false,
			exitoso:false,
			qr:false,
			saldo:0,
		}
	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data)
			let ciudad = res.data.user.user.ciudad ? res.data.user.user.ciudad :'Ciudad'
			let sexo = res.data.user.user.sexo ? res.data.user.user.sexo :'Genero'
			this.setState({nombre: res.data.user.user.nombre, apellido: res.data.user.user.apellido, ciudad, photo:res.data.user.user.photo, 
				nacimiento:res.data.user.user.nacimiento, sexo, id: res.data.user.user._id, calificacion: res.data.user.user.calificacion, saldo:res.data.saldo})
		})
		.catch((err)=>{
			console.log(err)
		})
		axios.get('/x/v1/ciu/ciudad')
		.then(e=>{
			let ciudades = e.data.ciudad.map((e, key)=>{
				return {
					label:e.label,
					key
				}
			})
			this.setState({ciudades})
		})
	}
	 
	 
 	renderPerfil(){
		const {perfil, imagen, ciudad, ciudades, sexo, photo, exitoso, nombre, qr, calificacion, saldo} = this.state
		const {navigate} = this.props.navigation
		console.log(ciudad)
		let a=60
		let b=100
		if (perfil) {
			return(
				<View style={style.perfil}>
					<View style={style.contenedorRegistros}>
						<View style={!imagen ?style.avatar2 :style.avatar3} >
							<TakePhotoComponent fuente={'camPerfil.png'} border={50} ancho={!imagen ?a :b} alto={!imagen ?a :b} updateImagen={(photo) => {this.setState({photo, imagen:true})}} />
						</View>

						{
							!imagen
							&&<Image source={{uri: photo}} style={style.avatar} />
						}
							<TouchableOpacity style={style.btnQr} onPress={()=>this.setState({qr:true})} > 
								<Text style={[style.hecho, style.familia]}>mi codigo Qr</Text> 
							</TouchableOpacity> 
					</View>
					{
						qr
						&&<QrComponent num={this.props.screenProps.num} close={()=>this.setState({qr:false})} />
					}

					<View style={style.contenedorRegistros}>
						<StarRating
					        disabled={false}
					        maxStars={5}
					        rating={(calificacion.reduce((a, b) => a + b, 0))/calificacion.length}
					        starSize={28}
					    />
					    <Text style={[style.calificacion, style.familia]}>{calificacion.length}</Text>
					</View>
					     
					<View style={imagen &&style.inputs}>
					{/* NOMBRE */}
						<View style={style.contenedorRegistros}>
							<Text style={[style.atributo, style.familia]}>Nombre</Text>
							<View style={style.containCiudad}>	
								<TextInput
							        style={[style.valor, style.familia]}
							        onChangeText={(nombre) => this.setState({nombre})}
							        value={nombre}
							        underlineColorAndroid='transparent'
				           			placeholder="Nombre"
				           			placeholderTextColor="#8F9093" 
							    />	
							</View>
						</View>
						 
					{/* CIUDAD */}
						<View style={style.contenedorRegistros}>
							<Text style={[style.atributo, style.familia]}>Ciudad</Text>
							<View style={style.containCiudad}>	
				            <ModalSelector
				                data={ciudades}
				                initValue={ciudad}
				                color='#8F9093'
					            font={15}
				                onChange={(e)=> this.setState({ciudad:e.label})} 
				                style={style.inputCiudad}
			                 	cancelTextStyle={style.familia}
				                sectionTextStyle={style.familia}
				                selectTextStyle={style.familia}
				                optionTextStyle={style.familia}
				            >
				            <TextInput
		                        style={style.familia}
		                        editable={false}
		                        value={ciudad} />
		                     </ModalSelector>    
				            </View>
						</View>

					{/* NACIMIENTO */}
						<View style={style.contenedorRegistros}>
							<Text style={[style.atributo, style.familia]}>Nacimiento</Text>
							<DatePicker
						   		maxDate={this.state.fechaHoy}
					    		customStyles={{
			                        dateInput: {
			                            borderLeftWidth: 0,
			                            borderRightWidth: 0,
			                            borderTopWidth: 0,
			                            borderBottomWidth: 0,
			                            alignItems: 'flex-start',
			                        },
			                        dateText: { 
			                        	color: '#969696'
			                        },
			                        btnTextConfirm: {
							            color: '#969696',
							         },
							         btnTextCancel: {
							            color: '#969696',
							        } 
			                    }}
								date={this.state.nacimiento}
								style={style.date}
								mode="date"
								placeholder="Mes / Dia / Año"
								format="DD-MM-YYYY"
								showIcon={false}
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								androidMode='spinner'
								onDateChange={(nacimiento) => {this.setState({nacimiento})}}
						   />
						</View>

					{/* GENERO */}
					<View style={style.contenedorRegistros}>
						<Text style={[style.atributo, style.familia]}>Genero</Text>
						<View style={style.containCiudad}>
					        <ModalSelector
				                data={generos}
				                initValue={sexo}
				                color='#8F9093'
				                font={16}
				                onChange={(e)=> this.setState({sexo:e.label})} 
				                style={style.inputCiudad}
				                cancelTextStyle={style.familia}
				                sectionTextStyle={style.familia}
				                selectTextStyle={style.familia}
				                optionTextStyle={style.familia}
				            >
				            <TextInput
		                        style={style.familia}
		                        editable={false}
		                        value={sexo} />
		                    </ModalSelector>    
					    </View>	
					</View>

					{/* SALDO */}
					<View style={style.contenedorRegistros}>
						<Text style={[style.atributo, style.familia]}>Saldo</Text>
						<View style={style.containCiudad}>
						    <TouchableOpacity>
						    	<Text  style={[style.valor, style.familia]}>{'$ '+Number(saldo).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
						    </TouchableOpacity>   
					    </View>	
					</View>
					
					{/* BOTON ENVIAR */}
					<View style={style.containerHecho}>
						<TouchableOpacity style={style.btnHecho} onPress={this.handleSubmit.bind(this)} > 
							<Text style={[style.hecho, style.familia]}>Hecho!</Text> 
						</TouchableOpacity> 
					</View>	
					{
			    		exitoso
				    	&&<Text style={style.textAlert}>Datos Actualizados</Text>
				    	 
				    }
					</View>
				</View>
			)
		}else{
			return(
				<Text>Cargando</Text>
			)
		}
		
	}
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Perfil' />
				<ScrollView style={style.subContenedor}>
					{this.renderPerfil()}
				</ScrollView>	
			</View> 
		)
	}
	handleSubmit(){
		const {nombre, ciudad, telefono, nacimiento, sexo, password, photo, imagen, id} = this.state
		console.log({nombre, ciudad, telefono, nacimiento, sexo, password, photo, imagen, id})
		let data = new FormData();
	
		data.append('nombre', nombre);
		data.append('nacimiento', nacimiento);
		data.append('ciudad', ciudad);
		data.append('sexo', sexo);
		data.append('imagen', photo);
		if (imagen===true) {
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
					this.setState({exitoso:true})
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		}else{
			axios.put('/x/v1/user/update/'+id, {nombre, ciudad, telefono, nacimiento, sexo,  photo})
			.then((res)=>{
				if(res.data.status=="SUCCESS"){
					this.setState({exitoso:true})
				}
			})
			.catch((err)=>{
				console.log(err)
			})
		}
	}
}