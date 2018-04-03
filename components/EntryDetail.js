import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import MatricCard from './MatricCard'
import TextButton from './TextButton'
import { addEntry } from './../actions/entryAction'
import { timeToString, getDailyRemainderValue } from './../utils/helpers'
import { removeEntry } from './../utils/api'
import { white } from './../utils/colors'


class EntryDetail extends Component {

  static navigationOptions = ({ navigation }) => {

    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`
    }
  }

  shouldComponentUpdate(props) {

    return props.matrics !== null && !props.matrics.today
  }

  reset = () => {

    const { entryId, remove, goBack } = this.props;

    remove();
    goBack();
    removeEntry(entryId)
  }

  render() {

    const { matrics } = this.props;

    return (
      <View style={styles.container}>
        <MatricCard matrices={matrics} />
        <TextButton onPress={this.reset} style={{ margin: 10 }}>
          Reset
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: white
    }
  }
)

function mapStateToProps(state, { navigation }) {

  const { entryId } = navigation.state.params;

  return {
    entryId,
    matrics: state[entryId]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {

  const { entryId } = navigation.state.params;

  return {
    remove: () => dispatch(
      addEntry(
        {
          [entryId]: timeToString() === entryId ?
            getDailyRemainderValue()
            : null
        }
      )
    ),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);