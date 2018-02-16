import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, Picker, ImageBackground, StyleSheet, PixelRatio} from 'react-native'
import {LoginStyle} from '../editPerfil/style'
import Image from 'react-native-scalable-image';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';


export default class editPerfilComponent1 extends Component{
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
				<View style={LoginStyle.fondo}>
					<View>
						<Image
							style={LoginStyle.image}
							width={380}
							source={require('./encabezado1.png')}
					    />
					</View> 
		            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
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
			        </TouchableOpacity>
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
				    <TouchableOpacity  style={LoginStyle.signup_btn} onPress={this.handleSubmit.bind(this)}>
				    	<Text  style={LoginStyle.btnRegistro}>Editar</Text>
				    </TouchableOpacity>
			    </View>
		)
	}
	handleChangeOption(val) {
  if (val !== 0) {
    this.setState({selectedValue: val});
  }
}
	handleSubmit(){
	const {navigate} = this.props.navigation
	navigate('editPerfil2') 
	}
	 
}

 








