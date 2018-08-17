import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import UsuarioComponent  from './usuarioComponent'
import {obtieneUsuarios, crearPago}      from '../../redux/actionCreator'
 
 
store.dispatch(obtieneUsuarios())


class Usuario extends Component {
 	
	render(){
		return(
			<UsuarioComponent usuarios={this.props.usuarios} nuevoPago={(data)=>this.props.nuevoPago(data)} />
		)
	}
}



const mapStateToProps = state=>{
  return{
    usuarios:state.usuarios
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    nuevoPago(data){
      console.log(data)
      store.dispatch(crearPago(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Usuario);