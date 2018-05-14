import {StyleSheet, Dimensions} from 'react-native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export const MisPlanesStyle = StyleSheet.create({
	contenedor:{
		flex: 1,
		alignItems: 'center',
		height:Height  
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
	container:{
	 	width:'100%',
		flex: 1, 
		backgroundColor:'#ffffff',
		flexDirection: 'row',
		flexWrap: 'wrap',
		height:Height  
	},
	boxPlan:{
		margin:10,
    	width: Width / 2.6,
		paddingTop:0,
		paddingBottom:0,
	},
	background:{
 		height: Height/7, 
		width:'100%'
	},
	boxPlan1:{
		backgroundColor:'#EFF9F9',
		minHeight:50
  	},
	nombre:{ 
		marginTop:6,
		fontSize:14,
		paddingLeft:6,
		color:'#00bf07',
	},
	debe:{
		color:'#BF0005',
	},
	fechaLugar:{
		fontSize:14,
		color:'#98c2c6',
		paddingLeft:6,
		marginBottom:6,
	 
	},
	 



})