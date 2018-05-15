import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window');

export const perfilStyle = StyleSheet.create({
	contenedor:{
		alignItems: 'center',
	},
	subContenedor:{
		width:'90%',
	},
	item:{
		flexDirection:'row',
		marginTop:10,
        alignItems: 'center',
	},
	imagen:{
		borderRadius: 40,
		width: 80,
		height: 80,
		borderColor:'#9CB7F5',
		borderWidth:6,
		marginRight:15
	},
	avatar: {
		marginTop:10,
		borderRadius: 75,
		width: 150,
		height: 150,
		borderColor:'#9CB7F5',
		borderWidth:14,
	},
	contenedorRegistros:{
		flexDirection:'row',
		marginTop:10
	},
	atributo:{
		width:'30%',
		marginLeft:'2%',
		fontSize:15,
		color:'#ADACAC'
	},
	valor:{
		fontSize:14,
		backgroundColor:'#d6d6d6',
		color:'#ADACAC',
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:12, 
		paddingRight:12, 
		borderRadius:30,
		position:'relative',
		top:-4
	}
	 
})




