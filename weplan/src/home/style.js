import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
export const HomeStyle = StyleSheet.create({
	contenedor:{
		flex: 1,
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
	 	marginLeft:40,
	 	marginRight:40
	},
	fondo:{
		height:screenHeight,
	},
	footer:{
		position:'absolute',
		bottom:0,
		width:'100%',
		backgroundColor:"rgba(0,0,0,0.79)",
		paddingLeft:20,
		paddingBottom:20,
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
	},

	////////// modal //////////////
	//////////////////////////////
	wrapper: {
		paddingTop: 50,
		flex: 1
	},
	btnModal: {
		 justifyContent: 'center',
    	alignItems: 'center'
	},
	input:{
		marginTop:10,
		width:240,
		height:40,
		backgroundColor: '#f0f2f2',
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: '#cccccc',
		borderBottomWidth:0,
		paddingLeft:20,
		color: '#8F9093',
	}, 
	text: {
		color:'#969696',
		fontSize: 22
	},
	lista:{
		 flex:1
	},
	subLista:{
		width:'100%',
		flexDirection:'row',
		alignItems: 'flex-start',
		marginTop:10
	},
	avatar:{
		height: 60,
		width: 60,
		borderRadius: 30,

	},
	avatar2:{
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 3.5,
		borderColor: '#C2E3EE',
	},
	textoAvatar:{
		fontSize:22,
		marginLeft:20,
		marginTop:20
	},
	agregado:{
		position:'absolute',
		left:40,
		bottom:0,
		height: 27,
		width: 27,
	},
	titulo:{
		flexDirection:'row',
		alignItems: 'flex-start',
	},
	btnModal:{
		fontSize:20,
		color:'#969696',
		marginTop:2,

	}
})




