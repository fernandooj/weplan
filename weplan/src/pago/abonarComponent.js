import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import {EncuestaStyle}        from '../encuesta/style'
import axios                  from 'axios'
import TakePhotoComponent     from '../takePhoto/takePhotoComponent.js'
import socket from '../../socket.js'
import { TextInputMask } from 'react-native-masked-text'

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
  getValor(e){
    e = e.substr(1)
    e = e.replace(/[^0-9]/g, '')    
    this.setState({valorInicial:e, monto:Number(e)})
  }
  render() {
    const {enviarChat, valor, adjuntarAmigos, asignados, valorInicial} = this.state
    return (
      <View style={EncuestaStyle.container}>
        <View style={EncuestaStyle.modalIn}>
         
          {/* rest modal */}
          <View style={EncuestaStyle.modalAbono}>

            {/* icono back */}
              <TouchableOpacity style={EncuestaStyle.btnBackAbono} onPress={()=>this.props.updateItems()}>
                <Image source={require('../item/item3.png')} style={EncuestaStyle.backAbono} />
              </TouchableOpacity>
              <View style={EncuestaStyle.contenedorAbono}>
                <Image source={{uri:this.props.photo}} style={EncuestaStyle.Avatar} />
                <Text style={EncuestaStyle.textoAbono}>{this.props.nombre}</Text>
              </View>
              <View style={EncuestaStyle.contenedorAbono}>
                <Text style={EncuestaStyle.textoAbono}>Monto</Text>
                <TextInputMask
                  placeholder='Valor'
                  type={'money'}
                  options={{ unit: '$', zeroCents:true, precision:0 }} 
                  style={EncuestaStyle.descripcionAbono}
                  underlineColorAndroid='transparent'
                  onChangeText={this.getValor.bind(this)}
                  value={valorInicial}
                />

              </View>
              
            </View> 
          {/* Guardar */}  
          <View style={EncuestaStyle.save} > 
            <TouchableOpacity style={EncuestaStyle.btnSaveAbonar} onPress={this.handleSubmit.bind(this)}>
              <Text style={EncuestaStyle.adjuntar} style={EncuestaStyle.textSaveAbonar}>Aceptar</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 
  handleSubmit(){
    const {monto} = this.state
    let {userId, itemId, valor, planId} = this.props
    valor = Math.abs(valor)
    console.log({userId, itemId, valor})
    if (monto> valor) {
      Alert.alert(
        'El monto no puede ser mayor a tu deuda',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else if(isNaN(monto)){
      Alert.alert(
        'El Monto solo puede ser numerico',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else{
      axios.post('x/v1/pag/pago', {monto, metodo:2, estado:1, itemId, planId, descripcion:'abono de parte del dueño del item', userId, abono:true})
      .then(e=>{
        console.log(e.data)
        if (e.data.code==1) {
          Alert.alert(
            'Tu pago fue actualizado',
            '',
            [  
              {text: 'OK', onPress: () => this.props.updateItems(userId, monto)},
            ],
            { cancelable: false }
          )
        }
        if(e.data.code==2){
          Alert.alert(
            '!opss Artículo abierto',
            'puedes hacer pagos hasta que el usuario cierre el item',
            [  
              {text: 'OK', onPress: () => this.props.close()},
            ],
            { cancelable: false }
          )
        }
        
        
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}

 