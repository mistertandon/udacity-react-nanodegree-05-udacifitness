import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function TextButton({ children, onPress }) {

  return (

    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>

  )
}