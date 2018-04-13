// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './planes.scss';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane, Button, FormGroup, Input, Alert} from 'reactstrap';
import FontAwesome    from 'react-fontawesome';
import axios from 'axios';
import classnames from 'classnames';
import DatePicker from 'react-datepicker' 
import MapContainer from './map.js';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Dropzone from 'react-dropzone';




const width = 100
const height =100
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUD_DELTA = 0.092
const LONGITUDE_DELTA  = LATITUD_DELTA * ASPECT_RATIO
const FLAVOURS = [
  { label: 'Fotos', value: 'fotos' },
  { label: 'Parqueadero', value: 'parqueadero' },
  { label: 'Mascotas', value: 'mascotas' },
 
];
export default class Planes extends PureComponent {
 
  constructor(props){
    super(props)
    this.state={
      plan:[],
      planFilter:[],
      primerPlan:[],
      perfilPlan:[],
      selectedOption:[],
      pictures: [],
      activeTab:'4',
      tipo:'cliente',
      exito:false,
      fracaso:false,
      removeSelected: true,
      x: {
        latitude: 4.597825,
        longitude: -74.0755723,
      },

    }
    this.toggle = this.toggle.bind(this);
  }
  watchID: ?number = null
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
 

  componentWillMount(){
    navigator.geolocation.clearWatch(this.watchID)
    axios.get('/x/v1/pla/plan')
    .then(e=>{
      console.log(e.data)
      let plan=e.data.planes
      let primerPlan = e.data.planes[0]
      this.setState({plan, planFilter:plan, primerPlan})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  renderUsers(){
    return this.state.plan.map(e=>{
      return (
          <tr key={e._id} onClick={()=>this.setState({primerPlan:e})}>
            <th scope="row">#</th>
            <td>{e.nombre}</td>
            <td>{e.fechaLugar}</td>
            <td>{e.descripcion}</td>
          </tr>
      )
    })
  }
  renderRestricciones(){
    const {primerPlan} = this.state
    if (primerPlan.restricciones!==undefined) {
      return primerPlan.restricciones.map((e, key)=>{
        return (<p key={key}>{e}</p>)
      })
    }
  }
  renderAsignados(){
    const {primerPlan} = this.state
    if (primerPlan.restricciones!==undefined) {
      return primerPlan.asignados.map((e, key)=>{
        return (<p key={key}>{e.nombre}</p>)
      })
    }
  }
  updateStateX(lat){
    
    console.log(lat.geometry.viewport.b.b)
    console.log(lat.geometry.viewport.f.f)
    let longitude = lat.geometry.viewport.b.b
    let latitude = lat.geometry.viewport.f.f
   this.setState({x :{latitude,longitude}})
  }
  renderPerfil(e){    
    const {primerPlan} = this.state
  
    if (primerPlan.lat!==undefined) {
      const lat = parseFloat(primerPlan.lat)
      const lng = parseFloat(primerPlan.lng)
      let center = {lat:lat , lng: lng}
      return(
        <div className={styles.boxPlan}>
          <h2>{primerPlan.nombre}</h2>
          <img src={primerPlan.imagen} className={styles.logo} />
          <h3>Restricciones</h3>
          {this.renderRestricciones()}   
          <h3>Asignados</h3>
          <div className={styles.renderAsignados}>{this.renderAsignados()} </div>
           
          <MapContainer
            center={{lat: lat, lng:lng}}
            height='300px'
            zoom={15}
           
          />
        </div>
      )
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  renderSuscriptores(acceso){
    let user= this.state.planFilter.filter(e=>{
      if(e.acceso==acceso)
        return e
    })
    console.log(user)
    this.setState({user})
  }
  renderAll(){
    this.setState({user:this.state.planFilter})
  }
  handleChange = (value) => {
    this.setState({ value });
    console.log(`Selected: ${value.label}`);
    console.log(value)
  }
  render() {
    const {  value } = this.state;
    return(
      <AnimatedView>
        <Container className={styles.usersContenedor}>
          <Row>
            <Col sm='8' md='8' xs='8'>
              <Nav tabs>
                <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                           onClick={()=>{ this.toggle('1'); this.renderAll('all')}}>
                    Todos
                  </NavLink>  
                </NavItem>  
                <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                           onClick={() => { this.toggle('2'); this.renderSuscriptores('suscriptor')}}>
                    Suscriptores
                  </NavLink>  
                </NavItem>  
                <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); this.renderSuscriptores('admin')}}>
                    Administradores
                  </NavLink>  
                </NavItem>
                <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4')}}>
                    <FontAwesome
                      name='plus'
                      size='lg'
                    />
                    Nuevo
                  </NavLink>  
                </NavItem>   
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1'>
                  <Table className={styles.usersContainer}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                         {this.renderUsers()}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId='2'>
                  <Table className={styles.usersContainer}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                         {this.renderUsers()}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId='3'>
                  <Table className={styles.usersContainer}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                         {this.renderUsers()}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId='4'>
                  <Col md="12">
                      <div className="row">
             

                        <Col md="6">
                         <FormGroup>
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-user"></i></div>
                              <input className="form-control" type="text" placeholder="Nombre" 
                                     onChange={(nombre)=>this.setState({nombre:nombre.target.value})} />
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-commenting-o"></i></div>
                              <Input type="textarea" name="text" id="exampleText" placeholder='Descripción'
                                onChange={(descripcion)=>this.setState({descripcion:descripcion.target.value})}
                              />
                             
                            </div> 
                          </FormGroup>
                          <FormGroup>
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-calendar"></i></div>
                              <DatePicker
                                className={"form-control" + [styles.datePicker]}
                                selected={this.state.fechaLugar}
                                onChange={(fechaLugar)=>this.setState({fechaLugar})}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="LLL"
                                timeCaption="time"
                                placeholderText='Fecha / Hora'
                              />
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-ban"></i></div>
                              <Select
                                placeholder='Restricciones'
                                name="form-field-name"
                                value={value}
                                onChange={this.handleChange}
                                options={FLAVOURS}
                                multi
                                removeSelected={this.state.removeSelected}
                              />
                            </div> 
                          </FormGroup>
                          
                        </Col>
                        <Col md="6">
                          <Dropzone
                            multiple={false}
                            accept="image/*"
                            onDrop={(imagen)=>this.setState({imagen})}>
                            <p>Arrastra o haz click para cargar tu imagen</p>
                          </Dropzone>
                        </Col>
                        <Col md="6">
                          
                        </Col>
                      </div>
                      
                  </Col>
                  <Col md='12'>
                      <MapContainer
                        center={{lat: this.state.x.latitude, lng:this.state.x.longitude}}
                        height='550px'
                        zoom={17}
                        updateStateX={(lat)=>this.updateStateX(lat)}
                      />
                      <Row>
                        <Col md="12">
                          <div className="form-group">
                            <Button color='success'  onClick={this.handleSubmit.bind(this)}>Guardar</Button>
                            <Alert color='success' className={`in ${styles.alertaError}`} isOpen={this.state.exito}>
                              Plan creado con exito
                            </Alert>
                            <Alert color='danger' className={`in ${styles.alertaError}`} isOpen={this.state.fracaso}>
                              Error, no se puedo crear el plan
                            </Alert>
                          </div>
                        </Col>
                      </Row>
                  </Col>  
                </TabPane>
              </TabContent>
            </Col>
            <Col sm='4' md='4' xs='4' className={styles.usersContainer}>
                <div >
                  {this.renderPerfil()}
                </div>
            </Col>
          </Row>
        </Container>  
      </AnimatedView>
    );
  }

  handleDrop(files) {
    console.log(files)
    var data = new FormData();
    //data.append('imagen', files);

    files.forEach((file, index) => {
      data.append('imagen', file);
    });
   
    axios({
      method: 'post', //you can set what request you want to be
      url: '/x/v1/users/createUser',
      data: data,
      headers: {
       'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res)=>{
      console.log(res.data)
       
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  handleSubmit(){
    const {nombre, descripcion, fechaLugar, x, value, imagen, tipo} = this.state
    console.log({nombre, descripcion, fechaLugar, x, value, imagen, tipo})
    let data = new FormData();
    axios.post('/x/v1/pla/plan', {nombre, descripcion, fechaLugar, lat:x.latitude, lng:x.longitude, restricciones:value.value, tipo})
    .then(e=>{
      console.log(e.data)
      if(e.data.code==1){ 
        let id = e.data.message._id;
        imagen.forEach((file, index) => {
          data.append('imagen', file);
          data.append('id', e.data.message._id);
        })

        axios({
          method: 'put', //you can set what request you want to be
          url: '/x/v1/pla/plan',
          data: data,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res)=>{
          console.log(res.data)
          if(res.data.status=="SUCCESS"){
            this.setState({exito:true, fracaso:false})
          }else{
            this.setState({exito:false, fracaso:true})
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    })
    .catch(err=>{
      this.setState({exito:false, fracaso:true})
      console.log(err)
    })
 
  }
}

 










