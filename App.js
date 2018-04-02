import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import { Cons } from '@expo/vector-icons';
import { Constants } from 'expo';

import entryReducer from './reducers/entryReducer'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { TabNavigator } from 'react-navigation'
import { white, purple } from './utils/colors'


function UdacityFitnessStatusBar({ backgroundColor, ...props }) {

  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View >
  )
}

const Tabs = TabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='bookmark' size={30} color={tintColor} />
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='library-add' size={30} color={tintColor} />
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: purple,
        shadowColor: '#C7C7C7',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default class App extends Component {

  render() {

    return (

      <Provider store={createStore(entryReducer)}>
        <View style={styles.container}>
          <UdacityFitnessStatusBar backgroundColor={white} barStyle="light-content" />
          <Tabs />
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