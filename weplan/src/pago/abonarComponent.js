import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import {style}        from '../encuesta/style'
import axios                  from 'axios'
import TakePhotoComponent     from '../takePhoto/takePhotoComponent.js'
import socket from '../../socket.js'
import { TextInputMask } from 'react-native-masked-text'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
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
      <View style={style.container}>
        <View style={style.modalIn}>
         
          {/* rest modal */}
          <View style={style.modalAbono}>

            {/* icono back */}
              <TouchableOpacity style={style.btnBackAbono} onPress={()=>this.props.updateItems()}>
                <Image source={require('../assets/images/item3.png')} style={style.backAbono} />
              </TouchableOpacity>
              <View style={style.contenedorAbono}>
                <Image source={{uri:this.props.photo}} style={style.Avatar} />
                <Text style={[style.textoAbono, style.familia]}>{this.props.nombre}</Text>
              </View>
              <View style={style.contenedorAbono}>
                <Text style={[style.textoMonto, style.familia]}>Monto</Text>
                <TextInputMask
                  placeholder='Valor'
                  type={'money'}
                  options={{ unit: '$', zeroCents:true, precision:0 }} 
                  style={[style.descripcionAbono, style.familia]}
                  underlineColorAndroid='transparent'
                  onChangeText={this.getValor.bind(this)}
                  value={valorInicial}
                />

              </View>
              
            </View> 
          {/* Guardar */}  
          <View style={style.save} > 
            <TouchableOpacity style={style.btnSaveAbonar} onPress={this.handleSubmit.bind(this)}>
              <Text style={style.adjuntar} style={[style.textSaveAbonar, style.familia]}>Aceptar</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 
  handleSubmit(){
    const {monto} = this.state
    let {userId, itemId, valor, planId, token, titulo, imagen} = this.props
    valor = Math.abs(valor)
    console.log({userId, itemId, valor, token})
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
      axios.post('x/v1/pag/pago', {monto, metodo:2, estado:1, itemId, planId, descripcion:'abono de parte del dueño del item', userId, userItem:userId, abono:true})
      .then(e=>{
        console.log(e.data)
        if (e.data.code==1) {
          sendRemoteNotification(12, token, 'notificacion', 'Han hecho un abono', `, Te abono ${monto}, en ${titulo}`, imagen)
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

 