import {connect}      from 'react-redux'
import React     from 'react'
import Dashboard from './dashboardComponent.js'

const dashboardContain =()=>{
	return(
		<Dashboard />
	)
}

const mapStateToProps = (state) =>{
	return{
		dashboard:state.dashboard
	}
}

export default connect(mapStateToProps)(dashboardContain)