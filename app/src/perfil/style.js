import {StyleSheet, Dimensions} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";

export const style = MediaQueryStyleSheet.create({
	contenedor:{
		alignItems: 'center',
	},
	familia:{
		fontFamily:'Futura-CondensedLight', 
		fontSize:22
	},
	subContenedor:{
		width:'100%',
		marginTop:50
	},
	avatar: {
		marginTop:20,
		borderRadius: 60,
		width: 120,
		height: 120,
		borderColor:'#9CB7F5',
		borderWidth:4,
		marginBottom:30
	},
	avatar2:{
		position:'absolute',
		top:10,
		left:10,
		zIndex:10000
	},
	avatar3:{
		position:'absolute',
		top:90,
		width:300,
 		left:90,
		zIndex:10000
	},
	perfil:{
		marginHorizontal:10,
	},
	contenedorRegistros:{
		flexDirection:'row',
		width:'100%',
		marginTop:10,
		zIndex:10,
		paddingTop:0
	},
	btnQr:{
 		// width:110,
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		// height:30,
 		padding:18,
 		marginLeft:39,
 		marginTop:20,
 	},
	atributo:{
		width:'30%',
		marginLeft:'2%',
		fontSize:15,
		color:'#ADACAC'
	},
	date:{
		borderWidth: 0,
		alignItems: 'center',
		width:210,
		height:40,
		backgroundColor: '#d6d6d6',
		borderRadius: 50,
		paddingLeft:20,
	},
	valor:{
		paddingVertical:10,
		paddingHorizontal:12, 
		borderRadius:30,
		position:'relative',
		width:230,
	},
	containCiudad:{
		backgroundColor:'#d6d6d6',
		borderRadius:50,
		width:210,
	 	borderWidth:0,
		height:45,
		paddingLeft:10,
	},
	disabled:{
		color:'red'
	},
	textAlert:{
		color:'#7585eb',
		marginTop:20,
		padding:20,
		textAlign: 'center',
	},
	/////////// btn hecho /////////////
 	containerHecho:{
		alignItems: 'center',
		marginTop :20
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
 	},
 	calificacion:{
 		fontSize:20,
 		marginLeft:30,
 		marginTop:3
 	},
},{
	"@media (max-device-width: 320)": {
		subContenedor:{
			marginTop:30
		},
		avatar: {
			width:90,
			height:90,
			marginBottom:10
		},
		// avatar2:{
		// 	top:65,
		// 	left:53,
		// 	zIndex:100
		// },
		valor:{
			width:180,
			paddingVertical:7,
		},
		containCiudad:{
			width:180,	 
			height:35,
		},
		date:{
			width:180
		}
	}
})




