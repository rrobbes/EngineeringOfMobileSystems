# React Native

In this class we will cover general concepts of React Native, showing several examples in the process. This class is based in part on [CS50 Lecture 3](https://video.cs50.net/mobile/2018/spring/lectures/3).

## React vs React Native

React Native (RN from now on) is based on the React framework. The principal concepts are similar to the ones of React, with some differences that we will cover. RN is also based on the principles of Components that are rendered to form a tree of UI elements, with the same functional-style abstractions (e.g. pure components with Props, class components with a carefully managed state), and the same rendering strategies.

What changes significantly is how the concepts are implemented behind the scenes, and the API (the basic components) that is used. This is why RN's tagline is ``learn once, write anywhere'': the concepts are the same, but there are some differences. We will see that porting a component from one framework to the other is not that hard, however.

## RN's implementation

To execute JS in a mobile application, RN uses a JS engine [JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore), or [Hermes](https://facebook.github.io/react-native/docs/hermes/) to execute the application, which communicates with a native thread. The JS code is transpiled to ES5 (allowing more recent JS versions to be used), and is minified, along with all the included libraries, to reduce its size. 

The native thread is specific to the platform the application is running in (e.g., iOS, Android, or the web browser). The native thread communicates with the Javascript thread to a bridge. The threads use this bridge to send messages to each other:
- The JS thread indicates to the native thread the native UI components that should be displayed
- The Native thread watches for user activity, and notifies the JS thread when, e.g., a button is pressed. In return, the JS thread can execute callbacks.

One nice property of this model is that both thread execute separately. One thread can be blocked, while the other continues to execute. This is useful to ensure the UI is smooth: the native UI thread does not execute the callbacks itself, it merely sends messages to the JS thread. This is in contrast to for instance, Android, which by default executes all code on the UI thread. Developers must explicitely indicate that codes executes outside of the UI thread. RN makes this automatic, simplifying a significant headache of Android development, which can result in either more complex code or choppy UIs.

**Example: blocking UI**

## API differences between RN and React

While the base concepts are similar, all the base components are different. In React, they are HTML components, while in RN, they are base UI components instead. For instance, `<div>`s are usually replaced by `<Views>`; `<span>`s, `<p>`s, `<hx>`s are replaced by `<Text>` components (all texts in RN should use the `<Text>` component). HTML `<button>`s will be replaced by RN `<Button>`s which have different properties, or by various [Touchables](https://facebook.github.io/react-native/docs/handling-touches). Lists (`<ul>`, `<li>`) will be often replaced with `<ScrollView>`s, or more advanced [RN lists](https://facebook.github.io/react-native/docs/using-a-listview). 

The documentation lists all the basic components (e.g, for [text input](https://facebook.github.io/react-native/docs/handling-text-input)). We will see additional components on an as-needed basis. Feel free to consult the documentation on your own.

The imported packages and entities will of course be different. Some of the convenient web browser APIs are not provided (e.g. `prompt`), but others have alternate implementations (e.g., `fetch`), and additional packages provide similar functionality.

As an example, we can port the todo app from React to RN. 

**Example: todo list app in RN**

## Styling components

Styling components is somewhat different in RN than in React, although the general principle is the same: 
- UI components can have [style properties](https://facebook.github.io/react-native/docs/style). 
- They are described by JS objects, with properties that are similar to CSS properties (but not identical, e.g. camelCase is used).
- Example properties include padding, margins, colors, fonts, etc. 
- Style also includes [width and height](https://facebook.github.io/react-native/docs/height-and-width), and [layout with Flexbox](https://facebook.github.io/react-native/docs/flexbox)

The RN tutorials linked above go in quite a lot of details on style. A few general remarks:
- Components are styled with a style property, which is a JS object, this leads to double braces: `<View style={{width: 50, height: 50}}>`.
- Components can have an **array of style objects**. This is useful for modularity: the common parts can be defined separately: 
```javascript
const generalStyle = {color: blue}
// ...
<View style={[generalStyle, {width: 50}]}>
```
- The [StyleSheet](https://facebook.github.io/react-native/docs/stylesheet) package can be used to define stylesheet. The advantage it has is that it is bridge aware: a style sheet can be defined, sent over the bridge, and reused multiple times, without sending the whole style object with the bridge. Only an ID is transmitted over the bridge.
- RN components often come bundled with their styles defined in the same file, as React and RN favor self-contained component. However, common style definitions (e.g., for color themes) can also be defined in common modules, and imported by the actual components, if this is needed.

## Components and Lifecycle

We have seen Components already. There are two types (for now[...](https://reactjs.org/docs/hooks-intro.html)):
- Stateless Functional Components are pure functions of their props. They don't have state, and are literally be implemented as pure functions. Changes to props will cause re-renders.
- Class Components inherit from React.Component, and can have state. Rendering depends on both the props, and the state. Instances are created by React at runtime (not explicitely by the developer), and they persist (with their state) accross renders. Changes to props or state will cause re-render.

Moreover, Class components have a variety of [lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html) that are called by React at various points. They can be redefined to implement specific behaviours. There are three phases:
- Mounting the component, which covers its initialization.
- Updating the component, which covers how it is updated when state or props change.
- Unmounting the component, for cleanup

### Mounting the component
The following methods are called:
- The `constructor(props)` of the class component, where the state is initialiazed, and class properties can be added.
- The `render()` method is called for the first time, rendering the actual UI for the first time.
- Afterwards, `componentDidMount()` is called. Actions that are not needed for the UI (eg network requests, timers) can be executed here. The state can change as a result. If that is the case, `render()` will be called a second time

### Updating

Updating is divided in several steps:

- `componentWillReceiveProps(nextProps)` is called first. It can be used to recompute state that relies on the props.
- `shouldComponentUpdate(nextProps, nextState)` is then called. It returns true if the component should render given the new state (the default), or false if it should not re-render (in that case, the update cycle ends). It can be used to optimize the application in case rendering the component is expensive, but is often premature.
- `render()` is then called, as above.
- `componentDidUpdate(prevProps, prevState)` is then called, where similar actions as `componentDidMount()` can be done.

### Unmounting

When Unmounting, `componentWillUnmount()` is called. It can be defined to perform cleanup operations, such as cancelling network requests or timers.

## A note on framework implicit calls

React and RN are frameworks. In frameworks (in contrast with libraries), some methods or functions are defined by the developer in a declarative manner, and called by the framework, when it needs to. This can make it a bit harder to understand how the code work in the beginning, and can be sometimes harder to debug. But it makes it more productive to work with the framework when one is used to it. 

The entire set of lifecycle methods (including rendering) are examples of methods/functions that are called by React, not explicitely by the developer.
