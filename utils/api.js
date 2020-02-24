import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'MobileFlashcards:decks';

const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
};

export function loadInitialData() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
}

// fetch all decks
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
      return JSON.parse(result)
  });
}

// get single deck
export function getDeck(id) {
  return getDecks()
    .then((decks) => decks[id]);
}

/*export function saveDeckTitle(title, id) {
  const deckObj = { title, questions: [] };
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [id]: deckObj
  }));
}*/

export function saveDeckTitle(deck, id) {
  console.log(deck)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export function removeDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(res => {
    const data = JSON.parse(res)
    data[id] = undefined
    delete data[id]
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      .then(() => { return JSON.stringify(data) })
  })
}

// add a new card
export function addCardToDeck(id, card) {
  //console.log(id+': '+card)
  return getDecks()
    .then((decks) => {
      decks[id].questions.push(card);
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks));
    });
}
