import React, { Component
}     from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;


 
 

class RestriccionComponent extends React.Component {
  handleChange(value) {
    console.log(`selected ${value}`);
  }
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
          onChange={this.handleChange}
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

 
export default Form.create()(RestriccionComponent);