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
			<RestriccionComponent restriccion={this.props.restriccion} lista={this.props.lista} />
		)
	}
}

 

const mapStateToProps = state=>{
  return{
    restriccion:state.restriccion
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(e, validateFields){
      e.preventDefault()
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          store.dispatch(login(values))
        }
      });
      
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Restriccion);