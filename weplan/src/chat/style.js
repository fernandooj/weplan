import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const ChatStyle = StyleSheet.create({ 
 	contenedorGeneral:{
 		flex:1,
 	},

 	////////////////// cabezera
 	cabezera:{
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'space-between',
		backgroundColor:"#758BFC",
		borderWidth: 0,
		borderBottomWidth:2,
		borderColor:'#4461D8'	 
	},
	imagen:{
		borderRadius:35,
		position:'absolute',
		top:15,
		left:screenWidth/20,
		borderWidth: 2,
		borderColor:'#4461D8'	
	},
	iconContenedor:{	
		width:60,
		height:60,
		position:'relative',
		bottom:-8
	},
	icon:{
		width:50,
		height:50,
		position:'relative',
		bottom: -8
	},
	nombrePlan:{
		color:'#ffffff',
		fontSize:15,
		marginLeft:25,
		width:screenWidth/2.5,
		lineHeight: 17,
	},
	regresar:{
		width:screenWidth/5,
		color:'#ffffff',
		fontSize:30,
	},

 	////////////////// footer
	footer:{
		position:'absolute',
		bottom:0,
		width:screenWidth,
		backgroundColor:'#EDEDED',
		paddingTop:20,
		paddingBottom:20,
	},
	footer1:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
	},
	textarea:{
		width:screenWidth/1.6,
		height:40,
		color:'#969696',
		paddingTop:0,
		paddingLeft:20,
		paddingBottom:0,
		borderWidth: 0,
		marginRight:10,
		marginLeft:10,
		backgroundColor: '#ffffff',	
		fontSize:17,
		borderRadius: 50,
	},
	opciones:{
		width:screenWidth/8,
	},
	enviar:{
		width:screenWidth/6,
	},
	contenedorChat:{
		flex:.4,
		marginBottom:100
	},

	////////////////// box chat /////////////////
	contenedorBox:{

	},
	box:{
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.7,
		shadowRadius: 2,
		elevation: 3,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 25,
		width:screenWidth/1.5,
		position:'relative',
		zIndex:10
	},
	boxLeft:{ 
		alignSelf: 'flex-start',
	},
	nombre:{
		backgroundColor:'rgba(198, 198, 198, .34)',
		color:'#A8A8A8',
		fontSize:19,
		padding:10
	},
	nombreLeft:{
		color:'#9CB7F5'
	},
	photo:{
		alignSelf: 'flex-end', 
		borderRadius:35,
		position:'absolute',
		bottom:-20,
		borderColor:'#9CB7F5',
		borderWidth:5,
		zIndex:100
	},
	photoLeft:{
		alignSelf: 'flex-start',
	},
	mensaje:{
		padding: 20,
		shadowOffset: { width: 0, height: 2 },
	},

	////////////////// box chat item /////////////////
 
	header:{
		width:screenWidth/1.54,
		height:45,
	 	alignSelf: 'flex-end',  
		zIndex:10, 
		position:'absolute',
		top: 28,
		right:18,  
		borderTopLeftRadius:10,  
	},  
	headerLeft:{
		alignSelf: 'flex-start',
		left:18,
		borderTopRightRadius:10,  
	},
	modal:{
	  paddingBottom:10
	},
	iconAvatar:{
		position:'absolute',
		top:17,  
		right:5,
		zIndex:100,
		width:50,
		height:50,
		borderRadius:25,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,
	},
	iconAvatarLeft:{
		left:5
	},
	fotografia:{
		position:'absolute',
		top:80, 
		right:screenWidth/2,
		zIndex:100,
		width:100,
		height:100,
		borderRadius:50, 
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:3,
	},
	fotografiaLeft:{
		left:screenWidth/2,
	},
	nombre:{
		color:'white',
		fontSize:23,
		alignSelf: 'flex-end',  
		marginTop:8,
		marginRight:80
	}, 
	nombreLeft:{ 
		position:'relative',
 		left:30 															
	}, 
	titulo:{
		color:'#4A4A4A',
		fontSize:25,
		marginLeft:80,
		marginTop:30,

	},
	tituloLeft:{
		marginLeft:5,
		width:screenWidth/3
	},

	descripcion:{
		color:'#5664ba',
		fontSize:21,
		marginLeft:80
	},
	descripcionLeft:{
		marginLeft:5
	},
	valor:{
		color:'#969696',
		fontSize:18,
		marginLeft:80,
		marginTop:20,
	},
	valorLeft:{
		marginLeft:5
	},
	///////// interes ///////////
	contenedorInteres:{
		flexDirection:'row',
		alignSelf: 'flex-end', 
		width:screenWidth/1.2,
 		justifyContent: 'center', 
 		position:'relative',
 		top:-10,
 	},
 	contenedorInteresLeft:{
		alignSelf: 'flex-start', 
 	},
	btnInteres:{
		flexDirection:'row' 
	},
	imagenInteres:{
		width:45,
		height:45,
		position:'relative',
		zIndex:5
	},
	textoInteres:{
		fontSize:12,
		borderWidth:1,
		borderRadius:10,
		borderColor:'#5664ba',
		position:'relative',
		padding:7, 
		paddingLeft:14, 
		height:30,
		top:10,
		left:-14,
		zIndex:0
	},

	///////////////////////////////// contenedor 3	//////////
	contenedorOpciones:{
		flexDirection:'row',
	},
	imagenPregunta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,
	},
	contenedorPregunta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,	
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},
	textoPregunta:{
		 
	 
	}
})






























