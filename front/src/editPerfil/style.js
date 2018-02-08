import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
const win = Dimensions.get('window');
export const LoginStyle = StyleSheet.create({ 
	fondo:{
		flex: 1,
		alignItems: 'center',
		backgroundColor:'#ffffff'
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
		color:'#ffffff',
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		marginRight:10,
		marginTop:10,
		padding:0
	},
	genero:{
		marginTop:10,
		marginBottom:10,
		width:240,
		color:'#ffffff',
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
	},
	avatarContainer: {
		borderColor: '#9B9B9B',
		justifyContent: 'center',
		alignItems: 'center'
	  },
	avatar: {
		borderRadius: 75,
		width: 150,
		height: 150
	}
})





