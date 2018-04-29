import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;

export const PreguntaStyle = StyleSheet.create({ 
	//////////// pagina principal   //////////
	contentItem: {
		flex: 1,
		height:screenHeight,
		backgroundColor: '#F8F8F8',		 
	}, 
	subContentItem:{
		flex: 1,
		height:screenHeight,
		marginRight:'4%',
		marginLeft:'4%'
	},
	accordion: {
		borderTopWidth: 1,
		width:'100%'
	},
	content: {
		padding: 0 ,
		backgroundColor: '#F8F8F8',		
		width:'100%',
		borderBottomWidth:0
	},
	headerCollapsable: {
		padding: 10,
	},
	headerCollapsableFirst:{
		borderColor: '#AFE1F2',
	},
	headerText: {
		color: '#8796F4',
		 
		fontSize:20,		
		borderColor: '#8796F4',
		borderBottomWidth:1,
		padding: 10,
	},
	headerTextFirst:{
		color:'#AFE1F2',
		borderColor: '#AFE1F2',
		borderBottomWidth:1,
	},
	boton:{
		flexDirection:'row',
		width:'100%',
		padding: 10,  
		borderBottomWidth:1,
		borderBottomColor:'#ffffff',
		borderTopWidth:1,
		borderTopColor:'#cacaca',
	},
	botonFirst:{
		borderTopWidth:0
	},
	contentText: {
		width:'74%',
	},
	value:{
		color:'#79CF40',
		alignSelf: 'flex-start', 
		width:'40%',
	},
	valueNoAsignado:{
		color:'#c5012b',
		alignSelf: 'flex-start', 
		width:'40%',
	},
	by:{
		fontSize:13
	},
	tituloItem:{
		fontSize:16,
	},
	valueItems:{
		fontSize:22,
		color: '#8796F4',
	},
	btnNuevoGrupo:{
 		width:25,
 		height:25,
 		marginRight:10,
 		marginLeft:14, 
 	},
 	contenedorNuevo:{
		flexDirection:'row',
		marginTop:10
 	},
  	//////////// crear item  //////////
	container:{
		backgroundColor:'rgba(0,0,0,.6)',
		width:screenWidth,
		height:screenHeight,
		position:'absolute',
		zIndex:100,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	modal:{
		width:screenWidth/1.3,
 		paddingBottom:30,
 		backgroundColor:'#ffffff',
 		borderRadius:10,
		borderWidth: 7,
		borderColor:'rgba(0,0,0,.1)',
	},
	header:{
		width:'100%',
		height:50,
	},
	btnBack:{
		position:'relative',
		top:-40,
		left:10
	},
	back:{
		height:30,
		width:20,
	},
	btnIcon:{
		position:'absolute',
		top:-20, 
		right:5,
		zIndex:100
	},
	icon:{
		width:80,
		height:80
	},
	btnCamera:{
		position:'absolute',
		top:100, 
		zIndex:100 
	},
	titulo:{
		marginLeft:100,
		fontSize:25
	},
	descripcion:{ 
		marginTop:-10,
		marginLeft:100,
		fontSize:18, 
		color:'#5664BA'
	},
	valor:{
		flexDirection:'row',
		justifyContent: 'center',
		marginTop:10
	}, 
	inputValor:{ 
		width:'100%',
		backgroundColor:'#DBE4F2',
		borderRadius:20,
		fontSize:17,
		padding:5,
		paddingLeft:20
	},
 
	decoracion:{
		position:'absolute',
		top:80,
		right:10,
		width:24,
		height:35
	},
	textoValor:{
		width:'100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		fontSize:17,
		marginTop:6,
		borderRadius:10,
	},
	btnAdjuntar:{
		padding:0,
	},
	adjuntar:{
		color:'#ffffff',
	},
	btnEnviar:{
		flexDirection:'row',
		backgroundColor:'rgba(232, 232, 232, 0.6)',
		padding:10, 
		borderRadius:10,
	},
	btnEnviarActive:{
		backgroundColor:'rgba(115, 175, 251, 0.6)',
	},
	enviar:{
		color:'#ffffff',
	},
	enviarIcon:{
		width:20,
		height:20,
		marginLeft:10
	},
	enviarIconActive:{
		width:20,
		height:20,
		marginLeft:10
	},
	btnSave:{
		flexDirection:'column',
		alignItems: 'center',
		marginTop:20,
	},
	iconSave:{
		width:45,
		height:45,
	},
	textSave:{
		marginTop:5,
		color:'#ffffff'
	}
})