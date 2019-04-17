import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, Platform, AsyncStorage} from 'react-native'
import {style} 			 from './style'
import axios 			 from 'axios'
import Toast 			 from 'react-native-simple-toast';
import CabezeraComponent from '../ajustes/cabezera.js'
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
import GuiaInicio 	 	 from '../guia_inicio/guia_inicio'
import firebase from 'react-native-firebase';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {VERSION}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

 
export default class walletComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			filteredData:[],
			allList:[],
			billeteraAsignados:0
		}
	}
	async componentWillMount(){
		////////////////////////////////////////////// data info de analitycs ///////////////////////////////
		let userId = await AsyncStorage.getItem('userInfoId');
		let userNombre = await AsyncStorage.getItem('userNombre');
		let userDireccion = await AsyncStorage.getItem('userDireccion');
		firebase.analytics().setCurrentScreen("Billetera");
		firebase.analytics().setAnalyticsCollectionEnabled(true);
		firebase.analytics().logEvent("infoUser", {"username":userNombre,"userId":userId,"platform":Platform.OS, userDireccion, VERSION});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
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
				let billeteraAsignados = result==0 ?1 :2
				this.setState({allList:result, filteredData:result, billeteraAsignados})
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
						<Image source={{uri: e.imagen ?e.imagen[0] :'http://muneo.co/public/img/plan.jpg'}} style={style.imagen} />
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
		const {billeteraAsignados} = this.state
		return(	 
			<View style={style.contenedor}>
				{
					typeof this.state.guia_inicio!=='string'  &&<GuiaInicio number={17} guia_inicio={()=>this.setState({guia_inicio:'1'})} />
				}
				<CabezeraComponent navigate={navigate} url={'inicio'} texto='Mi billetera'  />
				{
					billeteraAsignados==1
					?<Image source={require('../assets/images/sinBilletera.png')} style={style.sinPlanes} />
					:billeteraAsignados==2
					?<ScrollView style={style.subContenedor}>
						{rows}	
					</ScrollView>
					:<View></View>
				}
				
				<FooterComponent navigate={this.props.navigation} />		
			</View> 
		)
	}
}