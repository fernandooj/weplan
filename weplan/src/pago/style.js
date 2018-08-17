import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
import { MediaQueryStyleSheet } from "react-native-responsive";
export const style = MediaQueryStyleSheet.create({ 
	container:{
		flex:1,
		height:screenHeight,
	},
	familia:{
		fontFamily:'Futura-CondensedLight',
	},
	contentItem:{
		flex:1,
		height:screenHeight+110,
		alignItems: 'center',
		backgroundColor:'#f8f8f8'
	},
	contenedor:{
		width:'90%',
	},
	contenedorImagen:{
		minWidth:100,
	},
	image:{
		width:100,
		height:100,
		borderRadius:50,
		borderWidth: 5,
		margin:20,
		marginBottom:0,
		borderColor:'#8796F4',
	},
	contenedorItem:{
		flexDirection:'row',
	},
	titulo:{
		color:'#4a4a4a',
		fontSize:25,
		marginTop:20
	},
	descripcion:{
		fontSize:18,
		color:'#8796F4',
	},
	valor:{
		color:'#969696',
		backgroundColor:'#dbe4f2',
		borderRadius:20,
		padding:10,
		paddingLeft:20,
		width:'65%',
		marginLeft:10
	},
	nombre:{
		color:'#7e7e7e',
		fontSize:14
	},
	valorTexto:{
		color:'#969696',
		marginLeft:-30,
		marginTop:10
	},
	contenedorValor:{
		flexDirection:'row',
		marginTop:20
	},
	separador:{
		borderWidth:2,
		borderTopColor:'#ffffff',
		borderBottomColor:'#CACACA',
		borderLeftColor:'#f8f8f8',
		borderRightColor:'#f8f8f8',
		marginTop:20,
		marginBottom:20
	},
	contenedorDeuda:{
		flexDirection:'row',
		width:'100%',
		alignItems: 'flex-end',
	},
	tituloDeuda:{
		fontSize:21,
		color:'#8796F4',
		width:'70%',
	},
	valorDeuda:{
		fontSize:18,
		color:'#c5012b',
		width:'29%',
	},
	montoTitulo:{
		width:'50%',
		fontSize:22,
		position:'relative',
		top:-8
	},
	inputValor:{
		color:'#969696',
		backgroundColor:'#dbe4f2',
		borderRadius:20,
		padding:4,
		paddingLeft:10,
		width:'50%'
	},
	metodoContenedor:{
		flexDirection:'row',
		alignItems: 'center',
		marginTop:12
	},
	metodoImagen:{
		width:'100%',
		height:80,
	},
	metodoBtn:{
		alignItems: 'center',
		width:'21%', 
		marginLeft:'6%', 
		marginRight:'6%' 
	},
	inputInformacion:{
		padding:10,
		height:90,
		width:'100%',
		textAlign:'center'
	},
	pagarBtn:{
		alignItems: 'center',
	},
	pagarImagen:{
		width:150,
		height:60,
		marginBottom:10
	}, 

	////////////////////////////////////////////////////////////////////////////////////
	////////////////// 		pago deuda
	////////////////////////////////////////////////////////////////////////////////////
	pagoDeudaContenedor:{
		flexDirection:'row',
		marginTop:10,
	},
	pagoDeudaAvatar:{
		width:50,
		height:50,
		borderRadius:35,
		borderWidth: 5,
		borderColor:'#a5a5a5',
	},
	pagoDeudaNombre:{
		width:'55%',
		fontSize:22,
		marginLeft:12,
		marginTop:10
	},
	pagoDeudaMonto:{
		color:'#c5012b',
		fontSize:18,
		marginTop:7
	},
	pagoDeudaMontoActive:{
		color:'#79CF40',
		fontSize:18,
		marginTop:7
	},
	infoAbonoDeuda:{
		flexDirection:'row',
		alignSelf: 'flex-end',
		marginRight:12
	},
	textAbonoDeuda:{
		fontSize:12
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
		image:{
			width:70,
			height:70,
			borderRadius:35,
			borderWidth: 3,
			margin:20,
			marginBottom:0,
			borderColor:'#8796F4',
		}, 
		titulo:{
			fontSize:20,
			marginTop:20
		},
		pagoDeudaAvatar:{
			width:43,
			height:43,
			borderRadius:22,
			borderWidth: 4,
			borderColor:'#a5a5a5',
		},
		pagoDeudaNombre:{
			width:'50%',
			fontSize:20,
			marginLeft:12,
			marginTop:7
		},
		pagoDeudaMonto:{
			fontSize:17,
			marginTop:9
		},
		pagoDeudaMontoActive:{
			fontSize:17,
			marginTop:9
		},
		valor:{
			borderRadius:20,
			padding:4,
			paddingLeft:20,
			width:'60%',
			marginLeft:15,
			marginTop:6
		},
		contentItem:{
			flex:1,
			height:screenHeight+210,
		},
		montoTitulo:{
			width:'50%',
			fontSize:19,
			top:-8
		},
	}
})














