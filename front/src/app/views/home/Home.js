// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import classnames     from 'classnames/bind';
import { Link }       from 'react-router-dom';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './home.scss';
import { Col, Button, Form, FormGroup, Label, Input, Media, Container, Row, Alert} from 'reactstrap';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

// IMPORTANT: we need to bind classnames to CSSModule generated classes:
const cx = classnames.bind(styles);

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired
  };
  constructor(props){
    super(props)
    this.state={
      fadeIn:false,
      username:'',
      password:'',
      usernameRequired:false,
      passwordRequired:false,
    }
  }
   componentWillMount(){
    axios.get('/x/v1/user/profile')
    .then(e=>{
      console.log(e.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  render() {
    const img = 'http://appweplan.com:8080/public/assets/logo.png'
    const {usernameRequired, passwordRequired} = this.state
    return(
      <AnimatedView>
        <Jumbotron>
        <Container>
          <Row>
            <Col sm='4'></Col>
            <Col sm='4'>
              <Media left href="#">
                <img src={img} className={styles.logo} />
              </Media>
            </Col>
          </Row>
          <Row> 
            <Col sm='3'></Col>
            <Col sm='6'>
              <Form>
                <FormGroup row>
                  <Label for="username" sm={3}>Username</Label>
                  <Col sm={9}>
                    <Input type="text" name="username" id="username" placeholder="username / email"
                        className={usernameRequired ?styles.input :null}
                        onChange={this.username.bind(this)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>Password</Label>
                  <Col sm={9}>
                    <Input type="password" name="password" id="password" placeholder="password"
                      className={passwordRequired ?styles.input :null}
                       onChange={this.password.bind(this)}
                    />
                  </Col>
                </FormGroup>                 
                <FormGroup check row>
                   <Col sm='5'></Col>
                  <Col sm={{ size: 2, offset: 4 }}>
                    <Button onClick={this.handleSubmit.bind(this)}>Entrar</Button>
                  </Col>
                </FormGroup>
              </Form>
              <Alert color='danger' className={`in ${styles.alertaError}`} isOpen={this.state.fadeIn}>
                Error, datos Incorrectos
              </Alert>
            </Col>
          </Row>
        </Container>
          
        </Jumbotron>
      </AnimatedView>
    );
  }
  username(username){
    this.setState({username: username.target.value})
    this.setState({usernameRequired:false})
  }
  password(password){
    this.setState({password: password.target.value})
    this.setState({passwordRequired:false})
  }
  handleSubmit(event){
    event.preventDefault()
    const {username, password} = this.state
  
    if (username.length<=0) {
      this.setState({usernameRequired:true})
    }
    if (password.length<=0) {
      this.setState({passwordRequired:true})
    }

  

    if (username.length>0 && password.length>0){
      console.log({username, password})
      axios.post('/x/v1/user/login', {username, password})
      .then(e=>{
        console.log(e.data)
        if(e.data.code==2){
          this.setState({fadeIn:true})
        }else if(e.data.code==1){
          this.props.history.push('/dashboard')
        }else{
          console.log('error')
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}

export default Home;
