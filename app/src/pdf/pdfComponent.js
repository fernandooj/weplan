import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions} from 'react-native'
import Pdf from 'react-native-pdf';


export default class PdfComponent extends Component{
	state={
		modalVisible:true
	}

	render(){
		console.log(this.props.documento)
		return(
			<View style={styles.container}>
				<Modal
				  animationType="slide"
				  transparent={false}
				  visible={this.state.modalVisible}
				  onRequestClose={() => {
				    console.log('Modal has been closed.');
				}}>
				<Pdf
		            source={{uri: this.props.documento}}
		            onLoadComplete={(numberOfPages,filePath)=>{
		                console.log(`number of pages: ${numberOfPages}`);
		            }}
		            onPageChanged={(page,numberOfPages)=>{
		                console.log(`current page: ${page}`);
		            }}
		            onError={(error)=>{
		                console.log(error);
		            }}
		            style={styles.pdf}
		        />
		        <View style={styles.containerHecho}>
		            <TouchableOpacity style={styles.btnHecho} onPress={(e)=>{this.props.close()}} > 
						<Text style={styles.hecho}>Hecho!</Text>
					</TouchableOpacity> 
				</View>
				</Modal>   
			</View>
		)
	}
	


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
 		backgroundColor:'red',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
       	flex: 1,
        width:Dimensions.get('window').width,
    },
    containerHecho:{
		alignItems: 'center',
 	},
 	btnHecho:{
 		width:'40%',
 		alignItems: 'center',
 		backgroundColor:'#94A5F3',
 		borderRadius:10,
 		padding:10
 	},
 	hecho:{
 		color:'white'
 	}
});