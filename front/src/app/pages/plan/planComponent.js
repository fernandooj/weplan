import React, { Component
}     from 'react';
import { Table, Form, Breadcrumb, Row, Col, Button } from 'antd';
import CrearPlan from './crearPlan'

 


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class PlanComponent extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: true,
    filteredInfo: null,
    sortedInfo: null,
    showModal:false
  };
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'nombre',
      },
    });
  }
  handleOk(){
    this.setState({
      ModalTitle: 'Creando Plan...',
      showModal: false,
    });
  }
  render() {
    let { sortedInfo, filteredInfo, showModal } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      filteredValue: filteredInfo.nombre || null,
      onFilter: (value, record) => record.nombre.includes(value),
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
    }, {
      title: 'Total Planes Creados',
      dataIndex: 'planPadre',
      key: 'planPadre',
      sorter: (a, b) => a.planPadre - b.planPadre,
      sortOrder: sortedInfo.columnKey === 'planPadre' && sortedInfo.order,
    }, {
      title: 'Lugar',
      dataIndex: 'lugar',
      key: 'lugar',
      sorter: (a, b) => a.lugar - b.lugar,
      sortOrder: sortedInfo.columnKey === 'lugar' && sortedInfo.order,
    }, {
      title: 'Estado',
      dataIndex: 'activo',
      key: 'activo',
      render: (text, row, index) => {
        return <p> {text ?'Activo' :'Innactivo'}</p>
      },
      filters: [
        { text: 'Activo', value: true },
        { text: 'innactivo', value: false },
      ],
      filteredValue: filteredInfo.activo || null,
      onFilter: (value, record) => record.activo.includes(value),
      sorter: (a, b) => a.activo.length - b.activo.length,
      sortOrder: sortedInfo.columnKey === 'activo' && sortedInfo.order,
    }];
    return (
      <Row>
        <Col offset={1} md={22} xxl={{ span: 20, offset: 2 }}  >
          <div style={{position:'relative', zIndex: 100,}}>
            <Breadcrumb style={{float:'left'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item><a href="">Planes</a></Breadcrumb.Item>
            </Breadcrumb>
          <Button type="primary" icon="plus" size='large' style={{float:'right', 'marginBottom':30}} onClick={()=>this.setState({showModal:true})}>Nuevo</Button>
          <CrearPlan 
            showModal={showModal} 
            close={this.handleOk.bind(this)} 
            handleSubmit={(values, restriccion, categoria, ubicacion,x)=>this.props.handleSubmit(values, restriccion, categoria, ubicacion,x)} 
            insertaImagenes={(imagen)=>this.props.insertaImagenes(imagen)} 
          />
          </div>
          <Table dataSource={this.props.planes} columns={columns} rowSelection={rowSelection} rowKey='_id'  onChange={this.handleChange} />
        </Col>
      </Row>
    );
  }
}

 
export default Form.create()(PlanComponent);