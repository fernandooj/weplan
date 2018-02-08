import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableHighlight, TextInput, ScrollView, Picker, ImageBackground, StyleSheet, PixelRatio} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';


export default class editPerfilComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null
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
	selectPhotoTapped() {
		const options = {
		  quality: 1.0,
		  maxWidth: 500,
		  maxHeight: 500,
		  storageOptions: {
		    skipBackup: true
		  }
		};

		ImagePicker.showImagePicker(options, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled photo picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    let source = { uri: response.uri };

		    // You can also display the image using data:
		    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

		    this.setState({
		      avatarSource: source
		    });
		  }
		});
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
				    <Picker
		                selectedValue={this.state.selectedValue}
		                onValueChange={this.handleChangeOption}
		                style={LoginStyle.datePicker}
		              >
		              <Picker.Item label='01' value='1'  />
		              <Picker.Item label='02' value='2' />
		            </Picker>
		            <Picker
		                selectedValue={this.state.selectedValue}
		                onValueChange={this.handleChangeOption}
		                style={LoginStyle.datePicker}
		              >
		              <Picker.Item label='01' value='1' />
		              <Picker.Item label='01' value='2' />
		            </Picker>
		            <Picker
		                selectedValue={this.state.selectedValue}
		                onValueChange={this.handleChangeOption}
		                style={LoginStyle.datePicker}
		              >
		              <Picker.Item label='2000' value='1' />
		              <Picker.Item label='2001' value='2' />
		            </Picker>
		            </View>	
		             <Picker
		                selectedValue={this.state.selectedValue}
		                onValueChange={this.handleChangeOption}
		                style={LoginStyle.genero}
		              >
		              <Picker.Item label='Genero'/>
		              <Picker.Item label='Femenino' value='m' />
		              <Picker.Item label='Masculino' value='f' />
		            </Picker>	 
		            <TouchableHighlight onPress={this.selectPhotoTapped.bind(this)}>
			          <View style={[LoginStyle.avatarContainer, LoginStyle.avatar]}>
			          { this.state.avatarSource === null ? <Image
							style={LoginStyle.image}
							width={120}
							 // height will be calculated automatically
							source={require('./foto.png')}
					   /> :
			            <Image width={120} style={LoginStyle.avatar} source={this.state.avatarSource} />
			          }
			          </View>
			        </TouchableHighlight>
			        <TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Contraseña"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <TextInput
				        style={LoginStyle.input}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        underlineColorAndroid='transparent'
	           			placeholder="Repetir Contraseña"
	           			placeholderTextColor="#8F9093" 
				    />	
				    <TouchableHighlight  style={LoginStyle.submit} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.textSubmit}>Editar</Text>
				    </TouchableHighlight>
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
		const username = this.props.navigation.state['params']
		console.log(username)
		let token = this.state.text;

		axios.post('/x/v1/user/token', {username, token})
		.then((res)=>{
			console.log(res.data)
			let data = res.data.status
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	 
}

 








