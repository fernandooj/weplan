import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import PlanComponent  from './planComponent'
import {obtienePlan}      from '../../redux/actionCreator'

store.dispatch(obtienePlan())

class Plan extends Component {
	render(){
		return(
			<PlanComponent planes={this.props.planes} />
		)
	}
}



const mapStateToProps = state=>{
  return{
    planes:state.planes
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


export default connect(mapStateToProps, mapDispatchToProps)(Plan);