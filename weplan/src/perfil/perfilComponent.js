import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Picker} from 'react-native'
import {perfilStyle} from '../perfil/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
import DatePicker from 'react-native-datepicker'
import moment from 'moment' 
import ModalPicker from 'react-native-modal-picker'
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
			nombre:'',
			sexo:'',
			password:'',
			photo:'https://appweplan.com/public/assets/logo.png',
			fechaHoy:moment().format('YYYY-MM-DD h:mm'),
			imagen:false,
			exitoso:false,
			qr:false,
		}
	}
	componentWillMount(){
		/////////////////	OBTENGO EL PERFIL
		axios.get('/x/v1/user/profile') 
		.then((res)=>{
			console.log(res.data.user.user)
			let ciudad = res.data.user.user.ciudad ? res.data.user.user.ciudad :'Ciudad'
			let sexo = res.data.user.user.sexo ? res.data.user.user.sexo :'Genero'
			this.setState({nombre: res.data.user.user.nombre, apellido: res.data.user.user.apellido, ciudad, photo:res.data.user.user.photo, 
				nacimiento:res.data.user.user.nacimiento, sexo, id: res.data.user.user._id})
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
		const {perfil, imagen, ciudad, ciudades, sexo, photo, exitoso, nombre, qr} = this.state
		const {navigate} = this.props.navigation
		console.log(ciudad)
		let a=60
		let b=100
		if (perfil) {
			return(
				<View style={perfilStyle.perfil}>
					
					
					<View style={!imagen ?perfilStyle.avatar2 :perfilStyle.avatar3} >
						<TakePhotoComponent fuente={'camPerfil.png'} border={50} ancho={!imagen ?a :b} alto={!imagen ?a :b} updateImagen={(photo) => {this.setState({photo, imagen:true})}} />
					</View>

					{
						!imagen
						&&<Image source={{uri: photo}} style={perfilStyle.avatar} />
					}
						<TouchableOpacity style={perfilStyle.btnHecho} onPress={()=>this.setState({qr:true})} > 
							<Text style={perfilStyle.hecho}>mi codigo Qr</Text> 
						</TouchableOpacity> 
					{
						qr
						&&<QrComponent num={this.props.screenProps.num} close={()=>this.setState({qr:false})} />
					}
					<View style={imagen &&perfilStyle.inputs}>
					{/* NOMBRE */}
						<View style={perfilStyle.contenedorRegistros}>
							<Text style={perfilStyle.atributo}>Nombre</Text>
							<TextInput
						        style={perfilStyle.valor}
						        onChangeText={(nombre) => this.setState({nombre})}
						        value={nombre}
						        underlineColorAndroid='transparent'
			           			placeholder="Nombre"
			           			placeholderTextColor="#8F9093" 
						    />	
						</View>
						 
					{/* CIUDAD */}
						<View style={perfilStyle.contenedorRegistros}>
							<Text style={perfilStyle.atributo}>Ciudad</Text>
							<View style={perfilStyle.containCiudad}>	
						    {/*<Picker
				                style={perfilStyle.inputCiudad}
						        onValueChange={(ciudad) => this.setState({ciudad})}
						        selectedValue={this.state.ciudad}
				              >
				              <Picker.Item  label={ciudad} value={ciudad} />
					          {this.ciudad()}
				             </Picker>*/}
				             <ModalPicker
				                data={ciudades}
				                initValue={ciudad}
				                color='#8F9093'
					            font={15}
				                onChange={(e)=> this.setState({ciudad:e.label})} 
				                style={perfilStyle.inputCiudad}
				            />
				            </View>
						</View>

					{/* NACIMIENTO */}
						<View style={perfilStyle.contenedorRegistros}>
							<Text style={perfilStyle.atributo}>Nacimiento</Text>
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
								style={perfilStyle.date}
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
						<View style={perfilStyle.contenedorRegistros}>
							<Text style={perfilStyle.atributo}>Genero</Text>
							<View style={perfilStyle.containCiudad}>
								{/*<Picker
										selectedValue={this.state.genero}
										onValueChange={(genero) => this.setState({genero})}
										style={perfilStyle.inputCiudad}
									>
									<Picker.Item label={sexo==='f' ?'Femenino' :'Masculino'} style={perfilStyle.disabled} value={sexo==='f' ?'Femenino' :'Masculino'}    />
									{
										sexo==='m'
										?<Picker.Item label='Femenino'  value='f' />
										:<Picker.Item label='Masculino' value='m' />
									}
						        </Picker>*/}
						        <ModalPicker
					                data={generos}
					                initValue={sexo}
					                color='#8F9093'
					                font={16}
					                onChange={(e)=> this.setState({sexo:e.label})} 
					                style={perfilStyle.datePicker}
					            />
						    </View>	
						</View>
					
					{/* BOTON ENVIAR */}
					<View style={perfilStyle.containerHecho}>
						<TouchableOpacity style={perfilStyle.btnHecho} onPress={this.handleSubmit.bind(this)} > 
							<Text style={perfilStyle.hecho}>Hecho!</Text> 
						</TouchableOpacity> 
					</View>	
					{
			    		exitoso
				    	&&<Text style={perfilStyle.textAlert}>Datos Actualizados</Text>
				    	 
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
			<View style={perfilStyle.contenedor}>
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Perfil' />
				<ScrollView style={perfilStyle.subContenedor}>
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