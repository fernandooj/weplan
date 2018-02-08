import {StyleSheet, Dimensions} from 'react-native';
const win = Dimensions.get('window');
export const LoginStyle = StyleSheet.create({ 
	fondo:{
		flex: 1,
		alignItems: 'center',
		/*justifyContent: 'center', justifica contenido verticalmente */
	},
	image:{
        width: win.width,
        height: win.height,
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: 'rgba(255,255,255,.4)',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		borderBottomWidth:0,
		paddingLeft:20
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
	textAlert:{
		color:'#ffffff',
		marginTop:20,
		padding:20,
		textAlign: 'center',
	},
	date:{
		width:260,
		flexDirection: 'row',
	},
	datePicker:{
		width:'33%',
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		marginRight:10,
		marginTop:20,
		padding:0
	},
	genero:{
		width:240,
		color:'#ffffff',
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
	}
})





