import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gray1 } from '../utils/colors'

class NoCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deck}>
          Sorry, you can't take a quiz because there are no cards in the deck.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  deck: {
    textAlign: 'center',
    fontSize: 25,
    color: gray1,
  },
})

export default NoCard
