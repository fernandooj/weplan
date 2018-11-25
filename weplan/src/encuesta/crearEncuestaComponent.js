import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, ImageBackground, Alert, BackHandler, Platform} from 'react-native'
import {style}        from '../encuesta/style'
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
      img1:true,
      img2:true,
      imagen:null,
      imagen2:null,
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
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.close(false)
    return true;
  }

  render() {
    const {enviarChat, valor, adjuntarAmigos, asignados, imagen, imagen2, img1, img2} = this.state
    console.log(img1)
    return (
      <View style={style.container}>
        <View style={style.modalIn}>
          {/* icono */}
          <TouchableOpacity style={style.btnIcon}>
            <Image source={require('../assets/images/item5.png')} style={style.icon} />
          </TouchableOpacity>

          {/* rest modal */}
          <View style={style.modal}>
            <ImageBackground source={require('../assets/images/item2.png')} style={style.header}> 
              
            {/* ICONO REGRESAR */}
              <TouchableOpacity style={style.btnBack} onPress={()=>this.props.close(false)}>
                <Image source={require('../assets/images/item3.png')} style={style.back} />
              </TouchableOpacity>

            {/* INPUT TITULO */}
            </ImageBackground>
            
            {/* IMAGEN DECORACION TITULO */}
            <View style={style.contenedorDescripcion}>
              <Image source={require('../assets/images/item4.png')} style={style.decoracion} />
              <TextInput 
                placeholder='Titulo'
                underlineColorAndroid='transparent' 
                placeholderTextColor="#5664BA" 
                editable = {true}
                multiline = {false}
                style={[style.descripcion, style.familia]}
                onChangeText={(titulo) => this.setState({titulo})}
                maxLength={30}
              />
              <Image source={require('../assets/images/item4.png')} style={style.decoracion} />
            </View>
          </View> 

        {/* PREGUNTAS */}
          <View style={style.valor} >

          {/* PREGUNTA 1 */}
            <View style={style.btnPregunta}>
              <TextInput 
                placeholder='Opción 1'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={[style.inputValor, style.familia]}
                onChangeText={(pregunta1) => this.setState({pregunta1})}
                maxLength={17}
                multiline = {false}
              />
              <View style={img1 ?style.btnCamera :style.btnCamera2}>
                <TakePhotoComponent img1 fuente={'camara.png'} ancho={imagen ?Platform.OS==='android' ?124 :114 :Platform.OS==='android' ?55 :45} alto={imagen ?70 :40} border={imagen ?Platform.OS==='android' ?70 :39 :20}
                  updateImagen={(imagen) => {this.setState({imagen})}} 
                  img1={(img1) => {this.setState({img1})}} 
                  style={style.camera} />
              </View>
            </View>
 
          {/* PREGUNTA 2 */}
            <View style={style.btnPregunta}>
              <TextInput 
                placeholder='Opción 2'
                underlineColorAndroid='transparent'
                placeholderTextColor="#8F9093" 
                style={[style.inputValor, style.familia]}
                onChangeText={(pregunta2) => this.setState({pregunta2})}
                maxLength={17}
                multiline = {false}
              />
              <View style={img2 ?style.btnCamera :style.btnCamera2}>
                <TakePhotoComponent img2 fuente={'camara.png'} ancho={imagen2 ?Platform.OS==='android' ?124 :114 :Platform.OS==='android' ?55 :45} alto={imagen2 ?70 :40} border={imagen2 ?Platform.OS==='android' ?70 :39 :20}
                  updateImagen={(imagen2) => {this.setState({imagen2})}} 
                   img2={(img2) => {this.setState({img2})}} 
                  style={style.camera} />
              </View>
            </View>
          </View> 

          {/* Guardar */}  
          <View style={style.save} > 
            <TouchableOpacity style={style.btnSave} onPress={this.state.enviarChat=='Enviar' ?this.handleSubmit.bind(this) :null}>
             <Image source={require('../assets/images/item8.png')} style={style.iconSave} />
              <Text style={style.adjuntar} style={[style.textSave, style.familia]}>{this.state.enviarChat}</Text>
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
                this.props.updateItems(titulo)
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
 