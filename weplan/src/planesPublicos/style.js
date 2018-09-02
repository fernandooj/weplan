import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window');
import { MediaQueryStyleSheet } from "react-native-responsive";
export const style = MediaQueryStyleSheet.create({
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
		fontSize:20,
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
	},
	activarBtn:{
		backgroundColor:'#5664ba',
	 	width:60,
	 	alignItems:'center',
		padding:4,
		borderRadius:10,
		top:5
	},
	activarTxt:{
		color:'#ffffff',
		fontSize:12
	},
	sinPlanes:{
		width:350,
		height:530,
		marginBottom:10
	},
	footer:{
		position : 'absolute',
		bottom:0,
		zIndex:100
	}
},{
	"@media (max-device-width: 320)": {
		nombre:{
			fontSize:18,
		},
		textoTotal:{
			fontSize:18,
			marginRight:10
		},
		subContenedor:{
			width:'95%',
		},
		pagoDeudaMontoActive:{
			width:100
		},
		sinPlanes:{
			width:320,
			height:430,
			marginBottom:10
		},
	},
	"@media (min-device-height: 710)": {
		sinPlanes:{
			width:470,
			height:597,
		},
	},
})




