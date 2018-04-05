import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, Picker, ImageBackground} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';



export default class editPerfilComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null,
		selectedValue:'YY',
		textNombre:null
	  };
	}
	render(){
		return(
			<View style={LoginStyle.fondo} >
				<View>
					<Image
						style={LoginStyle.image}
						width={410}
						source={require('./encabezado.png')}
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
			    <TextInput
			        style={LoginStyle.input}
			        onChangeText={(textCiudad) => this.setState({textCiudad})}
			        value={this.state.textCiudad}
			        underlineColorAndroid='transparent'
           			placeholder="Ciudad"
           			placeholderTextColor="#8F9093" 
			    />	
			    <TextInput
			        style={LoginStyle.input}
			        onChangeText={(textTelefono) => this.setState({textTelefono})}
			        value={this.state.textTelefono}
			        underlineColorAndroid='transparent'
           			placeholder="Telefono"
           			placeholderTextColor="#8F9093" 
			    />	
			    <View style={LoginStyle.date}>
				    <View style={LoginStyle.containDatePicker}>
					    <Picker
			                selectedValue={this.state.textMonth}
			                onValueChange={(textMonth) => this.setState({textMonth})}
			                style={LoginStyle.datePicker}
			              >
			              <Picker.Item label='01' value='01'  />
			              <Picker.Item label='02' value='02'  />
			              <Picker.Item label='03' value='03'  />
			              <Picker.Item label='04' value='04'  />
			              <Picker.Item label='05' value='05'  />
			              <Picker.Item label='06' value='06'  />
			              <Picker.Item label='07' value='07'  />
			              <Picker.Item label='08' value='08'  />
			              <Picker.Item label='09' value='09'  />
			              <Picker.Item label='10' value='10' />
			              <Picker.Item label='11' value='11' />
			              <Picker.Item label='12' value='12' />
			            </Picker>
			        </View>
			        <View style={LoginStyle.containDatePicker}>
			            <Picker
			                selectedValue={this.state.textDate}
			                onValueChange={(textDate) => this.setState({textDate})}
			                style={LoginStyle.datePicker}
			              >
			              <Picker.Item label='01' value='01' />
			              <Picker.Item label='02' value='02' />
			              <Picker.Item label='03' value='03' />
			              <Picker.Item label='04' value='04' />
			              <Picker.Item label='05' value='05' />
			              <Picker.Item label='06' value='06' />
			              <Picker.Item label='07' value='07' />
			              <Picker.Item label='08' value='08' />
			              <Picker.Item label='09' value='09' />
			              <Picker.Item label='10' value='10' />
			              <Picker.Item label='11' value='11' />
			              <Picker.Item label='12' value='12' />
			              <Picker.Item label='13' value='13' />
			              <Picker.Item label='14' value='14' />
			              <Picker.Item label='15' value='15' />
			              <Picker.Item label='16' value='16' />
			              <Picker.Item label='17' value='17' />
			              <Picker.Item label='18' value='18' />
			              <Picker.Item label='19' value='19' />
			              <Picker.Item label='20' value='20' />
			              <Picker.Item label='21' value='21' />
			              <Picker.Item label='22' value='22' />
			              <Picker.Item label='23' value='23' />
			              <Picker.Item label='24' value='24' />
			              <Picker.Item label='25' value='25' />
			              <Picker.Item label='26' value='26' />
			              <Picker.Item label='27' value='27' />
			              <Picker.Item label='28' value='28' />
			              <Picker.Item label='29' value='29' />
			              <Picker.Item label='30' value='30' />
			            </Picker>
			        </View>    
			        <View style={LoginStyle.containDatePickerYear}>    
			            <Picker
			                selectedValue={this.state.textYear}
			                onValueChange={(textYear) => this.setState({textYear})}
			                style={LoginStyle.datePicker}
			            >
			            <Picker.Item label='1980' value='1980' />
			            <Picker.Item label='1981' value='1981' />
			            <Picker.Item label='1982' value='1982' />
			            <Picker.Item label='1983' value='1983' />
			            <Picker.Item label='1984' value='1984' />
			            <Picker.Item label='1985' value='1985' />
			            <Picker.Item label='1986' value='1986' />
			            <Picker.Item label='1987' value='1987' />
			            <Picker.Item label='1988' value='1988' />
			            <Picker.Item label='1989' value='1989' />
			            <Picker.Item label='1990' value='1990' />
			            <Picker.Item label='1991' value='1991' />
			            <Picker.Item label='1992' value='1992' />
			            <Picker.Item label='1993' value='1993' />
			            <Picker.Item label='1994' value='1994' />
			            <Picker.Item label='1995' value='1995' />
			            <Picker.Item label='1996' value='1996' />
			            <Picker.Item label='1997' value='1997' />
			            <Picker.Item label='1998' value='1998' />
			            <Picker.Item label='1999' value='1999' />
			            <Picker.Item label='2000' value='2000' />
			            </Picker>
			        </View>    
	            </View>	
	            <View style={LoginStyle.containDatePickerGenero}> 
					<Picker
						selectedValue={this.state.textGenero}
						onValueChange={(textGenero) => this.setState({textGenero})}
						style={LoginStyle.genero}
					>
					<Picker.Item label='Genero'/>
					<Picker.Item label='Femenino' value='f' />
					<Picker.Item label='Masculino' value='m' />
		            </Picker>	
		        </View>  
			    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
			    	<Text  style={LoginStyle.btnRegistro}>Editar</Text>
			    </TouchableOpacity>
		    </View>
		)
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		const {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero} = this.state
		navigate('editPerfil1', {textNombre, textApellido, textCiudad, textTelefono, textMonth, textDate, textYear, textGenero})
 
	}
	 
}

 








