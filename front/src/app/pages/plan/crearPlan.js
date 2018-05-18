import React, { Component
}     from 'react';
import { Modal, Button, Form, Input, Icon, DatePicker, Select } from 'antd';
import RestriccionLista from '../restriccion/restriccion'
import MapaContainer from '../map/mapa'
import Imagenes      from '../imagen/uploadImagen'

const FormItem = Form.Item;
const config = {
  rules: [{ type: 'object', required: true, message: 'Seleccionar Hora!' }],
};
const width = 100
const height =100
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUD_DELTA = 0.092
const LONGITUDE_DELTA  = LATITUD_DELTA * ASPECT_RATIO


class CrearPlan extends React.Component {
  state = {
    ModalTitle: 'Nuevo Plan',
    confirmLoading: false,
    showMap:false,
    x: {
        latitude: 4.597825,
        longitude: -74.0755723,
      },
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(e=>{
      console.log(e)
      let lat =parseFloat(e.coords.latitude)
      let lng = parseFloat(e.coords.longitude)
      let x = {
        latitude:lat,
        longitude:lng,
        latitudeDelta:LATITUD_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }
      this.setState({x})
    }, (error)=>console.log(error),
    {enableHighAccuracy: true, timeout:20000, maximumAge:1000})

    this.watchID = navigator.geolocation.watchPosition(e=>{
      let lat =parseFloat(e.coords.latitude)
      let lng = parseFloat(e.coords.longitude)
      let x = {
        latitude : lat,
        longitude : lng,
        latitudeDelta : LATITUD_DELTA,
        longitudeDelta : LONGITUDE_DELTA
      }
      this.setState({x})
      console.log(x)
    })
  }
  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }
  
  handleOk = () => {
    this.setState({
      ModalTitle: 'Creando Plan',
      confirmLoading: true,
    });
    setTimeout(() => {
       this.props.close(false)
    }, 2000);
  }
  updateStateX(lat){  
    console.log(lat.geometry.viewport.b.b)
    console.log(lat.geometry.viewport.f.f)
    let longitude = lat.geometry.viewport.b.b
    let latitude = lat.geometry.viewport.f.f
   this.setState({x :{latitude,longitude}})
  }
  renderForm(){
    const { getFieldDecorator, validateFields } = this.props.form;
    return(
      <Form onSubmit={(e)=>props.handleSubmit(e, validateFields)} className="login-form">
        {/* NOMBRE */}
        <FormItem>
          {getFieldDecorator('nombre', {
            rules: [{ required: true, message: 'Inserta un nombre!' }],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="titulo" />
          )}
        </FormItem>

      {/* DESCRIPCION */}
        <FormItem>
          {getFieldDecorator('descripcion', {
            rules: [{ required: true, message: 'Inserta alguna descripción!' }],
          })(
            <Input prefix={<Icon type="select" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Descripción" />
          )}
        </FormItem>

       {/* FECHA HORA */}
        <FormItem>
          {getFieldDecorator('fechaLugar', {
            rules: [{ required: true, message: 'Inserta una fecha y hora' }],
          })(
           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className='ant-input' placeholder='Fecha y hora' />
          )}
        </FormItem>

       {/* RESTRICCIONES */}
        <FormItem>
          {getFieldDecorator('restricciones', {
            rules: [{ required: true, message: 'Inserta tu username!' }],
          })(
            <RestriccionLista />
          )}
        </FormItem>

      {/* UBICACION */}
      <FormItem>
        {getFieldDecorator('descripcion', {
          rules: [{ required: true, message: 'Inserta alguna descripción!' }],
        })(
          <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Ubicacion" 
          onClick={()=>this.setState({showMap:true})} />
        )}
      </FormItem>

      {/* MOSTRAR MAPA */}
      {
        this.state.showMap
        ?<MapaContainer 
          close={(e)=>this.setState({showMap:e})}
          center={{lat: this.state.x.latitude, lng:this.state.x.longitude}}
          height='550px'
          zoom={17}
          updateStateX={(lat)=>this.updateStateX(lat)}
        />
        :null
      }

      {/* MOSTRAR MAPA */}
        <Imagenes />


        <Button type="primary" htmlType="submit" className="login-form-button">Guardar</Button>
      </Form>
    )
  }
  render() {
    const { visible, confirmLoading, ModalTitle } = this.state;
    console.log(this.state.showMap)
    return (
      <div>
        <Modal title={ModalTitle}
          visible={this.props.showModal}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={()=>this.props.close(false)}
        >
       
        {this.renderForm()}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CrearPlan);