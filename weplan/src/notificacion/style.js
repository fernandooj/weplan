import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const NotiStyle = StyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
	},
	subContenedor:{
		width:'80%'
	},
	avatar: {
		marginTop:10,
		marginRight:10,
		borderRadius: 35,
		width: 70,
		height: 70,
		borderColor:'#5664ba',
		borderWidth:5,
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
 	btnNoti:{
 		borderWidth:3,
 		borderRadius:12,
 		padding:10,
 		borderColor:'#E1E1E3',
 		backgroundColor:'#FFFFFF',
 		marginLeft:10,
 		marginTop:10,
 	},
 	textoNoti:{
 		color:'#5664ba',
 		fontSize:16
 	},
 	tituloNoti:{
 		marginTop:15,
 		fontSize:18,
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

})
