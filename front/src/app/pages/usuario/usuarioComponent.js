import React, { Component
}     from 'react';
import { Table, Form, Breadcrumb, Row, Col, Icon, Tooltip, Modal, Input, InputNumber } from 'antd';


 
const FormItem = Form.Item;
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
    visible:false,
    usuario:{}
  };
  handleSubmit = (e) => {
    // const {restricciones, categorias, ubicacion, x} = this.state
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['userId']=this.state.usuario.id
        this.props.nuevoPago(values)
        this.setState({ visible:false });
        this.props.form.resetFields();
      }
    });
  }
  renderRecargar(){
    const {visible, usuario} = this.state
    const { getFieldDecorator } = this.props.form;
    return(
      <Modal
          visible={visible}
          title={`Nuevo pago a: ${usuario.nombre} / ${usuario.cedula ?usuario.cedula :''} `}
          okText="Guardar"
          cancelText="Cancelar"
          onCancel={()=>this.setState({visible:false})}
          onOk={this.handleSubmit}
        >
        <Form layout="vertical" >
          <FormItem label="Monto">
            {getFieldDecorator('monto', {
              rules: [{ required: true, message: 'Digita un monto!' }],
            })(
              <InputNumber style={{width:'100%'}} />
            )}
          </FormItem>
         <FormItem label="Referencia">
            {getFieldDecorator('referencia', {
              rules: [{ required: true,  message: 'Digita una referencia!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Metodo">
            {getFieldDecorator('metodo', {
              rules: [{ required: true, message: 'Digita un metodo!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Descripción">
            {getFieldDecorator('descripcion', {
              rules: [{ message: 'Digita una descripcion!' }],
            })(
              <Input />
            )}
          </FormItem>
          
        </Form>
      </Modal>
    )
  }
  render() {
    const columns = [{
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
    },{
      title: 'Saldo',
      dataIndex: 'saldo',
      key: 'saldo',
    },  {
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
    }, {
      title: 'Editar',
      dataIndex: 'editar',
      key: 'editar',
      render: (text, row, index) => {
        return <Icon type="edit" />
      }
    },{
      title: 'Estado',
      dataIndex: 'estado',
      key: '_id',
      render: (text, row, index) => {
        return <Icon type="frown" />
      }
    }, {
      title: 'Recargar',
      dataIndex: 'recargar',
      key: 'recargar',
      render: (text, usuario, index) => {
        return <Icon type="credit-card" onClick={()=>this.setState({visible:true, usuario})} />
      }
    }];
    return (
       <Row>
        <Col offset={1} md={22} xxl={{ span: 20, offset: 2 }}  >
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Usuarios</a></Breadcrumb.Item>
          </Breadcrumb>
          <Table dataSource={this.props.usuarios} columns={columns} rowSelection={rowSelection} rowKey='id' />
        </Col>
        {this.renderRecargar()}
      </Row>
    );
  }
}

 
export default Form.create()(UsuarioComponent);