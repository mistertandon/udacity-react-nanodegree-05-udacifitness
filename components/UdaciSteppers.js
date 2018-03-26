import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { FontAwesome, Entypo } from '@expo/vector-icons'

import { purple, gray, white, red, orange, blue, lightPurp, pink } from './../utils/colors'

export default function UdaciSteppers({ value, unit, step, max, onIncrement, onDecrement }) {

  return (

    <View style={styles.stepperContainer}>
      <View style={styles.flexRowRef}>
        <TouchableOpacity onPress={onDecrement} style={styles.androidBtn}>
          <FontAwesome name='minus' size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement} style={styles.androidBtn}>
          <FontAwesome name='plus' size={30} color={'red'} />
        </TouchableOpacity>
      </View>
      <View style={styles.matricCounter}>
        <Text style={styles.matricCounterValue}>{value}</Text>
        <Text style={styles.matricCounterUnit}>{unit}</Text>
      </View>
    </View >

  )
}

const styles = StyleSheet.create(
  {
    stepperContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    flexRowRef: {
      flexDirection: 'row'
    },
    androidBtn: {
      borderWidth: 1,
      borderRadius: 3,
      margin: 5,
      padding: 7

    },
    matricCounter: {
      justifyContent: 'center',
      width: 55
    },
    matricCounterValue: {
      fontSize: 20,
      textAlign: 'center'
    },
    matricCounterUnit: {
      color: gray,
      fontSize: 12,
      textAlign: 'center'
    }
  }
)