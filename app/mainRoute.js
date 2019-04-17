import React, { Component } from 'react'
import {Animated, YellowBox,Platform, Easing, StyleSheet, Text, View, Image, Dimensions, ImageBackground, AsyncStorage } from 'react-native'
import axios                  from 'axios' 
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import homeComponent               from './src/home/homeComponent';
import LoginComponent              from './src/login/loginComponent';
import RegistroComponent           from './src/registro/registroComponent';
import TerminosComponent           from './src/terminos/terminosComponent';
import insertCodeComponent         from './src/registro/insertCodeComponent';
import editPerfilComponent         from './src/editPerfil/editPerfilComponent';
import editPerfilComponent1        from './src/editPerfil/editPerfilComponent1';
import editPerfilComponent2        from './src/editPerfil/editPerfilComponent2';
import createPlanComponent         from './src/createPlan/createPlanComponent';
import MisPlanesComponent          from './src/misPlanes/misPlanesComponent';
import ChatComponentAndroid        from './src/chat/chatComponent.android';
import ChatComponentIos            from './src/chat/chatComponent.ios';
import ItemComponent               from './src/item/itemComponent';
import encuestaComponent           from './src/encuesta/encuestaComponent';
import pagoComponent               from './src/pago/pagoComponent';
import pagoDeudaComponent          from './src/pago/pagoDeudaComponent';
import ajustesComponent            from './src/ajustes/ajustesComponent';
import ajustesAmigosComponent      from './src/ajustes/amigosComponent';
import notificacionComponent       from './src/notificacion/notificacionComponent';
import walletComponent             from './src/wallet/walletComponent';
import perfilComponent             from './src/perfil/perfilComponent';
import profileComponent            from './src/profile/profileComponent';
import EditPasswordComponent       from './src/editPassword/EditPasswordComponent';
import insertCodeComponent2        from './src/editPassword/insertCodeComponent2';
import nuevoPasswordComponent      from './src/editPassword/nuevoPasswordComponent';
import infoPlanComponent           from './src/infoPlan/infoPlanComponent';
import costoPlanComponent          from './src/costoPlan/costoPlanComponent';
import medioPagoComponent          from './src/medioPago/medioPagoComponent';
import facturacionComponent        from './src/facturacion/facturacionComponent';
import planesPublicosComponent     from './src/planesPublicos/planesPublicosComponent';
import detallePlanPublicoComponent from './src/planesPublicos/detallePlanPublicoComponent';
import importarComponent           from './src/importarContactos/importarContactos';
import contactoComponent           from './src/contacto/contactoComponent';
YellowBox.ignoreWarnings(['Remote debugger']);



export const URL = 'https://appweplan.com/';
axios.defaults.baseURL = URL;

const win = Dimensions.get('window');

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
       local:null
    };
  }
  componentWillMount = async()=> {
   
   let userInfoId = await AsyncStorage.getItem('userInfoId');
   console.log(userInfoId)
   if (userInfoId) {
      userInfoId = userInfoId.slice(1, -1)  
   }
   if (userInfoId===null || userInfoId==='0') {
      axios.get('/x/v1/user/profile/')
      .then((res)=>{
         // console.log(res.data.user)
        if(res.data.code===1){
          this.setState({local:1})
        }else if(res.data.code===0){
          this.setState({local:0})
        }else{
          this.setState({local:2})
          AsyncStorage.setItem('userInfoId', '0');
        }
       })
      .catch((err)=>{
         console.log(err)
      })
   }else{
      axios.get(`/x/v1/user/profile/${userInfoId}`)
      .then((res)=>{
        console.log(res.data)
        if(res.data.code===1){
          this.setState({local:1})
        }else if(res.data.code===0){
          this.setState({local:0})
        }else{
          this.setState({local:2})
        }
      })
      .catch((err)=>{
         console.log(err)
      })
    }
  }
  render() {
   const {google, local} = this.state
   console.log(local)
   
   const NavigationApp = createBottomTabNavigator({
      Home               : {screen: local===1 ?MisPlanesComponent :local===0 ?editPerfilComponent :LoginComponent },
      Login              : {screen: LoginComponent },
      Registro           : {screen: RegistroComponent },
      insertCode         : {screen: insertCodeComponent },
      editPerfil         : {screen: editPerfilComponent },
      editPerfil1        : {screen: editPerfilComponent1 },
      editPerfil2        : {screen: editPerfilComponent2 },
      inicio             : {screen: homeComponent },
      createPlan         : {screen: createPlanComponent },
      misPlanes          : {screen: MisPlanesComponent },
      chat               : {screen: Platform.OS==='android' ?ChatComponentAndroid :ChatComponentIos},
      item               : {screen: ItemComponent },
      ajustes            : {screen: ajustesComponent },
      ajustesAmigos      : {screen: ajustesAmigosComponent },
      pago               : {screen: pagoComponent },
      pagoDeuda          : {screen: pagoDeudaComponent },
      encuesta           : {screen: encuestaComponent },
      notificacion       : {screen: notificacionComponent },
      wallet             : {screen: walletComponent },
      perfil             : {screen: perfilComponent },
      profile            : {screen: profileComponent },
      editPassword       : {screen: EditPasswordComponent },
      insertCode2        : {screen: insertCodeComponent2 },
      nuevoPassword      : {screen: nuevoPasswordComponent },
      infoPlan           : {screen: infoPlanComponent },
      costoPlan          : {screen: costoPlanComponent },
      medioPago          : {screen: medioPagoComponent },
      planesPublicos     : {screen: planesPublicosComponent },
      facturacion        : {screen: facturacionComponent },
      Terminos           : {screen: TerminosComponent },
      detallePlanPublico : {screen: detallePlanPublicoComponent },
      importar           : {screen: importarComponent },
      contacto           : {screen: contactoComponent },
   },{ headerMode: 'none'})
    let num = Math.floor(Math.random() * 5);
    if (local==null) {
      return (
         <ImageBackground source={num==0 ?require('./splash0.jpg') :num==1 ?require('./splash1.jpg') :num==2 ?require('./splash2.jpg') :num==3 ?require('./splash3.jpg') :num==4 &&require('./splash4.jpg')} style={styles.image}>   
           <Image source={require('./src/assets/images/logo.png')} style={{width:300, height:220}} />
          </ImageBackground>
          )
    }else{
      return (
        <NavigationApp screenProps={{num}}/>
      )
    }
  }
}
 
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: win.width,
    height: win.height,
    alignItems:'center',
    justifyContent: 'center',
  }
}); 