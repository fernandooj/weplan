import {StyleSheet, Dimensions, Platform} from 'react-native';
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
		width:'85%',
		top:Platform.OS==='android' ?50 :75,
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
		borderWidth:4,
		marginRight:15
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
	fechaLugar:{
		fontSize:20
	},
	nombre:{
		color:'#5664ba',
		fontSize:21,
		width:220,
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
	verDetalleBtn:{
		width:10,
		height:20,
		marginLeft:6,
		transform: [{ rotate: '180deg'}] 
	}
	 
},{
	"@media (max-device-width: 320)": {
		nombre:{
			width:160,
		},
	}
})




