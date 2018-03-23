import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'

import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'


function SubmitBtn({ onPress }) {

  return (
    <TouchableOpacity onPress={onPress}>

      <Text>Submit</Text>

    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {

  /**
   * @description: Local state contains five keys to store
   * corresponding values.
   */
  state = {
    bike: 0,
    run: 0,
    swim: 0,
    eat: 0,
    sleep: 0
  }

  /**
   * @description: This function is used to increment state values for
   * `bike`, `run` and `swim` type matric.
   *
   * @param {String} metric
   *
   * @returns none
   */
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

  /**
   * @description: This function is used to decrement state values for
   * `bike`, `run` and `swim` type matric.
   *
   * @param {String} metric
   *
   * @returns none
   */
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

  /**
   * @description: This function is used to set state values for
   * `sleep` and `eat` matric.
   *
   * @param {String} metric
   * @param {String} value
   *
   * @returns none
   */
  slide = (metric, value) => {

    this.setState(() => ({ [metric]: value }))
  }

  submit = () => {

    const key = timeToString();
    const entry = this.state;

    this.setState(() => (
      {
        bike: 0,
        run: 0,
        swim: 0,
        eat: 0,
        sleep: 0
      }
    ))

  }

  render() {

    const metaInfo = getMetricMetaInfo();

    return (

      <View>

        <DateHeader date={new Date().toLocaleDateString()} />
        <Text>{JSON.stringify(this.state)}</Text>
        {

          Object.keys(metaInfo).map((metric) => {

            const { getIcon, type, ...rest } = metaInfo[metric];
            const value = this.state[metric];

            return (
              <View key={metric}>

                {getIcon()}

                {
                  type === 'slider'
                    ? <UdaciSlider
                      value={value}
                      onChange={
                        () => {
                          this.slide(metric, value)
                        }
                      }
                      {...rest}
                    />
                    : <UdaciSteppers
                      onIncrement={this.increment}
                      onDecrement={this.decrement}
                      value={value}
                      {...rest}
                    />
                }
              </View>
            )
          })
        }

        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}