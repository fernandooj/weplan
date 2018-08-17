import React, {Component} from 'react'
import {View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput} from 'react-native'
import {style} from '../facturacion/style'
import axios from 'axios'
import CabezeraComponent from '../ajustes/cabezera.js'
 
 
import FooterComponent 	 from '../cabezeraFooter/footerComponent'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  ARCHIVOS GENERADOS POR EL EQUIPO  //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
import {URL}  from '../../App.js';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 

export default class facturacionComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			pagos:[]
		}
	}
 
 
 	componentWillMount(){
		axios.get('/x/v1/pag/pagopublico/listbyuser')
		.then(e=>{
			console.log(e.data)
			this.setState({pagos:e.data.pagos})
		})
		.catch(res=>{
			console.log(res)
		})
	}

	renderPagos(){
		return this.state.pagos.map((e, key)=>{
			return(
				<View key={key}>
					<Text style={style.familia}>Metodo: {e.metodo}</Text>
					<Text style={style.familia}>Referencia: {e.referencia}</Text>
					<Text style={style.familia}>Monto: {'$ '+Number(Math.abs(e.monto)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Text>
					<Text style={style.familia}>Fecha: {e.createdAt}</Text>
					<Text style={style.separador}></Text>
				</View>
			)
		})
	}
	 
	 
 
	render(){
		 
		const {navigate} = this.props.navigation
		return(	 
			<View style={style.contenedor}>
				<CabezeraComponent navigate={navigate} url={'ajustes'} texto='Facturacion'  />
				<ScrollView style={style.subContenedor}>
					<Text style={[style.titulo, style.familia]}>Realizar Pago</Text>
					<View style={style.contenedorImagenes}>
						<Image source={{uri:'http://www.lebrija-santander.gov.co/Ciudadanos/PublishingImages/Paginas/Pagos-en-Linea/logo-pse.PNG'}} style={style.imagen}/>
						<Image source={{uri:'http://tintalplaza.com/wp-content/uploads/2016/05/AV-villas.jpg'}} style={style.imagen}/>
					</View>
					<Text style={style.separador}></Text>
					<Text style={[style.titulo, style.familia]}>Pagos Realizados</Text>
					{this.renderPagos()}
				</ScrollView>
				<FooterComponent navigate={navigate} />		
			</View> 
		)
	}
 
}