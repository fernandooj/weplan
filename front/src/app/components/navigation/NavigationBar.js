// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Link }       from 'react-router-dom';
import axios from 'axios'
import { Menu, Icon, Avatar } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavigationBar extends React.Component{ 
  state = {
    current: 'plan',
  }
  handleClick = (e) => {
    this.setState({current:e.key})
  }
  render(){
    if (this.props.infoUser) {
      const {user} = this.props.infoUser
      console.log(user)
        return (
          <nav className="navbar navbar-default">
          <section >
            <img src='https://appweplan.com/public/assets/logo.png' />
          </section>
          <section>
          { 
            this.props.showMenu &&  user.acceso !=="suscriptor"
            ?<Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
              <Menu.Item key="plan">
                <Icon type="usergroup-add" />
                <Link to='plan'>Planes</Link>
              </Menu.Item>
              <Menu.Item key="usuario">
                <Icon type="usergroup-add" />
                <Link to='usuario'>Usuarios</Link>
              </Menu.Item>
              <Menu.Item key="restriccion">
                <Icon type="lock" />
                <Link to='restriccion'>Restricciones</Link>
              </Menu.Item>
              <Menu.Item key="categoria">
                <Icon type="lock" />
                <Link to='categoria'>Categorias</Link>
              </Menu.Item>
              <SubMenu title={<span><Avatar size="default" icon="user" />{user.nombre}</span>}>
                <Menu.Item key="setting:1">Perfil</Menu.Item>
                <Menu.Item key="setting:2">Notificaciones</Menu.Item>
                <Menu.Item key="setting:3" onClick={()=>this.closeSession()}>Cerrar Sesión</Menu.Item>
              </SubMenu>
            </Menu>
            :this.props.showMenu &&  user.acceso !=="superAdmin"
            &&<Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
              <Menu.Item key="plan">
                <Icon type="usergroup-add" />
                <Link to='plan'>Planes</Link>
              </Menu.Item>
            <SubMenu title={<span><Avatar size="default" icon="user" />{user.nombre}</span>}>
                <Menu.Item key="setting:1">Perfil</Menu.Item>
                <Menu.Item key="setting:2">Notificaciones</Menu.Item>
                <Menu.Item key="setting:3" onClick={()=>this.closeSession()}>Cerrar Sesión</Menu.Item>
              </SubMenu>
            </Menu>
          }
          </section>
          </nav>
        );
    }else{
      return <div>Cargando..</div>
    }
    
  }
  closeSession(){
    axios.get('/x/v1/logout')
    .then(e=>{
      window.location.href = "/";
    })
    .catch(err=>{

    })
  }
};

NavigationBar.propTypes = {
  brand:                    PropTypes.string,
  handleLeftNavItemClick:   PropTypes.func,
  handleRightNavItemClick:  PropTypes.func,
  navModel:                 PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  })
};

NavigationBar.defaultProps  = {
  brand  : 'brand'
};

export default NavigationBar;