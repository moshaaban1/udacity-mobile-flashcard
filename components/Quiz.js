import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
//import FlipCard from 'react-native-flip-card'
import { connect } from 'react-redux'
import { orange, white, gray1, gray2, gray4, gray5, red } from '../utils/colors'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotification } from '../utils/helper';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    currentQuiz: 0,
    correct: 0,
    showAnswer: false,
    status: 0,
  }

  /*componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }*/

  handleButton = (ans, countCard) => {
    var { currentQuiz, correct, status } = this.state

    if(currentQuiz + 1 < countCard) {
      currentQuiz = currentQuiz + 1
    } else {
      status = 1
    }

    if(ans === 1) {
      correct = correct + 1
    }
    this.setState({
      currentQuiz: currentQuiz,
      correct: correct,
      status: status,
      showAnswer: false,
    })
    if(status === 1) {
      clearLocalNotification().then(setLocalNotification(2));
    }
  }

  handleFlip = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }

  handleRestartQuiz = () => {
    const { id, deck, card } = this.props.navigation.state.params
    this.setState({
      currentQuiz: 0,
      correct: 0,
      status: 0,
      showAnswer: false,
    })
    this.props.navigation.navigate('Quiz', { id: id, deck: deck, card: card })
  }

  renderCard = (currCard, cardLength) => {
    if(this.state.status === 1) {
      const { id, deck, card } = this.props.navigation.state.params
      return(
        <View style={styles.completeContainer} key={1}>
          <Text style={styles.question}>
            Complete!
          </Text>
          <Text style={styles.percentage}>
            Correct: {(this.state.correct/cardLength)*100} %
          </Text>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handleRestartQuiz()}>
              <Text style={styles.button} >Restart Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Deck', { id: id, deck: deck, card: card })}>
              <Text style={styles.button} >Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      var txt1 = ''
      var txt2 = ''
      if(this.state.showAnswer === false) {
        txt1 = 'Answer'
        txt2 = currCard.question
      } else {
        txt1 = 'Question'
        txt2 = currCard.answer
      }
      return(
        <View style={styles.quizContainer} key={this.state.currentQuiz} >
          <View style={styles.face}>
            <Text style={styles.question}>
              {txt2}
            </Text>
            <TouchableOpacity onPress={() => this.handleFlip()}>
              <Text style={styles.answer}>{txt1}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handleButton(1, cardLength)}>
              <Text style={styles.button} >Correct</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handleButton(2, cardLength)}>
              <Text style={styles.button} >Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render() {
    const { id, deck, card } = this.props.navigation.state.params
    const cardLength = card.length
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.countCard}>{this.state.currentQuiz+1} / {cardLength}</Text>
        </View>
        { card.map( (c, index) => {
            if(index === this.state.currentQuiz) {
              return this.renderCard(c, cardLength)
            }
          })
        }
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  return {
    state,
    navigation
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 300,
  },
  completeContainer: {
    flex: 1,
    marginTop: 250,
  },
  question: {
    textAlign: 'center',
    fontSize: 35,
    color: gray5,
  },
  answer: {
    textAlign: 'center',
    fontSize: 18,
    color: red,
    marginTop: 20,
    marginBottom: 50,
  },
  percentage: {
    textAlign: 'center',
    fontSize: 22,
    color: orange,
    marginTop: 20,
    marginBottom: 50
  },
  card: {
    textAlign: 'center',
    fontSize: 18,
    color: gray2,
    marginBottom: 60,
  },
  countCard: {
    textAlign: 'left',
    fontSize: 15,
    color: gray4,
    marginTop: 10,
    marginLeft: 10,
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
  deleteButton: {
    fontSize: 18,
    color: orange,
  },
  flipcard: {
    height: 300,
  },
  face: {

  },
  back: {

  }
})

/*<FlipCard
  friction={6}
  perspective={5000}
  flipHorizontal={true}
  flipVertical={false}
  flip={false}
  clickable={true}
  style={styles.flipcard}
>
  <View style={styles.face}>
    <Text style={styles.question}>
      {currCard.question}
    </Text>
    <Text style={styles.answer}>
      Answer
    </Text>
  </View>
  <View style={styles.back}>
    <Text style={styles.question}>
      {currCard.answer}
    </Text>
    <Text style={styles.answer}>
      Question
    </Text>
  </View>
</FlipCard>*/
