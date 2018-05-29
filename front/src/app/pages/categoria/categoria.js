import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import CategoriaComponent  from './categoriaComponent'
import {obtieneCategoria, creaCategoria}    from '../../redux/actionCreator'

store.dispatch(obtieneCategoria())


class Categoria extends Component {
	render(){
		return(
			<CategoriaComponent 
        categoria={this.props.categorias} 
        lista={this.props.lista} 
        categoriasAgregadas={this.props.categoriasAgregadas}
        handleSubmit={(fileList, nombre)=>this.props.handleSubmit(fileList, nombre)}  
      />
		)
	}
} 

const mapStateToProps = state=>{
  return{
    categorias:state.categorias
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(fileList, nombre){
      console.log({nombre})
      console.log({fileList})
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('imagen', file);
        formData.append('nombre', nombre);
      });
      store.dispatch(creaCategoria(formData))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categoria);