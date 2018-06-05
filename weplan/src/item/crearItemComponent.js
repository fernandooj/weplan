import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ImageBackground, Alert} from 'react-native'
import {ItemStyle}        from '../item/style'
import axios              from 'axios'
import TakePhotoComponent from '../takePhoto/takePhotoComponent.js'
import AgregarAmigosComponent    from '../agregarAmigos/agregarAmigos.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'

import socket from '../../socket.js'
import moment from 'moment'

export default class CrearItemComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      titulo:'',
      descripcion:'',
      valor:0,
      enviarChat:false,
      adjuntarAmigos:false,
      asignados:[],
      usuariosAsignados:[]
    }  
  }
  componentWillMount(){
    ///////////////// OBTENGO EL PERFIL
    axios.get('/x/v1/user/profile') 
    .then((res)=>{
      let id = res.data.user.user._id
      let photo = res.data.user.user.photo
      let nombre = res.data.user.user.nombre
      this.setState({id, photo, nombre})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render() {
    const {enviarChat, valor, adjuntarAmigos, asignados} = this.state
    return (
      <View style={ItemStyle.container}>
        <View style={ItemStyle.modalIn}>
          {/* icono */}
          <TouchableOpacity style={ItemStyle.btnIcon}>
            <Image source={require('./item5.png')} style={ItemStyle.icon} />
          </TouchableOpacity>

          {/* camera */}
          <TouchableOpacity style={ItemStyle.btnCamera}>
            <TakePhotoComponent fuente={'item1.png'} ancho={100} alto={100}  
                updateImagen={(imagen) => {this.setState({imagen})}} 
                style={ItemStyle.camera} />
          </TouchableOpacity>

          {/* rest modal */}
          <View style={ItemStyle.modal}>
            <Image source={require('./item2.png')} style={ItemStyle.header} />

          {/* icono back */}
            <TouchableOpacity style={ItemStyle.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('./item3.png')} style={ItemStyle.back} />
            </TouchableOpacity>
            <TextInput placeholder='Titulo' 
                underlineColorAndroid='transparent' 
                placeholderTextColor="#8F9093" 
                style={ItemStyle.titulo}
                onChangeText={(titulo) => this.setState({titulo})}
             />
            <TextInput 
              placeholder='Descripcion'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={ItemStyle.descripcion}
              onChangeText={(descripcion) => this.setState({descripcion})}
            />
            <Image source={require('./item4.png')} style={ItemStyle.decoracion} />
            <View style={ItemStyle.valor}>
              <Text style={ItemStyle.textoValor}>Valor</Text>
              <TextInput 
                placeholder='Valor'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={ItemStyle.inputValor}
                onChangeText={(valor) => this.setState({valor})}
              />
            </View>
          </View> 

          {/* Adjuntar Amigos */}
          <View style={ItemStyle.valor} >
            <TouchableOpacity style={ItemStyle.btnAdjuntar} onPress={()=>this.setState({adjuntarAmigos:true})}>
              <Text style={ItemStyle.adjuntar}>Asignar Amigos</Text>
            </TouchableOpacity> 
            {
              adjuntarAmigos 
              ?<AgregarAmigosComponent 
                titulo='Asignar Amigos'
                close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
                updateStateAsignados={(asignados, usuariosAsignados)=>this.setState({asignados, usuariosAsignados, adjuntarAmigos:false})}
              /> 
              :null
            }
            
            {/* Enviar al Chat */}
            <TouchableOpacity 
              style={[ItemStyle.btnEnviar, enviarChat && ItemStyle.btnEnviarActive]} 
              onPress={(enviarChat)=>this.setState({enviarChat:!this.state.enviarChat})}>
              <Text style={ItemStyle.adjuntar} style={ItemStyle.enviar}>Enviar al chat</Text>
              {
                !enviarChat
                ?<Image source={require('./item6.png')} style={ItemStyle.enviarIcon} />
                :<Image source={require('./item7.png')} style={ItemStyle.enviarIcon} />
              }
            </TouchableOpacity>
          </View> 

          {/* Guardar */}  
          <View style={ItemStyle.save} > 
            <TouchableOpacity style={ItemStyle.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('./item8.png')} style={ItemStyle.iconSave} />
              <Text style={ItemStyle.adjuntar} style={ItemStyle.textSave}>Enviar</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 

  handleSubmit(){
    const {titulo, descripcion, valor, imagen, enviarChat, asignados, id, nombre, photo, usuariosAsignados} = this.state
    console.log(usuariosAsignados)
    const fecha = moment().format('h:mm')
    if (titulo.length==0) {
      Alert.alert(
        'El titulo es obligatorio',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else if(valor==0){
      Alert.alert(
        'El Valor es obligatorio',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else if(isNaN(valor)){
      Alert.alert(
        'El Valor solo puede ser numerico',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }else{
      let planId = this.props.planId
      //let planId = '5b165754d36e2f0aad8857e6'
      let data = new FormData();
      let deudaAsignados = Math.ceil((valor/(asignados.length+1))/100)*100
      let deudaCreador = valor - (deudaAsignados * asignados.length)

      axios.post('/x/v1/ite/item', {descripcion, valor, titulo, planId, asignados, tipo:1})
      .then(e=>{
        let itemId = e.data.item._id
        console.log(e.data.item)
        data.append('imagen', imagen);
        data.append('planId', planId);
        data.append('fecha',  fecha);
        data.append('titulo', titulo);
        data.append('descripcion', descripcion);
        data.append('valor', valor);
        data.append('enviarChat', enviarChat);
        data.append('itemId', itemId);

        axios({
              method: 'post', //you can set what request you want to be
              url: '/x/v1/ite/item/'+itemId,
              data: data,
              headers: { 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
              }
            })
        .then(res=>{  
          console.log(res.data)     
          if(res.data.code==1){ 
            this.props.updateItems(itemId, deudaCreador, titulo)
            usuariosAsignados.map(e=>{
              sendRemoteNotification(3, e.token, 'misPlanes', 'Te han agregado a un Item', `, Te agrego a ${titulo}`, res.data.imagen)
            })
          }else{
            Alert.alert(
              'Opss!! revisa tus datos que falta algo',
              '',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
        })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}

 