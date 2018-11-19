import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, AsyncStorage} from 'react-native'
import {style} 			 from './style'
import axios 			 from 'axios'
import Toast 			 from 'react-native-simple-toast';
import CabezeraComponent from '../ajustes/cabezera.js'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'
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
TRACKER.trackScreenView("wallet");
export default class walletComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[]
		}
	}
	async componentWillMount(){
		let guia_inicio   = await AsyncStorage.getItem('wallet');
		this.setState({guia_inicio})
		axios.get('/x/v1/pla/plan/suma/totales/plan')
		.then(res=>{
			console.log(res.data)
			if (res.data.code===2) {
				this.props.navigation.navigate('Login')
				Toast.show('No éstas logueado')
			}else{
				let usuarioAsignado = res.data.result.filter(e=>{
					if (e.userItemId==res.data.id || e.asignados.includes(res.data.id)) return e
				})
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				///////////////////////  ESTE CODIGO LO HIZE POR QUE AL CREAR MAS DE UN ITEM SE DUPLICA EL PLAN, ASI QUE UNO LOS ITEM Y SUMO LOS TOTALES	
				let map = usuarioAsignado.reduce((prev, next) =>{
				  if (next.id in prev) {
				    prev[next.id].total += next.total;
				  } else {
				     prev[next.id] = next;
				  }
				  return prev;
				}, {});
				let result = Object.keys(map).map(id => map[id]);
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				this.setState({allList:result, filteredData:result})
			}
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
			return  <TouchableOpacity onPress={()=>navigate('costoPlan', e.id )} key={key}>
					<View style={style.item}>
						<Image source={{uri: e.imagen ?e.imagen[0] :'https://appweplan.com/public/img/plan.jpg'}} style={style.imagen} />
						<View style={style.boxPlan1} >
							<Text style={[style.nombre, style.familia]}>{e.nombrePlan ?e.nombrePlan.length<30 ?e.nombrePlan :e.nombrePlan.substring(0, 30)+' ...' :''}</Text>
							<Text style={[style.fechaLugar, style.familia]}>By {e.nombreUsuario} </Text>
							<View style={style.item}>	
								<Text style={[style.textoTotal, style.familia]}>Total</Text>
								<Text style={e.total>=0 ?[style.pagoDeudaMontoActive, style.familia] :[style.pagoDeudaMonto, style.familia]}>
									{'$ '+Number(e.total>=0 ?e.total :Math.abs(e.total)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
								</Text>
								 
							</View>	
						</View>
						<Image source={require('../assets/images/back.png')} style={style.verDetalleBtn} />
					</View>
					<View  style={style.separador}></View>
				</TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
 
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				{
					typeof this.state.guia_inicio!=='string'  &&<GuiaInicio number={17} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Mi billetera'  />
				<ScrollView style={style.subContenedor}>
					{rows}	
				</ScrollView>
				<FooterComponent navigate={this.props.navigation} />		
			</View> 
		)
	}
}