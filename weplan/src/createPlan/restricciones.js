import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, ScrollView} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import axios from 'axios'

export default class RestriccionesPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
		    arrayRestricciones:[],
		    restriccion:[],
		    restriccionesAsignadas:[],
		    modalVisible:true
		}
	}
	componentWillMount(){
		const {arrayRestricciones, restriccionesAsignadas} = this.props
 		if (restriccionesAsignadas.length>0 ) {
 			axios.get('x/v1/res/restriccion')
		 	.then(res=>{
		 		let n = res.data.restriccion.filter(e=>{
	 				return restriccionesAsignadas.filter(e2=>{
	 					if (e._id==e2._id) e.estado = true
	 						return e
	 				})
	 			})
		 		 
	 			this.setState({restriccion:n, arrayRestricciones:arrayRestricciones, restriccionesAsignadas:restriccionesAsignadas})
		 	})
			
		}
		if (this.props.restriccionesAsignadas.length === 0) {
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
			this.setState({arrayRestricciones: this.state.arrayRestricciones.concat([_id])})
		}else{
			this.setState({arrayRestricciones:this.state.arrayRestricciones.filter(function(val){return val != _id}) })
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////      GENERO UN ARRAY CON LOS rutaOS Y LOS NOMBRES DE LOS ASIGNADOS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateRestriccion(_id, estado, data){
		if (estado) {
		  this.setState({restriccionesAsignadas: this.state.restriccionesAsignadas.concat(data)})
		}else{
		  this.setState({restriccionesAsignadas:this.state.restriccionesAsignadas.filter(function(val){return val._id != _id}) })
		}
	}

	renderRestricciones(){
		return this.state.restriccion.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={CreatePlanStyle.touchRes} 
					onPress={this.props.noEdit ?(index)=> {this.updateState(e._id, e.estado); this.updateRestriccion(e._id, e.estado, e); this.updateStateRestriccion(e._id, e.estado)} :null}>
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
						<TouchableOpacity onPress={() => { this.props.restriccion(this.state.arrayRestricciones, this.state.restriccionesAsignadas)} } 
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