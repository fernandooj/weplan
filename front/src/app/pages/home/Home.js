import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {agregar}    from '../../redux/actionCreator'
import {connect}      from 'react-redux'
import HomeComponent  from './homeComponent'
import {login}      from '../../redux/actionCreator'

class Home extends Component {
	render(){
		return(
			<HomeComponent handleSubmit={(e, validateFields)=>this.props.handleSubmit(e, validateFields)} planes={this.props.planes} />
		)
	}
}



const mapStateToProps = state=>{
  return{
    usuario:state.usuario,
    planes:state.todosPlanes
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
Home.defaultProps={
  planes:[]
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);