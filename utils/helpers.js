import React from 'react'
import { View } from 'react-native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { purple, gray, white, red, orange, blue, lightPurp, pink } from './colors'

export function getMetricMetaInfo(metric) {

  const info = {

    bike: {
      displayName: 'bike',
      max: 100,
      step:1,
      unit: 'miles',
      type: 'stepper',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='bike'
              color={gray}
              size={32}
            />
          </View>
        )
      }
    },
    run: {
      displayName: 'Run',
      max: 50,
      step:1,
      unit: 'miles',
      type: 'stepper',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='run'
              color={purple}
              size={35}
            />
          </View>
        )
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      step:100,
      unit: 'meters',
      type: 'stepper',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='swim'
              color={gray}
              size={35}
            />
          </View>
        )
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      type: 'slider',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='food'
              color={red}
              size={35}
            />
          </View>
        )
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      type: 'slider',
      getIcon() {
        return (
          <View>
            <FontAwesome
              name='bed'
              color={orange}
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

