import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

class History extends Component {

  render() {

    return (

      <View>
        <Text>
          Hello From History
        </Text>
      </View>

    )
  }
}

export default connect()(History);
