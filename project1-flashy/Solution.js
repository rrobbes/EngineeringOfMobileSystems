import * as React from 'react';
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

const decks = [
     {name: 'Basic Javascript', cards: frenchCards},
     {name: 'Advanced French', cards: frenchCards},
     {name: 'Genius-level math', cards: factorials},
]

const Front = props => {
  const then = Date.now()
  return (
  <View>
    <Text style={styles.card}>{props.front}</Text>
    <Button title="Flip" 
            onPress={() => props.onFlip(Date.now() - then)} />
  </View>)
}

const Back = props => 
  (
    <View>
        <Text  style={styles.card}>{props.back}</Text>
        <View style={{flexDirection: "row"}}>
            <Button 
                title="Right" 
                onPress={() => props.onGuess(true)} />
            <Button 
                title="Wrong"
                onPress={() => props.onGuess(false)} />
            <Button
                title="Delete" 
                onPress={props.onDelete} />
        </View>
  </View>
  )

class Card extends React.Component {
    state = {
        front: true,
        time: null,
    }

    doFlip = () => this.setState(prev => ({front: !prev.front}))

    flip = time => {
        this.doFlip()
        this.setState(prev => ({time: time}))
    }

    guess = right => {
        this.doFlip()
        this.props.onGuess(right, this.state.time)
    }

    onDelete = () => {
        this.doFlip()
        this.props.onDelete()
    }

    render() {
      return this.state.front?
        <Front 
            front={this.props.card.front}
            onFlip={this.flip}/>:
        <Back
            back={this.props.card.back}
            onGuess={this.guess}
            onDelete={this.onDelete}
            />
    }
}

class AddCard extends React.Component {
  state = {front: 'front text', back: 'back text'}

  handleFrontChange = text => this.setState({front: text})
  handleBackChange = text => this.setState({back: text})

  render() {
    return (
        <View>
            <TextInput 
                style={styles.field} 
                value={this.state.front} 
                onChangeText={this.handleFrontChange} />
            <TextInput 
                style={styles.field}
                value={this.state.back} 
                onChangeText={this.handleBackChange} />
            <Button 
                title="Add" 
                onPress={() => this.props.onAddCard(this.state)} />
        </View>)
  }
}



const Stats = props => {
    const right = props.guesses.filter(guess => guess.right).length
    const wrong = props.guesses.filter(guess => !guess.right).length
    return <Text>{right} right guesses, {wrong} wrong guesses</Text>
}

class Deck extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        cards: this.props.deck.cards,
        guessed: [],
        adding: false
      }
  }

  popCurrentCard = () => {
      const rest = ([first, ...rest]) => rest
      this.setState(prev => ({cards: rest(prev.cards)}))
  }

  guess = (rightOrWrong, time) => {
    const newGuess = {card: this.currentCard(), right: rightOrWrong, time: time}
    this.setState(prev => ({guessed: [newGuess, ...prev.guessed]}))
    this.popCurrentCard()
  }

  rearrangeCards = () => {
      const longTimeFirst = (a, b) => {a.time > b.time}
      const rights = this.state.guessed.filter(guess => guess.right).sort(longTimeFirst)
      const wrongs = this.state.guessed.filter(guess => !guess.right).sort(longTimeFirst)
      const cards = [
          ...wrongs.map(guess => guess.card), 
          ...this.state.cards, 
          ...rights.map(guess => guess.card)]
      return cards
  }

  restart = () => {
      const cards = this.rearrangeCards()
      this.setState(prev => ({cards: cards, guessed: []}))
  }
  currentCard = () =>  this.state.cards[0]

  cardsLeft = () => this.state.cards.length > 0

  addCard = card => this.setState(prev => ({
        cards: [card, ...prev.cards], 
        adding: false}))

  toggleAddCard = () => this.setState({adding: true})

  back = () => {
    const cards = this.rearrangeCards()
    const savedDeck = {cards: cards, name: this.props.deck.name}
    this.props.onBack(savedDeck)
  }

  render() {
 
    return (
      <View>
        <Text>Deck selected: {this.props.deck.name}</Text>
        {this.state.adding?
        <AddCard onAddCard={this.addCard} />: 
        this.cardsLeft()?
            <Card 
                card={this.currentCard()}
                onGuess={this.guess}
                onDelete={this.popCurrentCard}/>:
            <Stats guesses={this.state.guessed}/>
        }
        <Button 
            title="restart" 
            onPress={this.restart}/>
        <Button 
            title="add card" 
            onPress={this.toggleAddCard} />
        <Button 
            title="back to list" 
            onPress={this.back} />
      </View>
    );
  }
}

const SelectDeck = props => (
  <View>
  <Text style={styles.paragraph}>Please select a deck</Text>
  {props.decks.map(deck => 
      (<View style={{flexDirection: "row"}}>
          <Button 
              title={deck.name} 
              onPress={() => props.onSelect(deck)} />
          <Button 
              title="edit" 
              onPress={() => props.onEdit(deck)} />
          <Button 
              title="delete" 
              onPress={() => props.onDelete(deck)} />
      </View>))}
      <Button 
          title="new deck" 
          onPress={() => props.onEdit({name:"new deck", cards:[]})}/>
  </View>
)

class EditDeck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {deckName: this.props.deck.name}
  }

  handleNameChange = text => this.setState({deckName: text})

  render() {
    return (
        <View>
            <TextInput 
                style={styles.field}
                value={this.state.deckName}
                onChangeText={this.handleNameChange} />
            <Button
                title="Save"
                onPress={() => this.props.onSaveDeck(
                                    this.props.deck,
                                    this.state.deckName)} />
        </View>)
  }
}

export default class App extends React.Component {
  state = {
    decks: decks,
    selected: null,
    editingDeck: null}

  selectDeck = deck => this.setState({selected: deck})

  saveDeck = deck => {
    const decks = this.state.decks.filter(d => d.name !== deck.name)
    this.setState(prev => ({decks: [deck, ...decks], selected: null}))
  }

  saveEditedDeck = (deck, newName) => {
    const decks = this.state.decks.filter(d => d.name !== deck.name)
    const newDeck = {...deck, name: newName}
    this.setState(prev => ({
          decks: [newDeck, ...decks],
          editingDeck: null}))
  }

  deleteDeck = deck => {
      const decks = this.state.decks.filter(d => d.name !== deck.name)
      this.setState(prev => ({decks: decks}))
  }

  editDeck = deck => this.setState({editingDeck: deck})

  render() {
    return (
      <View style={styles.container}>
        {this.state.selected?
          <Deck 
              deck={this.state.selected}
              onBack={this.saveDeck}/>:
          this.state.editingDeck?
          <EditDeck
              deck={this.state.editingDeck}
              onSaveDeck={this.saveEditedDeck} />:
          <SelectDeck 
              decks={this.state.decks}
              onSelect={this.selectDeck}
              onEdit={this.editDeck}
              onDelete={this.deleteDeck}/>}
      </View>
    );
  }
}

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
  },
  field: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  }
});
