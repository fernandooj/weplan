import React from 'react';
 import {View, Text, StyleSheet, Image} from 'react-native'
 import {  StackNavigator }  from 'react-navigation';
 

import splashComponent from './components/splash/splashComponent';
 

const NavigationApp = StackNavigator({
    Home:     {screen: splashComponent },
})

 

export default class App extends React.Component {
 
    render() {
          return(<NavigationApp />)
    }
}
 