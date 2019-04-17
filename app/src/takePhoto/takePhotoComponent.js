import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Alert, Platform, StyleSheet} from 'react-native'
import ImagePicker 	from 'react-native-image-picker';
import ImagePicker2 from 'react-native-image-crop-picker';



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
		imagen:{},
	  };
	}
	selectPhotoTappedAndroid() {
		const options = {
			title:'',
			cancelButtonTitle:'Cancelar',
			takePhotoButtonTitle:'Tomar Foto',
			chooseFromLibraryButtonTitle:'Buscar en imagenes',
			quality: 0.9,
			maxWidth: 1024,
			maxHeight: 1400,
			allowsEditing:true,
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
		  	} else {
		  		if (response.width<720) {
	  				Alert.alert(
					  	'El tamaño de la imagen es muy pequeño',
					  	'debe ser mayor a 720px de ancho',
					  	[
					    	{text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({iconCreate:false})}},
					  	],
					  	{ cancelable: false }
					)
		  		}else{
			  		let source = { uri: response.uri };
				    var imagen = {
					    uri:  response.uri,
					    type: response.type ?response.type :'image/jpeg',
					    name: response.fileName ?response.fileName :`imagen.jpg`,
					    path: response.path
					};
					this.props.updateImagen(imagen)
				    this.setState({
				      avatarSource: source,
				      imagen
				    });
		  		}
		  	}
		});
	}
	selectType(){

	}
	selectPhotoTappedIos(){
		const options = {
			// cancelButtonTitle:'Cancelar',
			// takePhotoButtonTitle:'Tomar Foto',
			// chooseFromLibraryButtonTitle:'Buscar en imagenes',
			compressImageMaxWidth: 800,
			compressImageMaxHeight: 800,
			width: 800,
  			height: 800,
			cropping: true,
			forgeJpg: true,
		};
		ImagePicker2.openPicker(options).then(response => {
			if (response) {
				let source = { uri: response.path };
			    let imagen = {
				    uri:  response.path,
				    type: response.mime ?response.mime :'image/jpeg',
				    name: response.fileName ?response.fileName :`imagen.jpg`,
				    path: response.path
				};
			
				this.props.updateImagen(imagen)
			    this.setState({
			      avatarSource: source,
			      imagen,
			      showImg:true,
			      showAlert:false,
			    });
			    if (this.props.img1) {
					this.props.img1(true)
				}
				if (this.props.img2) {
					this.props.img2(true)
				}
			}
		});
	}	
	selectCameraTappedIos(){
		const options = {
			// cancelButtonTitle:'Cancelar',
			// takePhotoButtonTitle:'Tomar Foto',
			// chooseFromLibraryButtonTitle:'Buscar en imagenes',
			compressImageMaxWidth: 800,
			compressImageMaxHeight: 800,
			width: 800,
  			height: 800,
			cropping: true,
			forgeJpg: true,
		};
		ImagePicker2.openCamera(options).then(response => {
		   if (response) {
				let source = { uri: response.path };
			    let imagen = {
				    uri:  response.path,
				    type: response.mime ?response.mime :'image/jpeg',
				    name: response.fileName ?response.fileName :`imagen.jpg`,
				    path: response.path
				};
				this.props.updateImagen(imagen)
				console.log(imagen)
			    this.setState({
			      avatarSource: source,
			      imagen,
				  showImg:true,
			      showAlert:false,
			    });
			    if (this.props.img1) {
					this.props.img1(true)
				}
				if (this.props.img2) {
					this.props.img2(true)
				}
			}
		});

	}
	showContent(){
		this.setState({showImg:true})
		this.setState({showAlert:true})
		if (this.props.img1) {
			this.props.img1(false)
		}
		if (this.props.img2) {
			this.props.img2(false)
		}
	}
	cancel(){
		this.setState({showImg:false})
		this.setState({showAlert:false})
		if (this.props.img1) {
			this.props.img1(true)
		}
		if (this.props.img2) {
			this.props.img2(true)
		}
	}
	render(){
		const {sinBorder, ancho, alto, anchoDos, altoDos, fuente, fuente2, border} = this.props
		const {showImg, avatarSource, showAlert} = this.state
		let ruta = fuente2 ?fuente2 : `${URL}public/images/${fuente}`
 
		if(showImg){
			console.log(1)
			return (
				<View style={{flex: .4, width:"100%"}}>
					<TouchableOpacity onPress={Platform.OS==='android' ?this.selectPhotoTappedAndroid.bind(this) :()=>this.setState({showAlert:true, showImg:true })} >
						<View>
							{ 
								avatarSource === null 
								?<Image
									style={{flex: 1}}
									width={ancho}
									height={alto}
									source={{uri : ruta }}
								/>
								:<Image 
									width={!sinBorder ?ancho :ancho2} 
									height={!sinBorder ?alto :alto2} 
									style={!sinBorder ?{flex:1, borderRadius:border}: {flex:1}} 
									source={avatarSource}
								/>
							}
						</View>
					</TouchableOpacity>
					{
						showAlert
						&&<View style={style.contenedorBtn}>
							<TouchableOpacity style={style.Btn}  onPress={this.selectCameraTappedIos.bind(this)}><Text style={style.txt}>Tomar Foto</Text></TouchableOpacity>
							<TouchableOpacity style={style.Btn1} onPress={this.selectPhotoTappedIos.bind(this)}><Text style={style.txt}>Buscar en imagenes</Text></TouchableOpacity>
							<TouchableOpacity style={style.Btn2} onPress={()=> this.cancel()}><Text style={style.txt}>Cancelar</Text></TouchableOpacity>
						</View>
					}
					
				</View>
			); 
		}else{
			console.log(avatarSource)
			return (
				<TouchableOpacity onPress={Platform.OS==='android' ?this.selectPhotoTappedAndroid.bind(this) :()=>this.showContent()} style={{flex: .4}}>
					<View>
						{ 
							avatarSource === null 
							?<Image
								style={{flex: 1}}
								width={ancho}
								height={alto}
								source={{uri : ruta }}
							/>
							:<Image 
								width={!sinBorder ?ancho :ancho2} 
								height={!sinBorder ?alto :alto2} 
								style={!sinBorder ?{flex:1, borderRadius:border}: {flex:1}} 
								source={avatarSource}
							/>
						}
					</View>
				</TouchableOpacity>
			); 
		}
		
	}
}

const style = StyleSheet.create({
	contenedorBtn:{
		position:"absolute", 
		zIndex:1000, 
		width:"96%",
		left:0,
		marginHorizontal:"2%",
	},
	Btn:{
		padding:15,
		borderTopRightRadius:10,
		borderTopLeftRadius:10,
		textAlign:"center",
		alignItems:"center",
		backgroundColor:"#ffffff", 
		borderBottomWidth:1,
		borderBottomColor :"rgba(0,0,0,.1)"
	},
	Btn1:{
		padding:15,
		borderBottomRightRadius:10,
		borderBottomLeftRadius:10,
		textAlign:"center",
		alignItems:"center",
		backgroundColor:"#ffffff", 
	},
	Btn2:{
		marginTop:10,
		padding:15,
		borderRadius:10,
		textAlign:"center",
		alignItems:"center",
		backgroundColor:"#ffffff", 
	},
	txt:{
		color:"blue",
		fontFamily:'Futura-CondensedLight',
		fontSize:20
	}

})
