 import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native'
import {ItemStyle} from '../item/style'
import Accordion from 'react-native-accordion-xg';
import axios from 'axios'
import 	CrearItemComponent from './crearItemComponent'
 




export default class ItemComponent extends Component{
	state={
		show:false,
		misItems:[]
	}
	componentWillMount(){
		axios.get('/x/v1/ite/item/user')
		.then(e=>{
			console.log(e.data)
			//this.setState({tabs:{description:{misItems:e.data.mensaje}}})
			this.setState({misItems:e.data.mensaje})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	renderHeader(info) {
		return (
		  <View style={ItemStyle.header}>
		    <Text style={ItemStyle.headerText}>{info}</Text>
		  </View>
		);
	}

	renderContent(info) {
			return info.map((e, key)=>{
				return (
				  <View style={ItemStyle.content} key={key}>
				    <Text style={ItemStyle.contentText}>{e.titulo}</Text>
				  </View>
				)
			})
	}
  	render() {
		const {show, misItems} = this.state
		const tabs = [{
		    name: 'Mis Items',
		    description: misItems  	
		},{
		    name: 'Items',
		    description: misItems  	
		}]

		return (
			<ScrollView  style={ItemStyle.contentItem}>
			  
			  	{/*****   show the modal to create component	*****/}
				  	{
				  		show
				  		?<CrearItemComponent close={(value)=>this.setState({show:value})} planId={this.props.navigation.state.params} />
				  		:null 
				  	}
	<View style={ItemStyle.subContentItem}>
				{/*****   boton para mostrar crear item	*****/}
				  	<TouchableOpacity onPress={()=>this.setState({show:true})}>
						<Text>+Crear Item</Text>
				  	</TouchableOpacity>
				  	
				{/*****   Acordeon de los items	*****/}
				  	{
				  		misItems.length>0
				  		?<Accordion
					      style={ItemStyle.accordion}
					      items = {tabs}
					      headerRender = {this.renderHeader}
					      contentRender = {this.renderContent}
					      headerName = "name"
					      contentName = "description"
					      maxHeight = {90}
					      duration = {100}
					      backgroundColor = {'#fff'}
					    />
					    :null
				  	}
			  	</View>
			</ScrollView>
		);
	}
}
 