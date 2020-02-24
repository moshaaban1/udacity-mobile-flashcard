import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { gray1, gray2 } from '../utils/colors'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

class DeckDashboard extends Component {

  render() {
    const { deck, card } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Deck', { deck: deck, card: card })}
          >
            <Text style={styles.deck}>{deck}</Text>
            <Text style={styles.card}>{card} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default DeckDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deck: {
    textAlign: 'center',
    fontSize: 30,
    color: gray1
  },
  card: {
    textAlign: 'center',
    fontSize: 18,
    color: gray2
  }
})
