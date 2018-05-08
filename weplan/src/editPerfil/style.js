import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
const width = Dimensions.get('window');
export const LoginStyle = StyleSheet.create({ 
	 
	fondo:{
		flex: 1,
		backgroundColor:'#ffffff',
		alignItems: 'center',
		/*justifyContent: 'center', justifica contenido verticalmente */
	},
	image:{
		marginTop:10,
        width:'70%',
        height:60
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
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1, 
		backgroundColor:'#ffffff',
		flexDirection: 'row',
    	flexWrap: 'wrap'
	},
	imagenes:{
		marginRight:10,
		marginLeft:10,
	},
	imagenCofre:{
		flex: 1 
	},
	textoCofre:{
		textAlign: 'center',
		color: '#ADADAD',
		fontSize:20,
		marginBottom:20,
	},
	textoCofre2:{
		fontSize:18,
		textAlign: 'center',
		position:'relative',
		top:-68,
		color:'#ffffff'
	},
	estasListoBtn:{
		backgroundColor:'#e8e8e8',
		marginTop:20,
		borderRadius: 50,
		padding:10,
		width:240,
	},
	btnEstasListo:{
		color:'#828693',
		textAlign: 'center', 
		fontSize:15
	},
	estasListoBtnActivo:{
		backgroundColor:'#a5b8f6',
	},
	btnEstasListoActivo:{
		color:'#FCFCFC',
	},
	contenedorBtnlisto:{
		backgroundColor:'#ffffff',
		flexDirection: 'row', 
		justifyContent: 'center',
		marginBottom:10 
	},
	fondoUltimo:{
		flex: 1,

		backgroundColor:'#ffffff'
		/*justifyContent: 'center', justifica contenido verticalmente */
	},

	///////////////////////////////////////
	////////// LISTADO PLANES //////////////
	///////////////////////////////////////
	contenedorRes:{
		alignItems: 'center',
	},
	touchRes:{
		margin: 10,
    	height:width / 4 - 10,
    	width: width / 4 - 10,
		// width:100,
		// height:100,
		paddingTop:15,
		paddingBottom:15,
		alignItems: 'center',

	},
	iconRes:{
		width:75,
		height:75
	},
	textoRes:{
		//backgroundColor:'#f8f8f8',
		//borderRadius:20,
		//padding:4,
		//paddingLeft:10,
		//paddingRight:10,
		fontSize:19,
		color:'#969696',
		width: 100,
		height:60,
		textAlign: 'center',
		 
	},
	banRes:{
		position:'relative', 
		top:-10,
		left:20, 
		width:21,
		height:21
	},
	banResInactive:{
		color:'#9B9B9B'
	},
	banResActive:{
		color:'#FF5959'
	},
})





