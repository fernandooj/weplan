import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, ScrollView} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import Icon from 'react-native-fa-icons';
import axios from 'axios'

export default class RestriccionesPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
		    restriccionArray:[],
		    restriccion:[],
		    modalVisible:true
		}
	}
	componentWillMount(){
		axios.get('x/v1/res/restriccion')
	 	.then(e=>{
	 		let restriccion = e.data.restriccion.map(e=>{
	 			return {
	 				id:e._id,
	 				icon:e.ruta,
	 				nombre:e.nombre
	 			}
	 		})
	 		this.setState({restriccion})
	 	})
	 	.catch(err=>{
	 		console.log(e.err)
	 	})
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////  GENERO EL ARRAY DE LAS RESTRICCIONES //////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateRestriccion(id){
		if (id) {
			this.setState({restriccionArray: this.state.restriccionArray.concat([id])})
		}else{
			this.setState({restriccionArray:this.state.restriccionArray.filter(function(val){return val.id != id}) })
		}
	}

	renderRestricciones(){
		return this.state.restriccion.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={CreatePlanStyle.touchRes} 
					onPress={(index)=> {this.updateState(e.id, e.estado); this.updateStateRestriccion(e.id)} }>
					<Image source={{ uri: e.icon}} style={CreatePlanStyle.iconRes}/>
					<Icon name='ban' allowFontScaling style={[CreatePlanStyle.banRes, e.estado ?CreatePlanStyle.banResActive :CreatePlanStyle.banResInactive]} />
					<Text style={CreatePlanStyle.textoRes}>{e.nombre}</Text>
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
							<Image source={require('./denied.png')} style={CreatePlanStyle.iconRes} />
							<Text style={CreatePlanStyle.textoRes}>Restricciones</Text>
						</View>	
						{this.renderRestricciones()}
						<TouchableOpacity onPress={() => { this.props.restriccion(this.state.restriccionArray)} } 
						style={CreatePlanStyle.btnHecho}><Text style={CreatePlanStyle.textoHecho}>Hecho !</Text></TouchableOpacity>
					</View>
				</ScrollView>	
			</Modal>
		)
	}
	updateState(id, estado){
		let restriccion = this.state.restriccion.map((item, key)=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({restriccion})
	}
}