/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component }   from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {  StackNavigator }    from 'react-navigation';
import axios                  from 'axios'
import LoginComponent         from './src/login/loginComponent';
import RegistroComponent      from './src/registro/registroComponent';
import insertCodeComponent    from './src/registro/insertCodeComponent';
import editPerfilComponent    from './src/editPerfil/editPerfilComponent';
import editPerfilComponent1   from './src/editPerfil/editPerfilComponent1';
import editPerfilComponent2   from './src/editPerfil/editPerfilComponent2';
import homeComponent          from './src/home/homeComponent';
import createPlanComponent    from './src/createPlan/createPlanComponent';
import MisPlanesComponent     from './src/misPlanes/misPlanesComponent';
import ChatComponent          from './src/chat/chatComponent';
import ItemComponent          from './src/item/itemComponent';
import preguntaComponent      from './src/pregunta/preguntaComponent';
import pagoComponent          from './src/pago/pagoComponent';
import pagoDeudaComponent     from './src/pago/pagoDeudaComponent';
import ajustesComponent       from './src/ajustes/ajustesComponent';
import ajustesAmigosComponent from './src/ajustes/amigosComponent';
 

export const URL = 'http://159.89.141.0:8080/';
axios.defaults.baseURL = URL;

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
    pregunta:      {screen: preguntaComponent },
},{ headerMode: 'none' })
 
const NavigationAppLogin = StackNavigator({  
    Home:          {screen: ChatComponent },
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
    pregunta:      {screen: preguntaComponent },
    ajustes:       {screen: ajustesComponent },
    ajustesAmigos: {screen: ajustesAmigosComponent },
    pago:          {screen: pagoComponent },
    pagoDeuda:     {screen: pagoDeudaComponent },
},{ headerMode: 'none' })

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
  // render(){
  //   return(
  //     <Splash />
  //   )
  // }
  render() {
    const {google, local} = this.state
    console.log(local)
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