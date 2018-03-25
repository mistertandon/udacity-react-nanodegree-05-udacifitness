import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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

import entryReducer from './reducers/entryReducer'
import AddEntry from './components/AddEntry'

export default class App extends Component {

  store = createStore(entryReducer)

  render() {

    return (

      <Provider store={this.store}>
        <View style={styles.container}>
          <AddEntry />
        </View>
      </Provider>

    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'space-around'
    }
  })