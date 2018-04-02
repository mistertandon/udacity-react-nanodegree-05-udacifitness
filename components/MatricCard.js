import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from './../utils/helpers'
import { gray } from './../utils/colors'

export default function MatricCard({ date, matrices }) {
  console.log(matrices);
  return (

    <View>

      {date && <DateHeader date={date} />}
      {
        Object.keys(matrices)
          .map((matric) => {

            const { displayName, unit, getIcon } = getMetricMetaInfo(matric);

            return (
              <View style={styles.matric} key={matric}>
                {getIcon()}

                <View key={`${matric}_display_name`} >
                  <Text style={{ fontSize: 20 }}>
                    {displayName}
                  </Text>
                  <Text>
                    {matrices[matric]}{unit}
                  </Text>
                </View>

              </View>
            )
          })
      }
    </View>
  )
}

const styles = StyleSheet.create(
  {
    matric: {
      flexDirection: 'row',
      marginTop: 15
    }
  }
)