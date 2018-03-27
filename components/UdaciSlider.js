import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'

import { purple, gray, white } from './../utils/colors'

export default function UdaciSlider({ value, unit, step, max, onChange }) {

  return (
    <View style={styles.sliderContainer}>
      <View style={{ flex: 1 }}>
        <Slider value={value}
          step={step}
          minimumValue={0}
          maximumValue={max}
          onValueChange={onChange}
        />
      </View>
      <View style={styles.matricCounterContainer}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 12, color: gray, textAlign: 'center' }}>{unit} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    sliderContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center'
    },
    matricCounterContainer: {
      flexDirection: 'column',
      width: 55,
      justifyContent: 'center',
      alignContent: 'center'
    }
  }
)