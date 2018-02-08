import {StyleSheet, Dimensions} from 'react-native';
export const LoginStyle = StyleSheet.create({ 
	fondo:{
		flex: 1,
		   alignItems: 'center'
		/*justifyContent: 'center', justifica contenido verticalmente */
	},
	image:{
		marginTop:10,
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#F2F4F4',
		borderRadius: 50,
		borderBottomWidth:0,
		paddingLeft:20,
	},
	submit:{
		marginTop:10,
		width:240,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor: 'rgba(143, 153, 176, 0.43)',
		borderRadius: 50,

	},
	textSubmit:{
		textAlign: 'center',
		color: '#1234A0' 
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
	textAlert:{
		color:'#ffffff',
		marginTop:20,
		padding:20,
		textAlign: 'center',
	}
})





