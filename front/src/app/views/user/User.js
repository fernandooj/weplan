// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './users.scss';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane, Button} from 'reactstrap';
import FontAwesome    from 'react-fontawesome';
import axios from 'axios';
import classnames from 'classnames';
import {Cropper} from 'react-image-cropper'




const DemoImg = 'https://braavos.me/images/posts/gr/8.jpg'



export default class User extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      user:[],
      userFilter:[],
      primerUsuario:[],
      perfilUsuario:[],
      activeTab:'4',
      imgSrc: DemoImg,
      image: '',
      imageLoaded: false,
    }
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount(){
     
    axios.get('/x/v1/users')
    .then(e=>{
      console.log(e.data.usuarios)
      let user=e.data.usuarios
      let primerUsuario = e.data.usuarios[0]
      this.setState({user, userFilter:user, primerUsuario})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  renderUsers(){
    return this.state.user.map(e=>{
      return (
          <tr key={e._id} onClick={()=>this.setState({primerUsuario:e})}>
            <th scope="row">#</th>
            <td>{e.username}</td>
            <td>{e.nombre}</td>
            <td>{e.sexo=='f' ?'Femenino' :'Masculino'}</td>
            <td>{e.acceso}</td>
            <td>{e.tipo}</td>
          </tr>
      )
    })
  }
  renderPerfil(e){
    const {primerUsuario} = this.state
    return(
      <div>
        <h2>{primerUsuario.nombre}</h2>
        <img src={primerUsuario.photo} className={styles.logo} />
        <p>{primerUsuario.sexo=='f' ?'Femenino' :'Masculino'}</p>
        <p>{primerUsuario.pais}</p>
        <p>{primerUsuario.username}</p>
        <p>{primerUsuario.nacimiento}</p>
        <p>{primerUsuario.createdAt}</p>
      </div>
    )
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  renderSuscriptores(acceso){
    let user= this.state.userFilter.filter(e=>{
      if(e.acceso==acceso)
        return e
    })
    console.log(user)
    this.setState({user})
  }
  renderAll(){
    this.setState({user:this.state.userFilter})
  }
  render() {
 
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
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>sexo</th>
                        <th>Acceso</th>
                        <th>Tipo</th>
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
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>sexo</th>
                        <th>Acceso</th>
                        <th>Tipo</th>
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
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>sexo</th>
                        <th>Acceso</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                         {this.renderUsers()}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId='4'>
                  <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-user"></i></div>
                              <input className="form-control" type="text" placeholder="Nombre" 
                                     onChange={(nombre)=>this.setState({nombre:nombre.target.value})} />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
                              <input className="form-control" type="text" placeholder="Email" 
                                onChange={(email)=>this.setState({email:email.target.value})}
                                />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-briefcase"></i></div>
                                 <select className="form-control" placeholder="Role" tabIndex="-98"
                                  onChange={(acceso)=>this.setState({acceso:acceso.target.value})} >
                                  <option disabled selected={true}>Acceso</option>
                                  <option value="superAdmin">Super Admin</option>
                                  <option value="administrador">administrador</option>
                                  <option value="suscriptr">Suscriptor</option>
                                </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-cube"></i></div>
                                 <select className="form-control" placeholder="Role" tabIndex="-98"
                                  onChange={(estado)=>this.setState({estado:estado.target.value})} >
                                  <option disabled selected={true}>Estado</option>
                                  <option value="activo">Activo</option>
                                  <option value="inactivo">In Activo</option>
                                </select>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-key"></i></div>
                              <input className="form-control" type="password" placeholder="Password"
                                onChange={(password)=>this.setState({password:password.target.value})} />
                            </div> 
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-phone"></i></div>
                              <input className="form-control" type="text" placeholder="Telefono" 
                              onChange={(telefono)=>this.setState({telefono:telefono.target.value})} />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon"><i className="fa fa-mars"></i></div>
                              <select className="form-control" placeholder="Status" tabIndex="-98"
                                onChange={(sexo)=>this.setState({sexo:sexo.target.value})} >
                                <option disabled selected={true}>Genero</option>
                                <option value="f">Femenino</option>
                                <option value="m">Masculino</option>
                              </select> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <Button color='success'  onClick={this.handleSubmit.bind(this)}>Guardar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Col md='4'>
                      <Cropper src={this.state.imgSrc}
                        ref={ref => { this.image = ref }}
                        onImgLoad={() => this.handleImageLoaded('image')}
                      />
                    <button onClick={() => this.handleClick('image')} >
                      Crop Image
                    </button>
              {
            this.state.image
              ? <img
                className="after-img"
                src={this.state.image}
                alt=""
              />
              : null
          }
                    </Col>
                </TabPane>
              </TabContent>
            </Col>
            <Col sm='4' md='4' xs='4' >
                <div className={styles.usersContainer}>
                  {this.renderPerfil()}
                </div>
            </Col>
          </Row>
        </Container>  
      </AnimatedView>
    );
  }
 


  handleImageLoaded (state) {
    this.setState({
      [state + 'Loaded']: true
    })
  }

 

  handleClick (state) {
    let node = this[state]
    this.setState({
      [state]: node.crop()
    })
  }

 base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

  handleSubmit(){
    const {nombre, password, email, telefono, acceso, sexo, estado, image} = this.state
    const pais = 10
    const ciudad = 'bogota'
    console.log({nombre, password, email, telefono, acceso, sexo, estado, pais, ciudad})
 
   
    var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
    var blob = this.base64ToBlob(base64ImageContent, 'image/png');   
   console.log(blob)
    let data = new FormData();

    data.append('nombre', nombre);
 
    data.append('ciudad', ciudad);
    data.append('pais', pais);
    data.append('password', password);
    data.append('sexo', sexo);
    data.append('imagen', blob);


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
      if(res.data.status=="SUCCESS"){
        navigate('editPerfil2')
      }
    })
    .catch((err)=>{
      console.log(err)
    })

    // axios.post('/x/v1/users/createUser', {nombre, password, email, telefono, acceso, sexo, estado, ciudad, pais})
    // .then(e=>{
    //   console.log(e.data)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }
}

 










