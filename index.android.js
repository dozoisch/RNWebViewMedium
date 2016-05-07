/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SuperWebView from './components/SuperWebView';

class RNWebViewMedium extends Component {
  render() {
    return (<SuperWebView />);
  }
}

AppRegistry.registerComponent('RNWebViewMedium', () => RNWebViewMedium);
