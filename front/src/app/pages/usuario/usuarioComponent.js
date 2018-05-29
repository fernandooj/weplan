import React, { Component
}     from 'react';
import { Table, Form, Breadcrumb, Row, Col } from 'antd';


 

const columns = [{
  title: 'username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'tipo',
  dataIndex: 'tipo',
  key: 'tipo',
}, {
  title: 'estado',
  dataIndex: 'estado',
  key: 'estado',
}, {
  title: 'nombre',
  dataIndex: 'nombre',
  key: 'nombre',
}, {
  title: 'ciudad',
  dataIndex: 'ciudad',
  key: 'ciudad',
}, {
  title: 'telefono',
  dataIndex: 'telefono',
  key: 'telefono',
}];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class UsuarioComponent extends React.Component {
 state = {
    data: [],
    pagination: {},
    loading: true,
  };
  render() {
    return (
       <Row>
        <Col offset={1} md={22} xxl={{ span: 20, offset: 2 }}  >
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Usuarios</a></Breadcrumb.Item>
          </Breadcrumb>
          <Table dataSource={this.props.usuarios} columns={columns} rowSelection={rowSelection} />
        </Col>
      </Row>
    );
  }
}

 
export default Form.create()(UsuarioComponent);