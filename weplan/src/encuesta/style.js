import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;

export const EncuestaStyle = StyleSheet.create({ 
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
 	CrearEncuesta:{
		fontSize:20
	},
 	contenedorNuevo:{
		flexDirection:'row',
		marginTop:10
 	},
 	separador:{
		borderWidth:2,
		borderTopColor:'#ffffff',
		borderBottomColor:'#CACACA',
		borderLeftColor:'#f8f8f8',
		borderRightColor:'#f8f8f8',
		marginTop:5,
		marginBottom:5,
		width:'100%'
	},
 	////////////////////////////////////////////
	////////////////// contenedor 3  ==> items
	////////////////////////////////////////////
	contenedorOpciones:{
 		flexDirection:'row',		 
	},
	contenedorEncuesta:{
	 	width:'100%',
	 	alignItems:'center'
	},
	 
	pNombre:{
		backgroundColor:'rgba(196, 196, 196, 0.3)',
		color:'#A8A8A8',
		padding:9,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	pTitulo:{
		alignItems:'center',
		textAlign:'center'
	},
	contenedorDescripcion:{
		flexDirection:'row',
		paddingLeft:10,
		paddingRight:10,
		paddingTop:15,
		paddingBottom:75,
		backgroundColor:'#ffffff',

	},
	pDescripcion:{
		color:'#5664ba',
		width:'80%',
		textAlign:'center'
	},
	decoracion:{
		width:24,
		height:35
	},

	
	imagenPregunta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,
		marginRight:5,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       marginRight:5
	},
	imagenRespuesta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
       	opacity: 0.4,
       	position:'absolute',
       	borderColor:'#9CB7F5',
		borderWidth:5,	
	},
	contenedorRespuesta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5
	},
	contenedorPregunta:{
		width:100,
		height:100,
		borderRadius:50,
		zIndex:1000,
		borderColor:'#9CB7F5',
		borderWidth:5,	
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor:'#ffffff',
        marginRight:5
	},
	textoPregunta:{
		textAlign:'center',
	 	color:'black',
	 	fontSize:20
	},
	pPhoto:{
		alignSelf: 'flex-end', 
		borderRadius:35,	
		borderColor:'#9CB7F5',
		borderWidth:5,
		position:'relative',
		top:45,
	},
	porcentajeContenedor:{
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		width:100,
	},
	porcentaje:{
		color:'#7585eb',
		marginTop:10,
		marginBottom:10,
		padding:0,
	 	textAlign: 'center',
		width:100,
	 
	},
 	//////////////////////////////////////////////////////
  	//////////////// 	crear encuesta
  	//////////////////////////////////////////////////////
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
		flexDirection:'row',
	},
	btnBack:{
		position:'relative',
		top:12,
		left:10
	},
	back:{
		height:20,
		width:14,
	},
	btnIcon:{
		position:'absolute',
		top:-2, 
		right:-10,
		zIndex:100
	},
	icon:{
		width:45,
		height:45
	},
	btnCamera:{
		position:'absolute',
		bottom:-15,
		right:-10, 
		zIndex:100 
	},
	titulo:{
		width:'50%',
		fontSize:25,
		marginLeft:20,
	},
	contenedorDescripcion:{
		flexDirection:'row',
		paddingLeft:10,
		paddingRight:10,
		marginTop:20
	},
	descripcion:{ 
		textAlign: 'center',
		justifyContent: 'center',
		width:'80%',
		fontSize:18, 
		color:'#5664BA'
	},
	valor:{
		flexDirection:'row',
		width:'100%',
		marginTop:-30,		 
	}, 
 	btnPregunta:{
 		width:'30%',
 		marginLeft:'5%',
 		marginRight:'2%',
 	},
 	inputValor:{ 	 
		backgroundColor:'#ffffff',
		borderRadius:40,
		fontSize:17,
		padding:20,
		paddingLeft:20,
		borderWidth:2,
		borderColor:'#7080f7',
		textAlign: 'center',
	},
	decoracion:{
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
	},

	////////////////////////////////////////////////////////////////////////////////////
	////////////////// 		abono deuda
	////////////////////////////////////////////////////////////////////////////////////
	modalAbono:{
		width:screenWidth/1.3,
 		paddingBottom:45,
 		backgroundColor:'#ffffff',
 		borderRadius:10,
		borderWidth: 7,
		borderColor:'rgba(0,0,0,.1)',
	},
	contenedorAbono:{
		flexDirection:'row',
	}, 
	btnBackAbono:{
		backgroundColor:'#dbe4f2',
		padding:10
	},
	backAbono:{
		height:23,
		width:14,
	},
	Avatar:{
		width:50,
		height:50,
		borderRadius:35,
		borderWidth: 5,
		borderColor:'#a5a5a5',
	},
	textoAbono:{
		fontSize:20,
		marginTop:10,
		marginLeft:10
	},
	descripcionAbono:{
		width:'60%',
		backgroundColor:'#dbe4f2',
		borderRadius:25,
		fontSize:20,
		padding:5,
		marginTop:6,
		marginLeft:10,
		color:'grey'
	},
	save:{
		flexDirection:'column',
		alignItems: 'center',
	}, 
	btnSaveAbonar:{
		marginTop:-30,
		backgroundColor:'#ffffff',
		padding:10,
		width:'60%',
		alignItems: 'center',
		borderRadius:20,
		borderWidth:3,
		borderColor:'#5664BA'
	},
	textSaveAbonar:{
		width:'50%',
		alignItems: 'center',
		fontSize:16
	}

})