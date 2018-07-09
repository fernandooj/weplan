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
      mensajeEnvio:'Enviar',
      asignados:[],
      misUsuarios:[],
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
    const {enviarChat, valor, adjuntarAmigos, asignados, usuariosAsignados, mensajeEnvio} = this.state
    console.log(asignados)
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
            {/*<Image source={require('./item2.png')} style={ItemStyle.header} />*/}
            <View style={ItemStyle.header}></View>
          {/* icono back */}
            <TouchableOpacity style={ItemStyle.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('./item3.png')} style={ItemStyle.back} />
            </TouchableOpacity>
            <TextInput placeholder='Titulo' 
                underlineColorAndroid='transparent' 
                placeholderTextColor="#8F9093" 
                style={ItemStyle.titulo}
                onChangeText={(titulo) => this.setState({titulo})}
                maxLength={30}
             />
            <TextInput 
              placeholder='Descripcion'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={ItemStyle.descripcion}
              onChangeText={(descripcion) => this.setState({descripcion})}
              maxLength={60}
            />
            <Image source={require('./item4.png')} style={ItemStyle.decoracion} />
            <View style={ItemStyle.valor}>
              <Text style={ItemStyle.textoValor}>Valor</Text>
              <TextInput 
                placeholder='Valor'
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={ItemStyle.inputValor}
                onChangeText={(valor) => this.setState({valor})}
              />
            </View>

          {/* Adjuntar Amigos */}
            {asignados.length==0 &&<Text style={ItemStyle.textoPregunta}>¿Deseas compartir este artículo con algún amigo del plan?</Text>}
             {
              asignados.length==0
              ?<TouchableOpacity style={ItemStyle.btnAdjuntar} onPress={()=>this.setState({adjuntarAmigos:true})}>
                 <Text style={ItemStyle.adjuntar}>Asignar Amigos</Text>
                 <Text style={ItemStyle.adjuntar2}>></Text>
               </TouchableOpacity> 
              :<View style={ItemStyle.btnAdjuntarExistente} >
                 <Text style={ItemStyle.adjuntarExistentes}>{asignados.length==1 ?`${asignados.length} Asignado Existente` :`${asignados.length} Asignados Existentes`}</Text>
                 <TouchableOpacity onPress={()=>this.setState({adjuntarAmigos:true})}>
                   <Image source={require('./add.png')} style={ItemStyle.addIcon} />
                 </TouchableOpacity>
               </View>  
             }
            <View style={ItemStyle.separador}></View>
            {adjuntarAmigos ?<AgregarAmigosComponent 
              titulo='Asignar Amigos'
              close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
              updateStateAsignados={(asignados, usuariosAsignados, misUsuarios)=>this.setState({asignados, usuariosAsignados, misUsuarios, adjuntarAmigos:false})}
                  asignados={this.state.asignados}
                  usuariosAsignados={this.state.usuariosAsignados}
                  misUsuarios={this.state.misUsuarios}
              /> :null }

            {/* Enviar al Chat */}
              <TouchableOpacity 
                style={[ItemStyle.btnEnviar]} 
                onPress={mensajeEnvio=='Enviar' ?(enviarChat)=>this.setState({enviarChat:!this.state.enviarChat}) :null}>
              <Text style={ItemStyle.enviar}>Enviar al chat</Text>
              {
                !enviarChat
                ?<Image source={require('./item6.png')} style={ItemStyle.enviarIcon} />
                :<Image source={require('./item7.png')} style={ItemStyle.enviarIcon} />
              }
            </TouchableOpacity>

          </View> 

          {/* Adjuntar Amigos  
          <View style={ItemStyle.valor} >
             <TouchableOpacity style={ItemStyle.btnAdjuntar} onPress={()=>this.setState({adjuntarAmigos:true})}>
              <Text style={ItemStyle.adjuntar}>Asignar Amigos</Text>
            </TouchableOpacity> 
            {adjuntarAmigos ?<AgregarAmigosComponent 
              titulo='Asignar Amigos'
              close={(e)=>this.setState({asignados:[], usuariosAsignados:[], adjuntarAmigos:false})} 
              updateStateAsignados={(asignados, usuariosAsignados, misUsuarios)=>this.setState({asignados, usuariosAsignados, misUsuarios, adjuntarAmigos:false})}
                  asignados={this.state.asignados}
                  usuariosAsignados={this.state.usuariosAsignados}
                  misUsuarios={this.state.misUsuarios}
              /> :null }
            
            {/* Enviar al Chat 
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
          </View> */}

          {/* Guardar */}  
          <View style={ItemStyle.save} > 
            <TouchableOpacity style={ItemStyle.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('./item8.png')} style={ItemStyle.iconSave} />
              <Text style={ItemStyle.adjuntar} style={ItemStyle.textSave}>{mensajeEnvio}</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 

  handleSubmit(){
    const {titulo, descripcion, valor, imagen, enviarChat, asignados, id, nombre, photo, usuariosAsignados} = this.state
   
    const fecha = moment().format('h:mm')
    if (titulo.length==0) {
      alerta('El titulo es obligatorio')
    }else if(valor==0){
      alerta('El Valor es obligatorio')
    }else if(isNaN(valor)){
      alerta('El Valor solo puede ser numerico')
    }else{
      this.setState({mensajeEnvio:'Enviando...'})
      let planId = this.props.planId
      // let planId = '5b32a782922f9a3108fcc507'
      let data = new FormData();
      let deudaAsignados = Math.ceil((valor/(asignados.length+1))/100)*100
      let deudaCreador = valor - (deudaAsignados * asignados.length)

      axios.post('/x/v1/ite/item', {descripcion, valor, titulo, planId, espera:asignados, tipo:1})
      .then(e=>{
        let itemId = e.data.item._id
        console.log({descripcion, valor, titulo, planId, asignados, imagen, fecha, titulo, enviarChat, espera:asignados})
        data.append('imagen', imagen);
        data.append('planId', planId);
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
          //console.log(res.data)     
          console.log(usuariosAsignados)
          if(res.data.code==1){ 
            usuariosAsignados.map(e=>{
              sendRemoteNotification(3, e.token, 'notificacion', 'Te han agregado a un Item', `, Te agrego a ${titulo}`, res.data.imagen)
            })
            
            this.props.updateItems(itemId, valor, titulo)
          }else{
            this.setState({mensajeEnvio:'Enviar'})
            Alert.alert(
              'Opss!! revisa tus datos que falta algo',
              res.data,
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
const alerta = (info)=>{
    Alert.alert(
    info,
    '',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}
