import React, { Component } from 'react'
import {
  Animated,
  Easing, StyleSheet, Text, View, Image, Dimensions
} from 'react-native'
import axios                  from 'axios' 
 
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



import { StackNavigator } from 'react-navigation'

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
},{ headerMode: 'none', transitionConfig })
 
const NavigationAppLogin = StackNavigator({  
    Home:          {screen: ChatComponent}, 
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
},{ headerMode: 'none', transitionConfig })


class Splash extends Component <{}>{
  render(){
    return (<Image 
           style={styles.image}
           resizeMode={'contain'}   /* <= changed  */
           source={require('./splash.png')} />)
  }    
}

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
       local:null
    };
  }
  componentWillMount() {
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
    const {google, local} = this.state
    if (local==null) {
      return (
         <Splash />)
    }else if(local==1){
      return (
        <NavigationAppLogin />
      )
    }else if(local==2){
      return (
        <NavigationApp />
      )
    }
  }
}
 
const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height,
    }
}); 