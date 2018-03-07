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
import FBSDK, {LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data)
              const infoRequest = new GraphRequest(
                '/me?fields=name,picture,id,email,friends&access_token',
                null,
                this._responseInfoCallback
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          )
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
_signInFacebook(){
    console.log('fa')
    LoginManager.logInWithReadPermissions(['public_profile'], (error, data) => {
      console.log(data)
      if (!error) {
        resolve(data.credentials.token);
        console.log(data)
      } else {
        reject(error);
      }
    })
    AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log(data)
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture,id,email',
              null,
              this._responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        )
  }
  _responseInfoCallback = (error, result) => {
    const {navigate} = this.props.navigation
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          let accessToken1 = data.accessToken
          let idUser1 = result.id
          let name1 = result.name
          let photo1 = result.picture.data.url
          let email1 = result.email
          let tipo1 = 'facebook'
          console.log({accessToken:accessToken1, idUser:idUser1, name:name1, photo:photo1, email:email1, tipo:tipo1})
          axios.post('/x/v1/user/facebook', {accessToken:accessToken1, idUser:idUser1, name:name1, photo:photo1, email:email1, tipo:tipo1})
          .then((e)=>{
            console.log(e)
            if (e.data.code==1) {
              navigate('editPerfil2') 
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
    )
    
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._signInFacebook.bind(this)} >
              <Text>facebook</Text>
            </TouchableOpacity>
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
