import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const ChatStyle = StyleSheet.create({ 
 	contenedorGeneral:{
 		flex:1,
 	},

 	////////////////// cabezera
 	cabezera:{
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'space-between',
		backgroundColor:"#758BFC",
		borderWidth: 0,
		borderBottomWidth:2,
		borderColor:'#4461D8'	 
	},
	imagen:{
		borderRadius:35,
		position:'absolute',
		top:15,
		left:screenWidth/20,
		borderWidth: 2,
		borderColor:'#4461D8'	
	},
	iconContenedor:{	
		width:60,
		height:60,
		position:'relative',
		bottom:-8
	},
	icon:{
		width:50,
		height:50,
		position:'relative',
		bottom: -8
	},
	nombrePlan:{
		color:'#ffffff',
		fontSize:15,
		width:screenWidth/2.5,
		lineHeight: 17,
	},
	regresar:{
		width:screenWidth/5,
		color:'#ffffff',
		fontSize:30,
	},

 	////////////////// footer
	footer:{
		position:'absolute',
		bottom:0,
		width:screenWidth,
		backgroundColor:'#EDEDED',
		paddingTop:20,
		paddingBottom:20,
	},
	footer1:{
		flexWrap: 'wrap', 
		alignItems: 'flex-start',
		flexDirection:'row',
		justifyContent: 'flex-start',
	},
	textarea:{
		width:screenWidth/1.6,
		height:40,
		color:'#969696',
		paddingTop:0,
		paddingLeft:20,
		paddingBottom:0,
		borderWidth: 0,
		marginRight:10,
		marginLeft:10,
		backgroundColor: '#ffffff',	
		fontSize:17,
		borderRadius: 50,
	},
	opciones:{
		width:screenWidth/8,
	},
	enviar:{
		width:screenWidth/6,
	},
	contenedorChat:{
		flex:.4,
		marginBottom:100
	},

	////////////////// box chat
	contenedorBox:{

	},
	box:{
		alignSelf: 'flex-end',  
		borderWidth: 0,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.7,
		shadowRadius: 2,
		elevation: 3,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 25,
		width:screenWidth/1.5,
		position:'relative',
		zIndex:10
	},
	boxLeft:{
		alignSelf: 'flex-start',
	},
	nombre:{
		backgroundColor:'rgba(198, 198, 198, .34)',
		color:'#A8A8A8',
		fontSize:19,
		padding:10
	},
	nombreLeft:{
		color:'#9CB7F5'
	},
	photo:{
		alignSelf: 'flex-end', 
		borderRadius:35,
		position:'absolute',
		bottom:-20,
		borderColor:'#9CB7F5',
		borderWidth:5,
		zIndex:100
	},
	photoLeft:{
		alignSelf: 'flex-start',
	},
	mensaje:{
		padding: 20,
		shadowOffset: { width: 0, height: 2 },
	}

})






























