import React, { Component
}     from 'react';
import store           from '../../redux/store'
import {agregar}       from '../../redux/actionCreator'
import {connect}       from 'react-redux'
import AccesoComponent from './accesoComponent'
import {login}         from '../../redux/actionCreator'

class Acceso extends Component {
	render(){
		return(
			<AccesoComponent handleSubmit={(e, validateFields)=>this.props.handleSubmit(e, validateFields)} />
		)
	}
}



const mapStateToProps = state=>{
  return{
    usuario:state.usuario
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(e, validateFields){
      e.preventDefault()
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          store.dispatch(login(values))
        }
      });
      
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Acceso);