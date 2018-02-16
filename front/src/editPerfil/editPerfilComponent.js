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
		selectedValue:'YY'
	  };
	}
	componentWillMount(){
		axios.get('/x/v1/user/profile')
		.then((res)=>{
			console.log(res.data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
 
	render(){
		return(
			<ScrollView>
				<View style={LoginStyle.fondo}>
					<View>
						<Image
							style={LoginStyle.image}
							width={380}
							source={require('./encabezado.png')}
					    />
					</View>
					<TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Nombre"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Apellido"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Ciudad"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Telefono"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <View style={LoginStyle.date}>
					    <View style={LoginStyle.containDatePicker}>
						    <Picker
				                selectedValue={this.state.selectedValue}
				                onValueChange={this.handleChangeOption}
				                style={LoginStyle.datePicker}
				              >
				              <Picker.Item label='12' value='1'  />
				              <Picker.Item label='02' value='2' />
				            </Picker>
				        </View>
				        <View style={LoginStyle.containDatePicker}>
				            <Picker
				                selectedValue={this.state.selectedValue}
				                onValueChange={this.handleChangeOption}
				                style={LoginStyle.datePicker}
				              >
				              <Picker.Item label='30' value='1' />
				              <Picker.Item label='01' value='2' />
				            </Picker>
				        </View>    
				        <View style={LoginStyle.containDatePickerYear}>    
				            <Picker
				                selectedValue={this.state.selectedValue}
				                onValueChange={this.handleChangeOption}
				                style={LoginStyle.datePicker}
				            >
				            <Picker.Item label='2000' value='1' />
				            <Picker.Item label='2001' value='2' />
				            </Picker>
				        </View>    
		            </View>	
		            <View style={LoginStyle.containDatePickerGenero}> 
						<Picker
							selectedValue={this.state.selectedValue}
							onValueChange={this.handleChangeOption}
							style={LoginStyle.genero}
						>
						<Picker.Item label='Genero'/>
						<Picker.Item label='Femenino' value='m' />
						<Picker.Item label='Masculino' value='f' />
			            </Picker>	
			        </View>  
				    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.btnRegistro}>Editar</Text>
				    </TouchableOpacity>
			    </View>
			</ScrollView>
		)
	}
	handleChangeOption(val) {
	  if (val !== 0) {
	    this.setState({selectedValue: val});
	  }
	}
	handleSubmit(){
		const {navigate} = this.props.navigation
		navigate('editPerfil1') 
	}
	 
}

 








