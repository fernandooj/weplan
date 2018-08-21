import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, ScrollView} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import axios from 'axios'

export default class RestriccionesPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
		    restriccionArray:[],
		    restriccion:[],
		    restriccionesAsignadas:[],
		    modalVisible:true
		}
	}
	componentWillMount(){
 
 		if (this.props.misRestricciones.length>1 ) {
			this.setState({restriccion:this.props.misRestricciones, restriccionArray:this.props.restricciones, restriccionesAsignadas:this.props.restriccionesAsignadas})
		}
		if (this.props.misRestricciones.length === 0) {
			axios.get('x/v1/res/restriccion')
		 	.then(e=>{
		 		let restriccion = e.data.restriccion.map(e=>{
		 			return {
		 				_id:e._id,
		 				ruta:e.ruta,
		 				nombre:e.nombre
		 			}
		 		})
		 		this.setState({restriccion})
		 	})
		 	.catch(err=>{
		 		console.log(e.err)
		 	})
		 } 
	}
	 
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  GENERO EL ARRAY DE LAS RESTRICCIONESAsignadas //////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateRestriccion(_id, estado){
		if (estado) {
			this.setState({restriccionArray: this.state.restriccionArray.concat([_id])})
		}else{
			this.setState({restriccionArray:this.state.restriccionArray.filter(function(val){return val != _id}) })
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////      GENERO UN ARRAY CON LOS rutaOS Y LOS NOMBRES DE LOS ASIGNADOS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateRestriccion(_id, ruta, nombre, estado){
		
		if (estado) {
		  this.setState({restriccionesAsignadas: this.state.restriccionesAsignadas.concat({_id,ruta,nombre})})
		}else{
		  this.setState({restriccionesAsignadas:this.state.restriccionesAsignadas.filter(function(val){return val._id != _id}) })
		}
	}

	renderRestricciones(){
		return this.state.restriccion.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={CreatePlanStyle.touchRes} 
					onPress={(index)=> {this.updateState(e._id, e.estado); this.updateRestriccion(e._id, e.ruta, e.nombre, e.estado); this.updateStateRestriccion(e._id, e.estado)} }>
					<Image source={{ uri: e.ruta}} style={CreatePlanStyle.iconRes}/>
					{
						e.estado
						?<Image source={require('../assets/images/deneid1.png')} style={CreatePlanStyle.banRes} />
						:<Image source={require('../assets/images/deneid2.png')} style={CreatePlanStyle.banRes} />
					}
					<Text style={[CreatePlanStyle.textoRes, CreatePlanStyle.familia]}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		return(
			<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            console.log('Modal has been closed.');
	        }}>
		        <ScrollView>
					<View  style={CreatePlanStyle.contenedorRes}>
						<View style={CreatePlanStyle.touchRes}>				 
							<Image source={require('../assets/images/denied.png')} style={CreatePlanStyle.rutaRes} />
							<Text style={[CreatePlanStyle.textoRes, CreatePlanStyle.familia]}>Restricciones</Text>
						</View>	
						{this.renderRestricciones()}
						<TouchableOpacity onPress={() => { this.props.restriccion(this.state.restriccionArray, this.state.restriccionesAsignadas, this.state.restriccion)} } 
						style={CreatePlanStyle.btnHecho}><Text style={[CreatePlanStyle.hecho, CreatePlanStyle.familia]}>Hecho!</Text></TouchableOpacity>
					</View>
				</ScrollView>	
			</Modal>
		)
	}
	updateState(_id, estado){
		let restriccion = this.state.restriccion.map((item, key)=>{
			if(item._id == _id) item.estado = !estado
			return item
		})
		this.setState({restriccion})
	}
}