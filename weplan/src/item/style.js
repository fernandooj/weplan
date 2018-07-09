import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const ItemStyle = MediaQueryStyleSheet.create({ 
	//////////// pagina principal   //////////
	contentItem: {
		flex: 1,
		minHeight:screenHeight,
		backgroundColor: '#F8F8F8',		 
	}, 
	subContentItem:{
		flex: 1,
	 	minHeight:screenHeight,
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
		borderBottomWidth:0,
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
	iconMenu:{
		fontSize:25,
		position:'relative',
		top:10 
	},
	boton:{
		width:'100%',
		padding: 10,  
		borderBottomWidth:1,
		borderBottomColor:'#ffffff',
		borderTopWidth:1,
		borderTopColor:'#cacaca',
	},
	infoItem:{
		width:'100%',
		flexDirection:'row'
	},
	closeItem:{
		backgroundColor:'#94a5f3',
		padding:5,
		marginTop:10,
		width:110,
		borderRadius:20,
		alignItems: 'center',
	},
	textCloseItem:{
		color:'#ffffff',
	},
	botonFirst:{
		borderTopWidth:0
	},
	filaDeuda:{
		width:'100%',
		flexDirection:'row',
		width:'100%',
		padding: 10,  
		borderBottomWidth:1,
		borderBottomColor:'#ffffff',
		borderTopWidth:1,
		borderTopColor:'#cacaca',
	},
	contentText: {
		width:'74%',
	},
	valorPositivo:{
		color:'#79CF40',
		alignSelf: 'flex-start', 
		width:'100%',
	},
	valorNegativo:{
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
 	CrearItem:{
		fontSize:20
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
		height:40,
		backgroundColor:'#d9e4f2'
	},
	btnBack:{
		position:'relative',
		top:-30,
		left:10
	},
	back:{
		height:20,
		width:14,
	},
	btnIcon:{
		position:'absolute',
		top:-8, 
		right:5,
		zIndex:100
	},
	icon:{
		width:50,
		height:50
	},
	btnCamera:{
		position:'absolute',
		top:60, 
		left:-20,
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
		width:'70%',
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
		width:'20%',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize:17,
		marginTop:6
	},
	btnAdjuntar:{
		flexDirection : 'row',
		padding:10,
		paddingTop:10,
		paddingBottom:5,	 
	},
	adjuntar:{
		color:'#7e7e7e',
		width:"90%",
		fontSize:17,
		marginTop:12
	},
	adjuntar2:{
		color:'#d9e4f2',
		alignSelf: 'flex-end', 
		fontSize:35
	},
	btnAdjuntarExistente:{
		flexDirection : 'row',
	},
	addIcon:{
		width:30,
		height:30,
		marginTop:10
	},	
	adjuntarExistentes:{
		backgroundColor:'#DBE4F2',
		borderRadius:20,
		fontSize:15,
		padding:5,
		paddingLeft:10,
		width:190,
		margin:10,
	},
	textoPregunta:{
		fontSize:13,
		padding:10,
		paddingBottom:0
	},
	separador:{
		height:1,
		backgroundColor:'#d9e4f2',
		marginLeft:10,
		marginRight:10,
		marginBottom:5
	},
	btnEnviar:{
		flexDirection:'row',
		padding:10, 
		borderRadius:10,
	},
	btnEnviarActive:{
		backgroundColor:'rgba(115, 175, 251, 0.6)',
	},
	enviar:{
		color:'#7e7e7e',
		width:"83%",
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
	},
	aceptarPendiente:{

	},

	////////////////////////////////////////////////////////////////////////////////////
	////////////////// 		contenedor total
	////////////////////////////////////////////////////////////////////////////////////
	contenedorTotal:{
		flexDirection:'row',
		marginTop:50,
		alignSelf: 'flex-end', 
	},
	textoTotal:{
		fontSize:20,
		marginRight:15,
	},
	valueTotal:{
		color:'#79CF40',
		alignSelf: 'flex-start', 
		width:'32%',
		fontSize:20
	},
	valueNoAsignadoTotal:{
		color:'#c5012b', 
		alignSelf: 'flex-start', 
		width:'31%',
		fontSize:20
	}

},{
	"@media (max-device-width: 320)": {
		textoPregunta:{
			fontSize:11,
		},
		adjuntar:{
			fontSize:15,
		},
		adjuntarExistentes:{
			fontSize:14,
			width:170
		}
	}
})