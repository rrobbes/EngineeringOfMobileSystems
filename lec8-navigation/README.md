# Navigation
This lecture covers how to use navigation in a react native app. The lecture is partially based this [CS50 lecture](https://www.youtube.com/watch?v=QHorNUuEXc0).

## What is navigation?

Since a mobile app is usually rendered on a small screen, it's UI can not usually show all the functionality of an app in a single place. Mobile apps tend to define an app as a set of **screens**, each screen showing a specific and cohesive subset of the app's functionality.  For instance, a contact management app could have the following screens:
- Login screen
- Settings screen
- Contact List screen
- Add Contact screen
- Show Contact detail screen
- Search Contact screen

Navigation covers how you can move between screens in an application. So far, we've done this manually, using state to handle navigation, such as:
```javascript
render() {
    return 
        (<View>
        {this.state.showContacts?
        <ContactList>:
        <AddContact>}
        </View>)
}
```

But if we have many ways to navigate an application this is not going to work very well. With 5 or 6 screens, this approach will start to become inconvenient.

A second problem appears, for which we will see more partial solutions now, and more complete solutions later: how do we pass state accross screens?

## React native navigation

Android and iOS have different APIs to do different things. This is what React Native unifies behind a single API, hinding these differences. This is relatively straightforward when the differences are minor.

For navigation, the approaches taken by iOS and Android are extremely different. The "navigation patterns" between screens on iOS and Android are very different too. [The React Navigation library](https://reactnavigation.org/en/) is extremely useful to hide this complexity and the large differences between the two platforms behind a unified API. React Navigation also handles the transitions withing screens, such as sliding from right to lect to go back to the previous screens.

To install the library in your application, execute the following commands in your app's main directory:

```
npm install react-navigation
expo install rect-native-gesture-handler
expo install react-native-reanimated
expo install react-native-screens
```

## Major concepts in React Navigation

A **navigator** is a component that implements a navigation pattern, such as switch-based, tab-based, or stack-based navigation. A switch navigation pattern replaces one screen with another. A tab-based navigation pattern shows a tab bar at the bottom of the screen, allowing the user to choose which component to display at anytime. A stack-based navigation pattern is similar to a switch-based navigation, but also allows backtracking in time.

A navigator has one or more **routes**. A navigator will be the parent of a route, and a route will be the child of a navigator.

Each route has a **name**, which uniquely identifes the route (it is usually unique across the app), and a **screen component**. The screen component is a React component that is rendered when the route is active. Finally, navigators are **composable**: the screen component of one route can be another navigator. This allows us to implement nested hierarchies of navigators, such as a stack-based navigator inside a tab-based navigator, itself inside a switch-based navigator.



## The Switch navigator

It can display one screen at a time. When a screen stops being shown, it is unmounted (e.g. `componentWillUnmount()` is called). The only interaction allowed is to change from one screen to another. 

A switch navigator would be defined as seen below. After importing the library, an object describing the possible routes will be passed to the API via **createSwitchNavigator**, which will return a React component that implements the desired navigation pattern, a second object describing additional options can be passed as well, such as which route to show first.  Finally, an **app container** is created, that wraps the navigator in such a way that it can be used as the base component of a React Native app.

```javascript
import {createSwitchNavigator, createAppContainer } from 'react-navigation'
import ScreenOne from './screens/ScreenOne'
import ScreenTwo from './screens/ScreenTwo'

const routes = {
    RouteOne: {screen: ScreenOne},
    RouteTwo: {screen: ScreenTwo},
}
const options = {initialRouteName: 'RouteOne' }
const AppNavigator = createSwitchNavigator(routes, options)

export default createAppContainer(AppNavigator)
```

The `routes` object is a map, where the keys are the routes, and the values, the objects that describe the screens of the app.

This assumes that the components `ScreenOne` and `ScreenTwo` are defined in modules, which by convention would be found in the directory called `screens`. They could very well be defined in other places, or even in the same file. But following conventions makes it quicker to orient yourself in a new code base.

By using `export default createAppContainer(AppNavigator)`, we create a React component that can be rendered as part of the application.

## Navigation and the navigation prop
At this state, we have not yet seen how to navigate from one route to another. To do so, we can use the `navigate` function, where the argument to `navigate` will be a route name. The navigator will then handle all the logic of the actual navigation (e.g., looking up the component associated to the route, unmounting the previous component, and mounting the new component).

```javascript
class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Screen One</Text>
        <Button title="Screen Two" onPress={() => this.props.navigation.navigate("RouteTwo")}>
      </View>
    );
  }
}
```

`navigate` is one of the function available in the `navigation` props, which the Navigator will pass a prop to each of its screens. The navigation prop has more functions as well, depending on the type of navigator (e.g. the stack navigator supports more behaviour, such as the `goBack` function). See the [navigation prop](https://reactnavigation.org/docs/en/navigation-prop.html).



## Higher Order Components

Functions such as `createSwitchNavigator` or `createAppContainer` are **higher-order components**. They are functions that return a React component, usually wrapped with additional behaviour. For instance:
- `createSwitchNavigator` takes a route object, which contains components inside it, and returns a navigation component, able to navigate to the initial components.
- `createAppContainer` takes a navigator, and returns a component suitable to serve as the root component of an app.

This is a bit similar to **higher-order functions**, such as `map` and `filter`. The React documentation has [more on Higher-Order Components](https://reactjs.org/docs/higher-order-components.html).

Find more details about [App Container](https://reactnavigation.org/docs/en/app-containers.html)


## First example: Switch navigator with several screens

In this simple example, we have several simple components, that can navigate between one another with the switch navigator. The components have varying borders, backgrounds, etc, to clearly see the transitions between them, and when a new component is created.


## Screen Props

It is common that we need to pass data from one screen to another. For instance, the contact app would need the list of contacts to be passed to the screens.

The problem is that we can not "just pass it to the navigator component", as it is a generic component (a higher-order component). As such, it wouldn't know what to do with a "contacts" prop. 

Instead, we can use a `screenProps`, which the navigator knows it should forward to the screen component, without altering it. In fact, it will be passed to every screen of the navigator. Note that an App Container also knows it needs to forward screenProps to the navigator, which will in turn forward it to the actual components.

Note that screenProps are not a panacea: they has the drawback that every route in the app will re-render when the screenProps change. This is inefficient for larger apps, but it's ok for now. Later we will use state management libraries such as redux.

Once screenProps are defined, we can access them via `this.props.screenProps` or `props.screenCrops` in our components (depending on the component type, class or function). In the case of the contact list app, we could do: 

```javascript
//... setup of the navigators ...
const AppNavigator = // ...
const AppContainer = createAppContainer(AppNavigator)

export default class RootComponent extends React.Component
    render() {
        return <AppContainer screenProps={{contacts: this.state.contacts}}/>
    }
}
```

## Refactoring to use Screens

Refactoring the code to use screens and navigators adds quite a bit of complexity to an app. However, this structure is how we can grow our application, and make it more complex over time. There will be a clear way to add new screens, without adding and managing new state in the app.

## Stack Navigator

The Switch navigator is very primitive, as it only allows switches. A stack navigator provides history of the navigation, implemented as a stack of the successive screens that the user navigates to. It is then possible to "go back" to previous screens in the history, as they are in the stack. Note that **the previous screens are kept in memory and are kept mounted**, so that their state is maintained (such as the position in a long list). This is unlike the switch navigator, that unmounts a screen as soon as it disappears.

The Stack Navigator follows the navigation conventions and animations on iOS and Android:
- In iOS, a new screen slides from right to left. To return to the previous screen, a left to right gesture can be used. 
- In Android, a new screen fades on top of the old one. To return to the previous screen, the back button is used.

### Manipulating history

The Stack Navigator also provides API methods to manipulate the history, such as pushing and poping items from the stack. For instance, suppose you are implementing the checkout part of a shopping cart application. You could implement checkout as a series of steps, each step being a screen:
- Enter delivery address
- Choose payment method
- Enter payment details 
- Enter billing address
- Confirm order

It makes sense to go back in the history while completing the order (e.g., to change the payment method). However, once the order is confirmed, it is not possible to change it anymore. So, the "confirm order" step, when completed, could remove the previous screens from the navigation history.

### Creating a Stack Navigator

Creating a Stack Navigator is very similar to creating a Switch Navigator. Both take the same description of routes, and the navigate function works similarly. In addition, the stack navigator supports going back. A complete example follows, also showing how to go back in the history. 

```javascript
import React from 'react';
import { View, Text, Button } from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


const colors = ["red", "green", "black", "yellow", "teal", "salmon", "turquoise", "orange", "white", "brown", "blue"]
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min
const randomColor = () => colors[rand(colors.length)]
const randomWidth = () => rand(45, 15)
const randomBorder = () => ({borderColor: randomColor(), borderWidth: randomWidth(), flex: 1})

const ScreenOne = props => (<View style={randomBorder()}>
    <Button title="2" onPress={() => props.navigation.navigate("RouteTwo")} />
       <Button title="back" onPress={() => props.navigation.goBack()} />
  </View>)

ScreenOne.navigationOptions = {title: "Screen One"}

const ScreenTwo = props => (<View  style={randomBorder()}>
    <Button title="1" onPress={() => props.navigation.navigate("RouteOne")} />
   <Button title="3" onPress={() => props.navigation.navigate("RouteThree")} />
      <Button title="back" onPress={() => props.navigation.goBack()} />
  </View>)

ScreenTwo.navigationOptions = {title: "Screen Two"}

const ScreenThree = props => (<View style={randomBorder()}>
   <Button title="1" onPress={() => props.navigation.navigate("RouteOne")} />
   <Button title="back" onPress={() => props.navigation.goBack()} />
  </View>)

ScreenThree.navigationOptions = {title: "Screen Three"}


const routes = {
    RouteOne: {screen: ScreenOne},
    RouteTwo: {screen: ScreenTwo},
    RouteThree: {screen: ScreenThree}
}

const options = {initialRouteName: 'RouteOne' }
const AppNavigator = createStackNavigator(routes, options)

export default createAppContainer(AppNavigator)
```

### Customizing Screens
Notice how the screens have title bars now. This is because having screen titles is even more useful when the history can be very deep. Right now, the title bars are empty, but this can be customized. A lot of properties can be defined by defining a `navigationOptions` object, either as a static member of a class component, or as a property of a function components:

```javascript

class ClassComp extends React.Component {
    static navigationOptions = {title: "My Title"}

    render() {//...
}

const FuncComp = props => { //...

FuncComp.navigationOptions = {title: "MyTitle"}
```

Some options that can be set are: 
- headerTitle
- headerStyle
- headerTintColor
- headerLeft
- headerRight

And a full list is here:
https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator

The libary takes care of a lot of small details that users care about, such as what to do when a screen title is too long.

Note that `navigationOptions` does not need to be fixed. Instead of an object, a function taking as arguments a `props` object, containing a `navigation` object, a `screenProps` object, and a default `navigationOptions` object (a navigator can set up default navigation options). This function can then return an object describing the navigation option values to apply to the screen. Since `navigation` is passed as a parameter, this can be used to put navigation buttons in the header bar, or to pass data though parameters, as seen below.

For more on navigation options, see: [https://reactnavigation.org/docs/en/navigation-options.html].

One usage of default navigation options is so that we can theme a stack navigator, with a uniform style for all the screens, unless it is overriden by a specific screen. 


## Passing state between routes with params

Another way to share information between screens is to use route parameters. Routes can define parameter names, and put arbitrary objects in there. Compared to screenProps, the advantage is that the parameters can be shared when navigating to a specific route. On the other hand, setting and getting the value of a param is a bit longer in terms of the code to write.

- passing a parameter with navigate:
```javascript
this.props.navigation.navigate('RouteName', {parameter: 'value'})
```
- use setParam to update a parameter for a given route:
```javascript
this.props.navigation.setParams({parameter: 'new value'})
```
- use getParam to read a pameter value, optionally with a default value if it's undefined:
```javascript
this.props.navigation.getParam('parameter', 'default-value')
```


### Adding buttons to headers

We can do this by setting the headerLeft and headerRight properties. We can put React Native components there, such as buttons. Since these buttons are defined in navigationOptions, they may have access to the navigation object, so their callbacks may cause navigations.

They are regular components, but rendered in the title bar, not the screen itself. The title could also be any component, such as a button.

## Composing Navigators

It is possible to put navigators inside one another, to mix navigation paradigm. For instance, stack navigator and tab-based navigators.

To compose navigators, you can just put one navigator as the "screen" of another navigator. Just keep one top-level app navigator.
Then it is easy to navigate between all the navigators, no special treatment is required. If you navigate to a route, then you'll go there, independently of which navigator you are in, and which navigator the route is defined in. Also, goBack() works in all the navigators uniformly.

Example: a top-level switch navigator, with a login screen and an app screen.

Be careful: **never render a navigator inside a screen**. Instead, set a navigator as a screen within another AppNavigator.

## Tab Navigators

Tab navigators have tabs, and like stack navigator, they don't unmount the hidden screens. 

There are several implementations of the tab navigator. Also, goBack works on tab navigators, it brings you back to the first tab. But you can configure it. The default tab navigator shows a tab bar at the bottom.

To create it, you need to define some routes, and that's pretty much it. If we compose navigators, we can have a Tab navigator that defines routes, in which other navigators can be defined, such as stack navigators.


# Advanced topics

There are more types of navigators available, such as:
- [Drawer Navigator](https://reactnavigation.org/docs/en/drawer-navigator.html)
- [Animated Switch](https://reactnavigation.org/docs/en/animated-switch-navigator.html)
-Material design (android style tab navigators: [Top](https://reactnavigation.org/docs/en/material-top-tab-navigator.html) and [Bottom](https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html)
- Additional [third-party libraries](https://reactnavigation.org/docs/en/community-libraries-and-navigators.html) define navigators.

React Navigation also supports deep linking, where a URI can be set up open a particular screen of an app from another application. For instance, a web browser link to an application may directly open the app store app, showing the app store's screen to install the application. You can find more details [here](https://reactnavigation.org/docs/en/deep-linking.html). 

React Navigation tries to implement most of its behavior in Javascript and React. This allows for more customization opportunities, and allows you to read and understand all the source code, should you want to do this. Another alternative would be to implement most of the behavior in native code, with a Javascript interface to show the API in React. The pros and cons of each approach are discussed [here](https://reactnavigation.org/docs/en/pitch.html), and an alternative library which takes the second approach (as much in native as possible) is [React Native Navigation](https://wix.github.io/react-native-navigation/#/). A declarative API on top of React Navigation is [react native router flux](https://github.com/aksonov/react-native-router-flux).

React Navigation has some known [limitations](https://reactnavigation.org/docs/en/limitations.html) to take into account.