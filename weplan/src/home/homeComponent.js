import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView} from 'react-native'
import {HomeStyle} from '../home/style'
import axios from 'axios'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';


export default class homeComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			isOpen: false,
			isDisabled: false,
			swipeToClose: true,
			sliderValue: 0.3,
			allList: [],
			filteredData:[],
			buildArray: [],
			planes:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/clientes')
		.then(e=>{
			this.setState({planes:e.data.message})
		})
		.catch(err=>{
			console.log(err)
		})

		axios.get('/x/v1/users/activos')
		.then((res)=>{
			let allList = res.data.usuarios.map((item)=>{
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
		return filteredData.map((data, key)=>{
			return  <TouchableOpacity style={HomeStyle.subLista} key={key} onPress={(e)=>this.updateState(data.id, data.estado)} > 
						<Image source={{ uri: data.photo}}  style={data.estado ?HomeStyle.avatar :HomeStyle.avatar2} /> 
						<Text style={HomeStyle.textoAvatar}>{data.nombre}</Text>
						{!data.estado ?<Image source={require('./agregado.png')} style={HomeStyle.agregado}/> :null} 
				    </TouchableOpacity>
		})
	}
	updateState(id, estado){
		let filteredData = this.state.filteredData.map(item=>{
			if(item.id == id) item.estado = !estado
			return item
		})
		this.setState({filteredData})
		console.log({id, estado})

		if (estado) {
			this.setState({buildArray: this.state.buildArray.concat([id])})
		}else{
			this.setState({buildArray:this.state.buildArray.filter(function(val){return val != id}) })
		}
	}
	renderPlans(){
		return this.state.planes.map((e, key)=>{
			return(
				<ImageBackground source={{uri : e.imagen}} style={HomeStyle.fondo} key={key}>
					<View style={HomeStyle.footer}>
						<View style={HomeStyle.footer1}>
							<Text style={HomeStyle.textFooter1}>{e.nombre}</Text>
							<Image source={require('./icon4.png')} style={HomeStyle.iconHead} />
						</View>
						<Text style={HomeStyle.textFooter2}>{e.descripcion}</Text>
						<View style={HomeStyle.footer2}>
							<Image source={require('./icon5.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon6.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon7.png')} style={HomeStyle.iconFooter} />
							<Image source={require('./icon8.png')} style={HomeStyle.iconFooter1} />
							<Text style={HomeStyle.textFooter3}>10 likes</Text>
						</View>
						
					</View> 
				</ImageBackground>
			)			
		})
	}
	render(){
		const {navigate} = this.props.navigation
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		console.log(this.state.planes)
		return(	 
			<View style={HomeStyle.contenedor}>
				<View style={HomeStyle.cabezera}>
					<TouchableOpacity onPress={() => this.refs.modal2.open()}>
						<Image source={require('./icon1.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=> navigate('misPlanes')} >
						<Image source={require('./icon2.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.closeSession.bind(this)} >
						<Image source={require('./icon3.png')} style={HomeStyle.iconHead} />
					</TouchableOpacity>
				</View>
				<ScrollView style={HomeStyle.contenedorPlan}>
				{
					this.renderPlans()
				}
				</ScrollView>
				{/*<View style={HomeStyle.footer3} >
					<TouchableOpacity onPress={()=> navigate('createPlan')} >
						<Image source={require('./icon9.png')} style={HomeStyle.iconFooter2} />
					</TouchableOpacity>
				</View>/*}
				{/* modal to add friends */}
				<Modal style={HomeStyle.modal} backdrop={true}  position={"top"} ref={"modal2"}>
					<View style={HomeStyle.titulo}>
						<Button onPress={() => this.refs.modal2.close()} style={HomeStyle.btnModal}> &#60; </Button>
		          		<Text style={HomeStyle.text}>Agregar amigos</Text>
		          	</View>	
	          			<TextInput
	          				style={HomeStyle.input}
					        onChangeText={this.filteredData.bind(this)}
					        value={this.state.username}
					        underlineColorAndroid='transparent'
		           			placeholder="buscar amigos"
		           			placeholderTextColor="#8F9093" 
					    />
					<View style={HomeStyle.lista}>
						 {rows}
					</View>	   
					<Button onPress={this.handleSubmit.bind(this)}>Guardar</Button>
        		</Modal>
		   </View>
		)
	}


	handleSubmit(){
		const {buildArray} = this.state
		console.log({asignados: buildArray})
		axios.post('/x/v1/ami/amigoUser', {asignados: buildArray} )
		.then((e)=>{
			console.log(e.data)
			if (e.data.code==1) {
				this.refs.modal2.close()
			}else{
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	closeSession(){
		const {navigate} = this.props.navigation
		axios.get('/x/v1/logout/')
		.then((res)=>{
			console.log(res.data)
			if(res.data.code==1){
				navigate('Login')
			}else if (res.data.code==1){
				alert('error intenta nuevamente')
			}
		})
		.catch((err)=>{
			console.log(err)
		})
		
	}
}