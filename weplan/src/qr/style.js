import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
const width = Dimensions.get('window');
const height = Dimensions.get('window').height;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const QrStyle = MediaQueryStyleSheet.create({ 
	contenedor:{
		flex: 1,
		height:height,
		backgroundColor:'#ffffff',
	},
	fondo:{
		flex: 1,
		backgroundColor:'#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titulo:{
		color:'#94A5F3',
		fontSize:17,
		margin:10
	},
	texto:{
		width:'80%',
		margin:10
	},
	qr:{
		padding:50,
		paddingLeft:50,
		paddingTop:50,
		backgroundColor:'rgba(100,100,100,.4)',
		borderRadius: 170,
	},
	/////////// btn hecho /////////////
 	containerHecho:{
 		marginTop:20,
 		marginBottom:20,
		alignItems: 'center',
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
 	}

	 
},{
	"@media (max-device-width: 320)": {
		 
	}
})





