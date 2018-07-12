import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const NotiStyle = StyleSheet.create({ 
	contenedor:{
		flex: 1,
		backgroundColor:"#ffffff",
	},
	contenedorPlan:{
		flex: .5,	
	},
	
	// contenedor:{
	// 	alignItems: 'center',
	// },
	subContenedor:{
		width:'86%',
		 
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
