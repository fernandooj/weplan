import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Animated, Text, TextInput, Platform} from 'react-native'
import Icon from 'react-native-fa-icons';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {cabezeraFooterStyle} from '../cabezeraFooter/style'


export default class CabezeraComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			opacity:new Animated.Value(0),
			top:new Animated.Value(0),
			search:false,
		}
	}
	 
	render(){
		const {navigate, hide} = this.props
		const {opacity, top, search, term} = this.state
		if (!hide) {
			Animated.timing(opacity,{
				toValue:1,
				duration:400
			}).start()
			Animated.timing(top,{
				toValue:0,
				duration:400
			}).start()
		}else{
			Animated.timing(opacity,{
				toValue:0,
				duration:400
			}).start()
			Animated.timing(top,{
				toValue:-60,
				duration:400
			}).start()
		}
		if (search) {
			if (Platform.OS==='android') {
				return(
					<Animated.View style={[cabezeraFooterStyle.cabezera, {opacity: this.state.opacity, top:this.state.top}]}>	
						<View style={cabezeraFooterStyle.containerBuscador}>
							<SearchInput
								style={[cabezeraFooterStyle.buscador, cabezeraFooterStyle.familia]}
								onChangeText={(term) => this.props.term(term)}
								value={term}
								underlineColorAndroid='transparent'
								placeholder="Buscar Plan"
								placeholderTextColor="#777777"  
						    />
						    <TouchableOpacity onPress={() => {this.setState({search:false}); this.props.term('')}}>
						    	<Icon name='close' style={cabezeraFooterStyle.closeBtn} />
						    </TouchableOpacity>
						</View>
					</Animated.View> 
				)
			}else{
				return <View style={[cabezeraFooterStyle.cabezera]}>	
					<View style={cabezeraFooterStyle.containerBuscador}>
						<SearchInput
							style={[cabezeraFooterStyle.buscador, cabezeraFooterStyle.familia]}
							onChangeText={(term) => this.props.term(term)}
							value={term}
							underlineColorAndroid='transparent'
							placeholder="Buscar Plan"
							placeholderTextColor="#777777"  
					    />
					    <TouchableOpacity onPress={() => {this.setState({search:false}); this.props.term('')}}>
					    	<Icon name='close' style={cabezeraFooterStyle.closeBtn} />
					    </TouchableOpacity>
					</View>
				</View> 
			}	
		}else{
			if (Platform.OS==='android') {
				return(
					<Animated.View style={[cabezeraFooterStyle.cabezera, { opacity: this.state.opacity, top:this.state.top}]}>	
						<TouchableOpacity onPress={() => navigate('ajustes')}>
							<Image source={require('../assets/images/icon1.png')} style={cabezeraFooterStyle.iconHead} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigate('inicio')}>
							<Image source={require('../assets/images/icon2.png')} style={cabezeraFooterStyle.iconHead2} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.setState({search:true})}>
							<Image source={require('../assets/images/icon3.png')} style={cabezeraFooterStyle.iconHead} />
						</TouchableOpacity>
					</Animated.View> 
				)
			}else{
				return(
					<View style={cabezeraFooterStyle.cabezera}>	
						<TouchableOpacity onPress={() => navigate('ajustes')}>
							<Image source={require('../assets/images/icon1.png')} style={cabezeraFooterStyle.iconHead} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigate('inicio')}>
							<Image source={require('../assets/images/icon2.png')} style={cabezeraFooterStyle.iconHead2} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.setState({search:true})}>
							<Image source={require('../assets/images/icon3.png')} style={cabezeraFooterStyle.iconHead} />
						</TouchableOpacity>
					</View> 
				)
			}
		}
	}
}