import {Dimensions, Platform} from 'react-native';
var screenHeight = Dimensions.get('window');
import { MediaQueryStyleSheet } from "react-native-responsive";
export const profileStyle = MediaQueryStyleSheet.create({
	contenedor:{
		alignItems: 'center',
	},
	subContenedor:{
		width:'85%',
		top:Platform.OS==='android' ?50 :75,
	},
	perfil:{
		alignItems: 'center',
	},
	item:{
		flexDirection:'row',
		marginTop:10,
        alignItems: 'center',
	},
	imagen:{
		borderRadius: 30,
		width: 60,
		height: 60,
		borderColor:'#9CB7F5',
		borderWidth:4,
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
	},
	separador:{
		marginTop:30,
		height:1,
		width:'80%',
		flexDirection:'row',
		alignItems: 'center',
		backgroundColor:'rgba(180,180,180,.2)'
	},
	nombre:{
		fontSize:20,
		marginTop:15 
	},
	username:{
		fontSize:20,
		marginTop:0,
		color:'#7b89f7' 
	},
	planesTitulo:{
		color:'#acacac',
		fontSize:20,
		marginTop:10
	},
	agregarBtn:{
		flexDirection:'row',
		marginTop:20,
	},	
	agregar:{
		width:50,
		height:50,
		top:12,
	},
	sinPlanes:{
		marginVertical:20,
		fontSize:20
	}
	 
},{
	"@media (max-device-width: 320)": {
	 	avatar: {
			borderRadius: 50,
			width: 100,
			height: 100,
			borderWidth:6,
		},
		imagen:{
			borderRadius: 25,
			width: 50,
			height: 50,
			borderColor:'#9CB7F5',
			borderWidth:4,
			marginRight:15
		},
	}
})




