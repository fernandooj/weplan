import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, ImageBackground, Alert, PickerIOS} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import ModalPicker from 'react-native-modal-picker'

const day  = [
	{label:1, key:0},
	{label:2, key:2},
	{label:3, key:3},
	{label:4, key:4},
	{label:5, key:5},
	{label:6, key:6},
	{label:7, key:7},
	{label:9, key:9},
	{label:10, key:10},
	{label:11, key:11},
	{label:12, key:12},
	{label:13, key:13},
	{label:14, key:14},
	{label:15, key:15},
	{label:16, key:16},
	{label:17, key:17},
	{label:18, key:18},
	{label:19, key:19},
	{label:20, key:20},
	{label:21, key:21},
	{label:22, key:22},
	{label:23, key:23},
	{label:24, key:24},
	{label:25, key:25},
	{label:26, key:26},
	{label:27, key:27},
	{label:28, key:28},
	{label:29, key:29},
	{label:30, key:30},
	{label:31, key:31}
]
const month = [
	{label:1, key:0},
	{label:2, key:2},
	{label:3, key:3},
	{label:4, key:4},
	{label:5, key:5},
	{label:6, key:6},
	{label:7, key:7},
	{label:8, key:8},
	{label:9, key:9},
	{label:10, key:10},
	{label:11, key:11},
	{label:12, key:12}
]
const year = [  
	{label:1950, key:0},
    {label:1951, key:1951},
    {label:1952, key:1952},
    {label:1953, key:1953},
    {label:1954, key:1954},
    {label:1955, key:1955},
    {label:1956, key:1956},
    {label:1957, key:1957},
    {label:1958, key:1958},
    {label:1959, key:1959},
    {label:1960, key:1960},
    {label:1961, key:1961},
    {label:1962, key:1962},
    {label:1963, key:1963},
    {label:1964, key:1964},
    {label:1965, key:1965},
    {label:1966, key:1966},
    {label:1967, key:1967},
    {label:1968, key:1968},
    {label:1969, key:1969},
    {label:1970, key:1970},
    {label:1971, key:1971},
    {label:1972, key:1972},
    {label:1973, key:1973},
    {label:1974, key:1974},
    {label:1975, key:1975},
    {label:1976, key:1976},
    {label:1977, key:1977},
    {label:1978, key:1978},
    {label:1979, key:1979},
    {label:1980, key:1980},
    {label:1981, key:1981},
    {label:1982, key:1982},
    {label:1983, key:1983},
    {label:1984, key:1984},
    {label:1985, key:1985},
    {label:1986, key:1986},
    {label:1987, key:1987},
    {label:1988, key:1988},
    {label:1989, key:1989},
    {label:1990, key:1990},
    {label:1991, key:1991},
    {label:1992, key:1992},
    {label:1993, key:1993},
    {label:1994, key:1994},
    {label:1995, key:1995},
    {label:1996, key:1996},
    {label:1997, key:1997},
    {label:1998, key:1998},
    {label:1999, key:1999},
    {label:2000, key:2000},
    {label:2001, key:2001}
]
const genero = [
	{label:'Masculino', key:1},
	{label:'Femenino', key:2}
]
export default class editPerfilComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null,
		selectedValue:'YY',
		textNombre:'',
		textTelefono:'',
		textApellido:'',
		textEmail:'',
		textGenero:'',
		textMonth:'',
		textDate:'',
		textYear:'',
		textCiudad:'',
		email:false,
		ciudad:[]
	  };
	}
	componentWillMount(){
		axios.get('/x/v1/ciu/ciudad')
		.then(e=>{
			let ciudad = e.data.ciudad.map((e, key)=>{
				return {
					label:e.label,
					key
				}
			})
			this.setState({ciudad})
		})
		axios.get('/x/v1/user/profile')
		.then(e=>{
			if (e.data.user.user.email==='false') {

			}else{
				this.setState({email:true})
			}
			 
		})
			
	}
	 
	render(){
		return(
			<ScrollView style={LoginStyle.contenedor} >
			<View style={LoginStyle.fondo} >
				<View>
					<Image
						style={LoginStyle.image}
						width={140}
						source={require('../login/logo.png')}
				    />
				</View>
				<TextInput
			        style={LoginStyle.input}
			        onChangeText={(textNombre) => this.setState({textNombre})}
			        value={this.state.textNombre}
			        underlineColorAndroid='transparent'
           			placeholder="Nombre"
           			placeholderTextColor="#8F9093" 
			    />	
			    <TextInput
			        style={LoginStyle.input}
			        onChangeText={(textApellido) => this.setState({textApellido})}
			        value={this.state.textApellido}
			        underlineColorAndroid='transparent'
           			placeholder="Apellido"
           			placeholderTextColor="#8F9093" 
			    />	
			    <View style={LoginStyle.containCiudad}>	
			     <View style={{  justifyContent:'space-around' }}>
				    <ModalPicker
		                data={this.state.ciudad}
		                initValue="Ciudad"
		                color='#8F9093'
			            font={15}
		                onChange={(e)=> this.setState({textCiudad:e.label})} 
		                style={LoginStyle.datePicker}
		            />
		          </View>
	            </View>
	            {
	            	this.state.email
	            	?<TextInput
				        style={LoginStyle.input}
				        onChangeText={(textTelefono) => this.setState({textTelefono})}
				        value={this.state.textTelefono}
				        underlineColorAndroid='transparent'
	           			placeholder="Telefono"
	           			placeholderTextColor="#8F9093" 
	           			keyboardType='numeric'
	           			maxLength={10} 
				    />	
				    :<TextInput
				        style={LoginStyle.input}
				        onChangeText={(textEmail) => this.setState({textEmail})}
				        value={this.state.textEmail}
				        underlineColorAndroid='transparent'
	           			placeholder="Email"
	           			placeholderTextColor="#8F9093" 
				    />	
	            }
			    
			    
			    <View style={LoginStyle.date}>
				    <View style={LoginStyle.containDatePicker}>
					{/* DIA */}
					    <ModalPicker
			                data={day}
			                initValue="Dia"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textDate:e.label})} 
			                style={LoginStyle.datePicker}
			            />
					    
			        </View>
			        <View style={LoginStyle.containDatePicker}>
			    	{/* MES */}
			            <ModalPicker
			                data={month}
			                initValue="Mes"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textMonth:e.label})} 
			                style={LoginStyle.datePicker}
			            />
			        </View>    
			        <View style={LoginStyle.containDatePickerYear}>   
			        {/* AÑO */} 
			            <ModalPicker
			                data={year}
			                initValue="Año"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textYear:e.label})} 
			                style={LoginStyle.datePicker}
			            />
			        </View>    
	            </View>	
	            <View style={LoginStyle.containDatePickerGenero}> 
	            	<ModalPicker
		                data={genero}
		                initValue="Genero"
		                color='#ffffff'
		                font={16}
		                onChange={(e)=> this.setState({textGenero:e.label})} 
		                style={LoginStyle.datePicker}
		            />
		        </View>  
			    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.btnRegistro}>Guardar</Text>
			    </TouchableOpacity>
		    </View>
		    </ScrollView>
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		const {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail} = this.state
		console.log({textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail})
		if (textNombre=='' || textApellido==''|| textCiudad==''||  textMonth==''|| textDate==''|| textYear==''|| textGenero=='') {
			Alert.alert(
				'Opss!! revisa tus datos que falta algo',
				'todos los campos son obligatorios',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
				{ cancelable: false }
			)
		}else{
			navigate('editPerfil1', {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail})
		}
		
		
 
	}
	 
}

 








