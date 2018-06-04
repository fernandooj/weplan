import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
 
 
 
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const {width, height} = Dimensions.get('window') 
class MapComponent extends Component{
  
	render(){
		console.log(this.props)
		return(
  			<View style ={styles.container}>
		        <MapView
		          style={styles.map}
		          region={{
		            latitude: this.props.lat,
		            longitude: this.props.lng,
		            latitudeDelta: 0.015,
		            longitudeDelta: 0.0121,
		          }}
		        >
		        </MapView>
		    </View>   
		)
	}
}
MapComponent.defaultProps = {
  lat: 4.597825,
  lng: -74.0755723,
};

export default MapComponent


const styles = StyleSheet.create({
    container: {
        flex: 1,
 		backgroundColor:'red',
        alignItems: 'center',
        marginTop: 25,
    },
    map: {
       	height: 200,
        width:Dimensions.get('window').width,
    },
     
});