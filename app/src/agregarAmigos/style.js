import {StyleSheet, Dimensions, Platform} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
var size = Dimensions.get('window');

export const AmigosStyle = MediaQueryStyleSheet.create({
	contenedor:{
		alignItems: 'center',
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
 	subLista:{
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:25
	},
	contenedorAmigos:{
 		paddingLeft:50,
 	},
	avatar:{
		height: 60,
		width: 60,
		borderRadius: 30,
	},
	avatar2:{
		height: 40,
		width: 40,
		borderRadius: 20,
		borderWidth: 3.5,
		borderColor: '#C2E3EE',
		left:-30, 
		top:5,
		marginRight:0
	},
	textoAvatar:{
		fontSize:24,
		marginLeft:30,
		marginTop:8
	},
	agregado:{
		position:'absolute',
		left:-5,
		bottom:-15,
		height: 27,
		width: 27,
	},
	titulo:{
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop: Platform.OS === 'android' ?10 : 39,
		marginBottom:10
	},
	separador:{
		height:1,
		width:'80%',
		flexDirection:'row',
		alignItems: 'center',
		backgroundColor:'rgba(180,180,180,.2)'
	},
	btnClose:{
		marginLeft:30,
		width:'15%'
	},
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	imagenTitulo:{
		width:45,
		height:45,
	},
	input:{
		marginTop:10,
		width:290,
		height:40,
		backgroundColor: '#f0f2f2',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#cccccc',
		borderBottomWidth:0,
		paddingLeft:20,
		fontSize:20,
		color: '#8F9093',
		alignItems: 'center',
	},
	text: {
		color:'#969696',
		fontSize: 22,
		marginLeft:10,
		marginTop:8
	},
	btnModal:{
		fontSize:20,
		color:'#969696',
		marginTop:5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight:10,
		marginLeft:10,
	},
	btnBuscar:{
		position:'absolute',
		top: 18,
		right:75,
		width:25,
		height:25
 	},
 	contenedorLista:{
 		width:'100%',
 		height:size.height+200
	},
	////////// modal nuevo usuario
	contenedorModal:{
		position:Platform.OS=='android' ?null :"absolute",
		alignItems:"center",
		backgroundColor:"rgba(0,0,0,.5)",
		height:size.height,
		zIndex:10000,
		width:"100%",
		bottom:50,
		top:0,
		left:0
	},
	contenedorVentaModal:{
		backgroundColor:"#ffffff",
		borderRadius:7,
		paddingVertical:10,
		top:50
	},
	btnCloseModal:{
		position:"absolute",
		right:-5,
		top:-5,
		zIndex:100
	},
	iconCerrar:{
		fontSize:18,
		color:"black"
	},
	inputNombre:{
		borderWidth:1,
		borderColor:"rgba(0,0,0,.3)",
		padding:0,
		padding:5,
		marginHorizontal:10
	},
	tituloUsuario:{
		textAlign:"center",
		width:size.width-120,
		paddingHorizontal:10,
		marginVertical:20,
	},
	/////////////////// 	LISTADO USUARIOS
	contenedorUsuarios:{
		flexDirection:"row",
		padding:10
	},
	btnHecho2:{
		width:'46%',
		alignItems: 'center',
		backgroundColor:'#94A5F3',
		borderRadius:17,
		padding:5,
		marginVertical:10,
		left:"28%"
	},
	textUsuarios:{
		fontSize:25,
		marginHorizontal:10,
		top:13
	},
	textUsuarios2:{
		fontSize:14,
		marginHorizontal:15,
		top:20
	},
	btnDeleteUsuarios:{
		top:13,
		padding:10,

	},
 	/////////// btn hecho /////////////
 	containerHecho:{
 		marginTop:20,
 		marginBottom:20,
		alignItems: 'center',
 	},
 	btnHecho:{
 		width:'40%',
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10
 	},
 	hecho:{
		 color:'white',
		 fontSize:18
 	},
 	sinResultados:{
 		marginTop:25,
 		marginHorizontal:40
 	}
},{
	"@media (max-device-width: 320)": {
		contenedorAmigos:{
 			paddingLeft:30,
 		},
		imagenTitulo:{
			width:35,
			height:35,
			marginTop:5
		},

		avatar:{
			height: 50,
			width: 50,
			borderRadius: 30,
		},
		avatar2:{
			height: 50,
			width: 50,
			borderRadius: 25,
			borderWidth: 3,
		},
		btnBuscar:{
			right:49,
		}

	}
})