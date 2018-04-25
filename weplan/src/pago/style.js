 import {StyleSheet, Dimensions} from 'react-native';
var screenWidth = Dimensions.get('window').width;


export const PagoStyle = StyleSheet.create({ 
	contentItem:{
		alignItems: 'center',
		backgroundColor:'#f8f8f8'
	},
	contenedor:{
		width:'90%',
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
		fontSize:22,
		color:'#8796F4',
		width:'80%',
	},
	valorDeuda:{
		fontSize:18,
		color:'#c5012b',
		width:'20%',
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
		width:'100%'
	},
	pagarBtn:{
		alignItems: 'center',
	},
	pagarImagen:{
		width:150,
		height:60,
		marginBottom:10
	}
})














