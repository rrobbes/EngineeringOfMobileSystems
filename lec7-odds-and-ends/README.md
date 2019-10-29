# Odds and Ends

## Javascript shorthands

Javascript has various ways to make code shorter. Some of them might not always be completely obvious. Some examples follow.

### React component constructor

If a component's constructor only sets up some state:

```javascript
class MyComp extends React.Component {
    constructor(props) {
        this.state = {foo: 42}
    }
}
```

This can be written more concisely as:

```javascript
class MyComp extends React.Component {
    state = {foo: 42}
}
```

### Destructuring assignments

Javascript makes it easy to fetch the interesting parts of an object or a list:

```javascript
const myList = [1, 2, 3, 4, 5]
const first = myList[0]
const second = myList[1]
const rest = myList.slice(2)
```

This is equivalent to:
```javascript
const myList = [1, 2, 3, 4, 5]
const [first, second, ...rest] = myList
```

The same thing works for objects:
```javascript
const jim = {name: {first: 'james', second: 'bond'}, number: '007', cover: 'cook'}
const firstname = jim.name.first
const number = jim.number
```

Is equivalent to:
```javascript
const {name, number} = jim
const firstname = name.first
```

Or even:
```javascript
const {name: {first}, number} = jim
```

### Destructuring parameters

Destructuring also works for function parameters (objects and lists). For objects:

```javascript
const greet = person => {
    const first = person.name.first
    const last = person.name.last

    return "the name is " + last + ", " + first + " " + last 
}

console.log(greet(jim))
```

`greet` can be written more concisely:

```javascript
const greet = ({name: {first, last}}) => {
    return "the name is " + last + ", " + first + " " + last 
}
```

For lists:

```javascript
const sum3 = list => {
    const [first, second, third] = list
    return first + second + third
}

// equivalent to:
const sum3 = ([first, second, third]) => first + second + third
```

```javascript
const head = list => {
    const [first] = list
    return first
}

const tail = list => {
    const [first, ...rest] = list
    return rest
}

//equivalent to
const head = ([first]) => first
const tail = ([first, ...rest]) => rest
```

## Callbacks, this, and arrow functions

It is not easy to understand the subtle differences between methods, function, and arrow functions. One big difference is the way the variable `this` is bound. Arrow functions use lexical scoping, while methods and functions use dynamic scoping. To understand the difference, try this example on [http://snack.expo.io]

```javascript
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
 
  buttonTest() {
    console.log(Object.keys(this))
    console.log(this.props)
  }

  buttonTest2 = () => {
    console.log(Object.keys(this))
    console.log(this.buttonTest2)
  }

  buttonTest3 = function() {
    console.log(Object.keys(this))
  }

  buttonTestParam = param => {
    console.log(param)
  }

   buttonTestParam2(param) {
    console.log(param)
  }


  render() {
    return (
      <View style={styles.container}>
         <Button title="this method" onPress={this.buttonTest} />
         <Button title="this arrow" onPress={this.buttonTest2} />
         <Button title="this function" onPress={this.buttonTest3} />
         <Button title="() => this method" onPress={() => this.buttonTest()} />
         <Button title="() this => this arrow" onPress={() => this.buttonTest2()} />
         <Button title="() this => this function" onPress={() => this.buttonTest3()} />
         <Button title="this method()" onPress={this.buttonTest()} />
         <Button title="this arrow param?" onPress={this.buttonTestParam("with arrow")} />
         <Button title="() => this method param" onPress={() => this.buttonTestParam2("with arrow?")} />
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
});
```

### Recommendations

Always use arrow functions for callbacks. Whether you define them in the props (e.g. in onPress) or as properties in a class is **mostly** a matter of preference. There are two differences:
- An arrow function defined in onPress will be created any time the component is rendered:
```javascript 
// created every time
<Button onPress={() => this.callback()} />

// created once
<Button onPress={this.callback}>
```
- For callbacks that need arguments determined at render time, the arrow function need to be created at render time for the argument to be properly bound:
```javascript
{objects.map(object => (
    <Button onPress={() => this.process(object)})}
```

## ES6 imports and exports

ES6 has couple of ways to import and export modules. This can be a big confusing.

The difference come in how they are exported in the first place. Any module can decide which functions or objects are visible from the outside.

The first way is to use named imports:

```javascript
// file module.js
export const foo = 42
const bar = 43
const baz = 43

export baz

// other file
import {foo, baz} from './module'
console.log(foo + baz)
```

The second way is to use default imports, if the module has defined one. In that case, we are free to "rename" what we import. 


```javascript
// file module.js
const foo = 42
const bar = 43
const baz = 43

export default baz

// other file
import whateverNameForBaz from './module'

console.log(whateverNameForBaz)
```

Both can be mixed:

```javascript
// file module.js
const foo = 42
export const bar = 43
const baz = 43

export default baz

// other file
import otherNameForBaz, {bar} from './module'

console.log(otherNameForBaz + bar)
```

Any exported name can be "renamed" when imported.

```javascript
// file module.js
export const thisNameIsWayTooLongWhoIsEverGoingToUseMe = 43

// other file
import {thisNameIsWayTooLongWhoIsEverGoingToUseMe as shorter} from './module'

console.log(shorter)
```

And an entire module can be imported too, with the prefix used in the code:

```javascript
// file module.js
export const foo = 42
export const bar = 43
export const baz = 43

// other file
import * as vars from './module'

console.log(vars.foo + vars.bar)
```

### Recommendations
Prefer named exports over default exports.  Default exports are only really necessary when your module will be imported by a module that does not know the name of what will be imported. 

An example of this is the React Native framework itself. React Native can not know the name of your main component. So you indicate it to React by having it being the default export of your App.js module. Then, when React Native executes your application, it can do import it without knowing its name.

Try to avoid renaming your imports "just because", as it makes the code harder to read.

