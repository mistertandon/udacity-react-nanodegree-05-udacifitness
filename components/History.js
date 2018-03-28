import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { recieveEntries, addEntry } from './../actions/entryAction'
import { timeToString, getDailyRemainderValue } from '../utils/helpers'
import { fetchCalenderResults } from '../utils/api'

class History extends Component {

  componentDidMount() {

    const { dispatch } = this.props;

    fetchCalenderResults()
      .then(entries => dispatch(recieveEntries(entries)))
      .then(({ entries }) => {

        if (!entries[timeToString]) {

          return dispatch(
            addEntry(
              { [timeToString()]: getDailyRemainderValue() }
            ))
        }
      })
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {

    return (

      <View>
        <Text>
          {JSON.stringify(this.props)}
        </Text>
      </View>

    )
  }
}
function mapStateToProps(entries) {

  return {
    entries
  }
}

export default connect(mapStateToProps)(History);