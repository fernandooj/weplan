import React, { Component
}     from 'react';
import { Modal, Button, Form, Input, Icon, DatePicker, Select, Steps } from 'antd';
import CategoriaLista   from '../categoria/categoria'
import RestriccionLista from '../restriccion/restriccion'
import MapaContainer    from '../map/mapa'
import Imagenes         from '../imagen/uploadImagen'
import Previsualizacion from '../previsualizacion/previsualizacion'

const FormItem = Form.Item;
const Step = Steps.Step;
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
const steps = [{
  title: 'Datos',
}, {
  title: 'Imagenes',
}, {
  title: 'Previsualización',
}, {
  title: 'Pago',
}];

class CrearPlan extends React.Component {
  state = {
    ModalTitle: 'Nuevo Plan',
    guardarBtn: 'Finalizar',
    loading: false,
    current:0,
    showMap:false,
    restricciones:[],
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
  
  finalizar = () =>{
    this.setState({
      ModalTitle: 'Creando Plan...',
      guardarBtn: 'Guardando...',
      loading: true,
    });
    setTimeout(() => {
       this.props.close(false)
       location.reload();
    }, 2000);
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.handleSubmit(values, this.state.restricciones)
          this.setState({ current:1 });
        }
      });
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
    const { showMap, loading, guardarBtn, restricciones, imagen, current } = this.state
    console.log(imagen)
    return(
     <section>
      <Steps current={current} style={{marginBottom:20}}>
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
      <div className="steps-content">

        {
          current===0
          ? <Form onSubmit={this.handleSubmit} className="login-form">
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
                    rules: [{ required: false, message: 'Inserta tu username!' }],
                  })(
                    <RestriccionLista restriccionesAgregadas={(res)=>this.setState({restricciones:res})} />
                  )}
                </FormItem>

              {/* CATEGORIA */}
                <FormItem>
                  {getFieldDecorator('categoria', {
                    rules: [{ required: false, message: 'Inserta tu username!' }],
                  })(
                    <CategoriaLista categoriasAgregadas={(cat)=>this.setState({categorias:cat})}/>
                  )}
                </FormItem>
              {/* UBICACION */}
                <FormItem>
                  {getFieldDecorator('ubicacion', {
                    rules: [{ required: false, message: 'Inserta alguna descripción!' }],
                  })(
                    <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Ubicacion" 
                    onClick={()=>this.setState({showMap:true})} />
                  )}
                </FormItem>
                {/* MOSTRAR MAPA */}
                  {
                    showMap
                    &&<MapaContainer 
                      close={(e)=>this.setState({showMap:e})}
                      center={{lat: this.state.x.latitude, lng:this.state.x.longitude}}
                      height='550px'
                      zoom={17}
                      updateStateX={(lat)=>this.updateStateX(lat)}
                    />
                  }
                  <div style={{textAlign:'right'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Siguiente
                    </Button>
                  </div>
             </Form>
          :current===1
          ?<Imagenes 
            imagenes={(fileList)=>this.props.insertaImagenes({fileList})}
            actualizaCurrent={(number, imagen)=>this.setState({current:number, imagen})}  
          />
          :current===2
          ?<Previsualizacion imagen={this.state.imagen} />
          :<div>Pagos</div>
        }

      
        <div className="steps-action">

          {
            current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.setState({current:current-1})}>
              Anterior
            </Button>
          }
          {
            current === 2
            &&
            <div style={{textAlign:'right'}}>
              <Button type="primary" onClick={() => this.finalizar()}>{this.state.guardarBtn}</Button>
            </div>
          }
           
        </div>
      </div>
      </section>
    )
  }
  render() {
    const { visible, confirmLoading, ModalTitle } = this.state;
    return (
      <div>
        <Modal title={ModalTitle}
          visible={this.props.showModal}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={()=>this.props.close(false)}
          footer={null}
          width={800}
        >
        {this.renderForm()}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CrearPlan);