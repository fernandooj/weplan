import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView, NativeModules} from 'react-native'
import {HomeStyle} from '../home/style'
import axios from 'axios'
 


export default class homeComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			isOpen: false,
			isDisabled: false,
			swipeToClose: true,
			sliderValue: 0.3,
			allList: [],
			filteredData:[],
			buildArray: [],
			planes:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/clientes')
		.then(e=>{
			this.setState({planes:e.data.message})
		})
		.catch(err=>{
			console.log(err)
		})

		
	}
	
	renderPlans(){
		return this.state.planes.map((e, key)=>{
			return(
				<ImageBackground source={{uri : e.imagen}} style={HomeStyle.fondo} key={key}>
					<View style={HomeStyle.footer}>
						<View style={HomeStyle.footer1}>
							<Text style={HomeStyle.textFooter1}>{e.nombre}</Text>
							<Image source={require('./icon4.png')} style={HomeStyle.iconHead} />
						</View>
						<Text style={HomeStyle.textFooter2}>{e.descripcion}</Text>
						<View style={HomeStyle.footer2}>
							<Image source={require('./icon5.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon6.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon7.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon8.png')} style={HomeStyle.iconFooter1} />
							<Text style={HomeStyle.textFooter3}>10 likes</Text>
						</View>
						
					</View> 
				</ImageBackground>
			)			
		})
	}
	updatePlanes(){
		axios.get('/x/v1/pla/plan/clientes')
		.then(e=>{
			this.setState({planes:e.data.message})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	handleScroll(event) {
		if(event.nativeEvent.contentOffset.y<=0){
			axios.get('/x/v1/pla/plan/clientes')
			.then(e=>{
				this.setState({planes:e.data.message})
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<View style={HomeStyle.contenedor}>
				<View style={HomeStyle.cabezera}>
					<TouchableOpacity onPress={() => navigate('ajustes')}>
						<Image source={require('./icon1.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> this.updatePlanes()} >
						<Image source={require('./icon2.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.closeSession.bind(this)} >
						<Image source={require('./icon3.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
				</View>
				<ScrollView style={HomeStyle.contenedorPlan} onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16}>
				{
					this.renderPlans()
				}
				</ScrollView>
 
				<View style={HomeStyle.footer3} >
					<TouchableOpacity onPress={()=> navigate('createPlan')} >
						<Image source={require('./icon10.png')} style={HomeStyle.iconFooter3} />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('createPlan')} >
						<Image source={require('./icon11.png')} style={HomeStyle.iconFooter3} />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('misPlanes')} >
						<Image source={require('./icon12.png')} style={HomeStyle.iconFooter3} />
					</TouchableOpacity>
				</View>
				
		   </View>
		)
	}

	closeSession(){
		const {navigate} = this.props.navigation
		axios.get('/x/v1/logout/')
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==1){
				navigate('Login')
			}else if (res.data.code==1){
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		
	}
}