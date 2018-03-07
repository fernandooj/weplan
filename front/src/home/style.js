import {StyleSheet} from 'react-native';
export const HomeStyle = StyleSheet.create({
	contenedor:{
	
	},
	cabezera:{
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
	 	marginLeft:40,
	 	marginRight:40
	},
	fondo:{
		 flex: 1,
	},
	footer:{
		marginTop:280,
		backgroundColor:"rgba(0,0,0,0.79)",
		paddingLeft:20
	},
	footer1:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
	},
	footer2:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
	},
	iconFooter:{
		width:35,
	 	height:35,
	 	marginTop:10,
	 	marginBottom:10,
	 	marginLeft:2,
	 	marginRight:2
	},
	textFooter1:{
		color:'#ffffff',
		fontSize:17,
		marginTop:20
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
	}

})