import React,{ Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  View,
  NavigatorIOS,
} from 'react-native';

import IndexToday from './IndexToday';





class AwesomeProject extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title:'历史上的今天',
            component: IndexToday,
          }}
          />
        );
      }
  }

var styles = StyleSheet.create({
  loadding: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex:1,
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
