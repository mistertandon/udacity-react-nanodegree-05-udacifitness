import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyRemainderValue } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'

import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from './../utils/api'
import { recieveEntries, addEntry } from './../actions/entryAction'
import { purple, gray, white, red, orange, blue, lightPurp, pink } from './../utils/colors'

function SubmitBtn({ onPress }) {

  return (

    <TouchableOpacity onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {

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

    this.props.dispatch(addEntry(
      {
        [key]: entry
      }
    ));

    this.setState(() => (
      {
        bike: 0,
        run: 0,
        swim: 0,
        eat: 0,
        sleep: 0
      }
    ))

    submitEntry({ key, entry })
  }

  reset = () => {

    const time = timeToString();

    this.props.dispatch(addEntry(
      {
        [time]: getDailyRemainderValue().today
      }
    ))
  }

  render() {

    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {

      return (

        <View style={styles.center}>
          <Ionicons name='ios-happy-outline'
            size={30}
          />
          <Text>Already logged your information for today</Text>
          <TextButton onPress={this.reset}
            style={styles.resetBtn}>
            Reset
          </TextButton>
        </View>

      )
    }

    return (

      <View style={{ flex:1, padding: 20, backgroundColor: white, justifyContent:'space-around' }}>

        <DateHeader date={new Date().toLocaleDateString()} />
        {

          Object.keys(metaInfo).map((metric) => {

            const { getIcon, type, ...rest } = metaInfo[metric];
            const value = this.state[metric];

            return (
              <View key={metric} style={{ flexDirection: 'row' }}>

                {getIcon()}

                {
                  type === 'slider'
                    ? <UdaciSlider
                      value={value}
                      onChange={(value) => { this.slide(metric, value) }}
                      {...rest}
                    />
                    : <UdaciSteppers
                      onIncrement={() => { this.increment(metric) }}
                      onDecrement={() => { this.decrement(metric) }}
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

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 20
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
    },
    iosSubmitBtn: {
      backgroundColor: 'purple',
      padding: 10,
      marginLeft: 40,
      marginRight: 40,
      borderRadius: 8,
      height: 45
    },
    androidSubmitBtn: {
      backgroundColor: 'purple',
      padding: 8,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius: 8,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end'
    },
    submitBtnText: {
      color: white,
      textAlign: 'center',
      fontSize: 21
    },
    center: {
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    resetBtn: {
      padding: 10
    }
  })

function mapStateToProps(state) {

  const time = timeToString();

  return {
    alreadyLogged: state[time] && typeof state[time].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)