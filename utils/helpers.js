import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { purple, gray, white, red, orange, blue, lightPurp, pink } from './colors'

const styles = StyleSheet.create(
  {
    iconContainer: {
      padding: 5,
      height: 50,
      width: 50,
      borderRadius: 8,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
)

export function getMetricMetaInfo(metric) {

  const info = {

    bike: {
      displayName: 'bike',
      max: 100,
      step: 1,
      unit: 'miles',
      type: 'stepper',
      getIcon() {

        return (
          <View style={[styles.iconContainer, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons
              name='bike'
              color={'white'}
              size={32}
            />
          </View>
        )
      }
    },
    run: {
      displayName: 'Run',
      max: 50,
      step: 1,
      unit: 'miles',
      type: 'stepper',
      getIcon() {

        return (
          <View style={[styles.iconContainer, { backgroundColor: 'purple' }]}>
            <MaterialCommunityIcons
              name='run'
              color={'white'}
              size={35}
            />
          </View>
        )
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      step: 100,
      unit: 'meters',
      type: 'stepper',
      getIcon() {

        return (
          <View style={[styles.iconContainer, { backgroundColor: 'orange' }]}>
            <MaterialCommunityIcons
              name='swim'
              color={'white'}
              size={35}
            />
          </View>
        )
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      step: 1,
      unit: 'rating',
      type: 'slider',
      getIcon() {

        return (
          <View style={[styles.iconContainer, { backgroundColor: 'blue' }]}>
            <MaterialCommunityIcons
              name='food'
              color={'white'}
              size={35}
            />
          </View>
        )
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      step: 1,
      unit: 'hours',
      type: 'slider',
      getIcon() {

        return (
          <View style={[styles.iconContainer, { backgroundColor: 'pink' }]}>
            <FontAwesome
              name='bed'
              color={'white'}
              size={35}
            />
          </View>
        )
      }
    }
  }

  return (typeof metric === 'undefined' || typeof info[metric] === 'undefined')
    ? info :
    info[metric];
}

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection(heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString(time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function getDailyRemainderValue() {

  return {
    today: "You didn't log data on this day."
  }
}