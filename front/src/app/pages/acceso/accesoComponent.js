// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import classnames     from 'classnames/bind';
import { Link }       from 'react-router-dom';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './acceso.scss';
import {connect}      from 'react-redux'

import store        from '../../redux/store.js'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import {URL} from "../../index.js"
import 'antd/dist/antd.css'; 

const FormItem = Form.Item;
// IMPORTANT: we need to bind classnames to CSSModule generated classes: fernandooj@ymail.com


const HomeComponent = (props)=> {
    const { getFieldDecorator, validateFields } = props.form;
    const logo = URL+'public/images/logo.png'
    let infoProps = props
    return(
      <AnimatedView>
        <Jumbotron>
          <Row>
            <Col offset={6} xs={12} sm={10} md={10} lg={12} xxl={{ span: 6, offset: 9 }}  >
              <img src={logo} className={styles.home} />
              <Form onSubmit={(e)=>props.handleSubmit(e, validateFields)} className="login-form">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Inserta tu username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Inserta tu Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                  <Row>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                  </Row>
                  )}
                   
                </FormItem>
                
                <Divider>O ingresa con </Divider>
                <div className={styles.redes}>
                  <div className={styles.facebookBtn}>
                    <Icon type="facebook"/>
                    <p> acebook </p>
                  </div>  
                  <div className={styles.googleBtn}>
                    <Icon type="google"/>
                    <p> oogle </p>
                  </div> 
                </div>  
                <Divider>O</Divider>
                <Col span={8} offset={4} >
                   <Link className="login-form-forgot" to="/about">Registrarme con email</Link>
                </Col>
                <Col span={8} offset={4} >
                  <Link className="login-form-forgot" to="/about">Olvide Mi Clave</Link>
                </Col>

              </Form>
            </Col>
          </Row>    
        </Jumbotron>
      </AnimatedView>
    );
}
 
export default Form.create()(HomeComponent);
