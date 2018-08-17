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
      pregunta1:'',
      pregunta2:'',
      imagen:'',
      imagen2:'',
      descripcion:'',
      valor:0,
      enviarChat:'Enviar',
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
            <Image source={require('../images/item5.png')} style={EncuestaStyle.icon} />
          </TouchableOpacity>

          {/* rest modal */}
          <View style={EncuestaStyle.modal}>
            <ImageBackground source={require('../images/item2.png')} style={EncuestaStyle.header}> 
              
            {/* ICONO REGRESAR */}
              <TouchableOpacity style={EncuestaStyle.btnBack} onPress={()=>this.props.close(false)}>
                <Image source={require('../images/item3.png')} style={EncuestaStyle.back} />
              </TouchableOpacity>

            {/* INPUT TITULO */}
            </ImageBackground>
            
            {/* IMAGEN DECORACION TITULO */}
            <View style={EncuestaStyle.contenedorDescripcion}>
              <Image source={require('../images/item4.png')} style={EncuestaStyle.decoracion} />
              <TextInput 
                placeholder='Titulo'
                underlineColorAndroid='transparent' 
                placeholderTextColor="#5664BA" 
                editable = {true}
                multiline = {true}
                style={EncuestaStyle.descripcion}
                onChangeText={(titulo) => this.setState({titulo})}
                maxLength={30}
              />
              <Image source={require('../images/item4.png')} style={EncuestaStyle.decoracion} />
            </View>
          </View> 

        {/* PREGUNTAS */}
          <View style={EncuestaStyle.valor} >

          {/* PREGUNTA 1 */}
            <View style={EncuestaStyle.btnPregunta}>
              <TextInput 
                placeholder='Opción 1'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={EncuestaStyle.inputValor}
                onChangeText={(pregunta1) => this.setState({pregunta1})}
                maxLength={17}
              />
              <TouchableOpacity style={EncuestaStyle.btnCamera} >
                <TakePhotoComponent fuente={'camara.png'} ancho={40} alto={40}  
                  updateImagen={(imagen) => {this.setState({imagen})}} 
                  style={EncuestaStyle.camera} />
              </TouchableOpacity>
            </View>
 
          {/* PREGUNTA 2 */}
            <View style={EncuestaStyle.btnPregunta}>
              <TextInput 
                placeholder='Opción 2'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={EncuestaStyle.inputValor}
                onChangeText={(pregunta2) => this.setState({pregunta2})}
                maxLength={17}
              />
              <TouchableOpacity style={EncuestaStyle.btnCamera} >
                <TakePhotoComponent fuente={'camara.png'} ancho={40} alto={40}  
                  updateImagen={(imagen2) => {this.setState({imagen2})}} 
                  style={EncuestaStyle.camera} />
              </TouchableOpacity>
            </View>
          </View> 

          {/* Guardar */}  
          <View style={EncuestaStyle.save} > 
            <TouchableOpacity style={EncuestaStyle.btnSave} onPress={this.state.enviarChat=='Enviar' ?this.handleSubmit.bind(this) :null}>
             <Image source={require('../images/item8.png')} style={EncuestaStyle.iconSave} />
              <Text style={EncuestaStyle.adjuntar} style={EncuestaStyle.textSave}>{this.state.enviarChat}</Text>
            </TouchableOpacity> 
          </View>
        </View>
       
      </View>
    );
  }
 
  handleSubmit(){
    const {titulo, descripcion, imagen, imagen2, id, pregunta1, pregunta2} = this.state
    let planId = this.props.planId
    //let planId = '5aefdb91423c402001dbb329'
    console.log(planId)
    let data = new FormData();
     if (titulo.length==0) {
      alerta('El titulo es obligatorio')
    }else if(pregunta1==0 && imagen==0){
      alerta('La primera opción es obligatoria')
    }else if(pregunta2==0 && imagen2==0){
      alerta('La segunda opción es obligatoria')
    }else{
      this.setState({enviarChat:'Enviando...'})
      axios.post('/x/v1/enc/encuesta', {descripcion,  titulo, planId})
      .then(e=>{
        let encuestaId = e.data.encuesta._id
         console.log({titulo, descripcion, imagen, imagen2, id, pregunta1, pregunta2, encuestaId, planId})
        
            
           
            data.append('imagen',    imagen);
            data.append('imagen2',   imagen2);
            data.append('pregunta1', pregunta1);
            data.append('pregunta2', pregunta2);
            data.append('encuestaId',encuestaId);
            data.append('planId',    planId);

       
            axios({
                  method: 'post', //you can set what request you want to be
                  url: '/x/v1/enc/encuesta/'+encuestaId,
                  data: data,
                  headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
                })
            .then(res=>{  
              console.log(res.data)     
              if(res.data.code==1){ 
                this.props.updateItems()
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
 