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
import editPerfilComponent1 from './src/editPerfil/editPerfilComponent1';
import editPerfilComponent2 from './src/editPerfil/editPerfilComponent2';
import homeComponent from './src/home/homeComponent';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//import FBSDK, {LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';

axios.defaults.baseURL = 'http://159.89.141.0:8080/';


const NavigationApp = StackNavigator({
    Home:        {screen: LoginComponent },
    Login:        {screen: LoginComponent },
    Registro:    {screen: RegistroComponent },
    insertCode:  {screen: insertCodeComponent },
    editPerfil:  {screen: editPerfilComponent },
    editPerfil1: {screen: editPerfilComponent1 },
    editPerfil2: {screen: editPerfilComponent2 },
},{ headerMode: 'none' })

const NavigationAppLogin = StackNavigator({
    Home:        {screen: editPerfilComponent2 },
    Login:        {screen: LoginComponent },
    Registro:    {screen: RegistroComponent },
    insertCode:  {screen: insertCodeComponent },
    editPerfil:  {screen: editPerfilComponent },
    editPerfil1: {screen: editPerfilComponent1 },
    editPerfil2: {screen: editPerfilComponent2 },
},{ headerMode: 'none' })

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
       facebook:null,
       google:null
    };

  }
  componentWillMount() {
    const {facebook, google} = this.state
    ////////////////////////////////////////////////////////////////////////////////////
    /////////////////////   LOAD FACEBOOK DATA  ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
 
        // AccessToken.getCurrentAccessToken().then(
        //     (data) => {
        //       console.log(data)
        //       if (data!=null) {
        //         this.setState({google: true});  
        //       }
        //       const infoRequest = new GraphRequest(
        //         '/me?fields=name,picture,id,email,friends&access_token',
        //         null,
        //         this._responseInfoCallback
        //       );
        //       new GraphRequestManager().addRequest(infoRequest).start();
        //     }
        //   )
    
      ////////////////////////////////////////////////////////////////////////////////////
      /////////////////////   LOAD GOOGLE DATA  ///////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////
      GoogleSignin.configure({
        webClientId: '986592850899-ha783khufam6ta5oad6hamb9lqpf3280.apps.googleusercontent.com',
          offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
      })
      .then(()=>{
       
          GoogleSignin.currentUserAsync().then((user) => {
            console.log(user);
            if (user!=null) {
              this.setState({google: true});  
            }
            
          }).done();  
         
      })
     
  }

  render() {
    const {google} = this.state
    if (google==null) {
      return (
        <NavigationApp />
      )
    }else{
      return (
        <NavigationAppLogin />
      )
    }
  }
}
 