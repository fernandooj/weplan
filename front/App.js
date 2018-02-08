/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {  StackNavigator }  from 'react-navigation';
import axios                from 'axios'
import LoginComponent    from './src/login/loginComponent';
import RegistroComponent from './src/registro/registroComponent';
import insertCodeComponent from './src/registro/insertCodeComponent';
import editPerfilComponent from './src/editPerfil/editPerfilComponent';

axios.defaults.baseURL = 'http://159.89.141.0:8080/';



const NavigationApp = StackNavigator({
    Home:       {screen: editPerfilComponent },
    Registro:   {screen: RegistroComponent },
    insertCode: {screen: insertCodeComponent },
    editPerfil: {screen: editPerfilComponent },
},{ headerMode: 'none' })

export default class App extends Component<{}> {
  render() {
    return (
      <NavigationApp />
    );
  }
}
 