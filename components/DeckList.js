import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import DeckDashboard from './DeckDashboard'
import { loadInitialData, getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import { gray1, gray2 } from '../utils/colors'

class DeckList extends Component {
  state = {
    decks: {},
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    loadInitialData()
    /*getDecks()
    .then((decks) => dispatch(receiveDecks()))
    .then((decks) => this.setState(() => ({decks: decks, ready: true})))*/

    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(({ decks }) => { this.setState(() => ({decks: decks, ready: true})) })

    //console.log(this.props.decks)
      /*.then(({ decks }) => {
        if (!decks[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({ready: true})))*/

  }

  componentDidUpdate() {
      getDecks().then((decks) => {this.setState({decks: decks})})
  }

  render() {
    const { navigation, decks } = this.props;
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} >
      { Object.keys(decks).map((key) => {
        if(decks[key] !== null) {
          const { title, questions } = decks[key]
          //alert(title+': '+questions.length)
          return (
            <View style={styles.eachDeck} key={key}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Deck', { id: key, deck: title, card: questions })}>
                <Text style={styles.deck}>{title}</Text>
                <Text style={styles.card}>{questions.length} cards</Text>
            </TouchableOpacity>
            </View>
        )}
      })}
      </ScrollView>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  return {
    decks,
    navigation
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    //flex: 1,
    flexGrow: 1,
  },
  eachDeck: {
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    backgroundColor: '#f1f1f1'
  },
  deck: {
    textAlign: 'center',
    fontSize: 30,
    color: gray1,
    marginBottom: 10,
  },
  card: {
    textAlign: 'center',
    fontSize: 20,
    color: gray2
  }
})
