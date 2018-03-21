import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends Component {

  state = {
    bike: 0,
    run: 0,
    swim: 0,
    eat: 0,
    sleep: 0
  }

  increment = (metric) => {

    const { max, step } = getMetricMetaInfo(metric);

    this.setState((state) => {

      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {

    const { step } = getMetricMetaInfo(metric);

    this.setState((state) => {

      const count = state[metric] - step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {

    this.setState(() => ({ [metric]: value }))
  }

  render() {

    return (
      <View>
        {
          getMetricMetaInfo('bike').getIcon()
        }
      </View>
    )
  }
}
