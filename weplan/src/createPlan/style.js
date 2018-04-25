import {StyleSheet, Dimensions} from 'react-native';
export const CreatePlanStyle = StyleSheet.create({ 
	contenedor:{
		alignItems: 'center',
		marginTop:20
	},
	contenedorGeneral:{
		backgroundColor:'#ffffff'
	},
	encabezado:{
		backgroundColor:'#DAE0E0',
		padding: 10
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
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#D9E6F4',
		borderRadius: 50,
		paddingLeft:20,
		height:60,
		color:'#969696'
	},
	encabezadoPlan:{
		alignItems: 'center',
		backgroundColor:'#F2F4F4',
		paddingTop: 50,
		paddingBottom: 30,
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
		backgroundColor: '#D9E6F4',
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
		color:'#c9c9c9'
	},
	btnInputSinPadding:{
		color:'#c9c9c9'
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
	create:{
		marginTop:10,
		width:180,
		height:90
	},
	createIcon:{
		width:180,
		height:90
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
		height: 500, 
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
	//////////////////////////////
	////////// modal //////////////
	//////////////////////////////
	wrapper: {
		paddingTop: 50,
		flex: 1
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#f0f2f2',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#cccccc',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
	}, 
	text: {
		color:'#969696',
		fontSize: 22
	},
	lista:{
		 flex:1
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
	btnHecho:{
		backgroundColor: '#8FA8F7',
		marginTop:30,
		borderRadius: 50,
		paddingTop:10,
		paddingBottom:10,
		paddingRight:55,
		paddingLeft:55,
	},
	textoHecho:{
		color:'#ffffff',
		fontSize:19
	}

})