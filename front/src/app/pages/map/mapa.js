import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Autocomplete from 'react-google-autocomplete';
import { Modal } from 'antd';
 

class MapaContainer extends React.Component{

 constructor(props){
    super(props)
    this.state={
      ModalTitle:'Arrastra el marcador a una ubicacion',
      confirmLoading:false,
      show:true,
      guardar:'Guardar',
      muestraInput:false,
      tipo:1  //// tipo 1==> si el usuario deja por defecto la ubicacion, tipo 2==>si el usuario arrastra, tipo3 ==> si el usuario hace la busqueda
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log(nextProps.center)
    //this.setState({x:{lat:nextProps.center.lat lng:nextProps.center.lng}})
    if(this.props.center.lat === nextProps.center.lat){
      return false
    }else{
      return true
    }
  }

  guardar = () => {
    const {tipo, place} = this.state
    const {lat, lng} = this.props.center
    this.setState({
      guardar: 'Guardando...',
      confirmLoading: true,
    });
    setTimeout(() => {
      tipo==1 
      ?this.props.drag(lat, lng, false) 
      :tipo==2 
      ?this.props.drag(this.state.lat, this.state.lng, false) 
      :this.props.autocomplate(place, true) 
    }, 2000);
  }
  
  draggable =(e) =>{
    e.latLng.lat(lat=>{
      this.setState({lat})
    })
    e.latLng.lng(lng=>{
      this.setState({lng})
    })
    this.setState({tipo:2})
  }


  render(){
    const {ModalTitle, confirmLoading, lat, lng,  muestraInput, valueNombre} = this.state
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
            <div>
            {this.props.autocomplate
            ?<Autocomplete
                style={{marginTop:10, width:'100%', padding:10}}
                onPlaceSelected={(place) => {
                  this.setState({place, tipo:3})
                  this.props.autocomplate(place, false)
                }}
                types={[ "establishment"]}
            />
            :null
          }
            <GoogleMap
              defaultZoom={this.props.zoom}
              defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
            >
            <Marker 
              draggable={true}
              onDragEnd={this.draggable} 
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
          <div style={{ height: `430px` }}   />
        }
        containerElement={
          <div style={{ height: this.props.height }} />
        }
        mapElement={
          <div style={{ height: `430px` }} />
        }
      />
    }else{
      map = <div style={{height: this.props.height}} />
    }
    return(<div><Modal title={ModalTitle}
              visible={this.state.show}
              onOk={this.guardar}
              confirmLoading={confirmLoading}
              okText={this.state.guardar}
              onCancel={()=>this.props.close(false)}
            >
            
            {map}
            
          </Modal></div>)
  }
}

export default MapaContainer
 
