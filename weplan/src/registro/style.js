import {StyleSheet, Dimensions} from 'react-native';
export const LoginStyle = StyleSheet.create({ 
	fondo:{
		flex: 1,
		alignItems: 'center'
		justifyContent: 'center', 
	},
	image:{
		marginTop:70,
		marginBottom:40,
	},
	imageLogin:{
		marginTop:60,
		marginBottom:40,
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#F2F4F4',
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
		backgroundColor:'rgba(117, 139, 252, 0.6)',
		borderRadius: 50,
		color:'#ffffff'

	},
	textSubmit:{
		textAlign: 'center',
		color:'#ffffff',
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
		paddingLeft:23,
		paddingRight:15,
		borderRadius: 50,
		borderWidth: 5,
		marginRight:20,
		borderColor: '#ffffff',
		color:'#ffffff'	
	},
	google:{
		fontSize:25,
		backgroundColor:'#DD2D1B',

		paddingTop:20,
		paddingBottom:10,
		paddingLeft:23,
		paddingRight:15,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: '#ffffff',
		color:'#ffffff'	
	},
	btnRegistro:{
		backgroundColor:'rgba(117, 139, 252, 0.6)',
		color:'#ffffff',
		marginTop:20,
		borderRadius: 50,
		padding:10,
		fontSize:20,
		width:240,
		textAlign: 'center', 
	},
	text:{
		color:'#ffffff',
		marginTop:20,
	}
})





