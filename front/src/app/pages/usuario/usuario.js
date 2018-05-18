import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import UsuarioComponent  from './usuarioComponent'
import {obtieneUsuarios}      from '../../redux/actionCreator'
 
 
store.dispatch(obtieneUsuarios())


class Usuario extends Component {
 	
	render(){

		return(
			<UsuarioComponent usuarios={this.props.usuarios} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Usuario);