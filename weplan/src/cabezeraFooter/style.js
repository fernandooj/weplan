import {StyleSheet, Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const cabezeraFooterStyle = MediaQueryStyleSheet.create({
	 
	cabezera:{
		position:'absolute',
		top:0,
		marginTop:Platform.OS==='android' ? 0 : 0,
		paddingTop:Platform.OS==='android' ? 0 : 18,
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
	familia:{
		fontFamily:'Futura-CondensedLight',
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
	containerBuscador:{
		flexDirection:'row'
	},
	buscador:{
		width:200,
		alignItems:'center',
		paddingLeft:0,
		paddingVertical:Platform.OS==='android' ? 0 : 11,
		fontSize:20
	},
	closeBtn:{
		fontSize:20,
		marginTop:15
	},
	footer3:{
		backgroundColor:"#ffffff",
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'center',
	},
	btnFooter3:{
		alignItems: 'center',
		width:'18%', 
		marginLeft:'1%', 
		marginRight:'1%',
		paddingTop:5, 
		paddingBottom:5 
	},
	btnFooter3Active:{
		opacity:.5,
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
  	punto:{
  		fontSize:30,
  		position:'absolute',
  		bottom:-16,
  		color:'#00c026'
  	}
},{
	"@media (max-device-width: 380)": {
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
		btnIconVer:{
			width:100
		},
		iconVer:{
		 	width:30,
		 	height:30,
		 	marginTop:20,
		 	marginBottom:0,
		},
		iconFooter:{
			width:35,
		 	height:35,
		 	marginTop:0,
		 	marginBottom:15, 
		 	marginLeft:2,
		 	marginRight:2
		},
	},
	"@media (min-device-height: 811)": {
		cabezera:{
			marginTop:Platform.OS==='android' ? 0 : 0,
			paddingTop:32,
		},
		footer3:{
			paddingBottom:10,
		}
	}
})




