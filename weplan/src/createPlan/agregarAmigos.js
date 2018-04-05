import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {CreatePlanStyle} from '../createPlan/style'
import {HomeStyle} from '../home/style'
import Icon from 'react-native-fa-icons';
import Button from 'react-native-button';
import axios from 'axios'

export default class AgregarAmigosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			allList: [],
			filteredData:[],
		    buildArray:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/ami/amigoUser/true')
		.then((res)=>{
			let allList = res.data.mensaje[0].asignados.map((item)=>{
				return {
					id:item._id,
					username:item.username,
					photo: item.photo,
					nombre: item.nombre,
					estado: true
				}
			})
			this.setState({allList})
		})	
		.catch((err)=>{
			console.log(err)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.username.search(regex)> -1)	
		})
		if (event.length>0) {
			this.setState({filteredData:filtered})
		}else{
			this.setState({filteredData:[]})
		}	
	}
	getRow(filteredData){
		console.log(filteredData)
		if(filteredData.length>0){
			return filteredData.map((data, key)=>{
			return  <TouchableOpacity style={HomeStyle.subLista} key={key} onPress={(e)=>{this.updateState(data.id, data.estado); this.props.updateStateAsignados(data.estado, data.id)}} > 
						<Image source={{ uri: data.photo}}  style={data.estado ?HomeStyle.avatar :HomeStyle.avatar2} /> 
						<Text style={HomeStyle.textoAvatar}>{data.nombre}</Text>
						{!data.estado ?<Image source={require('../home/agregado.png')} style={HomeStyle.agregado}/> :null} 
				    </TouchableOpacity>
				})
		}else{
			return <Text>No tienes amigos asignados</Text>
		}
		
	}
	updateState(id, estado){
		let filteredData = this.state.filteredData.map(item=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
	}
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		return(
			<View>
				<View style={CreatePlanStyle.titulo}>
					<Button onPress={() => this.props.closeModal()} style={CreatePlanStyle.btnModal}> &#60; </Button>
	          		<Text style={CreatePlanStyle.text}>Agregar amigos</Text>
	          	</View>	
          			<TextInput
          				style={CreatePlanStyle.input}
				        onChangeText={this.filteredData.bind(this)}
				        value={this.state.username}
				        underlineColorAndroid='transparent'
	           			placeholder="Agregarar Amigos"
	           			placeholderTextColor="#8F9093" 
				    />
				<View>
					 {rows}
				</View>	   
			</View>
		)
	}

}