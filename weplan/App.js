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
  View,
  TouchableOpacity
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    
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
            this.setState({user: user});
          }).done();  
 
      })
     
  }

  _signInGoogle(){
 
    GoogleSignin.signIn()
    .then((result) => {
      console.log(result);
      
      }) 
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <TouchableOpacity onPress={this._signInGoogle.bind(this)} >
          <Text>google</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          style={{width: 148, height: 148}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signInGoogle.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
