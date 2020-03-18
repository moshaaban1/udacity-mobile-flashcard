import React, { Component } from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput
} from "react-native";
import { connect } from "react-redux";
import { gray1, gray2, gray3, gray4, white } from "../utils/colors";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { timeToString } from "../utils/helper";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";

class AddDeck extends Component {
   state = {
      input: ""
   };
   handleOnPress = () => {
      const getInput = this.state.input.trim();
      if (!getInput) {
         alert("Please enter title.");
      } else {
         const id = timeToString();
         const deck = {
            [id]: {
               title: getInput,
               questions: []
            }
         };
         this.props.dispatch(addDeck(deck));
         this.setState({ input: "" });
         saveDeckTitle(deck, id);
         this.props.navigation.navigate("Deck", {
            id,
            deck: getInput,
            card: []
         });
      }
   };
   render() {
      const input = this.state.input;
      return (
         <View style={styles.container}>
            <Text style={styles.title}>
               What is the title of your new deck?
            </Text>
            <View style={styles.inputSection}>
               <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={input => this.setState({ input })}
               />
            </View>
            <View style={styles.buttonSection}>
               <TouchableOpacity onPress={this.handleOnPress}>
                  <Text style={styles.button}>Create Deck</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

function mapDispatchToProps(dispatch, { navigation }) {
   return {
      dispatch,
      navigation
   };
}

export default connect(mapDispatchToProps)(AddDeck);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center"
   },
   title: {
      textAlign: "center",
      fontSize: 25,
      color: gray4
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
   input: {
      width: 350,
      height: 44,
      padding: 8,
      borderWidth: 1,
      borderColor: gray3,
      marginTop: 20,
      marginBottom: 5,
      justifyContent: "center"
   },
   inputSection: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
   }
});
