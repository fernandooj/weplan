// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './dashboard.scss';
import { Col, Container, Row} from 'reactstrap';
import FontAwesome    from 'react-fontawesome';


export default class Dashboard extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired
  };

  render() {
    return(
      <AnimatedView>
        <Container>
          <Row>
            <Col sm='4' md='2' xs='6'>
              <div className={styles.box}>
                <FontAwesome
                  className={styles.icon}
                  name='user'
                  size='2x'
                />
                <i className="fa fa-coffee"></i>
                <p>23 usuarios</p>
              </div>  
            </Col>
            <Col sm='4' md='2' xs='6'>
              <div className={styles.box}>
                <FontAwesome
                  className={styles.icon}
                  name='users'
                  size='2x'
                />
                <p>5 Clientes</p>
              </div>
            </Col>
            <Col sm='4' md='2' xs='6'>
              <div className={styles.box}>
                <FontAwesome
                  className={styles.icon}
                  name='compress'
                  size='2x'
                />
                <p>23 Planes Clientes</p>
              </div>
            </Col>
            <Col sm='4' md='2' xs='6'>
              <div className={styles.box}>
                <FontAwesome
                  className={styles.icon}
                  name='expand'
                  size='2x'
                />
                <p>5 Planes usuarios</p>
              </div>
            </Col>
            
          </Row>
        </Container>  
      </AnimatedView>
    );
  }
}

 
