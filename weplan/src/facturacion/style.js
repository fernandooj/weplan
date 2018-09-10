import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window');

export const style = StyleSheet.create({
	contenedor:{
		alignItems: 'center',
		flex: 1,
		backgroundColor:"#ffffff",
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	subContenedor:{
		width:'80%',
		marginTop:Platform.OS==='android' ?50 :75,
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
	contenedorImagenes:{
		marginTop:10,
		flexDirection :'row',
		alignItems: 'center',
	},
	separador:{
		borderWidth:Platform.OS==='android' ?2 :0,
		padding:0,
		height:0,
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
	boxPlan1:{
		 
	},
	back:{
		width:20,
		height:20,
	 
		marginLeft:6 
	},
	titulo:{
		fontSize:20,
		color:'#9CB7F5',
		alignItems:'center'
	}	
})




