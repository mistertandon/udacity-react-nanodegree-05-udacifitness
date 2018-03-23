import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry'

export default class App extends Component {

  handlePress = () => {
    alert('hello from handlePress')
  }

  render() {
    return (

      <View style={styles.container}>

        <TouchableWithoutFeedback
          onPress={this.handlePress}
        >

          <View style={styles.btn}>
            <Text style={styles.btnText}>TouchableOpacity Btn</Text>
          </View>

        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'center'
    },
    btn: {
      backgroundColor: '#E53224',
      padding: 10,
      paddingLeft: 50,
      paddingRight: 50,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnText: {
      color: '#fff'
    }
  })