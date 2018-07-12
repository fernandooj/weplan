import React, {Component} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {cabezeraFooterStyle} from '../cabezeraFooter/style'


export default class CabezeraComponent extends Component{
	render(){
		const {navigate} = this.props	
		return(
			<View style={cabezeraFooterStyle.footer3} >
				<TouchableOpacity onPress={()=> navigate('inicio')} style={cabezeraFooterStyle.btnFooter3}>
					<Image source={require('./home.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Home</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('wallet')} style={cabezeraFooterStyle.btnFooter3}>
					<Image source={require('./mi_wallet.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>My Wallet</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('createPlan')} style={[cabezeraFooterStyle.btnFooter3, cabezeraFooterStyle.btnFooter3Create]} >
					<Image source={require('./crear_plan.png')} style={cabezeraFooterStyle.iconFooter3Create} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Crear Plan</Text>*/}
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('misPlanes')} style={cabezeraFooterStyle.btnFooter3} >
					<Image source={require('./mis_planes.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Planes</Text>*/} 
				</TouchableOpacity>
				<TouchableOpacity onPress={()=> navigate('notificacion')} style={cabezeraFooterStyle.btnFooter3} >
					<Image source={require('./notificaciones.png')} style={cabezeraFooterStyle.iconFooter3} />
					{/*<Text style={cabezeraFooterStyle.textoFooter3}>Notificacion</Text>*/}
				</TouchableOpacity>
			</View>
		)
	}
	
}