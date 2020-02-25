import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { purple, white } from "./utils/colors";
import Constants from "expo-constants";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import NoCard from "./components/NoCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helper";

class StackScreen extends React.Component {
   render() {
      return (
         <View>
            <Text>Title</Text>
            <Text>Some text</Text>
         </View>
      );
   }
}

const AppBottom = createBottomTabNavigator({
   Decks: {
      screen: DeckList,
      navigationOptions: {
         title: "aaa",
         tabBarLabel: "DeckList",
         tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
         )
      }
   },
   AddDecks: {
      screen: AddDeck,
      title: "AddDeck",
      navigationOptions: {
         title: "AddDeck",
         tabBarLabel: "Add Deck",
         tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
         )
         //navigationOptions: ({navigation}) => ({
         //  header: <StackScreen navigation= {navigation} />,
         //})
      }
   }
});
const AppStack = createStackNavigator(
   {
      Home: AppBottom,
      Deck: Deck,
      AddCard: AddCard,
      NoCard: NoCard,
      Quiz: Quiz
   },
   {
      //headerMode: null //'screen'
   }
);

const MainNavigator = createAppContainer(AppStack);

function FlashcardStatusBar({ backgroundColor, ...props }) {
   return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
         <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
   );
}

export default class App extends React.Component {
   componentDidMount() {
      setLocalNotification(1);
   }
   render() {
      return (
         <Provider store={createStore(reducer)}>
            <MainNavigator />
         </Provider>
      );
   }
}
