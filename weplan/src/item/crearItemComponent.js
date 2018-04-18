import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ImageBackground, Alert} from 'react-native'
import {ItemStyle}        from '../item/style'
import axios              from 'axios'
import TakePhotoComponent from '../takePhoto/takePhotoComponent.js'
import AgregarAmigosComponent    from '../agregarAmigos/agregarAmigos.js'
 
export default class CrearItemComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      titulo:'',
      enviarChat:false,
      adjuntarAmigos:false,
      asignados:[]
    }  
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
            {adjuntarAmigos ?<AgregarAmigosComponent 
                titulo='Asignar Amigos'
                close={(asignados)=>this.setState({adjuntarAmigos:false, asignados:asignados})} 
                updateStateAsignados={(estado, id)=>this.updateStateAsignados(estado, id)}/> :null }
            
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
    const {titulo, descripcion, valor, imagen, enviarChat} = this.state
    console.log(this.props.planId)
    let planId = this.props.planId
    //let planId = '5ad3e90d2e1d1c33eec1359b'

    let data = new FormData();
    data.append('imagen', imagen);
    data.append('tipo', 1);
    data.append('descripcion', descripcion);
    data.append('enviarChat', enviarChat);
    data.append('valor', valor);
    data.append('titulo', titulo);
    data.append('planId', planId);


    axios({
          method: 'post', //you can set what request you want to be
          url: '/x/v1/ite/item',
          data: data,
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        })
    .then(e=>{
      console.log(e.data.code)
       this.props.close(false)
      if(e.data.code==1){ 

        
      }else{
        Alert.alert(
         'Error!, intenta nuevamente'
        )
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

}

 