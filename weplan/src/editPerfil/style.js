import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
const width = Dimensions.get('window');
const height = Dimensions.get('window').height;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const style = MediaQueryStyleSheet.create({ 
	contenedor:{
		flex: 1,
		height:height,
		backgroundColor:'#ffffff',
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	fondo:{
		flex: 1,
		backgroundColor:'#ffffff',
		alignItems: 'center',
	},
	image:{
		marginTop:15,
        marginBottom:30,
 
	},
	image2:{
		marginTop:60,
        width:'70%',
        height:60
	},
	input:{
		marginTop:10,
		width:270,
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
		marginTop:5,
		textAlign: 'center',
	},
	date:{
		width:265,
		flexDirection: 'row',
	},
	containCiudad:{
		backgroundColor:'#F2F4F4',
		borderRadius:50,
		width:270,
		marginTop:10,
		height:40,
		paddingLeft:10,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		borderBottomWidth:0,
	},
	inputCiudad:{
		color: '#8F9093',
		height:40,
	},
	containDatePicker:{
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		width:'30%',
		marginRight:10,
		marginTop:10,
	},
	containDatePickerYear:{
		backgroundColor:'#8FA8F7',
		borderRadius:50,
		width:'33%',
		marginRight:10,
		marginTop:10,
	},
	datePicker:{
		width:'100%',
		padding:3,
        height:42,
 
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
		marginBottom:20,
		borderRadius: 50,
		padding:10,
		width:240,
	},
	signup_btn_disabled:{
		backgroundColor:'#c9c8c8',
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
	btnRegistroDisabled:{
		color:'#959595',
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
	},
	textoAcepto:{
		marginTop:6,
 		color:'rgba(117, 139, 252, 0.6)'
	}, 
	obligatorio:{
		color:'red',
		fontSize:12,
		marginVertical:5,
		alignSelf: 'flex-start',
		marginLeft:60,
	},
	///////////////////////////////////////
	////////// LISTADO PLANES //////////////
	///////////////////////////////////////
	contenedorRes:{
		alignItems: 'center',
	},
	touchRes:{
		backgroundColor:"#ecf2fe",
		margin: 10,
    	height:100,
    	width: 100,
		borderRadius:50,
		paddingTop:15,
		paddingBottom:15,
		alignItems: 'center',
		borderWidth:1,
		borderColor:"#b4c9f9",
		marginBottom :60
	},
	iconRes:{
		width:60,
		height:60
	},
	textoRes:{
		fontSize:19,
		color:'#969696',
		width: 100,
		// height:60,
		padding:5,
		borderRadius:10,
		textAlign: 'center',
		marginTop:10,
		borderRadius:20,
		backgroundColor :"#f8f8f8"
	},
	banRes:{
		position:'relative', 
		top:0,
		left:30, 
		width:28,
		height:28
	},
	banResInactive:{
		color:'#9B9B9B'
	},
	banResActive:{
		color:'#FF5959'
	},
	check:{
		width:15,
		height:15,
		left:-30
	},
	BtniconPass:{
		position:'relative',
		top:-29,
		left:85
	},
	iconPass:{
		fontSize:16
	}
},{
	"@media (max-device-width: 360)": {
		check:{
			width:34,
			height:34,
			left:-30
		},
		touchRes:{
			margin:1
		},
		image:{
			marginTop:10,
	        marginBottom:10,
		},
		signup_btn:{
			marginTop:10,
			marginBottom:10,
		},
		obligatorio:{
			marginLeft:40,
		},
	}
})





