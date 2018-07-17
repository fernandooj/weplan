import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window');

export const costoPlanStyle = StyleSheet.create({
	 
	contenedor:{
		alignItems: 'center',
		flex: 1,
		backgroundColor:"#ffffff",
	},
	subContenedor:{
		width:'80%',
	},
	contenedorItem:{
		flexDirection:'row',
	},
	item:{
		flexDirection:'row',
		marginTop:10,
        alignItems: 'center',
	},
	imagen:{
		borderRadius: 40,
		width: 80,
		height: 80,
		borderColor:'#9CB7F5',
		borderWidth:6,
		marginRight:15
	},
	contenedorLeft:{
		// width:'80%'
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
	nombre:{
		color:'#5664ba',
		fontSize:19,
		width:160,
	},
	textoTotal:{
		fontSize:20,
		marginRight:10
	},
	total:{
		color:'#79CF40',
		alignSelf: 'flex-start', 	 
		fontSize:20
	},
	back:{
		width:20,
		height:20,
		marginLeft:6 
	},
	////////////////////////////////////////////////////////////////////////////////////
	////////////////// 		pago deuda
	////////////////////////////////////////////////////////////////////////////////////
	pagoDeudaContenedor:{
		flexDirection:'row',
		marginTop:10,
	},
	pagoDeudaAvatar:{
		width:50,
		height:50,
		borderRadius:35,
		borderWidth: 5,
		borderColor:'#a5a5a5',
	},
	pagoDeudaNombre:{
		width:'55%',
		fontSize:18,
		marginLeft:12,
		marginTop:10
	},
	pagoDeudaMonto:{
		color:'#c5012b',
		fontSize:18,
		marginTop:7
	},
	pagoDeudaMontoActive:{
		color:'#79CF40',
		fontSize:18,
		marginTop:7
	},
	infoAbonoDeuda:{
		flexDirection:'row',
		alignSelf: 'flex-end',
		marginRight:12
	},
	textAbonoDeuda:{
		fontSize:12
	},
	 
})




