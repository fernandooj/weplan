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
	textarea:{
		borderWidth:1,
		borderColor:"#cccccc",
		height:40,
		fontSize:20,
		marginVertical:10
	},
	textarea2:{
		borderWidth:1,
		borderColor:"#cccccc",
		height:60,
		fontSize:20,
		marginVertical:10,
	},
	btnHecho:{
 		width:'40%',
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10
 	},
 	hecho:{
 		color:'white'
 	},
	titulo:{
		width:"100%",
		textAlign:"center",
		marginVertical:20,
		fontSize:20
	}
},{
	"@media (max-device-width: 320)": {
		nombre:{
			width:160,
		},
	}
})




