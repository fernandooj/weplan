import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Keyboard} from 'react-native'
import {MisPlanesStyle} from './style'
import axios from 'axios'
import Toast 			 		  from 'react-native-simple-toast';
 
import FooterComponent 	 from '../cabezeraFooter/footerComponent'

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class MisPlanesComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			planesAsignados:0,
			allList:[]
		}
	}
	componentWillMount(){
		Keyboard.dismiss()
		axios.get('/x/v1/pla/plan/suma/totales/miplan')
		.then(res=>{
			if (res.data.code===2) {
				this.props.navigation.navigate('Login')
				Toast.show('No éstas logueado')
			}else{
				let filteredData = res.data.result
				let planesAsignados = res.data.result==0 ?1 :2
				this.setState({allList:filteredData, filteredData, planesAsignados})
			}
		})
		.catch(res=>{
			console.log(res)
		})
	}
	filteredData(event){
		const regex = new RegExp(event, 'i');
		const filtered = this.state.allList.filter(function(e){
			return (e.nombrePlan.search(regex)> -1)	
		})
		if (event.length>0) {
			this.setState({filteredData:filtered})
		}else{
			this.setState({filteredData:this.state.allList})
		}	
	}
	getRow(filteredData){
		if(filteredData.length>0){
			return filteredData.map((e, key)=>{
			return  <TouchableOpacity onPress={()=>this.handleSubmit(e.id)} key={key} style={MisPlanesStyle.boxPlan}>
					<Image source={{uri: e.imagen ?e.imagen[0] :URL+'public/img/plan.jpg'}} style={MisPlanesStyle.background} />
					<Text style={[MisPlanesStyle.nombre, MisPlanesStyle.familia]}>{e.nombrePlan.length<27 ?e.nombrePlan :e.nombrePlan.substring(0, 27)+' ...'}</Text>
					<View style={MisPlanesStyle.boxPlan1} >
						<Text style={[MisPlanesStyle.fechaLugar, MisPlanesStyle.familia]}>{e.fecha}</Text>
						<View style={e.total>=0 ?MisPlanesStyle.debe :[MisPlanesStyle.debe, MisPlanesStyle.noDebe]}></View>
					</View>
				</TouchableOpacity>
				})
		}else{
			return <View style={MisPlanesStyle.sinPlanes}><Text>No hemos encontrado planes</Text></View>
		}
	}
	cabezera(){
		const {navigate} = this.props.navigation
		return(
			<View style={MisPlanesStyle.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('inicio')} style={MisPlanesStyle.btnClose} >
					<Image source={require('../assets/images/back.png')} style={MisPlanesStyle.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={[MisPlanesStyle.input, MisPlanesStyle.familia]}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../assets/images/search.png')} style={MisPlanesStyle.btnBuscar} />
			</View>
		)
	}
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={MisPlanesStyle.contenedor}>
				{
					this.cabezera()
				}
				{
					this.state.planesAsignados==1
					?<Image source={require('../assets/images/sinPlanes.png')} style={MisPlanesStyle.sinPlanes} />
					:this.state.planesAsignados==2
					?<ScrollView showsVerticalScrollIndicator={false}>
						<View style={MisPlanesStyle.container}>
						{rows}
						</View>	
					</ScrollView>
					:<View></View>
				}
				<View style={MisPlanesStyle.footer}>
					<FooterComponent navigate={this.props.navigation} />	
				</View>
			</View> 
		)
	}
	handleSubmit(planId){
		const {navigate} = this.props.navigation
		let id = planId
		navigate('chat', id)
	}
}