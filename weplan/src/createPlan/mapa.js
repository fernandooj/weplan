import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, Keyboard} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
 
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

 


const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUD_DELTA = 0.092
const LONGITUDE_DELTA  = LATITUD_DELTA * ASPECT_RATIO
export default class MapaPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
 			x: {
		      latitude: 4.597825,
		      longitude: -74.0755723,
		    },
		    modalVisible:true
		}
	}

	async componentWillMount(){
		Keyboard.dismiss()
		 
			
		navigator.geolocation.getCurrentPosition(e=>{
			console.log(e)
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:LATITUD_DELTA,
				longitudeDelta:LONGITUDE_DELTA
			}
			this.setState({x})
			 
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
			let x = {
				latitude : lat,
				longitude : lng,
				latitudeDelta : LATITUD_DELTA,
				longitudeDelta : LONGITUDE_DELTA
			}
			this.setState({x})
			// Alert.alert(
			//   `lat: ${lat}`,
			//  `lng: ${lng}`,
			//   [
			//     {text: 'OK', onPress: () => console.log('OK Pressed')},
			//   ],
			//   { cancelable: false }
			// )
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
	}
	componentWillUnmount() {
		clearInterval(this.state.interval);
	}
	componentWillReceiveProps(NextProps){
		console.log(this.props)
		console.log(NextProps)
		if(this.props.actualPosicion){
			this.setState({x:this.props.actualPosicion})
		}	
	}

	render(){
		const {ubicacionDefecto} = this.props
		console.log(ubicacionDefecto)
 
		return(
			<View>
				 
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
		            console.log('Modal has been closed.');
		        }}>
					<View style={CreatePlanStyle.tituloMapa}>
						<TouchableOpacity onPress={(e)=>{this.props.close(this.state.asignadosEmpty)}}  style={CreatePlanStyle.btnClose} >
							<Image source={require('../agregarAmigos/back.png')} style={CreatePlanStyle.imagenClose} />
						</TouchableOpacity>
						{
							!ubicacionDefecto.infoplan
							&&<GooglePlacesAutocomplete
							placeholder='Buscar'
							minLength={2} // minimum length of text to search
							autoFocus={true}
							returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
							listViewDisplayed='auto'    // true/false/undefined
							fetchDetails={true}
							renderDescription={row => row.description} // custom description render
							onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
								console.log(details.formatted_address)
								let latitude = details.geometry.location.lat;
								let longitude = details.geometry.location.lng;
								let direccion = details.formatted_address;
								this.setState({direccion, x:{latitude, longitude}})
							}}
							getDefaultValue={() => ''}
							query={{
								key: 'AIzaSyCn_XO2J1yIl7I3UMy7hL6-0QmFJAOwIz8',
								language: 'es', // language of the results
							}}
							styles={{
									textInputContainer: {
									width: '100%'
								},
									description: {
									fontWeight: 'bold'
								},
									predefinedPlacesDescription: {
									color: '#1faadb'
								},
							}}
							currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
							currentLocationLabel="Current location"
							nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
							GoogleReverseGeocodingQuery={{
							// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
							}}
							GooglePlacesSearchQuery={{
								// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
								rankby: 'distance',
								types: 'food'
							}}
							filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3', 'sublocality']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
							debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
						/>
						}
		          		
		          	</View>		
	      			<View style ={CreatePlanStyle.container}>
				        <MapView
				          style={CreatePlanStyle.map}
				          region={{
				            latitude:  ubicacionDefecto.infoplan ?ubicacionDefecto.lat :this.state.x.latitude,
				            longitude: ubicacionDefecto.infoplan ?ubicacionDefecto.lng : this.state.x.longitude,
				            latitudeDelta: 0.015,
				            longitudeDelta: 0.0121,
				          }}
				        >
				          <Marker draggable
						    coordinate={ubicacionDefecto.infoplan ?{latitude:this.props.ubicacionDefecto.lat, longitude:this.props.ubicacionDefecto.lng} :this.state.x}
						    onDragEnd={(e) => {this.setState({ x: e.nativeEvent.coordinate }); console.log(e.nativeEvent.coordinate)}}
						  />
				        </MapView>
				        {
				        	!ubicacionDefecto.infoplan
				        	&&<View  style={CreatePlanStyle.contenedorRes}>
					       		<TouchableOpacity 
					       			onPress={() => { this.props.updateStateX(this.state.x.latitude, this.state.x.longitude,this.state.direccion)} } 
									style={CreatePlanStyle.btnHecho}>
									<Text style={CreatePlanStyle.hecho}>Hecho !</Text>
								</TouchableOpacity>
							</View>
				        }
				        
				    </View>
			    </Modal>    
			</View>
		)
	}
	 
}