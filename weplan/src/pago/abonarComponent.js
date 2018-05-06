import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import {EncuestaStyle}        from '../encuesta/style'
import axios                  from 'axios'
import TakePhotoComponent     from '../takePhoto/takePhotoComponent.js'
import socket from '../../socket.js'
 

export default class AbonarComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      titulo:'',
      descripcion:'',
      valor:0,
      enviarChat:false,
      adjuntarAmigos:false,
      asignados:[]
    }  
  }
  componentWillMount(){
     console.log(this.props)
  }

  render() {
    const {enviarChat, valor, adjuntarAmigos, asignados} = this.state
    return (
      <View style={EncuestaStyle.container}>
        <View style={EncuestaStyle.modalIn}>
          {/* icono */}
          <TouchableOpacity style={EncuestaStyle.btnIcon}>
            <Image source={require('../item/item5.png')} style={EncuestaStyle.icon} />
          </TouchableOpacity>

         

          {/* rest modal */}
          <View style={EncuestaStyle.modal}>
            <Image source={require('../item/item2.png')} style={EncuestaStyle.header} />

          {/* icono back */}
            <TouchableOpacity style={EncuestaStyle.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('../item/item3.png')} style={EncuestaStyle.back} />
            </TouchableOpacity>
            
            <Image source={{uri:this.props.photo}} />
            <Text>{this.props.nombre}</Text>
            <TextInput 
              placeholder='Monto'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={EncuestaStyle.descripcion}
              onChangeText={(monto) => this.setState({monto})}
            />
            <Image source={require('../item/item4.png')} style={EncuestaStyle.decoracion} />
          </View> 

           
          {/* Guardar */}  
          <View style={EncuestaStyle.save} > 
            <TouchableOpacity style={EncuestaStyle.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('../item/item8.png')} style={EncuestaStyle.iconSave} />
              <Text style={EncuestaStyle.adjuntar} style={EncuestaStyle.textSave}>Guardar</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 
  handleSubmit(){
    const {monto} = this.state
    const {userId, itemId, valor} = this.props
    console.log({userId, itemId, valor})
    if (monto> valor) {
      Alert.alert(
        'el monto no puede ser mayor a tu deuda',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else{
      axios.post('x/v1/pag/pago', {monto, metodo:2, estado:1, itemId, userId})
      .then(e=>{
        console.log(e.data)
        Alert.alert(
          'tu pago fue actualizado',
          '',
          [
            //{text: 'OK', onPress: () => navigate('item', {itemId, monto})},
            {text: 'OK', onPress: () => console.log('aa')},
          ],
          { cancelable: false }
        )
        
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}

 