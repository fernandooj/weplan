import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, Keyboard, Dimensions, Alert, Animated, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native'
import {style} from '../home/style'
import axios from 'axios'
import SearchInput, { createFilter } from 'react-native-search-filter';
import Toast 			 from 'react-native-simple-toast';

import CabezeraComponent from '../cabezeraFooter/cabezeraComponent'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'


import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FCM, {NotificationActionType} from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "../push/Listeners";
import UltimaVersionComponent from '../ultimaVersion/ultimaVersion'

const KEYS_TO_FILTERS = ['nombre', 'lugar']
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
			showBarra: true,     ///// muestra la barra superior
			swipeToClose: true,
			cargado: false,      ////// muestra la precarga
			cargando: true,      ////// mientras carga los datos
			showComponents:true, ////// muestra la barra superior y el footer y desaparece al darle click a la imagen
			sliderValue: 0.3,
			filteredData: [],
			searchTerm:'',
			planes:[],
			opacity:new Animated.Value(1),
			top:new Animated.Value(0),
			deg:new Animated.Value(30),
			translate:new Animated.Value(0),
		}
		this.searchUpdated = this.searchUpdated.bind(this)
	}
	
	getPlans(lat, lng){
		axios.get(`/x/v1/pla/plan/pago/${lat}/${lng}`)
		.then(res=>{
			if (res.data.code===2) {
				this.props.navigation.navigate('Login')
				Toast.show('No éstas logueado')
			}else{
				if (res.data.code===1) {
					this.setState({filteredData: res.data.planes, cargado:true})
				}else{
					Toast.show('Houston tenemos un problema, reinicia la app')
				}
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	async componentWillMount(){
		////////////////////////////////////////////////////////////////// OBTENGO LA ULTIMA VERSION DE LA APP, SI NO ESTA ACTUALIZADA LE MUESTRO UN MENSAJE
		axios.get('/x/v1/currentversion')
		.then(e=>{
			if (e.data.version!=="1.0.5") {
				this.setState({mensaje:e.data.mensaje, showVersion:true})
			}
		})
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		let guia_inicio   = await AsyncStorage.getItem('home');
		this.setState({guia_inicio})
		if (Platform.OS==='android') {
			RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
		   .then(data => {
		    	navigator.geolocation.getCurrentPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getPlans(lat, lng)
			}, 
				(error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getPlans(lat, lng)
			},
				(error) => this.getPlans(undefined, undefined),
				{enableHighAccuracy: true, timeout:5000, maximumAge:0})
	      	)
		  	}).catch(err => {
			  	axios.get(`/x/v1/pla/plan/pago/${undefined}/${undefined}`)
				.then(e=>{
					if (e.data.code===1) {
						this.setState({filteredData: e.data.planes, cargado:true})
					}
				})
		  	});
		  }else{
		  	navigator.geolocation.getCurrentPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getPlans(lat, lng)
			}, 
				(error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
				let lat =parseFloat(e.coords.latitude)
				let lng = parseFloat(e.coords.longitude)
				this.setState({lat, lng})
				this.getPlans(lat, lng)
			},
				(error) => this.getPlans(undefined, undefined),
				{enableHighAccuracy: true, timeout:5000, maximumAge:0})
	      	)
		  }
		

		Keyboard.dismiss()
	}
	componentWillUnmont(){
		navigator.geolocation.clearWatch(this.watchID)
	}
	async componentDidMount(){
		const {navigation} = this.props
	    registerAppListener(navigation);
	    

	    FCM.getInitialNotification().then(notif => {
	    	
	     	console.log({props:this.props, notif})
			this.setState({
				initNotif: notif
			})

			if(notif && navigation.state.routeName=='Home'){
				let id = notif.parameter
				this.props.navigation.navigate(notif.targetScreen, id)
			}
	    });

	    try{
	      let result = await FCM.requestPermissions({badge: true, sound: true, alert: true});
	    } catch(e){
	      console.error(e);
	    } 
	    this.setState({cargando:false})
	}
	
	getRow(){
		const {navigate} = this.props.navigation
		const {opacity, top, deg, translate, cargando, cargado, filteredData, searchTerm, showComponents} = this.state
		const filtered = filteredData.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
		if (filtered.length===0 ) {
			return(<View style={style.sinResultados}>
					 {!cargado ?<ActivityIndicator size="large" color="#148dc9" /> :<Text>No hemos encontrado planes</Text> } 
					</View>)
		}else{
			return filtered.map((e, key)=>{
				let data = parseInt(e.dist/1000);
				data = data.toString()
				let calficaLongitud = e.UserData.calificacion ?e.UserData.calificacion.length: false
				let calificacion = e.UserData.calificacion ?(e.UserData.calificacion.reduce((a, b) => a + b, 0))/e.UserData.calificacion.length :parseInt(0)
				return  <TouchableHighlight onPress={()=>this.setState({showComponents:!showComponents})}  key={key}>
							<ImageBackground source={{uri : e.imagenResize[0]}} style={style.fondo}>
								<View style={style.footer}>
									<View style={style.footer1}>
										<Text style={[style.textFooter1, style.familia]}>{e.nombre.toUpperCase()}</Text>
										<TouchableOpacity onPress={() => navigate('createPlan', e._id )} style={style.btnIconVer}>
											<Image source={require('../assets/images/icon4.png')} style={style.iconVer} />
										</TouchableOpacity>	
									</View>
									{/*e.descripcion &&<Text style={[style.textFooter2, style.familia]}>{e.descripcion}</Text>*/}
									
									<Text style={[style.textFooter2, style.familia]}>Estas a {parseInt(e.dist)<1000 ?`${parseInt(e.dist)} Metros` :`${data} Kilometros`}</Text>
									<Text style={[style.textFooter2, style.familia]}>{`Por: ${e.UserData.nombre}, ${calficaLongitud ?parseFloat(calificacion).toFixed(0) :''}*`}</Text>
									<View style={style.footer2}>
										<TouchableOpacity onPress={() => this.like(e._id)} >
											<Animated.View style={{opacity: opacity, top:top}}>
												<Image source={require('../assets/images/corazon.png')} style={style.iconFooter} />
											</Animated.View>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => navigate('createPlan', e._id )}>
											<Image source={require('../assets/images/acceder.png')} style={style.iconFooter1} /> 
										</TouchableOpacity>
									</View>
								</View>
					    </ImageBackground>
					</TouchableHighlight>	 
			})
		}
		
	}
	searchUpdated (term) {
		this.setState({searchTerm: term})
	}
	like(planId){
		const {opacity, top} = this.state
		
		axios.post(`/x/v1/lik/like/`, {planId})
		.then(e=>{
			if (e.data.code===1) {
				Animated.timing(opacity,{
					toValue:0,
					duration:1000
				}).start((e)=>{
					Animated.timing(opacity,{
						toValue:1,
						duration:1600
					}).start()
				})
				Animated.timing(top,{
					toValue:-20,
					duration:1000
				}).start((e)=>{
					Animated.timing(top,{
						toValue:0,
						duration:600
					}).start()
				})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
	updatePlanes(){
		axios.get(`/x/v1/pla/plan/pago/${this.state.lat}/${this.state.lng}`)
		.then(e=>{
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
				this.setState({planes:e.data.planes})
			})
			.catch(err=>{
				console.log(err)
			})
		}
		if(event.nativeEvent.contentOffset.y>10){
			this.setState({showBarra:false})
		}else if(event.nativeEvent.contentOffset.y<30){
			this.setState({showBarra:true})
		}
	}
	render(){
		const {navigate} = this.props.navigation
		const {showBarra, guia_inicio, mensaje, showVersion, showComponents} = this.state
		return(	 
			<View style={style.contenedor}>
				{
					showVersion
					&&<UltimaVersionComponent mensaje={mensaje} />
				}
				{
					typeof guia_inicio!=='string'  &&<GuiaInicio number={1} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
				{
					showComponents &&<CabezeraComponent navigate={navigate} hide={showBarra ?false :true} term={(term)=>this.searchUpdated(term)} />
				}
				
				<ScrollView style={style.contenedorPlan} onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16}>
					{this.getRow()}
				</ScrollView>
				{
					showComponents &&<FooterComponent navigate={this.props.navigation} />
				}
				
		   </View>
		)
	}

}