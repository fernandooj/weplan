import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
var size = Dimensions.get('window');

export const style = MediaQueryStyleSheet.create({
	contenedor:{
		position:'absolute',
		backgroundColor:'rgba(0,0,0,.5)',
		width:size.width,
		height:size.height,
		zIndex:1000,
		justifyContent:'center',
		alignItems:'center',
	},
	contenedor2:{
		position:'absolute',
		backgroundColor:'rgba(0,0,0,.5)',
		width:size.width,
		height:size.height,
		zIndex:1000,
		alignItems:'center',
	},
	subContenedor:{
		alignItems:'center',
		width:'90%'
	},


	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 1
	text1:{
		fontSize:65,
		color:'white',
		textAlign:'right',
		lineHeight:66
	},
	image1:{
		width:165,
		height:200,
		position:'absolute',
		bottom:25,
		left:0		
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
 	btnSiguiente:{
 		alignSelf: 'flex-end',
 		backgroundColor:'rgba(255,255,255,.5)',
 		paddingVertical:7,
 		paddingHorizontal:40,
 		borderRadius:40,
 	},
 	txtSiguiente:{
 		color:'black',
 		fontSize:27
 	},

 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 2
	subContenedor2:{
		flexDirection:'row',
		alignItems:'center',
		width:'90%',
		backgroundColor:'#ffffff',
		paddingVertical:20,
		paddingLeft:20,
		borderRadius:60,
		zIndex:100,
		marginBottom:10
	},
 	image2:{
 		width:70,
 		height:70
 	},
 	text2:{
 		fontSize:25,
 		paddingHorizontal:10,
 		width:'80%'
 	},
 	pulpo2:{
 		width:75,
		height:100,
		position:'absolute',
		bottom:Platform.OS==='android' ?205 :200,
		left:0	
 	},
 	icono2:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:Platform.OS==='android' ?27 :2,
		left:Platform.OS==='android' ?15 :5,	
 	}, 	

 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 3
 	icono3:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:Platform.OS==='android' ?27 :2,
		left:Platform.OS==='android' ?95 :78,	
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 4
 	pulpo4:{
 		width:100,
		height:100,
		position:'absolute',
		top:Platform.OS==='android' ?125 :110,
		left:180	
 	},
 	icono4:{
 		width:50,
		height:53,
		position:'absolute',
		bottom:Platform.OS==='android' ?27 :2,
		left:Platform.OS==='android' ?185 :165,	
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 5
 	pulpo5:{
 		width:90,
		height:110,
		position:'absolute',
		top:Platform.OS==='android' ?180 :170,
		left:0,
		zIndex:50	
 	},
 	icono5:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:Platform.OS==='android' ?27 :2,
		left:Platform.OS==='android' ?265 :248,	
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 6
 	pulpo6:{
 		width:74,
		height:120,
		position:'absolute',
		bottom:Platform.OS==='android' ?180 :170,
		left:20,
		zIndex:50	
 	},
 	icono6:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:Platform.OS==='android' ?27 :2,
		right:Platform.OS==='android' ?25 :20,
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 7
 	pulpo7:{
 		width:99,
		height:120,
		position:'absolute',
		top:Platform.OS==='android' ?180 :170,
		right:Platform.OS==='android' ?50 :40,
		zIndex:50	
 	},
 	icono7:{
 		width:50,
		height:50,
		position:'absolute',
		top:Platform.OS==='android' ?7 :23,
		right:58
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 8
 	icono8:{
 		width:50,
		height:50,
		position:'absolute',
		top:Platform.OS==='android' ?7 :23,
		right:4
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 9
	contenedor9:{
		backgroundColor:'#ffffff',
		paddingVertical:20,
		width:'100%',
		flexDirection:'row',
		top:Platform.OS==='android' ?-130 :-100,
	},
	subContenedor9:{
		flexDirection:'row',
		alignItems:'center',
		width:'80%',
		backgroundColor:'#ffffff',
		paddingVertical:20,
		marginLeft:20,
		paddingLeft:10,
		borderRadius:60,
		zIndex:100,
		marginBottom:10
	},
	iconRight9:{
		fontSize:23,
		paddingHorizontal:2,
		marginLeft:30,
		color: '#8796F4',
	},
	headerText9:{
		color: '#8796F4',
		paddingHorizontal:10,
		fontSize:20
	},
	
	text9:{
 		fontSize:25,
 		paddingHorizontal:10,
 		width:'99%'
 	},
 	pulpo9:{
 		width:100,
		height:150,
		position:'absolute',
		bottom:170,
		left:0
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 10
	contenedor10:{
		backgroundColor:'#ffffff',
		paddingVertical:20,
		width:'100%',
		flexDirection:'row',
		top:Platform.OS==='android' ?-75 :-45,
	},
	iconRight10:{
		fontSize:23,
		paddingHorizontal:2,
		marginLeft:30,
		color: '#AFE1F2',
	},
	headerText10:{
		color: '#AFE1F2',
		paddingHorizontal:10,
		fontSize:20
	},
	pulpo10:{
 		width:130,
		height:150,
		position:'absolute',
		bottom:130,
		left:5
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 11
	pulpo11:{
 		width:120,
		height:150,
		position:'absolute',
		bottom:130,
		left:5
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 12
	contenedor12:{
		backgroundColor:'#ffffff',
		paddingVertical:20,
		width:'100%',
		flexDirection:'row',
		marginBottom:31
	},
	pulpo12:{
 		width:70,
		height:70,
		left:-90,
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 13
	pulpo13:{
 		width:70,
		height:70,
		marginTop:28,
		left:-90,
 	},
},{
	"@media (max-device-width: 320)": {
		 
	},
	"@media (device-height: 812)": {
		pulpo2:{
			bottom:275,	
	 	},
		pulpo4:{	 		 
			top:184,
			left:150	
	 	},
	 	pulpo5:{
			top:243,
			left:0,	
	 	},
	 	pulpo6:{
			bottom:230,	
	 	},
	 	pulpo7:{
			top:242,
			right:50,	
	 	},
	 	icono7:{
			top:38,
			right:55
	 	},
	 	icono8:{
			top:38,
	 	},
	 	contenedor9:{
			top:-170,
		},
		pulpo9:{
			bottom:220,
	 	},
	 	contenedor10:{
			top:-115,
		},
		pulpo10:{
			bottom:190,
	 	},
	 	pulpo11:{
			bottom:180,
	 	},
	}
})



