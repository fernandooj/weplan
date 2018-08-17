import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ImageBackground, Alert} from 'react-native'
import {style}        from '../item/style'
import axios              from 'axios'
import TakePhotoComponent from '../takePhoto/takePhotoComponent.js'
import AgregarAmigosComponent    from '../agregarAmigos/agregarAmigos.js'
import {sendRemoteNotification} from '../push/envioNotificacion.js'
import { TextInputMask } from 'react-native-masked-text'
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
  getValor(e){
    e = e.substr(1)
    e = e.replace(/[^0-9]/g, '')    
    this.setState({valorInicial:e, valor:Number(e)})
  }
  render() {
    const {enviarChat, valorInicial, adjuntarAmigos, asignados, usuariosAsignados, mensajeEnvio} = this.state
    return (
      <View style={style.container}>
        <View style={style.modalIn}>
          {/* icono */}
          <TouchableOpacity style={style.btnIcon}>
            <Image source={require('../assets/images/item5.png')} style={style.icon} />
          </TouchableOpacity>

          {/* camera */}
          <TouchableOpacity style={style.btnCamera}>
            <TakePhotoComponent fuente={'../assets/images/item1.png'} ancho={100} alto={100}  
                updateImagen={(imagen) => {this.setState({imagen})}} 
                style={style.camera} 
                border={50} />
          </TouchableOpacity>

          {/* rest modal */}
          <View style={style.modal}>
            {/*<Image source={require('../assets/images/item_2.png')} style={style.header} />*/}
            <View style={style.header}></View>
          {/* icono back */}
            <TouchableOpacity style={style.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('../assets/images/item3.png')} style={style.back} />
            </TouchableOpacity>
            <TextInput placeholder='Titulo' 
                underlineColorAndroid='transparent' 
                placeholderTextColor="#8F9093" 
                style={[style.titulo, style.familia]}
                onChangeText={(titulo) => this.setState({titulo})}
                maxLength={30}
             />
            <TextInput 
              placeholder='Descripcion'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={[style.descripcion, style.familia]}
              onChangeText={(descripcion) => this.setState({descripcion})}
              maxLength={60}
            />
            <Image source={require('../assets/images/item4.png')} style={style.decoracion} />
            <View style={style.valor}>
              <Text style={[style.textoValor, style.familia]}>Valor</Text>

              <TextInputMask
                placeholder='Valor'
                type={'money'}
                options={{ unit: '$', zeroCents:true, precision:0 }} 
                style={[style.inputValor, style.familia]}
                underlineColorAndroid='transparent'
                onChangeText={(valor)=>this.getValor(valor)} 
                value={valorInicial}
              />
            </View>

          {/* Adjuntar Amigos */}
            {asignados.length==0 &&<Text style={[style.textoPregunta, style.familia]}>¿Deseas compartir este artículo con algún amigo del plan?</Text>}
             {
              asignados.length==0
              ?<TouchableOpacity style={style.btnAdjuntar} onPress={()=>this.setState({adjuntarAmigos:true})}>
                 <Text style={[style.adjuntar, style.familia]}>Asignar Amigos</Text>
                 <Text style={style.adjuntar2}>></Text>
               </TouchableOpacity> 
              :<View style={style.btnAdjuntarExistente} >
                 <Text style={style.adjuntarExistentes}>{asignados.length==1 ?`${asignados.length} Asignado Existente` :`${asignados.length} Asignados Existentes`}</Text>
                 <TouchableOpacity onPress={()=>this.setState({adjuntarAmigos:true})}>
                   <Image source={require('../assets/images/add.png')} style={style.addIcon} />
                 </TouchableOpacity>
               </View>  
             }
            <View style={style.separador}></View>
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
                style={[style.btnEnviar]} 
                onPress={mensajeEnvio=='Enviar' ?(enviarChat)=>this.setState({enviarChat:!this.state.enviarChat}) :null}>
              <Text style={[style.enviar, style.familia]}>Enviar al chat</Text>
              {
                !enviarChat
                ?<Image source={require('../assets/images/item6.png')} style={style.enviarIcon} />
                :<Image source={require('../assets/images/item7.png')} style={style.enviarIcon} />
              }
            </TouchableOpacity>
          </View> 

          {/* Guardar */}  
          <View style={style.save} > 
            <TouchableOpacity style={style.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('../assets/images/item8.png')} style={style.iconSave} />
              <Text style={style.adjuntar} style={style.textSave}>{mensajeEnvio}</Text>
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
        console.log(e.data)
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
          // console.log(usuariosAsignados)
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
