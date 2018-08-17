import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {planes} from '../planesPublicos/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'

 
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class planesPublicosComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[]
		}
	}
	componentWillMount(){
		axios.get('/x/v1/pla/plan/planespublicos/innactivos')
		.then(e=>{
			console.log(e.data)
			this.setState({allList:e.data.planes, filteredData:e.data.planes})
		})
		.catch(res=>{
			console.log(res)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.data[0].info[5].search(regex)> -1)	
		})
		if (event.length>0) {
			this.setState({filteredData:filtered})
		}else{
			this.setState({filteredData:this.state.allList})
		}	
	}
	 
	getRow(filteredData){
		const {navigate} = this.props.navigation
		if(filteredData.length>0){
			return filteredData.map((e, key)=>{
			return  <TouchableOpacity onPress={()=>navigate('detallePlanPublico', e.id)} key={key}>
					<View style={planes.item}>
						<Image source={{uri: e.imagen[0]}} style={planes.imagen} />
						<View style={planes.boxPlan1} >
							<Text style={planes.nombre}>{e.nombre.length<30 ?e.nombre :e.nombre.substring(0, 30)+' ...'}</Text>
							 
							 <View style={planes.item}>	
								<Text style={planes.textoTotal}>Has Invertido</Text>
								 
							</View> 
							<Text style={planes.pagoDeudaMontoActive}>
								{'$ '+Number(Math.abs(e.saldo)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>	
							 
						</View>
						<Image source={require('../images/back.png')} style={planes.back} />
					</View>
					<View  style={planes.separador}></View>
				</TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
	cabezera(){
		const {navigate} = this.props.navigation
		return(
			<View style={planes.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('inicio')} style={planes.btnClose} >
					<Image source={require('../images/back.png')} style={planes.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={planes.input}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../images/search.png')} style={planes.btnBuscar} />
			</View>
		)
	}
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={planes.contenedor}>
				 
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Planes Publicos'  />
				<ScrollView style={planes.subContenedor}>
					{rows}	
				</ScrollView>
				<FooterComponent navigate={navigate} />		
			</View> 
		)
	}
}