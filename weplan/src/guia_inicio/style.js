import {StyleSheet, Dimensions, Platform} from 'react-native';
var size = Dimensions.get('window');

export const style = StyleSheet.create({
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
		bottom:205,
		left:0	
 	},
 	icono2:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:27,
		left:15	
 	}, 	

 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 3
 	icono3:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:27,
		left:95	
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 4
 	pulpo4:{
 		width:100,
		height:100,
		position:'absolute',
		top:135,
		left:180	
 	},
 	icono4:{
 		width:50,
		height:53,
		position:'absolute',
		bottom:22,
		left:185	
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 5
 	pulpo5:{
 		width:90,
		height:110,
		position:'absolute',
		top:180,
		left:0,
		zIndex:50	
 	},
 	icono5:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:27,
		left:265
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 6
 	pulpo6:{
 		width:74,
		height:120,
		position:'absolute',
		bottom:180,
		left:20,
		zIndex:50	
 	},
 	icono6:{
 		width:50,
		height:50,
		position:'absolute',
		bottom:27,
		right:25
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 7
 	pulpo7:{
 		width:99,
		height:120,
		position:'absolute',
		top:180,
		right:50,
		zIndex:50	
 	},
 	icono7:{
 		width:50,
		height:50,
		position:'absolute',
		top:7,
		right:58
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 8
 	icono8:{
 		width:50,
		height:50,
		position:'absolute',
		top:7,
		right:4
 	},
 	//////////////////////////////////////////////////////////////////////
	//////////////  pantalla 9
	contenedor9:{
		backgroundColor:'#ffffff',
		paddingVertical:20,
		width:'100%',
		flexDirection:'row',
		top:-130,
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
		top:-75,
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
})




