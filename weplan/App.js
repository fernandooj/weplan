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
import MapView from 'react-native-maps';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    GoogleSignin.configure({
      webClientId: '932062372725-vb226crjsufbqjghl6nbg7s92i5g133e.apps.googleusercontent.com',
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
    console.log('google') 
    GoogleSignin.signIn()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }
  _signInFacebook(){
    console.log('facebook')
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        console.log(data);
      }else{
    console.log(error);
      }
     
    })   
  }
  render() {
        var _this = this;
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={this._signInFacebook.bind(this)} >
             <Text>facebook</Text>
        </TouchableOpacity>
      <MapView
          style={styles.map}
          region={{
            latitude: 4.616950,
            longitude: -74.180233,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
       
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
