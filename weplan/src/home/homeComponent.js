import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, Keyboard, Dimensions, Alert} from 'react-native'
import {HomeStyle} from '../home/style'
import axios from 'axios'

import CabezeraComponent from '../cabezeraFooter/cabezeraComponent'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'


import FCM, {NotificationActionType} from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "../push/Listeners";


const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUD_DELTA = 0.092
const LONGITUDE_DELTA  = LATITUD_DELTA * ASPECT_RATIO
registerKilledListener();
export default class homeComponent extends Component{
	constructor(props){
		super(props);
		this.state={ 
			isOpen: false,
			isDisabled: false,
			showBarra: true,  ///// muestra la barra superior
			swipeToClose: true,
			sliderValue: 0.3,
			allList: [],
			filteredData:[],
			buildArray: [],
			planes:[],
		}
	
	}

	getPlans(lat, lng){
		axios.get(`/x/v1/pla/plan/pago/${lat}/${lng}`)
		.then(e=>{
			console.log(e.data)
			if (e.data.code===1) {
				this.setState({planes:e.data.planes})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	async componentWillMount(){
		Keyboard.dismiss()
		 
			
		navigator.geolocation.getCurrentPosition(e=>{
			console.log(e)
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			 
			this.setState({lat, lng})
			this.getPlans(lat, lng)
			// Alert.alert(
			//   `lat: ${lat}`,
			//  `lng: ${lng}`,
			//   [
			//     {text: 'OK', onPress: () => console.log('OK Pressed')},
			//   ],
			//   { cancelable: false }
			// )
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			 
			this.setState({lat, lng})
			this.getPlans(lat, lng)
		},
		(error) => this.getPlans(null, null),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
	}
	componentWillUnmont(){
		navigator.geolocation.clearWatch(this.watchID)
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
			let data = parseInt(e.dist/1000);
			data = data.toString()
			// let newData = data.slice(0,-1)
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
						<Text style={HomeStyle.textFooter2}>Estas a {parseInt(e.dist)<1000 ?`${parseInt(e.dist)} Metros` :`${data} Kilometros`}</Text>
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
		axios.get(`/x/v1/pla/plan/pago/${this.state.lat}/${this.state.lng}`)
		.then(e=>{
			console.log(e.data)
			this.setState({planes:e.data.planes})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	handleScroll(event) {
		if(event.nativeEvent.contentOffset.y<=0){
			axios.get(`/x/v1/pla/plan/pago/${this.state.lat}/${this.state.lng}`)
			.then(e=>{
				console.log(e.data)
				this.setState({planes:e.data.planes})
			})
			.catch(err=>{
				console.log(err)
			})
		}
		if(event.nativeEvent.contentOffset.y>40){
			this.setState({showBarra:false})
		}else if(event.nativeEvent.contentOffset.y<40){
			this.setState({showBarra:true})
		}
	}
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<View style={HomeStyle.contenedor}>
				<CabezeraComponent navigate={navigate} hide={this.state.showBarra ?false :true} />
				<ScrollView style={HomeStyle.contenedorPlan} onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16}>
				{
					this.renderPlans()
				}	
				</ScrollView>
 
				<FooterComponent navigate={navigate} />
				
		   </View>
		)
	}

}