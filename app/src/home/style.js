import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
 
export const style = MediaQueryStyleSheet.create({
	contenedor:{
		flex: 1,
		backgroundColor:"#ffffff",
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	contenedorPlan:{
		flex: 1
	},
	cabezera:{
		position:'absolute',
		top:0,
		width:'100%',
		zIndex:100,
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'center',
		borderTopLeftRadius: 0 , 
		borderTopRightRadius:0 , 
		borderBottomLeftRadius: 50,  
		borderBottomRightRadius: 50, 
		backgroundColor:"rgba(255,255,255,0.79)",	 
	},
	iconHead:{
	 	width:40,
	 	height:40,
	 	marginTop:10,
	 	marginBottom:10,
	 	marginLeft:35,
	 	marginRight:35
	},
	iconHead2:{
	 	width:50,
	 	height:40,
	 	marginTop:10,
	 	marginBottom:10,
	 	marginLeft:35,
	 	marginRight:35
	},
	hideCabezera:{
		position:'absolute',
		top:-100
	},
	fondo:{
		top:Platform.OS==='android' ?0 :18,
		// borderBottomWidth:6,
		borderColor:"#ffffff",
		height:screenWidth+100,
		marginBottom:10
	},
	footer:{
		position:'absolute',
		bottom:0,
		width:screenWidth,
		backgroundColor:"rgba(0,0,0,0.56)",  
		paddingLeft:20,
		paddingBottom:0,
	},
	footer1:{
		flexDirection:'row',
	},
	btnIconVer:{
		width:100
	},
	iconVer:{
	 	width:30,
	 	height:30,
	 	marginTop:10,
	 	marginBottom:5,
	},

	textFooter1:{
		color:'#ffffff',
		fontSize:17,
		marginTop:14,
		width:'85%'
	},
	footer2:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
		top:-5
	},
	footer3:{
		flexWrap: 'wrap', 
		backgroundColor:"#ffffff",
		alignItems: 'center',
	},
	btnFooter3:{
		alignItems: 'center',
		width:'18%', 
		marginLeft:'1%', 
		marginRight:'1%',
		paddingTop:5, 
		paddingBottom:5 
	},
	iconFooter3:{
		width:'55%', 
		height:25,  
	},
	btnFooter3Create:{
		width:'18%', 
	},
	iconFooter3Create:{
		width:'65%', 
		height:35,  
	}, 
	iconFooter:{
		width:35,
	 	height:35,
	 	marginTop:10,
	 	marginBottom:0, 
	 	marginLeft:2,
	 	marginRight:2
	},
	textoFooter3:{
		fontSize:11,
	},

	textFooter2:{
		color:'#ffffff',
		marginTop:0,
		fontSize:15
	},
	textFooter3:{
		color:'#ffffff',
		marginTop:20,
		marginLeft:10
	},
	iconFooter1:{
		width:28,
	 	height:28,
	 	marginTop:15,
	},
	iconFooter2:{
		width:240,
		height:85,
	},
	footer3:{
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'center',
	},	
	sinResultados:{
		marginTop:100,
		alignItems :'center',
		justifyContent: 'center',
	} 
},{
	"@media (max-device-width: 320)": {
		iconHead:{
		 	width:35,
		 	height:35,
		 	marginTop:6,
		 	marginBottom:6,
		 	marginLeft:30,
		 	marginRight:30
		},
		iconHead2:{
		 	width:45,
		 	height:35,
		 	marginTop:6,
		 	marginBottom:6,
		 	marginLeft:30,
		 	marginRight:30
		},
		btnFooter3Create:{
			width:'18%', 
		},
		iconFooter3Create:{
			width:'64%', 
			height:33,  
		}, 
		iconFooter:{
			width:25,
		 	height:25,
		 	marginTop:0,
		 	marginBottom:0, 
		 	marginLeft:2,
		 	marginRight:2
		},
		iconFooter1:{
			width:21,
		 	height:21,
		 	marginTop:4,
		},
		fondo:{
			height:screenWidth+100,
		},
	},
	"@media (min-device-height: 770)": {
		 
	},
	"@media (device-height: 812)": {
		fondo:{
			top:Platform.OS==='android' ?0 :32,
			// height:Platform.OS==='android' ?screenHeight-(screenHeight/9.7) :screenHeight-(screenHeight/16.7),
			// height:Platform.OS==='android' ?screenHeight-(screenHeight/9.7) :screenHeight-(screenHeight/8.6),
		},
		footer:{
			paddingBottom:2
		}
	}
})




