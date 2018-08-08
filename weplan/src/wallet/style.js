import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window');

export const walletStyle = StyleSheet.create({
	 
	contenedor:{
		alignItems: 'center',
		flex: 1,
		backgroundColor:"#ffffff",
	},
	subContenedor:{
		width:'80%',
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
	pagoDeudaMonto:{
		color:'#c5012b',
		fontSize:17,
		width:80
	},
	pagoDeudaMontoActive:{
		color:'#79CF40',
		fontSize:17,
		width:80
	},
	back:{
		width:20,
		height:20,
		marginLeft:6 
	}
	 
})




