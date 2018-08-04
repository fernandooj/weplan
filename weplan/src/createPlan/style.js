import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const CreatePlanStyle = MediaQueryStyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
		marginTop:20
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
	textarea:{
		borderWidth: 0,
		alignItems: 'center',
		marginTop:5,
		width:'80%',
		height:40,
		backgroundColor: '#f1f3f3',
		borderRadius: 20, 
		paddingLeft:20,
		height:60,
		color:'#969696'
	},
	encabezadoPlan:{
		alignItems: 'center',
		backgroundColor:'#F2F4F4',
		paddingTop: 30,
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
	textos:{
		color:'#969696'
	},
	textosActivo:{
		color:'#c9c9c9',
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
		top:8,
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
		paddingBottom: 12,
	},
	imagenCargada:{
		width:'100%',
		height:200
	},
	textoCargado:{
		marginTop:-69,
		backgroundColor:'#rgba(0,0,0,.5)',
		width:'100%',
		padding:5,
	},
	textoCargado2:{
		marginTop: Platform.OS === 'android' ?-69 : -40,
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
		fontSize:20,
	},
	///////////////////////////////////////
	/////////////// mapa //////////////////
	///////////////////////////////////////
	tituloMapa:{
		flexDirection:'row',
	},
	container: {
		marginTop:0,
		height: 600,
	},
	map: {
		marginTop:0,
		height: 455, 
		width: '100%',
	},
	btnClose:{
		marginLeft:20,
		width:'8%'
	},
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	buscador:{
		width:'100%'
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
		flexDirection: 'row',
	},
	inputArea:{
		color: '#8F9093',
		height:40,
		width:225,
		padding:0,
		
		color:'#969696'
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
			height: 390, 
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
			fontSize:15,
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
			marginTop:-58,
		},
		textoCargado2:{
			marginTop:-58,
		},
		nombreCargado:{
			color:'#ffffff',
			fontSize:15,
		},
	}
})