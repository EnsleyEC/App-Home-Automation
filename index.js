
import React, { Component } from 'react';


import { AppRegistry } from 'react-native';

import App from './src/StackNavigator/stacknav'

export default class app1 extends Component  { 

    render() {
      console.disableYellowBox= true;
      return (
        <App />
        );
    }
  }

AppRegistry.registerComponent('smartlight', () => app1);
