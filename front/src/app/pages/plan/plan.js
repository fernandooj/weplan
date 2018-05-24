import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {connect}      from 'react-redux'
import PlanComponent  from './planComponent'
import {obtienePlan, crearPlan, insertaImagenPlan, obtieneUnPlan}
                      from '../../redux/actionCreator'

store.dispatch(obtienePlan())
 
class Plan extends Component {

	render(){
		return(
			<PlanComponent 
        planes={this.props.planes}
        planId={this.props.planCreado}
        handleSubmit={(values, restriccion)=>this.props.handleSubmit(values, restriccion)} 
        insertaImagenes={(fileList)=>this.props.insertaImagenes(fileList, this.props.planCreado._id)}
      />
		)
	}
}



const mapStateToProps = state=>{
  return{
    planes:state.planes,
    planCreado:state.planCreado
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(values, restriccion){
      values['restricciones'] = restriccion
      values['tipo'] = 'pago'
      store.dispatch(crearPlan(values))
    },
    insertaImagenes(fileList, id){
      let imagen = []
      imagen = fileList
      console.log(fileList.fileList)
      const formData = new FormData();
      fileList.fileList.forEach((file) => {
        formData.append('imagen[]', file);
        formData.append('id', id);
       
      });
       store.dispatch(insertaImagenPlan(formData))
       store.dispatch(obtieneUnPlan(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Plan);