import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, gray1, gray2, gray3 } from '../utils/colors'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import TextButton from './TextButton'
import { addCardToDeck } from '../utils/api'
import { addCard }from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: ''
  }
  handleOnPress = () => {
    const getQuestion = this.state.question.trim()
    const getAnswer = this.state.answer.trim()
    if (!getQuestion || !getAnswer) {
      alert('Please enter question and answer.')
    } else {
      let { deck, id } = this.props
      //const id = this.props.id //this.props.navigation.state.params.id
      const card = {
        question: getQuestion,
        answer: getAnswer
      }
      var buffQ = deck.questions
      console.log('Q: ')
      console.log(buffQ)
      const newCard = {
        [id]: {
          ...deck,
          questions: buffQ.push(card)
        }
      }
      this.props.dispatch(addCard(newCard))
      console.log(this.props)
      //addCardToDeck(id, card)
      this.props.navigation.navigate('Decks')
      //this.props.navigation.navigate('Deck', { deck: 'Deck buff', card: 0 })
    }
  }

  render() {
    const { id, deck } = this.props
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <TextInput style={styles.input} value={question}
          onChangeText={(question) => this.setState({ question })}
          placeholder="Enter question" />
        </View>
        <View style={styles.inputSection}>
          <TextInput style={styles.input} value={answer}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Enter answer" />
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity onPress={this.handleOnPress} >
            <Text style={styles.button} >Submit</Text>
          </TouchableOpacity>
        </View>
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
      fontSize: 30,
      color: gray1,
      //flexDirection: 'row',
      //justifyContent: 'center',
      //marginTop: 40,
    },
    card: {
      textAlign: 'center',
      fontSize: 18,
      color: gray2,
      marginBottom: 60,
    },
    button: {
      textAlign: 'center',
      color: white,
      backgroundColor: gray2,
      width: 200,
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: '700',
      padding: 10,
    },
    buttonSection: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    input: {
      width: 350,
      height: 44,
      padding: 8,
      borderWidth: 1,
      borderColor: gray3,
      marginTop: 20,
      marginBottom: 5,
      justifyContent: 'center',
    },
    inputSection: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

function mapDispatchToProps(dispatch, { navigation }) {
  const { id } = navigation.state.params
  return {
    id,
    dispatch
  }
}

function mapStateToProps( state, { navigation } ) {
  console.log(state)
  console.log(navigation.state.params)
  const { id } = navigation.state.params
  console.log('state: ')
  console.log(state[id])
  return {
    id,
    deck: state[id],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
