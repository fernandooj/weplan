import {StyleSheet, Dimensions} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
var screenHeight = Dimensions.get('window').height;

export const AmigosStyle = MediaQueryStyleSheet.create({  
	contenedor:{
		alignItems: 'center',
	},
 	subLista:{
	 
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:10
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
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 3.5,
		borderColor: '#C2E3EE',
	},
	textoAvatar:{
		fontSize:22,
		marginLeft:20,
		marginTop:20
	},
	agregado:{
		position:'absolute',
		left:40,
		bottom:0,
		height: 27,
		width: 27,
	},
	titulo:{
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:10,
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
		right:49, 
		width:25,
		height:25
 	}, 
 	contenedorLista:{
 		width:'100%',
 		height:screenHeight+200
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
 		color:'white'
 	}
},{
	"@media (max-device-width: 380)": {
		contenedorAmigos:{
 			paddingLeft:30,
 		},
		imagenTitulo:{
			width:35,
			height:35,
			marginTop:5
		},
		text: {
			color:'#969696',
			fontSize: 18,	 
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
		textoAvatar:{
			fontSize:18,
			marginLeft:20,
			marginTop:10
		},
	}
})