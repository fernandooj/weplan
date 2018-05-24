import React, { Component
}     from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;


 
 

class RestriccionComponent extends React.Component {
 
  listadoRestricciones(){
    return this.props.restriccion.map(e=>{
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
          placeholder="Restricciones"
          onChange={this.props.restriccionesAgregadas}
        >
           {this.listadoRestricciones()}
        </Select>
      );
    }else{
      return (
        <div>
          restriccion 1
        </div>
      );
    }  
  }
}

 
export default RestriccionComponent;