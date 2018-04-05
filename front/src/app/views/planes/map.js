import React, { Component } from "react";
 
import { Col, Container, Row} from 'reactstrap';
import styles         from './planes.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import Autocomplete from 'react-google-autocomplete';
class MapContainer extends React.Component{

 constructor(props){
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.center.lat === nextProps.center.lat){
      return false
    }else{
      return true
    }
  }
  draggable(e){
    console.log(e)
  }
  render(){
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <div>
          {this.props.updateStateX
          ?<Autocomplete
              className={styles.searchBox}
              onPlaceSelected={(place) => {
                console.log(place);
                this.props.updateStateX(place)
              }}
              types={['establishment']}
          />
          :null
        }
          <GoogleMap
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          >
          <Marker 
          draggable={true}
          onDraggableChanged={this.draggable.bind(this)} 
          position={{ lat: this.props.center.lat, lng: this.props.center.lng}} />
          </GoogleMap>
          </div>
        )
      )
    )
    var map
    if(this.props.center.lat !== undefined){
      map = <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&libraries=places"
        loadingElement={
          <div style={{ height: `250px` }}   />
        }
        containerElement={
          <div style={{ height: this.props.height }} />
        }
        mapElement={
          <div style={{ height: `250px` }}  className={styles.mapa} />
        }
      />
    }else{
      map = <div style={{height: this.props.height}} />
    }
    return(map)
  }
}

export default MapContainer
 
