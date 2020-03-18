import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { orange, white, gray1, gray2 } from "../utils/colors";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TextButton from "./TextButton";
import { removeDeck } from "../utils/api";
import { addDeck } from "../actions";

class Deck extends Component {
   static navigationOptions = ({ navigation }) => {
      const { deck } = navigation.state.params;
      return {
         title: deck
      };
   };

   handleRemoveDeck = () => {
      const { id } = this.props.navigation.state.params;
      const { remove, goBack } = this.props;
      remove();
      removeDeck(id);
      this.props.navigation.navigate("Decks");
   };
   handleStartQuiz = () => {
      const { id, deck, card } = this.props.navigation.state.params;
      if (card.length === 0) {
         this.props.navigation.navigate("NoCard", { deck: deck });
      } else {
         this.props.navigation.navigate("Quiz", {
            id: id,
            deck: deck,
            card: card
         });
      }
   };

   render() {
      const { id, deck, card } = this.props.navigation.state.params;
      return (
         <View style={styles.container}>
            <Text style={styles.deck}>{deck}</Text>
            <Text style={styles.card}>{card.length} cards</Text>
            <View style={styles.buttonSection}>
               <TouchableOpacity
                  onPress={() =>
                     this.props.navigation.navigate("AddCard", { id: id })
                  }
               >
                  <Text style={styles.button}>Add Card</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.buttonSection}>
               <TouchableOpacity onPress={this.handleStartQuiz}>
                  <Text style={styles.button}>Start Quiz</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.buttonSection}>
               <TouchableOpacity onPress={this.handleRemoveDeck}>
                  <Text style={styles.deleteButton}>Delete Deck</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}
function mapDispatchToProps(dispatch, { navigation }) {
   const { id } = navigation.state.params;
   return {
      remove: () =>
         dispatch(
            addDeck({
               [id]: null
            })
         )
   };
}

export default connect(null, mapDispatchToProps)(Deck);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center"
   },
   deck: {
      textAlign: "center",
      fontSize: 30,
      color: gray1
   },
   card: {
      textAlign: "center",
      fontSize: 18,
      color: gray2,
      marginBottom: 60
   },
   button: {
      textAlign: "center",
      color: white,
      backgroundColor: gray2,
      width: 200,
      justifyContent: "center",
      fontSize: 18,
      fontWeight: "700",
      padding: 10
   },
   buttonSection: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15
   },
   deleteButton: {
      fontSize: 18,
      color: orange
   }
});
