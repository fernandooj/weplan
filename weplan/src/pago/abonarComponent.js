import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import {PreguntaStyle}        from '../pregunta/style'
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
      <View style={PreguntaStyle.container}>
        <View style={PreguntaStyle.modalIn}>
          {/* icono */}
          <TouchableOpacity style={PreguntaStyle.btnIcon}>
            <Image source={require('../item/item5.png')} style={PreguntaStyle.icon} />
          </TouchableOpacity>

         

          {/* rest modal */}
          <View style={PreguntaStyle.modal}>
            <Image source={require('../item/item2.png')} style={PreguntaStyle.header} />

          {/* icono back */}
            <TouchableOpacity style={PreguntaStyle.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('../item/item3.png')} style={PreguntaStyle.back} />
            </TouchableOpacity>
            
            <Image source={{uri:this.props.photo}} />
            <Text>{this.props.nombre}</Text>
            <TextInput 
              placeholder='Monto'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={PreguntaStyle.descripcion}
              onChangeText={(monto) => this.setState({monto})}
            />
            <Image source={require('../item/item4.png')} style={PreguntaStyle.decoracion} />
          </View> 

           
          {/* Guardar */}  
          <View style={PreguntaStyle.save} > 
            <TouchableOpacity style={PreguntaStyle.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('../item/item8.png')} style={PreguntaStyle.iconSave} />
              <Text style={PreguntaStyle.adjuntar} style={PreguntaStyle.textSave}>Guardar</Text>
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

 