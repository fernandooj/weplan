import {StyleSheet, Dimensions} from 'react-native';
export const AmigosStyle = StyleSheet.create({  
	contenedor:{
		alignItems: 'center',
	},
 	subLista:{
		width:'80%',
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:10
	},
	contenedorAmigos:{
 		width:'100%',	
 		alignItems: 'center',
 	},
	avatar:{
		height: 60,
		width: 60,
		borderRadius: 30,
	},
	avatar2:{   
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 3.5,
		borderColor: '#C2E3EE',
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
	titulo:{
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:10,
		marginBottom:10
	},
	separador:{
		height:1,
		width:'80%',
		flexDirection:'row',
		alignItems: 'center',
		backgroundColor:'rgba(180,180,180,.2)'
	},
	btnClose:{
		marginLeft:30,
		width:'20%'
	},
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	imagenTitulo:{
		width:45,
		height:45,
	},
	input:{
		marginTop:10,
		width:'80%',
		height:40,
		backgroundColor: '#f0f2f2',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#cccccc',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
		alignItems: 'center',
	}, 
	text: {
		color:'#969696',
		fontSize: 22,
		marginLeft:10,
		marginTop:8
	},
	btnModal:{
		fontSize:20,
		color:'#969696',
		marginTop:5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight:10,
		marginLeft:10,
	}, 
	btnBuscar:{
		position:'absolute',
		top: 16,  
		right:49, 
		width:25,
		height:25
 	}, 
 
 	/////////// btn hecho /////////////
 	containerHecho:{

		alignItems: 'center',
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
 	}

})