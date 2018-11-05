// @flow weak

import React, {
  Component
}                         from 'react';
import { withRouter }     from 'react-router';
import {
  NavigationBar,
  BackToTop
}                         from '../../components';
import MainRoutes         from '../../routes/MainRoutes';
import styles             from './app.scss';
import {connect}      from 'react-redux'
import { notification } from 'antd';
import {perfil}      from '../../redux/actionCreator'
import store from '../../redux/store.js'
 
store.dispatch(perfil())

const alertaLogin = (type, mensaje) => {
  notification[type]({
    message: 'Ops!!',
    description: mensaje,
  });
};

class App extends Component {

  render() {
    let showMenu=false
    const { code, usuario } = this.props.usuario
 

    if (this.props.perfil.code==1) {
      showMenu=true
      if (this.props.location.pathname=='/'){
        //window.location.href = '/dashboard'
        this.props.history.push("/dashboard");
      }
    }else if(this.props.perfil.code==0){
      if (this.props.location.pathname!=='/'){
       this.props.history.push("/");
      }
    }

    if (code==1) {
      //this.props.history.push("/dashboard");
      window.location.href = '/dashboard'
    }else if(code==0){
      alertaLogin('error', 'Tus datos son incorrectos, verificalos!!')
    }
    else if(code==2){
      alertaLogin('error', 'Este usuario no existe!!')
    }
    return (
      <div id="appContainer">
       {/* <NavigationBar
          showMenu={showMenu}
          infoUser={this.props.perfil.user}
          handleLeftNavItemClick={this.handleLeftNavItemClick}
          handleRightNavItemClick={this.handleRightNavItemClick}
        />*/}
        <div className="container-fluid">
          <MainRoutes />
        </div>
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }

}

const mapStateToProps = state=>{
  return{
    usuario:state.usuario,
    perfil: state.perfil
  }
}

export default connect(mapStateToProps)(withRouter(App));
 
