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
      guardar:'Guardar'
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.center.lat === nextProps.center.lat){
      return false
    }else{
      return true
    }
  }

  handleOk = () => {
    this.setState({
      guardar: 'Guardando...',
      confirmLoading: true,
    });
    setTimeout(() => {
       this.props.close(false)
    }, 2000);
  }

  draggable(e){
    console.log(e)
  }

  render(){
    const {ModalTitle, confirmLoading} = this.state
    console.log(this.props)
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
           
            <div>
            {this.props.updateStateX
            ?<Autocomplete
                style={{marginTop:10, width:'100%', padding:10}}
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
          <div style={{ height: `400px` }}   />
        }
        containerElement={
          <div style={{ height: this.props.height }} />
        }
        mapElement={
          <div style={{ height: `400px` }} />
        }
      />
    }else{
      map = <div style={{height: this.props.height}} />
    }
    return(<Modal title={ModalTitle}
              visible={this.state.show}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              okText={this.state.guardar}
              onCancel={()=>this.props.close(false)}
            >{map}</Modal>)
  }
}

export default MapaContainer
 
