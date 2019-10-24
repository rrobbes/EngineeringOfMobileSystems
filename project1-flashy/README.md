# Flashy Flash Cards

This project is due on **Monday, November 11th**. To hand in the project, simply submit on OLE the URL of the github repository where your code is located. This assignment is one of 3 assignments for the course, which together constitute the project grade (50% of the final grade).

### Context: Spaced Repetition

Have you ever wondered why, after spending the whole night studying before an exam and then passing it, you quickly forget what you studied?

This is because you are likely **not** using the best way to memorize large amounts of information. Studies in psychology show that the best way to learn knowledge is to use [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition), due to the [Spacing Effect](https://en.wikipedia.org/wiki/Spacing_effect) identified by Ebbinghaus in the late 1800s, and observed in a variety of subsequent experiments.

In short, research shows that information needs to be shown multiple times, with a separation in time, to be memorized in the long term. In practice, flash cards with regular practice work very well.

### The Project

The goal of this project is to develop a simplified mobile flash card application. A mobile application can better keep track of how well the information is memorized than physical flash cards can. 

In this simplified version, the flash cards are fixed, and can be obtained by:

```javascript
import decks from './flashcards'
```

This imports a list of decks of flash cards. Each deck has a name, and contains a list of flash cards: 

```javascript
decks = [
    {
        name: "Basic Javascript",
        cards: [...]
    },
    {
        name: "Advanced React",
        cards: [...]
    }
]
```

Each card has a front and a back, such as:

```javascript
{
    front: `What is the syntax for accessing the property of an object?`,
    back: `objectName.propertyName`
}
```
When the app starts, the list of decks is shown. The user then picks a deck to learn the concepts in that deck. Each of the card in the deck is shown in sequence:
- The front is shown. The user is asked to guess what the back is.
- The user flips the card, and checks if their guess was correct, and indicates it, by pressing one of two buttons: `right` and `wrong`.
- If the card was guessed `right`, it is removed from its spot, and placed in a (temporary) deck of "correct" cards. The time taken to answer (before flipping the card) determines the index: the card for which it took the longest are first.
- If the card was guessed `wrong`, it is removed from its spot, and is placed at the end of a (temporary) deck of "incorrect" cards. The time taken to answer (before flipping the card) determines the index: the card for which it took the longest are first.
- When all the cards in the deck have been viewed once, the user starts over on a new deck, which contains the same cards as the first deck, but in a different order. The cards that were guessed wrong come first, and the cards that were guessed right come last.
- The user can restart the deck from the beginning at any time. Similar as above, the deck is rearranged: starting with the "wrong" cards, then the remaining cards, then the "right" cards.

Note: I suggest implementing the `right` and `wrong` behavior first without measuring the time to answer, with the `right` or `wrong` card simply placed inside the "correct" and "incorrect" decks.

The app also offers the following functionality:
- Renaming of a deck of cards.
- Adding new cards by entering both front and back text.
- Deleting cards that the user finds irrelevant.
- Adding or deleting decks of cards.
- The app should have a minimum of styling. 
