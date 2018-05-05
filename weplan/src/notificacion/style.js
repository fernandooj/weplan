import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const NotificacionStyle = StyleSheet.create({ 
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
 	///////////////////////			AMIGOS 			//////////////////////////////////////
 	/////////////////////////////////////////////////////////////////////////////////////
 	contenedorA:{
 		paddingBottom:40
 	},
 	registro:{
 		flexDirection:'row',
 		alignItems: 'center',
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
 		width:'85%',
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
	tituloGrupo:{
		color:'#7788f2',
		fontSize:20,
		marginTop:10,
		marginBottom:10,
	},
 	////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////////////////////////////////////////////////////////
 	contenedorBack:{
 		flexDirection:'row',
 		backgroundColor:'#dadede',
 		width:screenWidth,
 		padding:10
 	},
 	imgBack:{
 		width:14,
 		height:15
 	},
 	btnBack:{
 		width:'85%',
 		marginLeft:20
 	},
 	btnEdit:{
 		width:'15%'
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

})
