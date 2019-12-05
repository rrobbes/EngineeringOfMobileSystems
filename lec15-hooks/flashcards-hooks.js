import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
)

const frenchCards = [
  {front: 'Lundi', back: 'Monday'},
  {front: 'Mardi', back: 'Tuesday'},
  {front: 'Mercredi', back: 'Wednesday'},
  {front: 'Jeudi', back: 'Thursday'},
  {front: 'Vendredi', back: 'Friday'},
  {front: 'Samedi', back: 'Saturday'},
  {front: 'Dimanche', back: 'Sunday'},
]

const fac = x => x?x * fac(x - 1):1
const factorials = [...Array(20).keys()].map(x => ({front: `The factorial of ${x} is:`, back: `${fac(x)}`}))

const theDecks = [
     {name: 'Basic Javascript', cards: frenchCards},
     {name: 'Advanced French', cards: frenchCards},
     {name: 'Genius-level math', cards: factorials},
]

const Front = ({front, onFlip}) => {
  const then = Date.now()
  return (
  <View>
    <Text style={styles.card}>{front}</Text>
    <Button title="Flip" onPress={() => onFlip(Date.now() - then)} />
  </View>)
}

const Back = ({back, onGuess, onDelete}) => (
    <View>
        <Text  style={styles.card}>{back}</Text>
        <View style={{flexDirection: "row"}}>
            <Button title="Right" onPress={() => onGuess(true)} />
            <Button title="Wrong" onPress={() => onGuess(false)} />
            <Button title="Delete" onPress={onDelete} />
        </View>
  </View>
  )

const Card = ({card, onGuess, onDelete}) => {
  const [front, setFront] = useState(true)
  const flip = () => setFront(!front)

  const [time, setTime] = useState(null)
  const saveTime = theTime => {flip(); setTime(theTime);}

  const saveGuess = guess => {flip(); onGuess({guess, time})}
  const doDelete = () =>  {flip(); onDelete();}

  return front?
    <Front front={card.front} onFlip={saveTime} />:
    <Back back={card.back} 
          onGuess={saveGuess}
          onDelete={doDelete}/>
}  

const AddCard = ({onAddCard}) => {
  const [front, setFront] = useState('enter front text')
  const [back, setBack] = useState('enter back text')

  return (
      <View>
        <TextInput value={front} onChangeText={setFront} />
        <TextInput value={back} onChangeText={setBack} />
        <Button title="Add" onPress={() => onAddCard({front, back})} />
      </View>)
}

const Stats = ({rights, wrongs}) => {
    return <Text>{rights.length} right guesses, {wrongs.length} wrong guesses</Text>
}

const Deck = ({deck, onSave}) => {
    const [cards,setCards] = useState(deck.cards)
    const popCard = () => {
      const  [first, ...rest] = cards
      setCards(rest)
      return first
    }

    const [rights, setRights] = useState([])
    const [wrongs, setWrongs] = useState([])
    const saveGuess = (guess) => {
        const newGuess = {card: popCard(), ...guess}
        guess.right?
          setRights([newGuess, ...rights]):
          setWrongs([newGuess, ...wrongs])
    }
    const sortCards = () => {
      const byTime = (a, b) => {a.time > b.time}
      const rightCards = rights.sort(byTime).map(guess => guess.card)
      const wrongCards = wrongs.sort(byTime).map(guess => guess.card)
      return [...wrongCards, ...cards, ...rightCards]
    }
    const restart = () => {
      const newCards = sortCards()
      setCards(newCards)
      setRights([])
      setWrongs([])
    }

    const [addMode, setAddMode] = useState(false)
    const toggleAdd = () => setAddMode(!addMode)
    const addCard = card => {setCards([card, ...cards]); toggleAdd();}
    const saveDeck = () => onSave({cards: sortCards(), ...deck})

    return (
      <View>
        <Text>Deck selected: {deck.name}</Text>
        {addMode?<AddCard onAddCard={addCard} />: 
        cards[0]?
            <Card 
                card={cards[0]}
                onGuess={saveGuess}
                onDelete={popCard}/>:
            <Stats rights={rights} wrongs={wrongs}/>
        }
        <Button title="restart" onPress={restart}/>
        <Button title="add card" onPress={toggleAdd} />
        <Button title="back to list" onPress={saveDeck} />
      </View>
    );
}

const SelectDeck = ({decks, onSelect, onEdit, onDelete}) => (
  <View>
  <Text style={styles.paragraph}>Please select a deck</Text>
  {decks.map(deck => 
      (<View style={{flexDirection: "row"}}>
          <Button title={deck.name} onPress={() => onSelect(deck)} />
          <Button title="edit" onPress={() => onEdit(deck)} />
          <Button title="delete" onPress={() => onDelete(deck)} />
      </View>))}
      <Button title="new deck" onPress={() => onEdit({name: "new deck", cards: []})}/>
  </View>
)

const EditDeck = ({deck, onSave}) => {
    const [name,setName] = useState(deck.name)
    return (
        <View>
            <TextInput value={name} onChangeText={setName} />
            <Button title="Save" onPress={() => onSave(deck, name)} />
        </View>)
}

const App = props => {
  const [decks, setDecks] = useState(theDecks)
  const [selected, setSelected] = useState(null)
  const [editingDeck, setEditingDeck] = useState(null)

  const otherDecks = deck => decks.filter(d => d.name !== deck.name)

  const saveDeck = deck => {setDecks([deck, ...otherDecks(deck)]); setSelected(null);}
  const renameDeck = (deck, name) => {setDecks([{name, ...deck}, ...otherDecks(deck)]); setEditingDeck(null);} 
  const deleteDeck = deck => {setDecks(otherDecks(deck))}
  const editDeck = deck => setEditingDeck(deck)

  return (
      <View style={styles.container}>
        {selected?
        <Deck deck={selected} onSave={saveDeck}/>:
        editingDeck?
        <EditDeck deck={editingDeck} onSave={renameDeck} />:
        <SelectDeck 
              decks={decks}
              onSelect={setSelected}
              onEdit={editDeck}
              onDelete={deleteDeck}/>}
      </View>
    );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 8,
    padding: 4,
    fontSize: 16,
    borderColor: "blue",
    borderWidth: 1
  },
  card: {
    backgroundColor:"white",
    width: 300,
    height: 150,
  }
});
