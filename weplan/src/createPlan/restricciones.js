import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import Icon from 'react-native-fa-icons';
import {URL}  from '../../App.js';

export default class RestriccionesPlanComponent extends Component{
	constructor(props){
		super(props);
		this.state={
		    restricciones:[
		    	{nombre:'No Fotos', 	   icon:URL+'img/foto.png', 		estado:false},
		    	{nombre:'Sin Parqueadero', icon:URL+'img/parqueadero.png', estado:false},
		    	{nombre:'Sin Mascotas',    icon:URL+'img/mascota.png', 	estado:false},
		    ],
		    buildArray:[]
		}
	}
	renderRestricciones(){
		return this.state.restricciones.map((e, key)=>{
			return(
				<TouchableOpacity key={key} style={CreatePlanStyle.touchRes} 
					onPress={(index)=> {this.updateState(key, e.estado); this.props.updateStateRestriccion(e.estado, e.nombre)} }>
					<Image source={{ uri: e.icon}} style={CreatePlanStyle.iconRes}/>
					<Icon name='ban' allowFontScaling style={[CreatePlanStyle.banRes, e.estado ?CreatePlanStyle.banResActive :CreatePlanStyle.banResInactive]} />
					<Text style={CreatePlanStyle.textoRes}>{e.nombre}</Text>
				</TouchableOpacity>
			)
		})
	}
	render(){
		return(
			<View  style={CreatePlanStyle.contenedorRes}>
				<View style={CreatePlanStyle.touchRes}>				 
					<Image source={require('./denied.png')} style={CreatePlanStyle.iconRes} />
					<Text style={CreatePlanStyle.textoRes}>Restricciones</Text>
				</View>	
				{this.renderRestricciones()}
				<TouchableOpacity onPress={() => {this.props.closeModal()}} style={CreatePlanStyle.btnHecho}><Text style={CreatePlanStyle.textoHecho}>Hecho !</Text></TouchableOpacity>
			</View>
		)
	}
	updateState(id, estado){
		let restricciones = this.state.restricciones.map((item, key)=>{
			if(key == id) item.estado = !estado
			return item
		})
		this.setState({restricciones})
	}
}