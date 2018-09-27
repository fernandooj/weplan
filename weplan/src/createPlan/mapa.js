import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, Keyboard, TextInput, ScrollView} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
 
import MapView, { AnimatedRegion, Marker, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInputMask } from 'react-native-masked-text' 
import KeyboardListener from 'react-native-keyboard-listener';

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
			saldo:0,
 			x: {
				latitude: 4.597825,
				longitude: -74.0755723,
				latitudeDelta: 0.046002887451081165,
				longitudeDelta: 0.05649235099555483,
		    },
		    x2: {
				latitude: 4.597825,
				longitude: -74.0755723,
				latitudeDelta: 0.046002887451081165,
				longitudeDelta: 0.05649235099555483,
		    },
		    buscador:false,
		    marker: {
				latitude: 4.597825,
				longitude: -74.0755723,
		    },
		    km:this.props.ubicacionDefecto.area ?this.props.ubicacionDefecto.area :0,
		    latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		    modalVisible:true,
		    mapaCargado:false,
		    showKeyboard:false,
		    valorInicial:0
		}
		
	}

	async componentWillMount(){	
		const {ubicacionDefecto,  guardaUbicacion} = this.props
		
		navigator.geolocation.getCurrentPosition(e=>{
			// console.log(e)
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lat 
						   :guardaUbicacion.lat ?guardaUbicacion.lat 
						   :lat ?lat :4.597825;
			let longitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lng 
						   :guardaUbicacion.lng ?guardaUbicacion.lng 
						   :lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true})
 
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let latitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lat 
						   :guardaUbicacion.lat ?guardaUbicacion.lat 
						   :lat ?lat :4.597825;
			let longitude = ubicacionDefecto.infoplan ?ubicacionDefecto.lng 
						   :guardaUbicacion.lng ?guardaUbicacion.lng 
						   :lng ?lng :-74.0755723;
			let x = {
				latitude:latitude,
				longitude:longitude,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true})
 
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
	}
	componentWillUnmount() {
		Keyboard.dismiss()
		clearInterval(this.state.interval);
	}
	setUbicacion(data, details){
		let latitude = details.geometry.location.lat;
		let longitude = details.geometry.location.lng;
		let direccion = details.formatted_address;
 		this.setState({buscador:true})
		this.setState({direccion, x:{latitude, longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121}})
	}
	currentUbication(){
		navigator.geolocation.getCurrentPosition(e=>{
			let lat = parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true, buscador:true})
 
		}, (error)=>this.watchID = navigator.geolocation.watchPosition(e=>{
			let lat =parseFloat(e.coords.latitude)
			let lng = parseFloat(e.coords.longitude)
			let x = {
				latitude:lat,
				longitude:lng,
				latitudeDelta:0.013850498819819812,
				longitudeDelta:0.01412317156791687
			}
			this.setState({x, mapaCargado:true,buscador:true})
		},
		(error) => console.log('error'),
		{enableHighAccuracy: true, timeout:5000, maximumAge:0})
      )
	}
	render(){
		const {ubicacionDefecto, inputValor, planPublico, guardaUbicacion} = this.props
		const {valorInicial, km, latitudeDelta, longitudeDelta, mapaCargado, showKeyboard, buscador,x,x2}=this.state
		let direccion = guardaUbicacion.direccion ?guardaUbicacion.direccion :this.state.direccion
 	 	console.log(x)
 	 	console.log(km)
		if (mapaCargado) {
			return(
				<View>
				<KeyboardListener
					onWillShow={() => { this.setState({ showKeyboard: true }); }}
					onWillHide={() => { this.setState({ showKeyboard: false }); }}
				/>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
			            console.log('Modal has been closed.');
			        }}>
						<View style={CreatePlanStyle.tituloMapa}>
							<TouchableOpacity onPress={(e)=>{this.props.close(this.state.asignadosEmpty)}}  style={CreatePlanStyle.btnClose} >
								<Image source={require('../assets/images/back.png')} style={CreatePlanStyle.imagenClose} />
							</TouchableOpacity>
							{
								!ubicacionDefecto.infoplan || ubicacionDefecto.muestraBtnHecho
								?<GooglePlacesAutocomplete
								placeholder='Buscar'
								minLength={2} // minimum length of text to search
								autoFocus={false}
								returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
								listViewDisplayed='auto'    // true/false/undefined
								fetchDetails={true}
								renderDescription={row => row.description} // custom description render
								onPress={(data, details = null) => {this.setUbicacion(data,details)}}// 'details' is provided when fetchDetails = true
									
								
								getDefaultValue={() => ''}
								query={{
									key: 'AIzaSyCn_XO2J1yIl7I3UMy7hL6-0QmFJAOwIz8',
									language: 'es', // language of the results
									location: '4.597825,-74.0755723',
									components: 'country:co'
								}}
								styles={{
										textInputContainer: {
										width: '100%',
									},
										description: {
										fontWeight: 'bold',
									},
										predefinedPlacesDescription: {
										color: '#1faadb'
									},
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
							:null
							}
			          		
			          	</View>		
		      			<ScrollView style ={CreatePlanStyle.container}>
		      				{
		      					buscador
		      					?<MapView
					          		style={CreatePlanStyle.map, {height:showKeyboard ?250:405}}
					          		region={{
							            latitude:  x.latitude,
							            longitude: x.longitude,
							            latitudeDelta: x.latitudeDelta,
							            longitudeDelta: x.longitudeDelta,
					          		}}
					          		onRegionChange={(e)=>this.onRegionChange(e)}
					          		onPress={()=>this.setState({buscador:true})}
					        	> 
						        <Marker
								    coordinate={x}
							  	/>
							  	<Circle 
								  	radius={km}
								  	center={{latitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lat :this.state.x.latitude, 
								  		longitude: ubicacionDefecto.infoplan ?ubicacionDefecto.lng : this.state.x.longitude}}
								  	strokeColor = { '#1a66ff' }
		                			fillColor = { 'rgba(100,100,100,.2)' }
							  	/>
						        </MapView>
					        	:<MapView
						          style={CreatePlanStyle.map, {height:showKeyboard ?250:405}}
						          initialRegion={{
						            latitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lat :guardaUbicacion.lat ?guardaUbicacion.lat :x.latitude,
						            longitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lng :guardaUbicacion.lng ?guardaUbicacion.lng :x.longitude,
						            latitudeDelta: this.state.x.latitudeDelta,
						            longitudeDelta: this.state.x.longitudeDelta,
						          }}
				          		onRegionChange={(e)=>this.onRegionChange(e)}
					        	> 
						        <Marker
								    coordinate={km<200 ?x :x2}
								  />
								  <Circle 
								  	radius={km}
								  	center={{latitude:ubicacionDefecto.infoplan ?ubicacionDefecto.lat :km<200 ?x.latitude :x2.latitude, 
								  		longitude: ubicacionDefecto.infoplan ?ubicacionDefecto.lng :km<200 ?x.longitude :x2.longitude}}
								  	strokeColor = { '#1a66ff' }
		                			fillColor = { 'rgba(100,100,100,.2)' }
								  />
						        </MapView>
			      				}
			      			<TouchableOpacity onPress={()=>this.currentUbication()} style={CreatePlanStyle.ubicationBtn}>
					        	<Image source={require('../assets/images/ubication.png')} style={CreatePlanStyle.ubication}/>
					        </TouchableOpacity>
					        {
					        	inputValor
					        	&&<View style={{paddingHorizontal:10}}>
					        		<Text style={{textAlign:'center'}}>Ingresa el monto que desees para visualizar el área de influencia definida</Text>
					        		<TextInputMask
					                  ref="text"
					                  placeholder='Valor a invertir por día'
					                  type={'money'}
					                  options={{ unit: '$', zeroCents:true, precision:0 }} 
					                  style={CreatePlanStyle.inputValor}
					                  underlineColorAndroid='transparent'
					                  onChangeText={this.getValor.bind(this)} 
					                  onBlur={()=>this.setState({buscador:false})}
					                  value={(km*2000)/300}
					                />
					            </View>
					        }
					        {
					        	!ubicacionDefecto.infoplan || ubicacionDefecto.muestraBtnHecho
					        	?<View style={CreatePlanStyle.contenedorRes}>
						       		<TouchableOpacity 
						       			onPress={() => { this.props.updateStateX(this.state.x.latitude, this.state.x.longitude, direccion, km, valorInicial)} } 
										style={CreatePlanStyle.btnHecho}>
										<Text style={[CreatePlanStyle.hecho, CreatePlanStyle.familia]}>Hecho !</Text>
									</TouchableOpacity>
								</View>
								:null
					        }
					        
					    </ScrollView>
				    </Modal>    
				</View>
			)
		}else{
			return(<Text></Text>)
		}	
	}
	onRegionChange(x) {
		this.state.km<200 ?this.setState({x2:x}) :null
		this.setState({x});
	}
	getValor(e){
	    e = e.substr(1)
	    e = e.replace(/[^0-9]/g, '') 
	    e = Number(e)
	   
	    let km = (e*300)/2000 
	    // console.log(0.013850498819819812+(km*.000005))
	    
	    let x = {
			latitude: this.state.x.latitude,
			longitude:this.state.x.longitude,
			latitudeDelta: 0.013850498819819812+(km*.00002),
			longitudeDelta: 0.01412317156791687+(km*.00002),
	    }
	    // this.state.km<200 ?this.setState({buscador:true}) :this.setState({buscador:false})
	   
	
	    this.setState({valorInicial:e, km, x, x2:x, buscador:true})

	    setTimeout(function(){ 
	    	this.setState({ buscador:false })
	    }, 100);

	}
	 
}