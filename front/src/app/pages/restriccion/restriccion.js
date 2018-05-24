import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import RestriccionComponent  from './restriccionComponent'
import {obtieneRestriccion}    from '../../redux/actionCreator'

store.dispatch(obtieneRestriccion())


class Restriccion extends Component {
	render(){
		return(
			<RestriccionComponent restriccion={this.props.restriccion} lista={this.props.lista} restriccionesAgregadas={this.props.restriccionesAgregadas} />
		)
	}
}

 

const mapStateToProps = state=>{
  return{
    restriccion:state.restriccion
  }
}
 


export default connect(mapStateToProps)(Restriccion);