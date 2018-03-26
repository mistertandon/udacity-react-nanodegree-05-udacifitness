import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { purple, gray, white, red, orange, blue, lightPurp, pink } from './../utils/colors'

export default function DateHeader({ date }) {

  return (
    <Text style={styles.dateCss}>{date}</Text>
  )
}

const styles = StyleSheet.create(
  {
    dateCss: {
      fontSize: 17,
      color: purple
    }
  }
)