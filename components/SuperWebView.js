import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { SourceCode } from 'NativeModules';

import WebViewBridge from 'react-native-webview-bridge';

function prepareForBridge(message) {
  return JSON.stringify(message).replace(/'/g, '__@@__');
}

let VIEW;
const scriptURL = SourceCode.scriptURL;
if (scriptURL.indexOf('file://') > -1) {
  const _bundleSourcePath = scriptURL.substring(7, scriptURL.lastIndexOf('/') + 1);
  const name = require('./prodViewUri');
  VIEW = { uri: `${_bundleSourcePath}${name}` };
} else {
  VIEW = require('../webviews/view.html');
}

export default class SuperWebView extends Component {
  constructor(...args) {
    super(...args);
    this.state = { text: 'Hello World' };
    this.onLoad = this.onLoad.bind(this);
    this.onBridgeMessage = this.onBridgeMessage.bind(this);
  }

  onLoad() {
    setTimeout(() => this.refs.webviewbridge.sendToBridge(
      prepareForBridge({ text: 'Hello From React-Native' })
    ), 2000);
  }

  onBridgeMessage(msg) {
    const message = JSON.parse(msg);
    this.setState({ text: message.text});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[ styles.child, styles.nativePart ]}>
          <Text>Text Received: {this.state.text}</Text>
        </View>
        <WebViewBridge ref="webviewbridge"
          style={styles.child}
          onLoad={this.onLoad}
          onBridgeMessage={this.onBridgeMessage}
          source={VIEW}
          scalesPageToFit={false}
          scrollEnabled={false}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    flex: 1,
  },
  nativePart: {
    paddingTop: 40,
  },
});
