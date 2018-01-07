import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, ImageBackground} from 'react-native'
import {HomeStyle} from '../home/style'

 

export default class homeComponent extends Component{
	render(){
		const {navigate} = this.props.navigation
		return(	 
				<ImageBackground source={require('./fondo.png')} style={HomeStyle.fondo}>
					<View style={HomeStyle.cabezera}>
						<Image source={require('./icon1.png')} style={HomeStyle.iconHead} />
						<Image source={require('./icon2.png')} style={HomeStyle.iconHead} />
						<Image source={require('./icon3.png')} style={HomeStyle.iconHead} />
					</View>

					<View style={HomeStyle.footer}>
						<View style={HomeStyle.footer1}>
							<Text style={HomeStyle.textFooter1} >BURGER STATION BOGOTA</Text>
							<Image source={require('./icon4.png')} style={HomeStyle.iconHead} />
						</View>
						<Text style={HomeStyle.textFooter2}>Loremp Ipsun Loremp Ipsun Loremp Ipsun </Text>
						<View style={HomeStyle.footer2}>
							<Image source={require('./icon5.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon6.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon7.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon8.png')} style={HomeStyle.iconFooter1} />
							<Text style={HomeStyle.textFooter3}>10 likes</Text>
						</View>
						<View style={HomeStyle.footer3} >
						 <TouchableHighlight onPress={()=> navigate('Planes')}>
							<Image source={require('./icon9.png')} style={HomeStyle.iconFooter2} />
						</TouchableHighlight>
						</View>
					</View> 
			    </ImageBackground>
			 
		)
	}
}