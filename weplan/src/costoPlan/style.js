import {StyleSheet, Dimensions} from 'react-native';
var screenHeight = Dimensions.get('window');
import { MediaQueryStyleSheet } from "react-native-responsive";
export const costoPlanStyle = MediaQueryStyleSheet.create({
	 
	contenedor:{
		alignItems: 'center',
		flex: 1,
		backgroundColor:"#ffffff",
	},
	container:{
		flex: 1,
		height:screenHeight.height,
	},
	contentItem:{
		flex: 1,
		height:screenHeight.height+50,
	},
	subContenedor:{
		width:100,
	},
	contenedorItem:{
		flexDirection:'row',
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
	contenedorLeft:{
		// width:'80%'
	},
	separador:{
		borderWidth:2,
		borderTopColor:'#ffffff',
		borderBottomColor:'#CACACA',
		borderLeftColor:'#f8f8f8',
		borderRightColor:'#f8f8f8',
		marginTop:5,
		marginBottom:5
	},
	titulo:{
		fontSize:20,
		color:'#000000'
	},
	descripcion:{
		color:'#5664ba',
		fontSize:14,
	},
	autor:{
		backgroundColor:'rgba(90,90,90,.2)',
		padding:5,
		borderRadius:17,
		width:150,
		marginTop:10
	},
	ubicacion:{
		color:'#5664ba',
		fontSize:13,
		marginTop:10
	},
	lugar:{
		width:180,
		marginTop:-5
	},
	btnChat:{
		padding:2,
		backgroundColor:'white',
		borderColor:'#5664ba',
		borderWidth:3,
		borderRadius:20,
		alignItems : 'center',
		marginTop:10,
		width:80
	},
	
	total:{
		color:'#79CF40',
		alignSelf: 'flex-start', 	 
		fontSize:20
	},
	back:{
		width:20,
		height:20,
		marginLeft:6 
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
		width:160,
		fontSize:18,
		marginLeft:12,
		marginTop:10
	},
	pagoDeudaMonto:{
		color:'#c5012b',
		fontSize:18,
		marginTop:7,
		width:80
	},
	pagoDeudaMontoActive:{
		color:'#79CF40',
		fontSize:18,
		marginTop:7,
		width:80
	},
	infoAbonoDeuda:{
		flexDirection:'row',
		alignSelf: 'flex-end',
		marginRight:12
	},
	textAbonoDeuda:{
		fontSize:12
	},
	contenedorAvatar:{
		width:'34%',
		marginTop:5
	},
	contenedorTotal:{
		flexDirection:'row',
		position:'absolute',
		bottom:0,
		backgroundColor:'#dadede',
		width:'100%',
		alignItems:'flex-end',
		paddingLeft:180
	},
	textoTotal:{
		fontSize:20,
		marginRight:10
	},
	valueTotal:{
		fontSize:20,
	} 
},{
	"@media (max-device-width: 320)": {
		pagoDeudaNombre:{
			width:160,
			fontSize:15,
			marginLeft:12,
			marginTop:10
		},
	}
})




