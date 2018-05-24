import React, { Component
}     from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;


 
 

class CategoriaComponent extends React.Component {
  listadoCategoriaes(){
    return this.props.categoria.map(e=>{
      return (
        <Option key={e._id}><img src={e.ruta} style={{width:30}} />{e.nombre}</Option>
      );
    })
  } 
  render() {
    
    if (!this.props.lista){
      return (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Categorias"
          onChange={this.props.categoriasAgregadas}
        >
           {this.listadoCategoriaes()}
        </Select>
      );
    }else{
      return (
        <div>
          Categoria 1
        </div>
      );
    }  
  }
}

 
export default Form.create()(CategoriaComponent);