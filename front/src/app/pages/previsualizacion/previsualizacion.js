 import React, { Component
}     from 'react';

import store           			 from '../../redux/store'
import {obtieneUnPlan}           from '../../redux/actionCreator'
import {connect}      			 from 'react-redux'
import PrevisualizacionComponent from './previsualizacionComponent'



const Previsualizacion = (props)=>{
	return <PrevisualizacionComponent plan={props.unPlan} imagen={props.imagen} />
}

const mapStateToProps = state=>{
  return{
    unPlan:state.unPlan
  }
}


export default connect(mapStateToProps)(Previsualizacion);