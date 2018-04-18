import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth = Dimensions.get('window').width;

export const ItemStyle = StyleSheet.create({ 
	//////////// pagina principal   //////////
	contentItem: {
		flex: 1,
		backgroundColor: '#F8F8F8',		 
	}, 
	subContentItem:{
		flex: 1,
		height:screenHeight,
		marginRight:'10%',
		marginLeft:'10%'
	},
	accordion: {
		borderTopWidth: 1,
		width:'100%'
	},
	content: {
		padding: 0 ,
		backgroundColor: '#fff',
		width:'100%'
	},
	header: {
		padding: 10,
		borderColor: '#8796F4',
		borderBottomWidth:1,
	},
	headerText: {
		color: '#8796F4',
	},
	contentText: {
		padding: 10, 
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
		backgroundColor:'rgba(232, 232, 232, 0.6)',
		padding:10,
		borderRadius:10,
		marginRight:5
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