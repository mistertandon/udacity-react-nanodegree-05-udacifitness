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
import { TabNavigator, StackNavigator } from 'react-navigation'

import entryReducer from './reducers/entryReducer'
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'

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

const MainNavigation = StackNavigator(
  {
    Home: {
      screen: Tabs
    },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
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
          <MainNavigation />
        </View>
      </Provider>

    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'space-around'
    }
  })