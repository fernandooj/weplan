import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const AjustesStyle = StyleSheet.create({ 
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

 	////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////////////////////////////////////////////////////////
 	contenedorA:{

 	},
 	registro:{
 		flexDirection:'row',
 	},
 	contenedorBuscar:{
 		flexDirection:'row',
 		position:'relative'
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
 	btnBuscar:{

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
})
