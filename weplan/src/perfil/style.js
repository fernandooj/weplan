import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
import { MediaQueryStyleSheet } from "react-native-responsive";

export const style = MediaQueryStyleSheet.create({
	contenedor:{
		alignItems: 'center',
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	subContenedor:{
		width:'90%',
	},
	avatar: {
		marginTop:10,
		borderRadius: 75,
		width: 110,
		height: 110,
		borderColor:'#9CB7F5',
		borderWidth:7,
		marginBottom:30
	},
	avatar2:{
		position:'absolute',
		top:150,
		left:23,
		zIndex:100,
	},
	avatar3:{
		marginTop:20,
	 
	},
	contenedorRegistros:{
		flexDirection:'row',
		marginTop:10
	},
	btnQr:{
 		width:110,
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		height:30,
 		padding:4,
 		marginLeft:39,
 		marginTop:49,
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
		width:230,
		height:40,
		backgroundColor: '#d6d6d6',
		borderRadius: 50,
		paddingLeft:20,
	},
	inputs:{
		
	},
	valor:{
		backgroundColor:'#d6d6d6',
		color:'#8F9093',
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:12, 
		paddingRight:12, 
		borderRadius:30,
		position:'relative',
		width:230,
	},
	containCiudad:{
		backgroundColor:'#d6d6d6',
		borderRadius:50,
		width:230,
	 
		height:40,
		paddingLeft:10,

	},
	inputCiudad:{
		height:40,
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
		avatar2:{
			top:75,
			left:63,
			zIndex:100
		},
		valor:{
			width:180,
			paddingTop:7,
			paddingBottom:7,
		},
		containCiudad:{
			width:180,	 
		},
		date:{
			width:180
		}
	}
})




