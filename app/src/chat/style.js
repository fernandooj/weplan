import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

import { MediaQueryStyleSheet } from "react-native-responsive";
export const style = MediaQueryStyleSheet.create({ 
 	contenedorGeneral:{
 		flex:1,
 		backgroundColor:'#f8f7fc'
 	},
 	familia:{
		fontFamily:'Futura-CondensedLight',
	},
 	contenedorChat:{
 		top:Platform.OS==='android' ?-300 :-265,
 		zIndex :0
 	},
 	contenedorChat2:{
 		top:0,
 	},
 	contenedorBox:{
 		position:'relative',
 		zIndex:-100
 	},
 	contenedorBox2:{
 		position:'relative',
 		zIndex:-100,
 		marginTop:-35
 	},
 	fondo:{
		zIndex:0,
		top:0,
		left:0,
		height:Platform.OS==='android' ?screenHeight-155 :screenHeight-140,
		marginTop:Platform.OS==='android' ?75 :90,
		width:screenWidth,
	},
 	////////////////// cabezera
 	cabezera:{
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'space-between',
		backgroundColor:"#148dc9",
		borderWidth: 0,
		paddingTop:Platform.OS==='android' ?0 :18,
		borderBottomWidth:2,
		borderColor:'#4461D8',
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		zIndex:100 
	},
	btnImagenPlan:{
		position:'absolute',
		top:15,
		left:45,
		zIndex:1100	
	},
	imagen:{
		borderRadius:35,
		borderWidth: 2,
		borderColor:'#4461D8',
		width:70,
		height:70
	},
	iconRegresar:{
		// borderWidth:1,
		// borderColor:'red',
		// width:60,
		// height:55,
		paddingLeft:10,
		paddingVertical:15,
		paddingRight:20,
		top:0
	},
	imgRegresar:{
		width:15,
		height:28,
	},
	iconContenedor:{	
		width:60,
		height:60,
		bottom:-5,
		marginRight:-10
	},
	icon:{
		width:40,
		height:40,
		position:'relative',
		bottom: -8
	},
	nombrePlan:{
		color:'#ffffff',
		fontSize:18,
		left:0, 
		width:150,
		lineHeight: 17
	},
	nombrePlanIos:{
		color:'#ffffff',
		fontSize:18,
		left:35,
		top:1, 
		width:180,
		// lineHeight: 17
	},
	regresar:{
		width:screenWidth/5,
		color:'#ffffff',
		fontSize:30,
	},
	iconosHeaderContenedor:{
		flexDirection:'row',
	},
 	indicador:{
 		position:'absolute',
 		top:Platform.OS==='android' ?70 :80,
 		zIndex:100,
 		left:'50%'
 	},
	///////////////////////////////////////////////////////////////
	//////////////		OPCIONES
	///////////////////////////////////////////////////////////////
	opcionesBtn:{
		width:50,
		marginTop:2
	},
	opciones:{
		width:35,
		height:24,
		marginLeft:13,
		marginTop:3,
	},
	enviarBtn:{
		width:70,
		marginTop:5
	},
	enviar:{
		width:40,
		height:23
	},
	contenedorOpciones:{
 		flexDirection:'row',
		backgroundColor:'#ffffff',
		padding:8,
		left:5,
		 
		width:230,
		borderRadius:35
	},
	contenedorOpcionesBotones:{
 		flexDirection:'row',
		backgroundColor:'#ffffff',
		padding:8,
		left:5,
		bottom:Platform.OS==='android' ?60 :60,
		width:230,
		position:'absolute',
		borderRadius:35
	},
	contenedorOpcionesBotonesShow:{
		bottom:Platform.OS==='android' ?320 :320,
	},
	btnIconoOpciones:{
		backgroundColor:'#ebebeb',
		padding:3,
		width:35,
		borderRadius:20,
		marginRight:10,
	},
	opcionesIconos:{
		width:30,
		height:30,
	},
 	////////////////// footer
	footer:{
		position:'absolute',
		bottom:0,
		width:screenWidth,
		backgroundColor:'#EDEDED',
		paddingTop:10,
		paddingBottom:10,
	},
	showFooter:{
		bottom:Platform.OS==='android' ?0 :260
	},
	footer1:{
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
	},
	textarea:{
		width:'67%',
		height:35,
		color:'#000000',
		paddingTop:5,
		paddingLeft:20,
		paddingBottom:0,
		borderWidth: 0,
		marginRight:10,
		marginLeft:10,
		backgroundColor: '#ffffff',	
		fontSize:20,
		borderRadius: 10,
	},
	////////////////// box chat /////////////////
	box:{
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: Platform.OS==='android' ?0.7 :0,
		shadowRadius: 2,
		//elevation: 3,
		marginLeft: 15,
		marginRight: 15,
		marginBottom:10,
		// width:screenWidth/1.5,	///////// si quiero que quede el chat de un ancho fijo
		zIndex:0	
	},
	boxLeft:{ 
		alignSelf: 'flex-start',
		marginLeft: 15,
	},
	fecha:{
		alignSelf: 'flex-end',
		color:'#acacac',
		padding:5,
		paddingLeft:10
	},
	fechaLeft:{
		alignSelf: 'flex-start',
		paddingRight:15
	},
	tituloTipoChat:{
		backgroundColor:'rgba(196, 196, 196, 0.3)',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	mensajeTipoChat:{
		// borderBottomLeftRadius:10,
		// borderBottomRightRadius:10,
		// position:'relative',
		// zIndex:0,
		backgroundColor:'rgba(255,255,255,1)',
		borderRadius:10
		//shadowOffset: { width: 0, height: 2 },
	},
	nombreTipoChat:{
		color:'#A8A8A8',
		fontSize:18,
		paddingVertical:5,
		paddingHorizontal:8
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
		borderWidth:4,
		borderRadius:22,	
		borderColor:'#9CB7F5',
	},
	photoLeft:{
		 
	},
	mensaje:{
		padding: 10,
		paddingBottom:0,
		fontSize:18,
		color:'#000000'
		// shadowOffset: { width: 0, height: 2 },
	},
	

	////////////////////////////////////////////
	////////////////// contenedor 2  ==> items
	////////////////////////////////////////////
 	contenedorItem:{
 
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		width:screenWidth/1.5,
		// backgroundColor:'#ffffff',
		paddingBottom:20,		
 	},
 	contenedorItemLeft:{
		alignSelf: 'flex-start',  
 	},
 
	headerLeft:{
		alignSelf: 'flex-start',
		left:18,
		borderTopRightRadius:10,  
	},
	boxItem:{
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: Platform.OS==='android' ?0.7 :0,
		shadowRadius: 2,
		marginLeft: 15,
		marginRight: 15,
		width:screenWidth/1.5,		
	},
	boxItem2:{
		backgroundColor:'#ffffff',
		alignSelf: 'flex-end',  
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: Platform.OS==='android' ?0.7 :0,
		shadowRadius: 2,
		// elevation: 3,
		marginLeft: 15,
		marginRight: 15,
		marginBottom:10,
		width:screenWidth/1.5,
		borderRadius:10		
	},

	cBtnAvatarItem:{
		alignSelf: 'flex-end', 
		position:'relative',
		top:32,
		zIndex:100,
		flexDirection:'row',
	},
	cBtnAvatarItemLeft:{
		alignSelf: 'flex-start',
	},
 
	fotografia:{
		position:'absolute',
		top:85, 
		right:screenWidth/1.7,
		zIndex:100,
		width:80,
		height:80,
		borderRadius:40, 
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:3,
	},
	fotografiaLeft:{
		left:screenWidth/1.7,
	},
	btnPerfilItem:{
		flexDirection:'row',
	},
	nombreIt:{
		top:-10,
		left:10,
	 	width:'75%',
		color:'#7a7a7a',
		fontSize:15,
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
		marginTop:10,

	},
	tituloLeft:{
		marginLeft:5,
		width:screenWidth/3
	},

	descripcion:{
		color:'#5664ba',
		fontSize:21,
		marginLeft:80,
		minHeight:60,
		width:140
	},
	descripcionLeft:{
		marginLeft:5,
		width:145
	},
	valor:{
		backgroundColor:'#dbe4f2',
		padding:6,
		borderRadius:20,
		color:'#969696',
		fontSize:17,
		marginLeft:80,
		marginTop:5,
		width:'60%',
		textAlign:'center'
	},
	valorLeft:{
		marginLeft:5
	},
	///////// interes ///////////
	contenedorInteres:{
  		alignItems: 'flex-end',
		width:'85%',
 		marginTop:-10,
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

	////////////////////////////////////////////
	////////////////// contenedor 3  ==> items
	////////////////////////////////////////////
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
 
	},
	contenedorTitulos:{
		borderColor:'#c4c4c4',
		borderWidth:3,
		borderRadius:10
	},
	pDescripcion:{
		color:'#5664ba',
		width:160,
		textAlign:'center',
		fontSize:20
	},
	decoracion:{
		width:24,
		height:35
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
		height:60,
		borderRadius:20,
		zIndex:1000,
       	// opacity: 0.4,    estos dos codigitos dan la opcion de insertar el porcentaje dentro de la imagen
       	// position:'absolute',
       	opacity: 0.8,
 
       	borderColor:'#9CB7F5',
		borderWidth:3,	
	},
	contenedorRespuesta:{
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5
	},
	contenedorPregunta:{
		width:100,
		height:60,
		borderRadius:20,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:3,	
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
	textoRespuesta:{
		fontSize:18,

	},
	pPhoto:{
		alignSelf: 'flex-end', 
		borderRadius:35,	
		borderColor:'#9CB7F5',
		borderWidth:5,
		position:'relative',
		top:45,
	},

	////////////////////////////////////////////
	////////////////// contenedor 4  ==> chat
	////////////////////////////////////////////

	mensajeCChat:{
		backgroundColor:'#afc4f0',
		borderTopLeftRadius:10,
		borderTopRightRadius:10, 
		width:screenWidth-100
	},
	cPhotoContainer:{
		position:'absolute',
		left:'22%', 
		top:60,
		zIndex:100
	},
	cPhoto:{
		borderWidth:4,
		borderRadius:30,	
		borderColor:'#9CB7F5',
	},
	cPhotoLeft:{
		left:'56%',
	},
	cMensaje:{
		alignSelf: 'flex-end',
		color:'#ffffff',
		fontSize:20,
		paddingTop:8,
		paddingBottom:32,
		marginRight:18,
	},
	cMensajeLeft:{
		alignSelf: 'flex-start',
		marginLeft:18,
	},
	cFecha:{
		alignSelf: 'flex-end',
		color:'#636363',
		marginTop:-30,
		marginBottom:5,
		marginRight:18,
	},
	cFechaLeft:{
		alignSelf: 'flex-end',
		paddingRight:15,
		marginLeft:18,
	},
	fechaMapa:{
		alignSelf: 'flex-start',
		backgroundColor:'#afc4f0',
		width:'100%',
		color:'#636363',
		padding:7
	},
	
	botonesContacto:{
		flexDirection : 'row',
		justifyContent: 'space-between',
		backgroundColor:'#ffffff',
		padding:10,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius:20,
	},
	cTextBotones:{
		backgroundColor:'#ebebeb',
		padding:7,
		borderRadius:14,
		fontSize:12,
		zIndex:100
	},
	cBtnAvatarC:{
		alignSelf: 'flex-end', 
		position:'relative',
		top:30,
		zIndex:100
	},
	cBtnAvatarCLeft:{
		alignSelf: 'flex-start',
	},
	cNombreTipoChat:{
		alignSelf: 'flex-end', 
		color:'#A8A8A8',
		fontSize:15,
		padding:5,
		paddingRight:14,
		marginRight:20
	},
	cNombreTipoChatLeft:{
		alignSelf: 'flex-start', 
		marginLeft:25
	},
	/////////// btn hecho /////////////
 	containerHecho:{
 		marginTop:20,
 		marginBottom:20,
		alignItems: 'center',
 	},
 	btnHecho:{
 		width:170,
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10
 	},
 	hecho:{
 		color:'white',
 		fontSize:16
 	},

	////////////////////////////////////////////
	////////////////// contenedor 5  ==> items
	////////////////////////////////////////////
	cDocumento:{
		alignSelf: 'flex-end',
		color:'#ffffff',
		fontSize:17,
		paddingTop:8,
		paddingBottom:1,
		marginRight:18,
	},
	cDocumentoLeft:{
		alignSelf: 'flex-start',
		marginLeft:18,
	},

	////////////////////////////////////////////
	////////////////// contenedor 6  ==> imagenes
	////////////////////////////////////////////
	Iphoto:{
		width:screenWidth-100,
		height:300,	
		borderWidth:4,
		borderRadius:0,	
		borderColor:'#9CB7F5',
	},
},{
	"@media (max-device-width: 380)": {
		nombrePlanIos:{
			fontSize:17,
			left:55, 
			// lineHeight: 19
		},
	}
},{
	"@media (max-device-width: 360)": {
		btnImagenPlan:{
			position:'absolute',
			top:Platform.OS==='android' ?5 :30,
			left:Platform.OS==='android' ?30 :40,
			zIndex:110	
		},
		textarea:{
			width:'60%'
		},
		imagen:{
			borderRadius:30,
			borderWidth: 2,
			borderColor:'#4461D8',
			width:60,
			height:60
		},
		nombrePlan:{
			marginLeft:25, 
			width:130,
			lineHeight: 17,
		},
		iconContenedor:{	
			bottom:-5,
 
		},
		icon:{
			width:35,
			height:35,
			position:'relative',
			bottom: -8
		},
		enviarBtn:{
			width:60,
			marginTop:6
		},
		enviar:{
			width:35,
			height:20
		},
		opcionesBtn:{
			width:60
		},
		opciones:{
			width:35,
			height:25,
			marginLeft:16,
			marginTop:5,
		},
		imagenPregunta:{
			width:80,
			height:80,
		},
		 
		contenedorPregunta:{
			width:80,
			height:80,
			marginLeft:10
		},
		textoPregunta:{
			fontSize:15
		},
		contenedorOpciones:{
			width:205,
		},
		pDescripcion:{
			width:140
		},
		contenedorOpcionesBotones:{
			width:205,
			marginTop:-55,
		},
		contenedorOpcionesBotonesShow:{
			marginTop:-310,
		},
		btnIconoOpciones:{
			padding:3,
			width:28,
			borderRadius:14,
			marginRight:10,
		},
		opcionesIconos:{
			width:22,
			height:22,
		},
		imagenRespuesta:{
			width:90,
			height:50,
		},
		
		contenedorPregunta:{
			width:90,
			height:55,
		},
		descripcion:{
			fontSize :20
		},
		fondo:{
			height:screenHeight-155,
		},
		contenedorChat:{
	 		top:-255
	 	},
	},
	"@media (device-height: 812)": {
		footer:{
			bottom:Platform.OS==='android' ?0 :20,
		},
		fondo:{
			height:Platform.OS==='android' ?screenHeight-155 :screenHeight-165,
			marginTop:Platform.OS==='android' ?75 :102,
		},
		cabezera:{
			paddingTop:Platform.OS==='android' ?0 :30,
		},
		contenedorChat:{
	 		top:Platform.OS==='android' ?-300 :-320,
	 		zIndex :0
	 	},
	 	contenedorChat2:{
	 		top:-10,
	 	},
		btnImagenPlan:{	
			top:Platform.OS==='android' ?15 :31,
			left:Platform.OS==='android' ?25 :37,
		},
		contenedorOpcionesBotones:{
			bottom:Platform.OS==='android' ?60 :85,
		},
		contenedorOpcionesBotonesShow:{
			bottom:395,
		},
		showFooter:{
			bottom:Platform.OS==='android' ?0 :330
		},
	},
	"@media (min-device-height: 832)": {
		contenedorChat:{
	 		top:Platform.OS==='android' ?-300 :-340,
	 		zIndex :0
	 	},
		showFooter:{
			bottom:Platform.OS==='android' ?0 :340
		},
		contenedorOpcionesBotonesShow:{
			bottom:405,
		},
	}
})






























