import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, ImageBackground, Alert, PickerIOS} from 'react-native'
import {style} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector'

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
	{label:'Enero', key:1},
	{label:'Febrero', key:2},
	{label:'Marzo', key:3},
	{label:'Abril', key:4},
	{label:'Mayo', key:5},
	{label:'Junio', key:6},
	{label:'Julio', key:7},
	{label:'Agosto', key:8},
	{label:'Septiembre', key:9},
	{label:'Octubre', key:10},
	{label:'Noviembre', key:11},
	{label:'Diciembre', key:12}
]
const year = [  
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
			console.log(e.data.user)
			if (e.data.user.user.email==='false' ||e.data.user.email==='false'  ) {

			}else{
				this.setState({email:true})
			}
			 
		})
			
	}
	 
	render(){
		const {textApellido, textNombre, ciudad, email, textEmail, textTelefono, textDate, nombreRequired, apellidoRequired, ciudadRequired, emailRequired, dateRequired, generoRequired} = this.state
		return(
			<ScrollView style={style.contenedor} >
			<View style={style.fondo} >
				<View>
					<Image
						style={style.image}
						width={140}
						source={require('../assets/images/logo.png')}
				    />
				</View>
				<TextInput
			        style={[style.input, style.familia]}
			        onChangeText={(textNombre) => this.setState({textNombre, nombreRequired:false})}
			        value={textNombre}
			        underlineColorAndroid='transparent'
           			placeholder="Nombre"
           			placeholderTextColor="#8F9093" 
			    />
			    {nombreRequired &&<Text style={[style.obligatorio, style.familia]}>Campo Obligatorio</Text>}	
			    <TextInput
			        style={[style.input, style.familia]}
			        onChangeText={(textApellido) => this.setState({textApellido, apellidoRequired:false})}
			        value={textApellido}
			        underlineColorAndroid='transparent'
           			placeholder="Apellido"
           			placeholderTextColor="#8F9093" 
			    />	
			    {apellidoRequired &&<Text style={style.obligatorio}>Campo Obligatorio</Text>}	
			    <View style={style.containCiudad}>	
			     <View style={{ justifyContent:'space-around' }}>
				    <ModalSelector
		                data={ciudad}
		                initValue="Ciudad"
		                color='#8F9093'
			            font={15}
		                onChange={(e)=> this.setState({textCiudad:e.label, ciudadRequired:false})} 
		                style={style.datePicker}
		                selectStyle={{borderWidth:0}}
		                cancelTextStyle={style.familia}
		                sectionTextStyle={style.familia}
		                selectTextStyle={[style.familia, {color:'#8F9093',textAlign:'left'}]}
		                optionTextStyle={style.familia}
		            >
		            
                    </ModalSelector>  
		          </View>
	            </View>
	             {ciudadRequired &&<Text style={style.obligatorio}>Campo Obligatorio</Text>}	
	            {
	            	email
	            	?<TextInput
				        style={[style.input, style.familia]}
				        onChangeText={(textTelefono) => this.setState({textTelefono, emailRequired:false})}
				        value={textTelefono}
				        underlineColorAndroid='transparent'
	           			placeholder="Telefono"
	           			placeholderTextColor="#8F9093" 
	           			keyboardType='numeric'
	           			maxLength={10} 
				    />	
				    :<TextInput
				        style={[style.input, style.familia]}
				        onChangeText={(textEmail) => this.setState({textEmail, emailRequired:false})}
				        value={textEmail}
				        underlineColorAndroid='transparent'
	           			placeholder="Email"
	           			placeholderTextColor="#8F9093" 
				    />	
	            }
			    {emailRequired &&<Text style={style.obligatorio}>Campo Obligatorio</Text>}	
			    <Text style={[style.textAlert, style.familia]}>Fecha de nacimiento</Text>
			    <View style={style.date}>
				    <View style={style.containDatePicker}>
					{/* DIA */}
					    <ModalSelector
			                data={day}
			                initValue="Dia"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textDate:e.label, dateRequired:false})} 
			                style={style.datePicker}
			                 selectStyle={{borderWidth:0}}
			                cancelTextStyle={style.familia}
			                sectionTextStyle={style.familia}
			                selectTextStyle={[style.familia, {color:'#ffffff'}]}
			                optionTextStyle={style.familia}
			            >
			            
	                    </ModalSelector>  
					    
			        </View>
			        <View style={style.containDatePicker}>
			    	{/* MES */}
			            <ModalSelector
			                data={month}
			                initValue="Mes"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textMonth:e.key, dateRequired:false})} 
			                style={style.datePicker}
			                 selectStyle={{borderWidth:0}}
			                cancelTextStyle={style.familia}
			                sectionTextStyle={style.familia}
			                selectTextStyle={[style.familia, {color:'#ffffff'}]}
			                optionTextStyle={style.familia}
			            />
			        </View>    
			        <View style={style.containDatePickerYear}>   
			        {/* AÑO */} 
			            <ModalSelector
			                data={year}
			                initValue="Año"
			                color='#ffffff'
			                font={16}
			                onChange={(e)=> this.setState({textYear:e.label, dateRequired:false})} 
			                style={style.datePicker}
			                selectStyle={{borderWidth:0}}
			                cancelTextStyle={style.familia}
			                sectionTextStyle={style.familia}
			                selectTextStyle={[style.familia, {color:'#ffffff'}]}
			                optionTextStyle={style.familia}
			            />
			        </View>    
	            </View>	
	            {dateRequired &&<Text style={style.obligatorio}>Campo Obligatorio</Text>}	
	            <View style={style.containDatePickerGenero}> 
	            	<ModalSelector
		                data={genero}
		                initValue="Genero"
		                color='#ffffff'
		                font={16}
		                onChange={(e)=> this.setState({textGenero:e.label, generoRequired:false})} 
		                style={style.datePicker}
		                selectStyle={{borderWidth:0}}
		                cancelTextStyle={style.familia}
		                sectionTextStyle={style.familia}
		                selectTextStyle={[style.familia, {color:'#ffffff'}]}
		                optionTextStyle={style.familia}
		            />
		        </View>  
		        {generoRequired &&<Text style={style.obligatorio}>Campo Obligatorio</Text>}	
			    <TouchableOpacity  style={style.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={[style.btnRegistro, style.familia]}>Guardar</Text>
			    </TouchableOpacity>
		    </View>
		    </ScrollView>
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		const {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail} = this.state
		
		if (textNombre==''){
			this.setState({nombreRequired:true})
		}else if(textApellido==''){
			this.setState({apellidoRequired:true})
		}else if(textCiudad==''){
			this.setState({ciudadRequired:true})
		}else if(textMonth==''){
			this.setState({dateRequired:true})
		}else if (textDate==''){
			this.setState({dateRequired:true})
		}else if(textYear==''){
			this.setState({dateRequired:true})
		}else if (textGenero=='') {
			this.setState({generoRequired:true})
		}else{
			 
			console.log({textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail})
			navigate('editPerfil1', {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero, textEmail})

		}
		
		
 
	}
	 
}

 








