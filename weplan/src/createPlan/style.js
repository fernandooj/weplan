import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const CreatePlanStyle = MediaQueryStyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
		marginTop:20
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	contenedorGeneral:{
		backgroundColor:'#ffffff'
	},
	encabezado:{
		backgroundColor:'#DAE0E0',
		padding: 10
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#F2F4F4',
		borderWidth: 0.1,
		borderColor: '#d6d7da',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
		alignItems: 'center',
	}, 
	contenedorTextarea:{
		borderWidth: 0,
		alignItems: 'center',
		width:'95%',
		backgroundColor: '#f1f3f3',
		borderRadius: 20,
	},
	textarea:{
		borderWidth: 0,
		paddingTop:10,
		marginTop:5,
		width:'80%',
		height:40,
		backgroundColor: '#f1f3f3',
		borderRadius: 20, 
		paddingLeft:20,
		height:60,
		color:'#969696',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'flex-end',
		 
	},
	encabezadoPlan:{
		alignItems: 'center',
		backgroundColor:'#F2F4F4',
		paddingTop: 20,
		paddingBottom: 0,
	},
	iconCamera:{
		fontSize:100
	},
	inputs:{
		borderWidth: 0,
		alignItems: 'center',
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#f1f3f3',
		borderRadius: 50,
		paddingLeft:20,
	},
	btnInputs:{
		borderWidth: 0,
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#D9E6F4',
		borderRadius: 50,
		paddingLeft:20,
		paddingTop:10,
	},
	costoPlan:{
		padding:10
	},
	textos:{
		color:'#969696'
	},
	textosActivo:{
		color:'#8F9093',
	},
	btnColor2Input:{
		backgroundColor: '#f1f3f3',
	},
	cajaInpunts:{
		flexDirection: 'row',
		justifyContent: 'center',

	},
	iconInput:{
		width:30,
		height:30,
		position:'relative',
		top:15,
		marginRight:25
	},
	iconInputArea:{
		width:34,
		height:34,
		position:'relative',
		top:12,
		marginRight:25
	},
	textInput:{
		width:45,
		height:30,
		position:'relative',
		top:15,
		marginRight:10
	},
	create:{
		marginTop:10,
		width:180,
		height:90
	},
	createIcon:{
		width:180,
		height:90
	},
	createIconDisable:{
		width:180,
		height:63,
		marginTop:20,
		marginBottom:20
	},
	encabezadoPlan2:{
		alignItems: 'center',
		paddingTop: 0,
		marginTop: Platform.OS === 'android' ?45 : 65,
		paddingBottom: 12,
	},
	imagenCargada:{
		width:'100%',
		height:200
	},
	textoCargado:{
		marginTop:-78,
		backgroundColor:'#rgba(0,0,0,.5)',
		width:'100%',
		padding:5,
	},
	textoCargado2:{
		marginTop: Platform.OS === 'android' ?-78 : -40,
		backgroundColor:'#rgba(0,0,0,.5)',
		width:'100%',
		padding:5,
	},
	nombreCargado:{
		color:"white",
		fontSize:25,
	},
	ByCargado:{
		color:"white",
		fontSize:19,
	},
	calificacion:{
		width:120,
		flexDirection:'row',
	},
	votaciones:{
		marginTop:-2,
		marginLeft:15,
		color:"white",
	},
	textModal:{
		fontSize:20
	},
	textArrastar:{
		color: '#94A5F3',
	},
	///////////////////////////////////////
	/////////////// mapa //////////////////
	///////////////////////////////////////
	tituloMapa:{
		flexDirection:'row', 
		marginTop:Platform.OS==='android' ? 0 : 18,
	},
	container: {
		marginTop:0,
		height: 600,
	},
	map: {
		marginTop:0,
		width: '100%',
	},
	btnClose:{
		height:44,
		width:50,
		alignItems:'center',
 
	},
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	buscador:{
		width:'100%'
	},
	inputValor:{
		color:"black",
		fontSize:16,
		marginTop:10,
		borderColor: '#d6d7da',
		borderWidth:2,
		marginLeft:10,
		marginRight:10,
		borderRadius:20,
		padding:7
	},
	contenedorMarker:{
		position:'absolute',
		zIndex:100,
		top:180,
		left:'50%'
	},
	marker: {
		height: 38,
		width: 30
	},
	ubicationBtn:{
		position:'relative',
		top:-50,
		right:10,
		alignSelf: 'flex-end'
	},
	ubication:{
		width:40,
		height:40,
	},
	///////////////////////////////////////
	////////// restricciones //////////////
	///////////////////////////////////////
	contenedorRes:{
		alignItems: 'center',
	},
	touchRes:{
		flexDirection:'row',
		alignItems: 'flex-start',
		borderColor: '#d6d7da',
		borderBottomWidth:.6,
		width:'80%',
		paddingTop:15,
		paddingBottom:15,
	},
	iconRes:{
		width:50,
		height:50
	},
	textoRes:{
		position:'relative',
		top:10,
		fontSize:20,
		color:'#969696'
	},
	banRes:{
		position:'relative',
		top:30,
		left:-20,
		width:20,
		height:20,
	},
	banResInactive:{
		color:'#9B9B9B'
	},
	banResActive:{
		color:'#FF5959'
	},
	btnHecho:{
 		width:'40%',
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10,
 		marginTop:20,
 		marginBottom:20,
 	},
 	rutaRes:{
		width:50,
		height:50,
		marginRight:10
	},
 	hecho:{
 		color:'white'
 	},
	//////////////////////////////////////////////////
	////////// elementos agregados
	/////////////////////////////////////////////////
	contentAdd:{
		flexDirection:'row',
		marginTop:10,
		width:240
	},
 	avatar:{
 		width:40,
 		height:40,
 		borderRadius:20,
 		borderWidth:2,
 		borderColor:'#cae1ec',
 		marginRight:10,
 	},
 	iconAgregado:{
 		width:20,
 		height:20,
 		position:'absolute',
 		top:25,
 		right:2
 	},
 	textoAgregado:{
 		width:40,
 		fontSize:9,
 		alignItems: 'center',
 	},
 	agregadosContenedor:{
 		minWidth:'55%',
 		flexDirection:'row',
 	},
 	addBtn:{
 		width:40,
 		height:40,
 		alignSelf: 'flex-end', 
 	},
 	add:{
 		width:40,
 		height:40,
 	},
 	add2:{
 		width:36,
 		height:30,
 		top:7
 	},
 	banResActiveAdd:{
 		position:'absolute',
 		top:21,
 		right:6,
 		width:20,
 		height:20
 	},

 	//////////////////////////////////////////////////
	////////// TIPO MAPA
	/////////////////////////////////////////////////
	tipoPlan:{
		backgroundColor:'rgba(0,0,0,.6)',
		width:screenWidth,
		height:screenHeight,
		position:'absolute',
		zIndex:100,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	btnModal:{
		backgroundColor:'#ffffff',
		margin:10,
		padding:15,
		borderRadius: 20, 
		shadowColor: '#000000',
 		borderWidth:4,
 		borderColor:'rgba(0,0,0,.1)',
	},
	contenedorArea:{
		backgroundColor:'#F2F4F4',
		borderRadius:50,
		width:240,
		marginTop:10,
	 	paddingLeft:15,
		 
	},
	inputArea:{
		color: '#8F9093',
		height:40,
		width:225,
		padding:0,
		color:'#969696'
	},
	//////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////	CABEZERA   //////////////////////////////////////
 	contenedorBack:{
 		flexDirection:'row',
 		backgroundColor:'#dadede',
 		width:screenWidth,
 		
 	},
 	imgBack:{
 		width:11,
 		height:20
 	},
 	btnBack:{
 		padding:10,
 		paddingHorizontal:20
 	},
 	btnEdit:{
 		width:'30%'
 	},
 	contenedorTextBack:{
		width:screenWidth-55,
		alignItems:'center',
 	},
 	textBack:{
 		fontSize:20
 	},
 	separador:{
		borderWidth:2,
		borderTopColor:'#ffffff',
		borderBottomColor:'#CACACA',
		borderLeftColor:'#f8f8f8',
		borderRightColor:'#f8f8f8',
		marginTop:5,
		marginBottom:5
	},
	contenedorCambioTipo:{		
		alignItems : 'center',
		position:'absolute',
		top:Platform.OS === 'android' ?50 : 65,
		zIndex:100,
		width:'100%'
	},
	btnCambioTipo:{
		backgroundColor:'#dadede',
		flexDirection : 'row',
		width:'80%',
		borderTopLeftRadius: 20 , 
		borderTopRightRadius:20 , 
		borderBottomLeftRadius: 0,  
		borderBottomRightRadius: 0, 
		padding:10,
	},
	btnCambioTipo2:{
		backgroundColor:'#dadede',
		width:'80%',
		flexDirection : 'row',
		borderTopLeftRadius: 0 , 
		borderTopRightRadius:0 , 
		borderBottomLeftRadius: 20,  
		borderBottomRightRadius:20, 
		padding:10
	},
	textoCambio:{
		fontSize:20,
		width:'70%',
		paddingLeft:70
	},
	imgCambio:{
		width:20,
		height:20,
		top:3
	},
	triangulo:{
		width: 0,
	    height: 0,
	    backgroundColor: 'transparent',
	    borderStyle: 'solid',
	    borderLeftWidth: 10,
	    borderRightWidth: 10,
	    borderBottomWidth: 20,
	    borderLeftColor: 'transparent',
	    borderRightColor: 'transparent',
	    borderBottomColor: '#dadede'
	},
	planesTitulo:{
		flexDirection:'row',
		padding:8,
		backgroundColor:'#dadede'
	},
	triangulo2:{
		width: 0,
	    height: 0,

	    top:6,
	    marginLeft:10,
	    backgroundColor: 'transparent',
	    borderStyle: 'solid',
	    borderLeftWidth: 8,
	    borderRightWidth: 8,
	    borderTopWidth: 16,
	    borderLeftColor: 'transparent',
	    borderRightColor: 'transparent',
	    borderTopColor: 'grey'
	},
 
},{
	"@media (max-device-width: 320)": {
		textarea:{
			width:'90%'
		},
		touchRes:{
			width:'80%'
		},
		map: {
			height: 310, 
		},
		rutaRes:{
			width:40,
			height:40,
			marginRight:10
		},
		iconRes:{
			width:35,
			height:35
		},
		textoRes:{
			fontSize:15
		},
		banRes:{
			top:20,
			left:-10,
			 
		},
		contentAdd:{
			width:230 
		},
		addBtn:{
	 		width:30,
	 		height:30,
	 	},
	 	add:{
	 		width:30,
	 		height:30,
	 	},
	 	textoCargado:{
			marginTop:-77,
		},
		textoCargado2:{
			marginTop:-77,
		},
		nombreCargado:{
			color:'#ffffff',
			fontSize:22,
		},
	},
	"@media (device-height: 812)": {
		contenedorBack:{
			top:Platform.OS==='android' ?0 :10,
			marginBottom:Platform.OS==='android' ?0 :10
		},
		tituloMapa:{
			flexDirection:'row', 
			marginTop:Platform.OS==='android' ? 0 : 35,
		},
	}
})