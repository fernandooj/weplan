import {StyleSheet, Dimensions, Platform} from 'react-native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
 
export const MisPlanesStyle = MediaQueryStyleSheet.create({
	contenedor:{
		flex: 1,
		alignItems: 'center', 
		width:'100%',
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	/////////////////////////////////////////////////////////////////////////// cabezera
	contenedorCabezera:{
		flexDirection:'row',
		marginBottom:15,
		marginTop:Platform.OS==='android' ?5 :18
	},
	input:{
		marginTop:10,
		width:'70%',
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
		right:30, 
		width:25,
		height:25
 	}, 


	/////////////////////////////////////////////////////////////////////////// filtros
	container:{
	 	width:Width-20,
		marginBottom:50,
	},
	boxPlan:{
    	width: Width ,
		paddingTop:0,
		paddingBottom:0,
		marginBottom:10
	},
	background:{
		backgroundColor:'#ffffff', 
 		height: Height/2.9, 
		width:'100%',
	},
	boxPlan1:{
		backgroundColor:'#EFF9F9',
		flexDirection:'row',
		paddingTop:5,
		paddingBottom:5,
  	},
	nombre:{ 
		marginTop:-34,
		fontSize:24,
		paddingLeft:6,
		backgroundColor:"rgba(0,0,0,0.56)",  
		color:'#ffffff'
	},
	debe:{
		backgroundColor:'#00bf07',
		width:16,
		height:16,
		borderRadius:8,
		marginTop:10
	},
	noDebe:{
		backgroundColor:'#BF0005',
		borderRadius:8,
	},
	deudaCero:{
		backgroundColor:'#98c2c6',
		borderRadius:8,
		width:16,
		height:16,
		marginTop:10
	},
	fechaLugar:{
		fontSize:20,
		color:'#98c2c6',
		paddingLeft:6,
		marginBottom:6,
		width:"88%"
	},
	sinPlanes:{
		width:350,
		height:530,
		marginBottom:10,
		paddingHorizontal:90
	},
	footer:{
		position : 'absolute',
		bottom:0,
		zIndex:100
	},
},{
	"@media (max-device-width: 360)": {
		input:{
			marginTop:10,
			width:'70%',
			height:35,
			backgroundColor: '#f0f2f2',
			borderRadius: 50,
			borderWidth: 0.5,
			borderColor: '#cccccc',
			borderBottomWidth:0,
			paddingLeft:20,
			color: '#8F9093',
			alignItems: 'center',
		},
		btnBuscar:{
			top: 15,  
			right:15, 
	 	}, 
	 	sinPlanes:{
			width:320,
			height:430,
			marginBottom:10
		},
		background:{ 
	 		height: Height/3.3, 
		},
	},
	"@media (min-device-height: 710)": {
		// sinPlanes:{
		// 	width:470,
		// 	height:597,
		// },
	},
	"@media (device-height: 812)": {
		contenedorCabezera:{
			marginTop:Platform.OS==='android' ?5 :23,
		},
	}
})