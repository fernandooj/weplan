import {StyleSheet, Dimensions, Platform} from 'react-native';
var size = Dimensions.get('window');

import { MediaQueryStyleSheet } from "react-native-responsive";
export const style = MediaQueryStyleSheet.create({ 
	contenedor:{
		flex: 1,
		backgroundColor:"#ffffff",
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	contenedorPlan:{
		flex: .5,
		paddingRight:15,	
		paddingLeft:15,	
		marginTop: Platform.OS==='android' ?50 :75,
	},
	subContenedor:{
		width:'100%',
	},
	avatar: {
		marginTop:10,
		marginRight:10,
		borderRadius: 35,
		width: 70,
		height: 70,
		borderColor:'#5664ba',
		borderWidth:4,
	},
	perfil:{
	 	alignItems: 'center',
	},
	username:{
		position:'relative',
		backgroundColor:'#EAEAEA',
		color:'#9CB7F5', 
		top:-20,
		paddingTop:8,
		paddingBottom:8,
		paddingRight:20,
		paddingLeft:20,
		borderRadius:20,
	},
 	btnMenu:{
 		paddingTop:10, 
 		paddingBottom:10,
 	},


 	//////////////////////////////////////////////////////////////////////////////////////
 	/////////////////			LISTADO AMIGOS
 	/////////////////////////////////////////////////////////////////////////////////////
 	contenedorNoti:{
 		flexDirection:'row',
 	},
 	contenedorNoti2:{
 		flexDirection:'row',
 		 
 	},
 	btnNoti:{
 		borderWidth:3,
 		borderRadius:12,
 		padding:6,
 		borderColor:'#E1E1E3',
 		backgroundColor:'#FFFFFF',
 		marginLeft:5,
 		marginTop:10,
 	},
 	textoNoti:{
 		color:'#5664ba',
 		fontSize:14,
 	},
 	textoNotifica:{
 		color:'#5664ba',
 		fontSize:14,
 		width:220
 	},
 	tituloNoti:{
 		marginTop:15,
 		fontSize:20,
 		marginBottom:5
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
	puntosBtn:{
		position:'absolute',
		bottom:0,
		right:-25
	},
	puntos:{
		width:33,
		height:12,
	},
	eliminarBtn:{
		backgroundColor:'#5664ba',
		position:'absolute',
		bottom:30,
		padding:6,
		borderRadius:10,
		right:-25
	},
	eliminar:{
		color:'#ffffff',
		fontSize:17
	},
	sinPlanes:{
		width:size.width,
		height:size.height-60,
		marginBottom:10,
		paddingHorizontal:90
	},

},{
	"@media (max-device-width: 360)": {
	 	avatar:{
	 		width: 55,
			height: 55,
			borderWidth:3,
	 	},
	 	contenedorPlan:{
			flex: .5,
			paddingRight:10,	
			paddingLeft:10,	
		}, 
		textoNoti:{
	 		color:'#5664ba',
	 		fontSize:12,
	 	},
	 	textoNotifica:{
	 		fontSize:18
	 	},
	 	puntosBtn:{
			right:-13
		},
		puntos:{
			width:30,
			height:11,
		},
		eliminarBtn:{
			bottom:30,
			padding:5,
			borderRadius:10,
			right:-13
		},
		eliminar:{
			fontSize:14
		},
		sinPlanes:{
			width:320,
			height:430,
			marginBottom:10
		},
	}
})
