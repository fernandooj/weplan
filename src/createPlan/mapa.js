import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import Icon from 'react-native-fa-icons';
 
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Button from 'react-native-button';
import AwesomeAlert from 'react-native-awesome-alerts';


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
		    showAlert: false
		}
	}

	watchID: ?number = null
	componentDidMount(){
		navigator.geolocation.getCurrentPosition(e=>{
			console.log(e)
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:LATITUD_DELTA,
				longitudeDelta:LONGITUDE_DELTA
			}
			this.setState({x})
		}, (error)=>this.setState({showAlert:true}),
		{enableHighAccuracy: true, timeout:20000, maximumAge:1000})

		this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude : lat,
				longitude : lng,
				latitudeDelta : LATITUD_DELTA,
				longitudeDelta : LONGITUDE_DELTA
			}
			this.setState({x})
			console.log(x)
		})
	}
	componentWillUnmont(){
		navigator.geolocation.clearWatch(this.watchID)
	}
	componentWillReceiveProps(NextProps){
		console.log(this.props)
		console.log(NextProps)
		if(this.props.actualPosicion){
			this.setState({x:this.props.actualPosicion})
		}	
	}
	render(){
		const {showAlert} = this.state
		console.log(this.props.actualPosicion)
		console.log(this.state.x)
		return(
			<View>
				<View style={CreatePlanStyle.titulo}>
					<Button onPress={() => {this.props.closeModal(); this.props.updateStateX(this.state.x.latitude, this.state.x.longitude, this.state.direccion)}} style={CreatePlanStyle.btnModal}> &#60; </Button>
	          		<GooglePlacesAutocomplete
						placeholder='Search'
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
							key: 'AIzaSyBdFabe3E1i8_3DICWf6MRRL867mlBTPDg',
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
							}
						}}
						currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
						currentLocationLabel="Current location"
						nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
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
	          	</View>		
      			<View style ={CreatePlanStyle.container}>
			        <MapView
			          style={CreatePlanStyle.map}
			          region={{
			            latitude: this.state.x.latitude,
			            longitude: this.state.x.longitude,
			            latitudeDelta: 0.015,
			            longitudeDelta: 0.0121,
			          }}
			        >
			          <Marker draggable
					    coordinate={this.state.x}
					    onDragEnd={(e) => {this.setState({ x: e.nativeEvent.coordinate }); console.log(e.nativeEvent.coordinate)}}
					  />
			        </MapView>
			    </View>
			    <AwesomeAlert
		          show={showAlert}
		          showProgress={false}
		          title="Oops!"
		          message="para una mejor experincia activa tu Ubicación"
		          closeOnTouchOutside={true}
		          closeOnHardwareBackPress={false}
		          showCancelButton={true}
		          cancelText="Cerrar"
		          confirmButtonColor="#DD6B55"
		          onCancelPressed={(showAlert) => {this.setState({showAlert:false})}}
	        />
			</View>
		)
	}
	 
}