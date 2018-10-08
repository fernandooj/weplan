import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, AsyncStorage} from 'react-native'
import {style} from './style'
import Icon from 'react-native-fa-icons'; 
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class guiaInicio extends Component{
	constructor(props){
		super(props)
		this.state={
			number:8,
		}
	}
	componentWillMount(){
		const {number} = this.props
		this.setState({number})
	}

	render(){
		const {number} = this.state
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   HOME
		////////////////////////////////////////////////////////////////////////////////////////////////
		if (number===1) {
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor}>
						<Text style={[style.text1, style.familia]}> ¡Bienvenido a &nbsp; WePlan!</Text>
						<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:2})}>
							<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
						</TouchableOpacity>
					</View> 
					<Image source={require('../assets/images/guia_inicio/Recurso_1_3x.png')} style={style.image1} />
				</View> 
			)
		}else if (number===2){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_3_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>En ésta pestaña encontrarás los mejores Planes de tu ciudad!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:3})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_5_3x.png')} style={style.pulpo2} />
					<Image source={require('../assets/images/guia_inicio/Recurso_2_3x.png')} style={style.icono2} />
				</View> 
			)
		}else if (number===3){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_6_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡Aqui podras gestionar todas las cuentas pendientes de tus planes!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:4})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_5_3x.png')} style={style.pulpo2} />
					<Image source={require('../assets/images/guia_inicio/Recurso_2_3x.png')} style={style.icono3} />
				</View> 
			)
		}else if (number===4){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_6_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡En este lugar podras crear los palnes que desees, desde planes privados con tus amigos hasta promover públicamente tu negocio!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:5})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_9_3x.png')} style={style.pulpo4} />
					<Image source={require('../assets/images/guia_inicio/Recurso_16_3x.png')} style={style.icono4} />
				</View> 
			)
		}else if (number===5){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_14_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡Aquí podrás ver todos los planes a los que perteneces e ingresas a sus chats!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:6})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_12_3x.png')} style={style.pulpo5} />
					<Image source={require('../assets/images/guia_inicio/Recurso_15_3x.png')} style={style.icono5} />
				</View> 
			)
		}else if (number===6){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_14_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡Aquí podrás ver todos los planes a los que perteneces e ingresas a sus chats!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('home')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_18_3x.png')} style={style.pulpo6} />
					<Image source={require('../assets/images/guia_inicio/Recurso_19_3x.png')} style={style.icono6} />
				</View> 

			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   CHAT
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===7){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_22_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡Aquí podrás realizar encuestas y votaciones!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:8})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_23_3x.png')} style={style.pulpo7} />
					<Image source={require('../assets/images/guia_inicio/Recurso_21_3x.png')} style={style.icono7} />
				</View> 

			)
		}else if (number===8){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Image source={require('../assets/images/guia_inicio/Recurso_25_3x.png')} style={style.image2} />
						<Text style={[style.text2, style.familia]}>¡En éste lugar te presentamos todos los artículos del plan!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('chat')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_23_3x.png')} style={style.pulpo7} />
					<Image source={require('../assets/images/guia_inicio/Recurso_24_3x.png')} style={style.icono8} />
				</View> 

			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   ENCUESTAS
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===9){
			return(	 
				<View style={style.contenedor}>
					<View style={style.contenedor9}>
						<Icon name='angle-right' allowFontScaling style={style.iconRight9} />
						<Text style={[style.headerText9, style.familia]}>
							Mis Encuestas
						</Text>
					</View>
					<View style={style.subContenedor9}>
						<Text style={[style.text9, style.familia]}>¡Aquí podrás ver las encuestas que has realizado y sus resultados!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:10})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_30_3x.png')} style={style.pulpo9} />
				</View> 

			)
		}else if (number===10){
			return(	 
				<View style={style.contenedor}>
					<View style={style.contenedor10}>
						<Icon name='angle-right' allowFontScaling style={style.iconRight10} />
						<Text style={[style.headerText10, style.familia]}>
							Encuestas Publicadas
						</Text>
					</View>
					<View style={style.subContenedor9}>
						<Text style={[style.text9, style.familia]}>¡Aquí podrás ver todas las encuestas que han sido publicadas y participar en ellas si quieres!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('encuesta')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_7_3x.png')} style={style.pulpo10} />
					 
				</View> 

			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   ARTICULOS
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===11){
			return(	 
				<View style={style.contenedor}>
					<View style={style.contenedor9}>
						<Icon name='angle-right' allowFontScaling style={style.iconRight9} />
						<Text style={[style.headerText9, style.familia]}>
							Artículos pendientes
						</Text>
					</View>
					<View style={style.subContenedor9}>
						<Text style={[style.text9, style.familia]}>¡En ésta lista encontrarás los árticulos a los que has sido invitado, no olvides aceptarlos para ser parte de ellos!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:12})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_27_3x.png')} style={style.pulpo11} />
				</View> 

			)
		}else if (number===12){
			return(	 
				<View style={style.contenedor2}>
					<View style={style.subContenedor9}>
						<Text style={[style.text9, style.familia]}>¡En ésta lista encontrarás los artículos de los que haces parte!</Text>
					</View>
					<Image source={require('../assets/images/guia_inicio/Recurso_9_3x.png')} style={style.pulpo12} />
					<View style={style.contenedor12}>
						<Icon name='angle-right' allowFontScaling style={style.iconRight9} />
						<Text style={[style.headerText9, style.familia]}>
							Mis Artículos
						</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:13})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
				</View> 
			)
		}else if (number===13){
			return(	 
				<View style={style.contenedor2}>
					<View style={style.subContenedor9}>
						<Text style={[style.text9, style.familia]}>¡En ésta lista encontrarás los artículos que están disponibles en el plan!</Text>
					</View>
					<Image source={require('../assets/images/guia_inicio/Recurso_9_3x.png')} style={style.pulpo13} />
					<View style={style.contenedor12}>
						<Icon name='angle-right' allowFontScaling style={style.iconRight10} />
						<Text style={[style.headerText10, style.familia]}>
							Mis Artículos
						</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('articulo')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
				</View> 
			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   AJUSTES
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===14){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Text style={[style.text9, style.familia]}>¡En está pantalla puedes ajustar varias opciones como el método de pago, y agregar a tus amigos!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('ajustes')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_12_3x.png')} style={style.pulpo5} />
					<Image source={require('../assets/images/guia_inicio/Recurso_15_3x.png')} style={style.icono5} />
				</View> 
			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   PLANES
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===15){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Text style={[style.text9, style.familia]}>Planes Privados: ¡Crea tu plan, invita a tus amigos y comparte artículos y sus costos!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.setState({number:16})}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_30_3x.png')} style={style.pulpo9} />
				</View> 
			)
		}else if (number===16){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Text style={[style.text9, style.familia]}>Planes Públicos: ¡Promociona tu evento y selecciona el alcance de tu plan!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('crear_plan')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_30_3x.png')} style={style.pulpo9} />
				</View> 
			)
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////   WALLET
		////////////////////////////////////////////////////////////////////////////////////////////////
		else if (number===17){
			return(	 
				<View style={style.contenedor}>
					<View style={style.subContenedor2}>
						<Text style={[style.text9, style.familia]}>"MyWallet": En este menú encontrarás todos los artículos que compartes con tus amigos y su estado actual!</Text>
					</View>
					<TouchableOpacity style={style.btnSiguiente} onPress={()=>this.borrarGuia('wallet')}>
						<Text style={[style.txtSiguiente, style.familia]}>Siguiente</Text>
					</TouchableOpacity>
					<Image source={require('../assets/images/guia_inicio/Recurso_18_3x.png')} style={style.pulpo6} />
				</View> 
			)
		}
	}
	borrarGuia = async(screen) =>{
		 await AsyncStorage.setItem(screen, '1');
		 this.props.guia_inicio()
	}
}