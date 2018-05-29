import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
export const HomeStyle = StyleSheet.create({
	contenedor:{
		flex: 1,
		backgroundColor:"#ffffff",
	},
	contenedorPlan:{
		flex: .5,	
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
	fondo:{
		height:screenHeight-(screenHeight/7.3),
	},
	footer:{
		position:'absolute',
		bottom:0,
		width:screenWidth,
		backgroundColor:"rgba(0,0,0,0.56)",  
		paddingLeft:20,
	 
	},
	footer1:{
		flexDirection:'row',
	},
	btnIconVer:{
		width:100
	},
	iconVer:{
	 	width:40,
	 	height:40,
	 	marginTop:10,
	 	marginBottom:10,
	},

	textFooter1:{
		color:'#ffffff',
		fontSize:17,
		marginTop:20,
		width:'85%'
	},
	footer2:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
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
		paddingTop:0, 
		paddingBottom:10 
	},
	iconFooter3:{
		width:'65%', 
		height:30,  
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
	 	marginBottom:10, 
	 	marginLeft:2,
	 	marginRight:2
	},
	textoFooter3:{
		fontSize:11,
	},

	textFooter2:{
		color:'#ffffff',
		marginTop:0
	},
	textFooter3:{
		color:'#ffffff',
		marginTop:20,
		marginLeft:10
	},
	iconFooter1:{
		marginLeft:40,
		width:35,
	 	height:35,
	 	marginTop:10,
	 	marginBottom:10,
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

	 
})




