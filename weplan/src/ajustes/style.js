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
		marginTop:Platform.OS==='android' ?50 :65
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
 	txtMenu:{
 		fontSize:20
 	},
 	//////////////////////////////////////////////////////////////////////////////////////
 	///////////////////////			AMIGOS 			//////////////////////////////////////
 	/////////////////////////////////////////////////////////////////////////////////////
 	contenedorLista:{
 		width:'100%',  
 		flexDirection:'row',
 	},
 	contenedorA:{
 		paddingBottom:40
 	},
 	registro:{
 		justifyContent :"center",
 		alignItems: 'center',
 		width:100,
 		marginHorizontal:1,
 		backgroundColor:'#94A5F3',
 	},
	registro2:{
		flexDirection:'row',
 		alignItems: 'center',
 		width:'100%',
 		marginTop:Platform.OS==='android' ?50 :70 
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
 		marginTop:40,
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
		width: "100%",
		height: 100,
		borderColor:'#9CB7F5',
 	},
 	avatarA2:{
 		marginTop:10,
		borderRadius: 75,
		width: 60,
		height: 60,
		borderColor:'#9CB7F5',
		borderWidth:6,
 	},
 	contentTextAvatar:{
 		justifyContent:"center",
 		width:'90%',
 				height:38,
 	},
 	textoAvatar:{
		fontSize:22,
		// width:"50%",
		marginTop:15,
		textAlign:"center",
		color:"white",
		height:50
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

	btnHechoAmigos:{
 		alignItems: 'center',
 		backgroundColor:'#ffffff',
 		padding:5,
 		paddingTop:8,
 		paddingBottom:8,
 		width:"100%"
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
 	btnHechoEnviado:{
 		alignItems: 'center',
 		backgroundColor:'#309f6a',
 		borderRadius:10,
 		padding:5,
 		paddingTop:8,
 		paddingBottom:8,
 		marginTop:22
 	},
 	hecho:{
 		color:"#ffffff"
 	},
 	registroAsignados:{
 		flexDirection:'row',
 		alignItems: 'center',
 		width:'100%',
 	},
 	avatarAsignados:{
 		marginTop:10,
		borderRadius: 30,
		width: 60,
		height: 60,
		borderColor:'#9CB7F5',
		borderWidth:4,
 	},
 	textoAvatarAsignados:{
		fontSize:22,
		marginLeft:20,
		marginTop:18,
		width:'55%'
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
 	},
 	btnBack:{
		alignItems:'center',
		width:60,
		padding:13,
 		marginLeft:10,
 	},
 	imgBack:{
 		width:11,
 		height:20
 	},
 	btnEdit:{
 		width:'10%'
 	},
 	contenedorTexto:{
 		width:screenWidth-130,
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
	btnOmitir:{
		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:5,
 		paddingTop:8,
 		paddingBottom:8,
 		marginTop:2	
	},
	txtOmitir:{
		color:'#ffffff'
	},

 	//////////////////////////////////////////////////////////////////////////////////////
 	///////////////////////			IMPORTAR 			 
 	/////////////////////////////////////////////////////////////////////////////////////
	textoAvatarImp:{
		fontSize:22,
		marginTop:2,
		width:"60%",
		color:"#000000"
	},
	registroImp:{
		flexDirection:'row',
 		alignItems: 'center',
 		width:'100%',
 		marginTop:10 
 		// marginTop:Platform.OS==='android' ?50 :70 
	},
	btnHechoImp:{
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:15,
 		marginTop:22
 	},
	hechoImp:{
 		color:'#ffffff',
 	},

 	
},{
	"@media (max-device-width: 360)": {
		username:{ 

		},
		input:{
			width:230
		},
		btnSearch:{
	 		top:9
	 	}, 
	 	avatarA:{
	 	// 	marginTop:10,
			// borderRadius: 75,
			// width: 43,
			// height: 43,
			// borderWidth:3,
	 	}, 
	 	textoAvatar:{
			fontSize:14,
			// marginLeft:20,
			// marginTop:15,
			// width:'55%'
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