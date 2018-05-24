import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import CategoriaComponent  from './categoriaComponent'
import {obtieneCategoria}    from '../../redux/actionCreator'

store.dispatch(obtieneCategoria())


class Categoria extends Component {
	render(){
		return(
			<CategoriaComponent categoria={this.props.categoria} lista={this.props.lista} categoriasAgregadas={this.props.categoriasAgregadas} />
		)
	}
} 

const mapStateToProps = state=>{
  return{
    categoria:state.categoria
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


export default connect(mapStateToProps, mapDispatchToProps)(Categoria);