import React, { Component
}     from 'react';
import { Table, Form, Breadcrumb, Row, Col, Select, Button } from 'antd';
import CrearRestriccion from './createRestriccion'
const Option = Select.Option;


const columns = [{
  title: 'nombre',
  dataIndex: 'nombre',
  key: 'nombre',
}, {
  title: 'ruta',
  dataIndex: 'ruta',
  render: (text, row, index) => {
    return <img src={text} style={{width:'50px'}} />
  }
 
} ];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};
 

class RestriccionComponent extends React.Component {
  state ={
    showModal:false
  }
  listadoRestricciones(){
    return this.props.restriccion.map(e=>{
      return (
        <Option key={e._id}><img src={e.ruta} style={{width:30}} />{e.nombre}</Option>
      );
    })
  } 
  render() {
    const {showModal} = this.state
    if (this.props.lista){
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
        <Row>
          <Col offset={1} md={22} xxl={{ span: 20, offset: 2 }}  >
            <div style={{position:'relative', zIndex: 100,}}>
            <Breadcrumb style={{float:'left'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item><a href="">Planes</a></Breadcrumb.Item>
            </Breadcrumb>
          <Button type="primary" icon="plus" size='large' style={{float:'right', 'marginBottom':30}} onClick={()=>this.setState({showModal:true})}>Nuevo</Button>
          <CrearRestriccion 
            showModal={showModal} 
            close={(e)=>this.setState({showModal:false})} 
            handleSubmit={(nombre, fileList)=>this.props.handleSubmit(nombre, fileList)} 
          />
          </div>
            <Table dataSource={this.props.restriccion} columns={columns} rowSelection={rowSelection} rowKey='_id'  />
          </Col>
        </Row>
      );
    }  
  }
}

 
export default RestriccionComponent;