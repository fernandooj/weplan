import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";

export const style = MediaQueryStyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	subContenedor:{
		width:'80%',
		marginTop:50
	},
	avatar: {
		marginTop:10,
		borderRadius: 75,
		width: 150,
		height: 150,
		borderColor:'#9CB7F5',
		borderWidth:8,
	},
	perfil:{
	 	alignItems: 'center',
	 	marginBottom:-15
	},
	username:{
		position:'relative',
		backgroundColor:'#EAEAEA',
		color:'#9CB7F5', 
		top:-20,
		paddingTop:0,
		paddingBottom:0,
		paddingRight:20,
		paddingLeft:20,
		borderRadius:20,
		fontSize:20,
		marginBottom:3
	},
 	btnMenu:{
 		paddingTop:7, 
	 	paddingBottom:7,
 	},


 	//////////////////////////////////////////////////////////////////////////////////////
 	///////////////////////			AMIGOS 			//////////////////////////////////////
 	/////////////////////////////////////////////////////////////////////////////////////
 	contenedorLista:{
 		width:'100%',  
 	},
 	contenedorA:{
 		paddingBottom:40
 	},
 	registro:{
 		flexDirection:'row',
 		alignItems: 'center',
 		width:'100%',
 	},
	registro2:{
		flexDirection:'row',
 		alignItems: 'center',
 		width:'100%',
 		marginTop:45 
	},
 	btnCabezera:{
 		padding:15,
 		width:'50%',
 		alignItems: 'center',
 	},
 	btnCabezeraActive:{
		backgroundColor:'#dedede',
 	},
 	textCabezera:{
 		alignItems: 'center',
 	},
 	contenedorBuscar:{
 		flexDirection:'row',
 		position:'relative',
 		marginBottom:20,
 		marginTop:20,
 	},
 	subContenedorA:{
 		width:'90%',	
 	},
 	input:{
 		width:260,
 		height:40,
 		marginRight:'3%',
 		backgroundColor:'#EFF1F1',
 		borderWidth:2,
 		borderColor:'#D4D4D4', 
 		borderRadius:20,
 		padding:0,
 		paddingLeft:15
 	},
 	btnNuevoGrupo:{
 		width:25,
 		height:25,
 		marginRight:10,
 		marginBottom:10 
 	},
 	btnSearch:{
 		width:23,
 		height:23,
 		position:'absolute',
 		right:115,
 		top:10
 	}, 
 	btnBuscar:{
 		height:50
 	},
 	btnAgregar:{
 		width:50,
 		height:50
 	},
 	avatarA:{
 		marginTop:10,
		borderRadius: 30,
		width: 60,
		height: 60,
		borderColor:'#969696',
		borderWidth:6,
 	},
 	avatarA2:{
 		marginTop:10,
		borderRadius: 75,
		width: 60,
		height: 60,
		borderColor:'#9CB7F5',
		borderWidth:6,
 	},
 	textoAvatar:{
		fontSize:28,
		marginLeft:20,
		marginTop:18,
		width:'55%'
	},
	agregado:{
		position:'absolute',
		left:40,
		bottom:0,
		height: 27,
		width: 27,
	},
	tituloGrupo:{
		color:'#7788f2',
		fontSize:20,
		marginTop:10,
		marginBottom:10,
	},

	btnHecho:{
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:5,
 		paddingTop:8,
 		paddingBottom:8,
 		marginTop:22
 	},
 	hecho:{
 		color:'white',
 	},
 		
 	//////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////	CABEZERA   //////////////////////////////////////
 	contenedorBack:{
 		flexDirection:'row',
 		alignItems:'center',
 		position:'absolute',
 		zIndex:100,
 		top:0,
 		left:0,
 		backgroundColor:'#eeecec',
 		width:screenWidth,
 		padding:13,
 	},
 	btnBack:{
 		width:30,
 		marginLeft:20
 	},
 	imgBack:{
 		width:11,
 		height:20
 	},
 	btnEdit:{
 		width:'10%'
 	},
 	contenedorTexto:{
 		width:'80%',
 		alignItems:'center',
 	},
 	textBack:{
 		
 		alignItems:'center',
 		
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

},{
	"@media (max-device-width: 320)": {
		username:{ 

		},
		input:{
			width:230
		},
		btnSearch:{
	 		top:9
	 	}, 
	 	avatarA:{
	 		marginTop:10,
			borderRadius: 75,
			width: 43,
			height: 43,
			borderWidth:4,
	 	}, 
	 	textoAvatar:{
			fontSize:16,
			marginLeft:20,
			marginTop:15,
			width:'55%'
		},
		avatar: {
			marginTop:10,
			borderRadius: 55,
			width: 110,
			height: 110,
			borderWidth:5,
		},
		btnMenu:{
	 		paddingTop:4, 
	 		paddingBottom:4,
	 	},
	 	perfil:{
		 	marginBottom:-19
		},
	},
	"@media (min-device-height: 811)": {
		contenedorBack:{
			top:Platform.OS==='android' ?0 :10,
			marginBottom:Platform.OS==='android' ?0 :10
		}
	}
})