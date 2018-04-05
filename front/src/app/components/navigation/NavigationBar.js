// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import Humburger          from './humburger/Humburger';
import LeftNav            from './leftNav/LeftNav';
import RightNav           from './rightNav/RightNav';
import { Link }       from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu'

const NavigationBar = ({
  brand,
  navModel,
  handleLeftNavItemClick,
  handleRightNavItemClick
}) => {
  return (
    <nav className="navbar navbar-default">
      <div className="containersCustom">
        <div className="navbar-header">
          {
            <Humburger />
          }
          <a className="navbar-brand">
             <Humburger />
          </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            {
              <LeftNav
                leftLinks={navModel.leftLinks}
                onLeftNavButtonClick={handleLeftNavItemClick}
              />
            }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {
              <RightNav
                rightLinks={navModel.rightLinks}
                onRightNavButtonClick={handleRightNavItemClick}
              />
            }
          </ul>
        </div>
      </div>
      <Menu className="bm-menu">
        <Link to='/user' onClick={this.handleLeftNavItemClick}>Usuarios</Link>
        <Link to='/planes' onClick={this.handleLeftNavItemClick}>Planes</Link>
        <Link to='/categorias' onClick={this.handleLeftNavItemClick}>Categorias</Link>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    </nav>
  );
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
