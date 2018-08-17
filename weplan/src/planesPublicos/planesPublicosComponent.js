import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {style} from '../planesPublicos/style'
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
					<View style={style.item}>
						<Image source={{uri: e.imagen[0]}} style={style.imagen} />
						<View style={style.boxPlan1} >
							<Text style={[style.nombre, style.familia]}>{e.nombre.length<30 ?e.nombre :e.nombre.substring(0, 30)+' ...'}</Text>
							 
							 <View style={style.item}>	
								<Text style={[style.textoTotal, style.familia]}>Has Invertido</Text>
								 
							</View> 
							<Text style={[style.pagoDeudaMontoActive, style.familia]}>
								{'$ '+Number(Math.abs(e.saldo)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Text>	
							 
						</View>
						<Image source={require('../assets/images/back.png')} style={style.back} />
					</View>
					<View  style={style.separador}></View>
				</TouchableOpacity>
				})
		}else{
			return <Text> </Text>
		}
	}
	cabezera(){
		const {navigate} = this.props.navigation
		return(
			<View style={style.contenedorCabezera}> 
				<TouchableOpacity onPress={()=>navigate('inicio')} style={style.btnClose} >
					<Image source={require('../assets/images/back.png')} style={style.imagenClose} />
				</TouchableOpacity>
				<TextInput
      				style={style.input}
			        onChangeText={this.filteredData.bind(this)}
			        value={this.state.username}
			        underlineColorAndroid='transparent'
           			placeholder="Buscar"
           			placeholderTextColor="#8F9093" 
			    />
			    <Image source={require('../assets/images/search.png')} style={style.btnBuscar} />
			</View>
		)
	}
 
	render(){
		const filteredData = this.state.filteredData
		const rows = this.getRow(filteredData)
		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				 
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Planes Publicos'  />
				<ScrollView style={style.subContenedor}>
					{rows}	
				</ScrollView>
				<FooterComponent navigate={navigate} />		
			</View> 
		)
	}
}