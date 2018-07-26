import React, {Component} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {cabezeraFooterStyle} from '../cabezeraFooter/style'


export default class CabezeraComponent extends Component{
	render(){
		const {navigate, hide} = this.props
		return(
			<View style={!hide ?cabezeraFooterStyle.cabezera :[cabezeraFooterStyle.cabezera, cabezeraFooterStyle.hideCabezera, ]}>
				<TouchableOpacity onPress={() => navigate('ajustes')}>
					<Image source={require('./icon1.png')} style={cabezeraFooterStyle.iconHead} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigate('inicio')}>
					<Image source={require('./icon2.png')} style={cabezeraFooterStyle.iconHead2} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image source={require('./icon3.png')} style={cabezeraFooterStyle.iconHead} />
				</TouchableOpacity>
			</View>
		)
	}
}