import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ImageBackground, Alert} from 'react-native'
import {EncuestaStyle}        from '../encuesta/style'
import axios                  from 'axios'
import TakePhotoComponent     from '../takePhoto/takePhotoComponent.js'
import socket from '../../socket.js'
 

export default class CrearEncuestaComponent extends Component{
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
      <View style={EncuestaStyle.container}>
        <View style={EncuestaStyle.modalIn}>
          {/* icono */}
          <TouchableOpacity style={EncuestaStyle.btnIcon}>
            <Image source={require('./item5.png')} style={EncuestaStyle.icon} />
          </TouchableOpacity>

         

          {/* rest modal */}
          <View style={EncuestaStyle.modal}>
            <Image source={require('./item2.png')} style={EncuestaStyle.header} />

          {/* icono back */}
            <TouchableOpacity style={EncuestaStyle.btnBack} onPress={()=>this.props.close(false)}>
              <Image source={require('./item3.png')} style={EncuestaStyle.back} />
            </TouchableOpacity>
            <TextInput placeholder='Titulo' 
                underlineColorAndroid='transparent' 
                placeholderTextColor="#8F9093" 
                style={EncuestaStyle.titulo}
                onChangeText={(titulo) => this.setState({titulo})}
             />
            <TextInput 
              placeholder='Descripcion'
              underlineColorAndroid='transparent' 
              placeholderTextColor="#5664BA" 
              editable = {true}
              multiline = {true}
              style={EncuestaStyle.descripcion}
              onChangeText={(descripcion) => this.setState({descripcion})}
            />
            <Image source={require('./item4.png')} style={EncuestaStyle.decoracion} />
          </View> 

          {/* Adjuntar Amigos */}
          <View style={EncuestaStyle.valor} >
            <View style={EncuestaStyle.btnAdjuntar}>
              <TextInput 
                placeholder='Opción 1'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={EncuestaStyle.inputValor}
                onChangeText={(pregunta1) => this.setState({pregunta1})}
              />
              <TouchableOpacity style={EncuestaStyle.btnCamera} >
                <TakePhotoComponent fuente={'item1.png'} ancho={80} alto={80}  
                  updateImagen={(imagen) => {this.setState({imagen})}} 
                  style={EncuestaStyle.camera} />
              </TouchableOpacity>
            </View>
               
            {/* Enviar al Chat */}
              <View style={EncuestaStyle.btnAdjuntar}>
                 <TextInput 
                  placeholder='Opción 2'
                  underlineColorAndroid='transparent'
                  placeholderTextColor="#8F9093" 
                  style={EncuestaStyle.inputValor}
                  onChangeText={(pregunta2) => this.setState({pregunta2})}
                />
              <TouchableOpacity style={EncuestaStyle.btnCamera} >
                <TakePhotoComponent fuente={'item1.png'} ancho={80} alto={80}  
                  updateImagen={(imagen2) => {this.setState({imagen2})}} 
                  style={EncuestaStyle.camera} />
               </TouchableOpacity>
            </View>
          </View> 

          {/* Guardar */}  
          <View style={EncuestaStyle.save} > 
            <TouchableOpacity style={EncuestaStyle.btnSave} onPress={this.handleSubmit.bind(this)}>
             <Image source={require('./item8.png')} style={EncuestaStyle.iconSave} />
              <Text style={EncuestaStyle.adjuntar} style={EncuestaStyle.textSave}>Enviar</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 
  handleSubmit(){
    const {titulo, descripcion, imagen, imagen2, id, pregunta1, pregunta2} = this.state
  

    let planId = this.props.planId
    console.log(this.props)
    let data = new FormData();
    
    axios.post('/x/v1/pre/pregunta', {descripcion,  titulo, planId})
    .then(e=>{
      let preguntaId = e.data.pregunta._id
      console.log(e.data)
     
      data.append('imagen',    imagen);
      data.append('imagen2',   imagen2);
      data.append('pregunta1', pregunta1);
      data.append('pregunta2', pregunta2);
      data.append('preguntaId',preguntaId);
      data.append('planId', planId);

 
      axios({
            method: 'post', //you can set what request you want to be
            url: '/x/v1/pre/pregunta/'+preguntaId,
            data: data,
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          })
      .then(res=>{  
        console.log(res.data)     
        if(res.data.code==1){ 
          this.props.updateItems(preguntaId, titulo)
          //this.props.close(false)
        }else{
          Alert.alert(
           'Error!, intenta nuevamente'
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

 