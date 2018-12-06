import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Keyboard, Platform} from 'react-native'
import {MisPlanesStyle} from './style'
import axios from 'axios'
import Toast 			 		  from 'react-native-simple-toast';
import moment 					  from 'moment' 
import FooterComponent 	      from '../cabezeraFooter/footerComponent'
import UltimaVersionComponent from '../ultimaVersion/ultimaVersion'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 
const TRACKER = new GoogleAnalyticsTracker("UA-129344133-1");
TRACKER.trackScreenView("misPlanes");
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
		if (Platform.OS==='android') {
			////////////////////////////////////////////////////////////////// OBTENGO LA ULTIMA VERSION DE LA APP, SI NO ESTA ACTUALIZADA LE MUESTRO UN MENSAJE
			axios.get('/x/v1/currentversion/android')
			.then(e=>{
				if (e.data.version!=="1.0.5") {
					this.setState({mensaje:e.data.mensaje, showVersion:true})
				}
			})
		}else{
			axios.get('/x/v1/currentversion/ios')
			.then(e=>{
				if (e.data.version!=="1.0.5") {
					this.setState({mensaje:e.data.mensaje, showVersion:true})
				}
			})
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		axios.get('/x/v1/pla/plan/suma/totales/miplan')
		.then(res=>{
			console.log(res.data)
			if (res.data.code===2) {
				this.props.navigation.navigate('Login')
				Toast.show('No éstas logueado')
			}else{
				// let usuarioAsignado = res.data.result.filter(e=>{
				// 	if (e.userItemId==res.data.id || e.asignados ?e.asignados.includes(res.data.id) :true) return e
				// })
				// console.log(usuarioAsignado)
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				///////////////////////  ESTE CODIGO LO HIZE POR QUE AL CREAR MAS DE UN ITEM SE DUPLICA EL PLAN, ASI QUE UNO LOS ITEM Y SUMO LOS TOTALES	
				let map = res.data.result.reduce((prev, next) =>{
				  if (next.id in prev) {
				    prev[next.id].total += next.total;
				  } else {
				     prev[next.id] = next;
				  }
				  return prev;
				}, {});
				let result = Object.keys(map).map(id => map[id]);

				let filteredData = result
				let planesAsignados = result==0 ?1 :2
				console.log(filteredData)
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
						<Text style={[MisPlanesStyle.fechaLugar, MisPlanesStyle.familia]}>{e.fecha.length==13 ?moment(JSON.parse(e.fecha)).format("YYYY-MM-DD h:mm a") :e.fecha}</Text>
						<View style={e.total>0 ?MisPlanesStyle.debe :e.total===0 ?MisPlanesStyle.deudaCero :[MisPlanesStyle.debe, MisPlanesStyle.noDebe]}></View>
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
		const { planesAsignados, mensaje, showVersion} = this.state
		return(	 
			<View style={MisPlanesStyle.contenedor}>
			{
				showVersion
				&&<UltimaVersionComponent mensaje={mensaje} />
			}
				
				{
					this.cabezera()
				}
				{
					planesAsignados==1
					?<Image source={require('../assets/images/sinPlanes.png')} style={MisPlanesStyle.sinPlanes} />
					:planesAsignados==2
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