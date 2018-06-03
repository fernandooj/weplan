import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import ImagePicker from 'react-native-image-picker';



/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class TakePhotoComponent extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
		avatarSource: null,
		videoSource: null,
		imagen:{}
	  };
	}
	selectPhotoTapped() {
		const options = {
		  quality: 1.0,
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
		    var imagen = {
			    uri: response.uri,
			    type: response.type,
			    name: response.fileName,
			    path: response.path
			};
			this.props.updateImagen(imagen)
		    this.setState({
		      avatarSource: source,
		      imagen
		    });
		  }
		});
	}
	render(){

		return (
			<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{flex: .4}}>
				<View>
					{ this.state.avatarSource === null ?<Image
						style={{flex: 1}}
						width={this.props.ancho}
						height={this.props.alto}
						source={{uri : URL+'public/images/'+this.props.fuente }}
					/>
					:<Image 
						width={!this.props.sinBorder ?this.props.ancho :this.props.ancho2} 
						height={!this.props.sinBorder ?this.props.alto :this.props.alto2} 
						style={!this.props.sinBorder ?{flex:1, borderRadius:this.props.ancho/2}: {flex:1}} 
						source={this.state.avatarSource}
					/>
					}
					</View>
			</TouchableOpacity>
		); 
	}
}