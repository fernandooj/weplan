import {StyleSheet, Dimensions} from 'react-native';
const Height = Dimensions.get('window').height;

export const MisPlanesStyle = StyleSheet.create({
	container:{
		flex: 1,
	},
	/////////////////////////////////////////////////////////////////////////// cabezera
	contenedorCabezera:{
		flexDirection:'row',
		marginBottom:15
	},
	input:{
		marginTop:10,
		width:'75%',
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
	btnClose:{
		marginTop:7,
		marginLeft:30,
		width:'10%'
	}, 
	imagenClose:{
		width:10,
		height:20,
		marginTop:10
	},
	btnBuscar:{
		position:'absolute',
		top: 16,  
		right:49, 
		width:25,
		height:25
 	}, 


	/////////////////////////////////////////////////////////////////////////// filtros
	boxPlan:{
		height:Height/2.3, 
	 	width:'100%',
	},
	background:{
 		height:Height/3.25,
		width:'100%'
	},
	boxPlan1:{
		backgroundColor:'#EFF9F9',
		paddingBottom:13,
		paddingTop:10,
	},
	nombre:{
		fontSize:23,
		paddingBottom:4,
		paddingLeft:10,
		color:'#BF0005',
	},
	fechaLugar:{
		fontSize:21,
		color:'#98c2c6',
		paddingLeft:10
	}



})