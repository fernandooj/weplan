import React, { Component } from 'react'
import {
  Animated,
  Easing, StyleSheet, Text, View, Image, Dimensions
} from 'react-native'
import axios                  from 'axios' 
import { StackNavigator } from 'react-navigation'

import homeComponent          from './src/home/homeComponent';
import LoginComponent         from './src/login/loginComponent';
import RegistroComponent      from './src/registro/registroComponent';
import insertCodeComponent    from './src/registro/insertCodeComponent';
import editPerfilComponent    from './src/editPerfil/editPerfilComponent';
import editPerfilComponent1   from './src/editPerfil/editPerfilComponent1';
import editPerfilComponent2   from './src/editPerfil/editPerfilComponent2';

import createPlanComponent    from './src/createPlan/createPlanComponent';
import MisPlanesComponent     from './src/misPlanes/misPlanesComponent';
import ChatComponent          from './src/chat/chatComponent';
import ItemComponent          from './src/item/itemComponent';
import encuestaComponent      from './src/encuesta/encuestaComponent';
import pagoComponent          from './src/pago/pagoComponent';
import pagoDeudaComponent     from './src/pago/pagoDeudaComponent';
import ajustesComponent       from './src/ajustes/ajustesComponent';
import ajustesAmigosComponent from './src/ajustes/amigosComponent';
import notificacionComponent  from './src/notificacion/notificacionComponent';
import walletComponent        from './src/wallet/walletComponent';
import perfilComponent        from './src/perfil/perfilComponent';
import profileComponent       from './src/profile/profileComponent';
import EditPasswordComponent  from './src/editPassword/EditPasswordComponent';
import insertCodeComponent2   from './src/editPassword/insertCodeComponent2';
import nuevoPasswordComponent from './src/editPassword/nuevoPasswordComponent';
import infoPlanComponent      from './src/infoPlan/infoPlanComponent';
import costoPlanComponent          from './src/costoPlan/costoPlanComponent';
import medioPagoComponent          from './src/medioPago/medioPagoComponent';
import facturacionComponent        from './src/facturacion/facturacionComponent';
import planesPublicosComponent     from './src/planesPublicos/planesPublicosComponent';
import detallePlanPublicoComponent from './src/planesPublicos/detallePlanPublicoComponent';
 



export const URL = 'https://appweplan.com/';
axios.defaults.baseURL = URL;

const transitionConfig = () => {
return {
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideFromBottom = { transform: [{ translateY }] }

      const lastSceneIndex = scenes[scenes.length - 1].index

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 }
        // Slide top screen down
        return slideFromBottom
      } 

      return slideFromRight
    },
}}



const win = Dimensions.get('window');
const NavigationApp = StackNavigator({
    Home:          {screen: LoginComponent },
    Login:         {screen: LoginComponent },
    Registro:      {screen: RegistroComponent },
    insertCode:    {screen: insertCodeComponent },
    editPerfil:    {screen: editPerfilComponent },
    editPerfil1:   {screen: editPerfilComponent1 },
    editPerfil2:   {screen: editPerfilComponent2 },
    inicio:        {screen: homeComponent },
    createPlan:    {screen: createPlanComponent },
    misPlanes:     {screen: MisPlanesComponent },
    chat:          {screen: ChatComponent },
    item:          {screen: ItemComponent },
    ajustes:       {screen: ajustesComponent },
    ajustesAmigos: {screen: ajustesAmigosComponent },
    pago:          {screen: pagoComponent },
    pagoDeuda:     {screen: pagoDeudaComponent },
    encuesta:      {screen: encuestaComponent },
    notificacion:  {screen: notificacionComponent },
    wallet:        {screen: walletComponent },
    perfil:        {screen: perfilComponent },
    profile:       {screen: profileComponent },
    editPassword:  {screen: EditPasswordComponent },
    insertCode2:   {screen: insertCodeComponent2 },
    nuevoPassword: {screen: nuevoPasswordComponent },
    infoPlan:      {screen: infoPlanComponent },
},{ headerMode: 'none', transitionConfig })
 
const NavigationAppLogin = StackNavigator({  
    Home:          {screen: homeComponent}, 
    Login:         {screen: LoginComponent },
    Registro:      {screen: RegistroComponent },
    insertCode:    {screen: insertCodeComponent },
    editPerfil:    {screen: editPerfilComponent },
    editPerfil1:   {screen: editPerfilComponent1 },
    editPerfil2:   {screen: editPerfilComponent2 },
    inicio:        {screen: homeComponent },
    createPlan:    {screen: createPlanComponent },
    misPlanes:     {screen: MisPlanesComponent },
    chat:          {screen: ChatComponent },
    item:          {screen: ItemComponent },
    encuesta:      {screen: encuestaComponent },
    ajustes:       {screen: ajustesComponent },
    ajustesAmigos: {screen: ajustesAmigosComponent },
    pago:          {screen: pagoComponent },
    pagoDeuda:     {screen: pagoDeudaComponent },
    notificacion:  {screen: notificacionComponent },
    wallet:        {screen: walletComponent },
    perfil:        {screen: perfilComponent },
    profile:       {screen: profileComponent },
    editPassword:  {screen: EditPasswordComponent },
    insertCode2:   {screen: insertCodeComponent2 },
    nuevoPassword: {screen: nuevoPasswordComponent },
    infoPlan:      {screen: infoPlanComponent },
    costoPlan:     {screen: costoPlanComponent },
    medioPago:     {screen: medioPagoComponent },
    planesPublicos:{screen: planesPublicosComponent },
    facturacion:   {screen: facturacionComponent },
    detallePlanPublico:{screen: detallePlanPublicoComponent },
},{ headerMode: 'none', transitionConfig})


 

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
       local:null
    };
  }
  componentWillMount() {
    var num = Math.floor(Math.random() * 5);
    this.setState({num})
    axios.get('/x/v1/user/profile/')
    .then((res)=>{
 
      if(res.data.code==1){
        this.setState({local:1})
      }else{
        this.setState({local:2})
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render() {
    const {num} = this.state
    const {google, local} = this.state
    if (local==null) {
      return (
         <Image 
           style={styles.image}
           resizeMode={'contain'}  
           source={num===0 ?require('./splash0.jpg') :num===1 ?require('./splash1.jpg') :num===2 ?require('./splash2.jpg') :num===3 ?require('./splash3.jpg') :num===4 &&require('./splash4.jpg')}
          />
          )
    }else if(local==1){
      return (
        <NavigationAppLogin screenProps={{num}}/>
      )
    }else if(local==2){
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
    }
}); 