import React from 'react'
import { View, Text, Slider } from 'react-native'

export default function UdaciSlider({ value, step, max, onChange, unit }) {

  return (
    <View>
      <Slider value={value}
        step={step}
        minimumValue={0}
        maximumValue={max}
        onValueChange={onChange}
      />
      <Text>Unit: </Text>
      <Text>{unit}</Text>
    </View>
  )
}