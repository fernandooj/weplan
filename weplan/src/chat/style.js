import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;


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
		borderColor:'#4461D8',
		position:'relative',
		zIndex:100	 
	},
	imagen:{
		borderRadius:35,
		position:'absolute',
		top:15,
		left:screenWidth/20,
		borderWidth: 2,
		borderColor:'#4461D8',
		zIndex:110	
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
		//elevation: 3,
		marginLeft: 25,
		marginRight: 15,
		marginTop: 5,
		width:screenWidth/1.5,		
	},
	boxLeft:{ 
		alignSelf: 'flex-start',
		marginLeft: 15,
	},
	fecha:{
		alignSelf: 'flex-start',
		color:'#acacac'
	},
	fechaLeft:{
		alignSelf: 'flex-end',
		paddingRight:15
	},
	tituloTipoChat:{
		backgroundColor:'rgba(196, 196, 196, 0.3)',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	mensajeTipoChat:{
		borderBottomLeftRadius:10,
		borderBottomRightRadius:10,
		position:'relative',
		zIndex:0,
		backgroundColor:'rgba(255,255,255,1)',
		shadowOffset: { width: 0, height: 2 },
	},
	nombreTipoChat:{
		color:'#A8A8A8',
		fontSize:19,
		padding:10,
		paddingRight:4
	},
	nombreTipoChatLeft:{
		color:'#A5a5a5'
	},
	btnAvatarC:{
		alignSelf: 'flex-end', 
		position:'relative',
		top:-20
	},
	btnAvatarCLeft:{
		alignSelf: 'flex-start',
	},
	photo:{
		borderWidth:5,
		borderRadius:35,	
		borderColor:'#9CB7F5',
	},
	mensaje:{
		padding: 20,
		shadowOffset: { width: 0, height: 2 },
	},
	fondo:{
		zIndex:0,
		top:0,
		left:0,
		height:screenHeight-70,
		width:screenWidth,
	},

	////////////////////////////////////////////
	////////////////// contenedor 2  ==> items
	////////////////////////////////////////////
 	contenedorItem:{
		paddingBottom:10,
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		width:screenWidth/1.5,
		backgroundColor:'#ffffff',
		paddingBottom:50,		
 	},
 	contenedorItemLeft:{
		alignSelf: 'flex-start',  
 	},
	fondoHeaderItem:{
		marginLeft: 15,
		marginRight: 15,
		width:screenWidth/1.54,
		height:45,
	 	alignSelf: 'flex-end',  
		zIndex:10, 
	 	flexDirection:'row',
		top: 10,
	   
		borderTopLeftRadius:10,  
	},  
	fondoHeaderItemLeft:{
		alignSelf: 'flex-start',  
	},
	headerLeft:{
		alignSelf: 'flex-start',
		left:18,
		borderTopRightRadius:10,  
	},
	modal:{
	  
	},
	iconAvatar:{
		position:'absolute',
		top:-3,  
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
	nombreIt:{
		position:'relative',
		zIndex:100,
		top:-10,
		left:10,
		zIndex:1000,
		color:'white',
		fontSize:20,
		alignSelf: 'flex-end',  
	}, 
	nombreItLeft:{ 
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
		marginLeft:80,
		minHeight:60
	},
	descripcionLeft:{
		marginLeft:5,
	},
	valor:{
		backgroundColor:'#dbe4f2',
		padding:8,
		borderRadius:20,
		color:'#969696',
		fontSize:18,
		marginLeft:80,
		marginTop:5,
		width:'50%',
		textAlign:'center'
	},
	valorLeft:{
		marginLeft:5
	},
	///////// interes ///////////
	contenedorInteres:{
  		alignItems: 'flex-end',
		width:'85%',
 		marginTop:-35,
 	},
 	contenedorInteresLeft:{
 		alignItems: 'center',
		width:'70%',
 	},
	btnInteres:{
		flexDirection:'row' ,
	},
	imagenInteres:{
		width:45,
		height:45,
		position:'relative',
		zIndex:5
	},
	imagenEspera:{
		width:70,
		height:70,
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
	contenedorEncuesta:{
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,

		marginLeft: 25,
		marginRight: 15,
		marginTop: 5,
		width:screenWidth/1.5,	
	},
	contenedorEncuestaLeft:{
		alignSelf: 'flex-start',  
	},
	pNombre:{
		backgroundColor:'rgba(196, 196, 196, 0.3)',
		color:'#A8A8A8',
		padding:9,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	pTitulo:{
		backgroundColor:'#dbe4f2',
		color:'#4f61d3',
		padding:6,
		borderRadius:5
	},
	contenedorDescripcion:{
		flexDirection:'row',
		paddingLeft:10,
		paddingRight:10,
		paddingTop:15,
		paddingBottom:75,
		backgroundColor:'#ffffff',

	},
	contenedorTitulos:{
		borderColor:'#c4c4c4',
		borderWidth:3,
		borderRadius:10
	},
	pDescripcion:{
		color:'#5664ba',
		width:'80%',
		textAlign:'center'
	},
	decoracion:{
		width:24,
		height:35
	},

	contenedorOpciones:{
		flexDirection:'row',
		marginTop:-55,
		justifyContent: 'center',
        alignItems: 'center',
	},
	imagenPregunta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,
		marginRight:5,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       marginRight:5
	},
	imagenRespuesta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
       	opacity: 0.4,
       	position:'absolute',
       	borderColor:'#9CB7F5',
		borderWidth:5,	
	},
	contenedorRespuesta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5
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

        backgroundColor:'#ffffff',
        marginRight:5
	},
	textoPregunta:{
		textAlign:'center',
	 	color:'black',
	 	fontSize:25
	},
	pPhoto:{
		alignSelf: 'flex-end', 
		borderRadius:35,	
		borderColor:'#9CB7F5',
		borderWidth:5,
		position:'relative',
		top:45,
	}
})






























