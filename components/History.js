import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import UdacifitnessCalendar from 'udacifitness-calendar'
import { AppLoading } from 'expo'

import DateHeader from './DateHeader'
import { recieveEntries, addEntry } from './../actions/entryAction'
import { timeToString, getDailyRemainderValue } from '../utils/helpers'
import { fetchCalenderResults } from '../utils/api'
import { white } from './../utils/colors'
import MatricCard from './MatricCard'

class History extends Component {

  state = {
    ready: false
  }

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

    <View style={styles.item}>
      {
        today
          ?
          <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDatatext}>
              {JSON.stringify(today)}
            </Text>
          </View>
          : <TouchableOpacity onPress={
            () => this.props.navigation.navigate(
              'EntryDetail',
              { 'entryId': key }
            )}>

            <MatricCard date={formattedDate} matrices={matrices} />

          </TouchableOpacity>
      }
    </View>
  )

  renderEmptyDate(formattedDate) {

    return (

      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDatatext}>
          No data has been added for today.
        </Text>
      </View>
    )
  }

  render() {

    const { ready } = this.state;
    const { entries } = this.props;

    if (ready === false) {

      return <AppLoading />
    }

    return (

      <UdacifitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />

    )
  }
}

const styles = StyleSheet.create(
  {
    item: {
      backgroundColor: white,
      borderRadius: 8,
      padding: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'gray',
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    noDatatext: {
      fontSize: 15,
      paddingTop: 15,
      paddingBottom: 15
    }
  }
)

function mapStateToProps(entries) {

  return {
    entries
  }
}

export default connect(mapStateToProps)(History);