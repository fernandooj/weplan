import {StyleSheet, Dimensions} from 'react-native';
import { MediaQueryStyleSheet } from "react-native-responsive";
var screenHeight = Dimensions.get('window');
 
export const style = MediaQueryStyleSheet.create({ 
	container:{
		flex:1,
	},
	fondo:{
		flex: 1,
		alignItems:'center',
	},
	fondoLogin:{
		flex: 1,
		alignItems:'center',
		justifyContent: 'center', /*justifica contenido verticalmente */
		height:screenHeight.height,
	},
	image:{
		marginTop:80,
		marginBottom:20,
	},
	imageLogin:{
		marginTop:60,
		marginBottom:40,
	},
	imageLogos:{
		marginTop:50
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#E3E3E5',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
		
		fontSize:17
	}, 
	submit:{
		marginTop:10,
		width:240,
		paddingTop:8,
		paddingBottom:8,
		backgroundColor: 'rgba(62,78,102, .45)',
		borderRadius: 50,
	},
	textSubmit:{
		textAlign: 'center',
		color: '#ffffff',
		fontSize:20
	},
	text:{
		fontSize:20
	},
	logos:{
		flexDirection: 'row',
		marginTop:0
	},
	facebook:{
		fontSize:25,
		backgroundColor:'#1175C9',
		paddingTop:20,
		paddingBottom:10,
		paddingLeft:24,
		paddingRight:17,
		borderRadius: 50,
		borderWidth: 5,
		marginRight:20,
		borderColor: '#D4DBE5',
		color:'#ffffff'	
	},
	google:{
		fontSize:25,
		backgroundColor:'#DD2D1B',
		paddingTop:20,
		paddingBottom:10,
		paddingLeft:22,
		paddingRight:14,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: '#FFD8D9',
		color:'#ffffff'	
	},
	
	textAlert:{
		color:'#7585eb',
		marginTop:20,
		padding:20,
		textAlign: 'center',
	},
	signup_btn:{
		backgroundColor:'rgba(117, 139, 252, 0.6)',
		marginTop:20,
		borderRadius: 50,
		padding:10,
		width:240,
	},
	btnRegistro:{
		color:'#ffffff',
		textAlign: 'center', 
		fontSize:17
	},
	BtniconPass:{
		position:'relative',
		top:-29,
		left:85
	},
	iconPass:{
		fontSize:16
	}

},{
	"@media (max-device-width: 320)": {
		 
	 
		imageLogin:{
			marginTop:40,
			marginBottom:40,
		},
		imageLogos:{
			marginTop:30
		},
		// facebook:{
		// 	fontSize:20,
		// 	paddingTop:17,
		// 	paddingBottom:7,
		// 	paddingLeft:21,
		// 	paddingRight:14,
		// 	borderRadius: 50,
		// 	borderWidth: 5,
		// 	marginRight:20,
		// },
		// google:{
		// 	fontSize:20,
		// 	paddingTop:15,
		// 	paddingBottom:10,
		// 	paddingLeft:18,
		// 	paddingRight:11,
		// 	borderRadius: 50,
		// 	borderWidth: 3,
		// },
	}
})





