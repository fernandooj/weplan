import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native'
 
import {AmigosStyle} from '../agregarAmigos/style'
import Icon from 'react-native-fa-icons';
import Button from 'react-native-button';
import axios from 'axios'

export default class AgregarAmigosComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			allList: [],
			filteredData:[],
		    buildArray:[],
		    asignados:[],
		    asignadosEmpty:[],
		    modalVisible:true
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
		if(filteredData.length>0){
			return filteredData.map((data, key)=>{
			return  <TouchableOpacity style={AmigosStyle.subLista} key={key} onPress={(e)=>{this.updateState(data.id, data.estado); this.updateStateAsignados(data.estado, data.id)}} > 
						<Image source={{ uri: data.photo}}  style={data.estado ?AmigosStyle.avatar :AmigosStyle.avatar2} /> 
						<Text style={AmigosStyle.textoAvatar}>{data.nombre}</Text>
						{!data.estado ?<Image source={require('../home/agregado.png')} style={AmigosStyle.agregado}/> :null} 
				    </TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
	updateState(id, estado){
		let filteredData = this.state.filteredData.map(item=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
	}
	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////  GENERO EL ARRAY DE LOS ASIGNADOS ///////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateStateAsignados(estado, id){
		if (!estado) {
		  this.setState({asignados: this.state.asignados.concat([id])})
		}else{
		  this.setState({asignados:this.state.asignados.filter(function(val){return val != id}) })
		}
	}

	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		return(
			<View style={AmigosStyle.contenedor}>
				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            console.log('Modal has been closed.');
		        }}>
				<View style={AmigosStyle.titulo}>
					<TouchableOpacity onPress={(e)=>{this.props.close(this.state.asignadosEmpty)}}  style={AmigosStyle.btnClose} >
						<Image source={require('./back.png')} style={AmigosStyle.imagenClose} />
					</TouchableOpacity>
					<Image source={require('./friends.png')} style={AmigosStyle.imagenTitulo}/>
	          		<Text style={AmigosStyle.text}>{this.props.titulo}</Text>
	          	</View>	

	  			<View style={AmigosStyle.contenedor}><View style={AmigosStyle.separador}></View>
          			<TextInput
          				style={AmigosStyle.input}
				        onChangeText={this.filteredData.bind(this)}
				        value={this.state.username}
				        underlineColorAndroid='transparent'
	           			placeholder="Buscar"
	           			placeholderTextColor="#8F9093" 
				    />
				    <Image source={require('./search.png')} style={AmigosStyle.btnBuscar} />
 				</View>
				<View style={AmigosStyle.contenedorAmigos}>
					 {rows}					
				</View>	

			{/* Btn Hecho */}
			{
				this.state.asignados.length>0
				?<View style={AmigosStyle.containerHecho}>
					<TouchableOpacity style={AmigosStyle.btnHecho} onPress={(e)=>{this.props.close(this.state.asignados)}} > 
						<Text style={AmigosStyle.hecho}>Hecho!</Text>
					</TouchableOpacity> 
				</View>	
				:null
			}
				
				</Modal>   
			</View>
		)
	}

}