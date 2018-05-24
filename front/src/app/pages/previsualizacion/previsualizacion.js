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
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(e, validateFields){
      e.preventDefault()
      validateFields((err, values) => {
        if (!err) {
          store.dispatch(login(values))
        }
      });
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Previsualizacion);