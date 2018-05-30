import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import RestriccionComponent  from './restriccionComponent'
import {obtieneRestriccion, creaRestriccion}    from '../../redux/actionCreator'

store.dispatch(obtieneRestriccion())


class Restriccion extends Component {
	render(){
		return(
			<RestriccionComponent 
        restriccion={this.props.restricciones} 
        lista={this.props.lista} 
        restriccionesAgregadas={this.props.restriccionesAgregadas} 
        handleSubmit={(fileList, nombre)=>this.props.handleSubmit(fileList, nombre)}  />
		)
	}
}

 

const mapStateToProps = state=>{
  return{
    restricciones:state.restricciones
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(fileList, nombre){
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('imagen', file);
        formData.append('nombre', nombre);
      });
      store.dispatch(creaRestriccion(formData))
    }
  }
}
 


export default connect(mapStateToProps, mapDispatchToProps)(Restriccion);