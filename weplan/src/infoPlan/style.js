import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
export const InfoPlanStyle = StyleSheet.create({ 
	contenedorGeneral:{
		backgroundColor:'#ffffff'
	},
	contenedor:{
		alignItems: 'center',
		marginBottom :20
	},
	encabezadoPlan:{
		alignItems: 'center',
		backgroundColor:'#f8f8f8',
		paddingTop: 30,
		paddingBottom: 30,
		flexDirection: 'row',
		width:'100%',
		paddingRight:10,
		paddingLeft:10,
		borderBottomLeftRadius:40,
		borderBottomRightRadius:40
	},
	imagenPlan:{
 		width:100,
 		height:100,
 		borderRadius:50,
 		borderWidth:5,
 		borderColor:'#699be4',
 		marginRight:10,
 	},
 	avatar:{
 		width:40,
 		height:40,
 		borderRadius:20,
 		borderWidth:2,
 		borderColor:'#cae1ec',
 		marginRight:10,
 	},
 	titulo:{
 		fontSize:30,
 		color:'#4a4a4a'
 	},
 	descripcion:{
 		color:'#5664ba',
 		fontSize:17,
 		width:'70%'
 	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#F2F4F4',
		borderWidth: 0.1,
		borderColor: '#d6d7da',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
		alignItems: 'center',
	}, 
	textarea:{
		borderWidth: 0,
		alignItems: 'center',
		marginTop:5,
		width:'80%',
		height:40,
		backgroundColor: '#f1f3f3',
		borderRadius: 20, 
		paddingLeft:20,
		height:60,
		color:'#969696'
	},
	

	iconCamera:{
		fontSize:100
	},
	inputs:{
		borderWidth: 0,
		alignItems: 'center',
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#f1f3f3',
		borderRadius: 50,
		paddingLeft:20,
	},
	btnInputs:{
		borderWidth: 0,
		alignItems: 'center',
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#D9E6F4',
		borderRadius: 50,
		paddingLeft:20,
		paddingTop:10,
		color:'#969696'
	},
	btnColor2Input:{
		color:'#c9c9c9',
		backgroundColor: '#f1f3f3',
	},
	cajaInpunts:{
		flexDirection: 'row',
		justifyContent: 'center',

	},
	iconInput:{
		width:30,
		height:30,
		position:'relative',
		top:15,
		marginRight:25
	},
	textInput:{
		width:45,
		height:30,
		position:'relative',
		top:15,
		marginRight:10
	},
	 
	 
	 
	
	///////////////////////////////////////
	/////////////// mapa //////////////////
	///////////////////////////////////////
	tituloMapa:{
		flexDirection:'row',
	},
	container: {
		marginTop:0,
		height: 600,
	},
	map: {
		marginTop:0,
		height: screenHeight/1.3, 
		width: '100%',
	},
	btnClose:{
		marginLeft:20,
		width:'8%'
	},
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	buscador:{
		width:'100%'
	},
	///////////////////////////////////////
	////////// restricciones //////////////
	///////////////////////////////////////
	contenedorRes:{
		alignItems: 'center',
	},
	touchRes:{
		flexDirection:'row',
		alignItems: 'flex-start',
		borderColor: '#d6d7da',
		borderBottomWidth:.6,
		width:'70%',
		paddingTop:15,
		paddingBottom:15,
	},
	iconRes:{
		width:50,
		height:50
	},
	textoRes:{
		position:'relative',
		top:10,
		fontSize:20,
		color:'#969696'
	},
	banRes:{
		position:'relative',
		top:30,
		left:-20,
		fontSize:20,
	},
	banResInactive:{
		color:'#9B9B9B'
	},
	banResActive:{
		color:'#FF5959'
	},
	btnHecho:{
 		width:'40%',
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10,
 		marginTop:20,
 		marginBottom:20,
 	},
 	hecho:{
 		color:'white'
 	},
	//////////////////////////////////////////////////
	////////// elementos agregados
	/////////////////////////////////////////////////
	contentAdd:{
		flexDirection:'row',
		marginTop:10,
		width:'58.5%' 
	},
 	
 	iconAgregado:{
 		width:20,
 		height:20,
 		position:'absolute',
 		top:25,
 		right:2
 	},
 	textoAgregado:{
 		width:40,
 		fontSize:9,
 		alignItems: 'center',
 	},
 	agregadosContenedor:{
 		minWidth:'55%',
 		flexDirection:'row',
 	},
 	addBtn:{
 		width:40,
 		height:40,
 		alignSelf: 'flex-end', 
 	},
 	add:{
 		width:40,
 		height:40,
 	},
 	banResActiveAdd:{
 		color:'#FF5959',
 		fontSize:30,
 		position:'absolute',
 		top:17,
 		right:4
 	},
	//////////////////////////////////////////////////
	////////// elementos agregados
	/////////////////////////////////////////////////
	botones:{
		width:'100%',
		padding:10,
		backgroundColor:'#f8f8f8'
	},
	textoBotones:{
		color:'#828282',
		borderColor: 'rgba(130,130,130, .13)',
		padding:5,
		borderBottomWidth:1,
		fontSize:20
	},
	textoBotonesLast:{
		borderBottomWidth:0,
	}

})