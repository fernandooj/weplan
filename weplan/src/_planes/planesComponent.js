import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, ImageBackground, ScrollView} from 'react-native'
import {PlanesStyle} from '../planes/style'

 

export default class planesComponent extends Component{
	render(){
		const {navigate} = this.props.navigation
		return(	 
			<ScrollView style={PlanesStyle.container}>
				<ImageBackground source={require('./plan1.jpg')} style={PlanesStyle.plan1}>
					<View style={PlanesStyle.boxPlan1} >
						<Text style={PlanesStyle.planText1}>TARDE DE TÉ EN MASA</Text>
						<Text style={PlanesStyle.planText11}>10</Text>
						<Text style={PlanesStyle.planText1}>ENERO / 10</Text>
					</View>
				</ImageBackground>
				<View style={PlanesStyle.container2} >
					
					{/*	CONTENEDOR 2 */}
					<ImageBackground source={require('./plan2.jpg')} style={PlanesStyle.plan2}>
						<View style={PlanesStyle.boxPlan2}>
							<Text style={PlanesStyle.planText22}>14</Text>
							<Text style={PlanesStyle.planText2}>{`CONCIERTO \n ENERO / 18`}</Text>
						</View>
					</ImageBackground>
					<View style={PlanesStyle.container3} >

						{/*	CONTENEDOR 3 */}
						<ImageBackground source={require('./plan3.jpg')} style={PlanesStyle.plan3}>
							<View style={PlanesStyle.boxPlan3}>
							<Text style={PlanesStyle.planText3}>TARDE DE TÉ EN MASA</Text>
							<Text style={PlanesStyle.planText3}>10</Text>
							<Text style={PlanesStyle.planText3}>ENERO / 10</Text>
						</View>
						</ImageBackground>
						
						{/*	CONTENEDOR 4 */}
						<ImageBackground source={require('./plan4.jpg')} style={PlanesStyle.plan4}>
							<View style={PlanesStyle.boxPlan4}>
								<Text style={PlanesStyle.planText4}>TARDE DE TÉ EN MASA</Text>
								<Text style={PlanesStyle.planText4}>10</Text>
								<Text style={PlanesStyle.planText4}>ENERO / 10</Text>
							</View>
						</ImageBackground>
					</View>	
				</View>
			</ScrollView>	 
			 
		)
	}
}