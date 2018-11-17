import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, Linking} from 'react-native'
import axios from 'axios'
 
let screen = Dimensions.get('window'); 
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 
const style = StyleSheet.create({ 
	contenedor:{
		position:"absolute",
		top:0,
		left:0,
		width:screen.width,
		height:screen.height,
		backgroundColor:"rgba(0,0,0,.5)",
		zIndex:1000,
		justifyContent:"center",
		
		paddingHorizontal:40
	},
	subContenedor:{
		backgroundColor:"#ffffff",
		alignItems :"center",
		borderWidth:2,
		borderColor:"rgba(100,100,100,.5)"
	},
	texto:{
		fontSize:22,
		color:"#9b9b9b",
		alignItems :"center",
		textAlign:"center",
		fontFamily:'Futura-CondensedLight',
		padding:20
	},
	btn:{
		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		width:"50%",
 		borderRadius:10,
 		padding:5,
 		paddingTop:8,
 		paddingBottom:8,
 		marginTop:12,
 		marginBottom:22
	},
	btnText:{
		color:"#ffffff"
	}
})
export default class UltimaVersionComponent extends Component{
	render(){
		return(	 
			<View style={style.contenedor}>
			<View style={style.subContenedor}>
				<Text style={style.texto}>{this.props.mensaje}</Text>
				{
					Platform.OS==='android' 
					?<TouchableOpacity style={style.btn} onPress={() => Linking.openURL('market://details?id=com.weplan&hl=es')}>
					  	<Text style={style.btnText}>Actualizar</Text>
					</TouchableOpacity>
					:<TouchableOpacity style={style.btn} onPress={() => Linking.openURL('https://itunes.apple.com/us/developer/uriel-fernando-ortiz/id1421335317')}>
					  	<Text style={style.btnText}>Actualizar</Text>
					</TouchableOpacity>
				}
			</View>	 	
			</View> 
		)
	}
	 
}