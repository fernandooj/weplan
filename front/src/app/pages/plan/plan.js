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
        handleSubmit={(values, restriccion, categoria, ubicacion,x)=>this.props.handleSubmit(values, restriccion, categoria, ubicacion,x)} 
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
    handleSubmit(values, restriccion, categoria, ubicacion, x){
      values['tipo'] = 'pago'
      values['restricciones'] = restriccion
      values['categorias']    = categoria
      values['lat']           = x.latitude
      values['lng']           = x.longitude
      values['lugar']         = ubicacion
      //console.log({values, restriccion, categoria, ubicacion,x})
      store.dispatch(crearPlan(values))
    },
    insertaImagenes(fileList, id){
      let imagen = []
      imagen = fileList
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