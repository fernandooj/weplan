import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
const win = Dimensions.get('window');
export const LoginStyle = StyleSheet.create({ 
	fondo:{
		//flex: 1,
		//alignItems: 'center',
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
		color:'#7585eb',
		marginTop:20,
		padding:20,
		textAlign: 'center',
	},
	date:{
		width:265,
		flexDirection: 'row',
	},
	containDatePicker:{
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		width:'31%',
		marginRight:10,
		marginTop:10,
	},
	containDatePickerYear:{
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		width:'34%',
		marginRight:10,
		marginTop:10,
	},
	datePicker:{
		width:'100%',
		color:'#ffffff',
		padding:0,
        height:40,
	},
	containDatePickerGenero:{
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		marginTop:10,
		marginBottom:10,
		width:240,
	},
	genero:{
		color:'#ffffff',
		borderWidth: 0.5,
		borderColor: '#d6d7da',
	},
	avatarContainer: {
		borderColor: '#9B9B9B',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 75
	  },
	avatar: {
		borderRadius: 75,
		width: 150,
		height: 150
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
	contenedorCofres:{
		 flexDirection: 'row', justifyContent: 'flex-end',
		 flex: 1, 
	},
	imagenes:{
		
	},
	imagenCofre:{
		 
		 
		flex: 1 
	}
})





