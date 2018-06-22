import {StyleSheet, Dimensions} from 'react-native';
export const EditPasswordStyle = StyleSheet.create({ 
	fondo:{
		flex: 1,
		alignItems: 'center'
	},
	image:{
		marginTop:20,
		marginBottom:40,
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
	}, 
	submit:{
		marginTop:10,
		width:240,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor: 'rgba(62,78,102, .45)',
		borderRadius: 50,
	},
	textSubmit:{
		textAlign: 'center',
		color: '#ffffff' 
	},
	logos:{
		flexDirection: 'row',
		marginTop:20
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
})





