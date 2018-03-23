import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Slider,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AddEntry from './components/AddEntry'

export default class App extends Component {

  state = {
    value: 0
  }

  handlePress = () => {
    alert('hello from handlePress')
  }

  render() {
    return (

      <View style={styles.container}>
        <Slider value={this.state.value}
          minimumValue={-10}
          maximumValue={10}
          step={1}
          onValueChange={
            (value) => {

              this.setState(() => ({ value: value }))
            }
          }
        />
        <Text>Value: {this.state.value}</Text>
        {/* <AddEntry />
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.handlePress}
        >

          <View style={styles.btn}>
            <Text style={styles.btnText}>TouchableNativeFeedback Btn</Text>
          </View>

        </TouchableNativeFeedback> */}
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