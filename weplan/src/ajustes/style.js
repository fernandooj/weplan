import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";

export const AjustesStyle = MediaQueryStyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
	},
	subContenedor:{
		width:'80%'
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
		paddingTop:8,
		paddingBottom:8,
		paddingRight:20,
		paddingLeft:20,
		borderRadius:20,
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
 		width:'100%' 
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
 		right:75,
 		top:13
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
		borderRadius: 75,
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
		fontSize:21,
		marginLeft:20,
		marginTop:20,
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
 		backgroundColor:'#dadede',
 		width:screenWidth,
 		padding:10,
 	},
 	imgBack:{
 		width:18,
 		height:20
 	},
 	btnBack:{
 		width:'30%',
 		marginLeft:20
 	},
 	btnEdit:{
 		width:'30%'
 	},
 	textBack:{
 		width:'35%'
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
			top:-20,
			paddingTop:6,
			paddingBottom:6,
			paddingRight:20,
			paddingLeft:20,
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
			borderRadius: 60,
			width: 110,
			height: 110,
			borderWidth:5,
		},
		btnMenu:{
	 		paddingTop:4, 
	 		paddingBottom:4,
	 	},
	 	perfil:{
		 	marginBottom:-39
		},
	}
})