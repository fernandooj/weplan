import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';



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
			title:'',
			// cancelButtonTitle:'Cancelar',
			// takePhotoButtonTitle:'Tomar Foto',
			// chooseFromLibraryButtonTitle:'Buscar en imagenes',
			compressImageQuality: 0.9,
			width: 900,
			height: 900,
 
			cropping: true
		 
		};
		ImagePicker.openPicker({
		  width: 800,
		  height: 800,
		  cropping: true
		}).then(image => {
		  console.log(image);
		});

		// ImagePicker.openPicker(options, (response) => {
		// 	console.log('Response = ', response);
 
		// 	if (response.didCancel) {
		// 		console.log('User cancelled photo picker');
		// 	}
		//     else if (response.error) {
		//     	console.log('ImagePicker Error: ', response.error);
		//     }
		//     else if (response.customButton) {
		//     	console.log('User tapped custom button: ', response.customButton);
		//   	} else {
		//   		if (response.width<720) {
	 //  				Alert.alert(
		// 			  	'El tamaño de la imagen es muy pequeño',
		// 			  	'debe ser mayor a 720px de ancho',
		// 			  	[
		// 			    	{text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
		// 			  	],
		// 			  	{ cancelable: false }
		// 			)
		//   		}else{
		// 	  		let source = { uri: response.uri };
		// 		    var imagen = {
		// 			    uri:  response.uri,
		// 			    type: response.type ?response.type :'image/jpeg',
		// 			    name: response.fileName ?response.fileName :`imagen.jpg`,
		// 			    path: response.path
		// 			};
		// 			this.props.updateImagen(imagen)
		// 		    this.setState({
		// 		      avatarSource: source,
		// 		      imagen
		// 		    });
		//   		}
		//   	}
		// });
	}
	render(){
		const {sinBorder, ancho, alto, anchoDos, altoDos, fuente, fuente2, border} = this.props
		let ruta = fuente2 ?fuente2 : `${URL}public/images/${fuente}`
		return (
			<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{flex: .4}}>
				<View>
					{ this.state.avatarSource === null ?<Image
						style={{flex: 1}}
						width={ancho}
						height={alto}
						source={{uri : ruta }}
					/>
					:<Image 
						width={!sinBorder ?ancho :ancho2} 
						height={!sinBorder ?alto :alto2} 
						style={!sinBorder ?{flex:1, borderRadius:border}: {flex:1}} 
						source={this.state.avatarSource}
					/>
					}
					</View>
			</TouchableOpacity>
		); 
	}
}