import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, Keyboard, Animated, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native'
import {style} from '../home/style'
import axios from 'axios'
import SearchInput, { createFilter } from 'react-native-search-filter';
import Toast 			 from 'react-native-simple-toast';
import moment 					  from 'moment'
import firebase from 'react-native-firebase';
import CabezeraComponent from '../cabezeraFooter/cabezeraComponent'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'

import Geocoder from 'react-native-geocoding';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import UltimaVersionComponent from '../ultimaVersion/ultimaVersion'
import {VERSION}  from '../../App.js';

 

const KEYS_TO_FILTERS = ['nombre', 'lugar']
Geocoder.init("AIzaSyCn_XO2J1yIl7I3UMy7hL6-0QmFJAOwIz8");
 
 

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
			inicio:0,
 			final:3,
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
		Geocoder.from(lat, lng)
		.then(json => {
        	var userDireccion = json.results[4].formatted_address;
			AsyncStorage.setItem('userDireccion', userDireccion);
		})
		.catch(error => console.warn(error));
		axios.get(`/x/v1/pla/plan/pago/${lat}/${lng}`)
		.then(res=>{
			console.log(res.data)
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
		////////////////////////////////////////////// data info de analitycs ///////////////////////////////
		let userId = await AsyncStorage.getItem('userInfoId');
		let userNombre = await AsyncStorage.getItem('userNombre');
		let userDireccion = await AsyncStorage.getItem('userDireccion');
		firebase.analytics().setCurrentScreen("Home");
		firebase.analytics().setAnalyticsCollectionEnabled(true);
		firebase.analytics().logEvent("infoUser", {"nombre":userNombre,"userId":userId,"platform":Platform.OS, userDireccion, VERSION});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		let guia_inicio   = await AsyncStorage.getItem('home');
		this.setState({guia_inicio})
		if (Platform.OS==='android') {
			////////////////////////////////////////////////////////////////// OBTENGO LA ULTIMA VERSION DE LA APP, SI NO ESTA ACTUALIZADA LE MUESTRO UN MENSAJE
			axios.get('/x/v1/currentversion/android')
			.then(e=>{
				if (e.data.version!=="1.0.5") {
					this.setState({mensaje:e.data.mensaje, showVersion:true})
				}
			})
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		  	////////////////////////////////////////////////////////////////// OBTENGO LA ULTIMA VERSION DE LA APP, SI NO ESTA ACTUALIZADA LE MUESTRO UN MENSAJE
			axios.get('/x/v1/currentversion/ios')
			.then(e=>{
				if (e.data.version!=="1.0.5") {
					this.setState({mensaje:e.data.mensaje, showVersion:true})
				}
			})
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		
		// const enabled = await firebase.messaging().hasPermission();
		// if (enabled) {
		// 	//   alert(enabled)
		// 	} else {
		// 		console.log("sin permiso de notificacion")
		// 		this._getPermission();
		// 		// user doesn't have permission
		// }

		Keyboard.dismiss()
	}
	componentWillUnmont(){
		navigator.geolocation.clearWatch(this.watchID)
	}
	
	_getPermission = () => {
		firebase.messaging()
			.requestPermission()
			.catch(error => {
				// User has rejected permissions
				this._getPermission();
			});
	};
	 
	renderPlanes(){
		const {navigate} = this.props.navigation
		const {opacity, top, deg, translate, cargando, cargado, filteredData, searchTerm, showComponents, inicio, final} = this.state
		let newFilter   = filteredData.slice(inicio, final)
		newFilter.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
		console.log(newFilter)
		if (newFilter.length===0 ) {
			return(<View style={style.sinResultados}>
					 {!cargado ?<ActivityIndicator size="large" color="#148dc9" /> :<Text>No hemos encontrado planes</Text> } 
					</View>)
		}else{
			return newFilter.map((e, key)=>{
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
									<Text style={[style.textFooter2, style.familia]}>{e.fechaLugar!="NaN" ?moment(JSON.parse(e.fechaLugar)).format("YYYY-MM-DD h:mm a") :""}</Text>
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
		const {final} = this.state
 		let paddingBottom = 10

		paddingBottom += event.nativeEvent.layoutMeasurement.width;
 		if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.width-paddingBottom) {
 			console.log(final)
 				this.setState({final:final+5})
 		}

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
					{this.renderPlanes()}
				</ScrollView>
				{
					showComponents &&<FooterComponent navigate={this.props.navigation} />
				}
				
		   </View>
		)
	}

}