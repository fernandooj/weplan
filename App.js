import React from 'react';
 import {View, Text, StyleSheet, Image} from 'react-native'
 import {  StackNavigator }  from 'react-navigation';
 

import homeComponent from './components/home/homeComponent';
import splashComponent from './components/splash/splashComponent';
 

const NavigationApp = StackNavigator({
	Home:     {screen: splashComponent },
	Splash:   {screen: homeComponent }, 
})

 

export default class App extends React.Component {
 
    render() {
          return(<NavigationApp />)
    }
}
 