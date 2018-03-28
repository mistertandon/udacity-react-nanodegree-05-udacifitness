import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { recieveEntries, addEntry } from './../actions/entryAction'
import { timeToString, getDailyRemainderValue } from '../utils/helpers'
import { fetchCalenderResults } from '../utils/api'
import UdacifitnessCalendar from 'udacifitness-calendar'

class History extends Component {

  componentDidMount() {

    const { dispatch } = this.props;

    fetchCalenderResults()
      .then((entries) => dispatch(recieveEntries(entries)))
      .then(({ entries }) => {

        if (!entries[timeToString()]) {

          return dispatch(
            addEntry(
              { [timeToString()]: getDailyRemainderValue() }
            ))
        }
      })
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ today, ...matrices }, formattedDate, key) => (
    <View>
      {
        today
          ? <Text>{JSON.stringify(today)}</Text>
          : <Text>{JSON.stringify(matrices)}</Text>
      }
    </View>
  )

  renderEmptyDate() {

    return (
      <View>
        <Text>No data has been added for today.</Text>
      </View>
    )
  }

  render() {

    const { entries } = this.props;
    console.log(entries);
    return (

      <UdacifitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />

    )
  }
}
function mapStateToProps(entries) {

  return {
    entries
  }
}

export default connect(mapStateToProps)(History);