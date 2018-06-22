import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, Platform} from 'react-native'
import {HomeStyle} from '../home/style'
import axios from 'axios'

import FCM, {NotificationActionType} from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "../push/Listeners";

registerKilledListener();
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
		axios.get('/x/v1/pla/plan/pago')
		.then(e=>{
			console.log(e.data)
			this.setState({planes:e.data.message})
		})
		.catch(err=>{
			console.log(err)
		})	
	}

	  async componentDidMount(){
	    registerAppListener(this.props.navigation);
	    FCM.getInitialNotification().then(notif => {
	      console.log(notif.targetScreen)
	      this.setState({
	        initNotif: notif
	      })
	      if(notif && notif.targetScreen === 'detail'){
	        setTimeout(()=>{
	          this.props.navigation.navigate('Detail')
	        }, 500)
	      }
	    });

	    try{
	      let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
	    } catch(e){
	      console.error(e);
	    } 
	}

	renderPlans(){
		const {navigate} = this.props.navigation
		return this.state.planes.map((e, key)=>{
			return(
				<ImageBackground source={{uri : e.imagenResize[0]}} style={HomeStyle.fondo} key={key}>
					<View style={HomeStyle.footer}>
						<View style={HomeStyle.footer1}>
							<Text style={HomeStyle.textFooter1}>{e.nombre}</Text>
							<TouchableOpacity onPress={() => navigate('createPlan', e._id )} style={HomeStyle.btnIconVer}>
								<Image source={require('./icon4.png')} style={HomeStyle.iconVer} />
							</TouchableOpacity>	
						</View>
						<Text style={HomeStyle.textFooter2}>{e.descripcion}</Text>
						<View style={HomeStyle.footer2}>
							{/*<Image source={require('./icon5.png')} style={HomeStyle.iconFooter} />*/}
							<Image source={require('./icon6.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon7.png')} style={HomeStyle.iconFooter} />
							{/*<Image source={require('./icon8.png')} style={HomeStyle.iconFooter1} />*/}
							{/*<Text style={HomeStyle.textFooter3}>10 likes</Text>*/}
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
						<Image source={require('./icon2.png')} style={HomeStyle.iconHead2} />
					</TouchableOpacity>
					<TouchableOpacity>
						<Image source={require('./icon3.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
				</View>
				<ScrollView style={HomeStyle.contenedorPlan} onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16}>
				{
					this.renderPlans()
				}	
				</ScrollView>
 
				<View style={HomeStyle.footer3} >
					<TouchableOpacity onPress={()=> navigate('inicio')} style={HomeStyle.btnFooter3}>
						<Image source={require('./home.png')} style={HomeStyle.iconFooter3} />
						{/*<Text style={HomeStyle.textoFooter3}>Home</Text>*/}
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('wallet')} style={HomeStyle.btnFooter3}>
						<Image source={require('./mi_wallet.png')} style={HomeStyle.iconFooter3} />
						{/*<Text style={HomeStyle.textoFooter3}>My Wallet</Text>*/}
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('createPlan')} style={[HomeStyle.btnFooter3, HomeStyle.btnFooter3Create]} >
						<Image source={require('./crear_plan.png')} style={HomeStyle.iconFooter3Create} />
						{/*<Text style={HomeStyle.textoFooter3}>Crear Plan</Text>*/}
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('misPlanes')} style={HomeStyle.btnFooter3} >
						<Image source={require('./mis_planes.png')} style={HomeStyle.iconFooter3} />
						{/*<Text style={HomeStyle.textoFooter3}>Planes</Text>*/} 
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('notificacion')} style={HomeStyle.btnFooter3} >
						<Image source={require('./notificaciones.png')} style={HomeStyle.iconFooter3} />
						{/*<Text style={HomeStyle.textoFooter3}>Notificacion</Text>*/}
					</TouchableOpacity>
				</View>
				
		   </View>
		)
	}

}