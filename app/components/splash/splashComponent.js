import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, ImageBackground, Button, Alert, TextInput, ScrollView} from 'react-native'
import { Constants, Google } from 'expo';
import {SplashStyle} from '../splash/style'
 
 

export default class splashComponent extends Component{
    constructor(props) {
    super(props);
    this.state = { text: 'Register your e-mail',
                   texto: 'Register your cell-phone'};
  }
	 _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };


 _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };
	render(){
		const {navigate} = this.props.navigation
		return(
    <ScrollView>
			<View style={SplashStyle.container}>
				<TouchableHighlight onPress={()=> navigate('Inicio')}>
					<Image 
						source={require('./icon.png')}  
						style={SplashStyle.iconHead}
					/>
				</TouchableHighlight>

				<View style={SplashStyle.btn}>
					<Button
						title="Login with Facebook"
						onPress={this._handleFacebookLogin}
			        />
			    </View>
				<View style={SplashStyle.btn}>
			   <Button
						style={SplashStyle.btn}
						title="Login with Google"
						onPress={this._handleGoogleLogin}
			        />
			    </View>
        <View style={SplashStyle.btn}>
          <TextInput
              style={SplashStyle.textInput}                                    
              placeholder= "Register E-mail"
            />
          <Button
            style={SplashStyle.btn}
            title="Login with E-mail"
            onPress={this._handleGoogleLogin}
              />
          </View>
        <View style={SplashStyle.btn}>
          <TextInput
              style={SplashStyle.textInput}
              placeholder= "Register Number"
            />
          <Button
            style={SplashStyle.btn}
            title="Login with Cellphone"
            onPress={this._handleGoogleLogin}
              />
          </View>      
			</View>
    </ScrollView>
		)
	}
}