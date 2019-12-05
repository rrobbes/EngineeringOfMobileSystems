# React Hooks

Hooks are a way to define components in React and React Native, that has been introduced very recently. Hooks are however growing in popularity very quickly, due to their improvements over the alternatives. Many libraries are adopting them in their latest versions, so it is very likely that developing applications with React will soon mean using hooks. The full documentation on hooks [is available here](https://reactjs.org/docs/hooks-intro.html).

## Issues with class components
In a nutshell, hooks are provided as a solution for some of the shortcomings of class-based components. Class-based components are important in React, as they allow several things that function-based components can not:
- Class components can have **state** that persist accross re-renders. Since nearly all application needs to have some form of state, at least some of the components have to be classes. These components will manage the state, and may pass state and callbacks as props to other components.
- Class components also have a **life cycle**. They can execute specific behaviour when they are mounted or unmounted as **side effects**. Examples of these include fetching data from the internet or from disk when the component is initialized (during `componentDidMount`), or setting up timers (also in `componentDidMount`), while not forgetting to remove the timers to avoid bugs (in `componentWillUnmount`). Often, this behaviour also depends on the presence of state attributes (e.g., if the data in the component is empty, fetch it from disk; if there is nothing on disk, fetch data from the internet).

While class components are useful, they suffer from some issues:
- The logic due to a concern is scattered: setting up a timer involves `componentDidMount`, `componentWillUnmount`, as well as possibly other lifecycle methods. Sometimes, a `componentDidMount` method is involved in several concerns (e.g., setting up a timer, loading data from disk, and loading data from the internet). 
- Due to the scattering, similar logic is often duplicated in several lifecycle methods (e.g. in `componentDidMount`, `shouldComponentUpdate`, `componentWillUnmount`). 
- Having several concerns (persistence, connectivity, etc) in a single component makes it hard to reuse. Sometimes we would like to reuse the logic, but not the UI of a component. Some patterns exist to solve this (higher-order components, render props), but they introduce some complexity.
- In addition, class-based components are more verbose, and the behaviour Javascript classes are rather confusing (particularly with the `this` keyword). Class components, having both `props` and `state` objects, are harder to learn than regular objects. Using `this.props.property`, `this.state.property`, and `setState({property})` is also verbose.
- All of this makes class-based components significantly larger, and more complex.

## What are hooks

Hooks provide a way for functional components to have state and side effects. Class components, while still available (and they will stay available for backward compatibility), are no longer needed. This has several benefits:
- This makes React **simpler to work with**, as there are less concepts to learn, and it can be more uniform.
- The component life cycle is also significantly simplified.
- Functional component with hooks are **significantly less verbose** than class components.
- Hooks promote better separation of concerns, as all the code related to a single concern can be in the same place, instead of being scattered in several methods.
- Custom hooks can be defined to promote even better separation of concern. Custom hooks can be used to **reuse logic independently of the UI**. Hooks can replace most, if not all, usages of higher-order components or render props.

Some argue that [hooks are a better fit for the react mental model](https://dev.to/craigmichaelmartin/react-hooks-are-a-more-accurate-implementation-of-the-react-mental-model-1k49), than class components are, as they are more declarative.

## An example

As an example, let's compare a counter component as a class, and as a functional component with hooks:

As a Class:
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }

    increment = () => {
        this.setState({count: this.state.count + 1})
    }

    decrement = () => {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
                <Button title="++" onPress={this.increment}/>
                <Button title="--" onPress={this.decrement}/>
            </View>
        )
    }
}
```

As a function component with hooks:
```javascript
const Counter = (props) => {
    const [count, setCount] = useState(0)
    increment = () => setCount(count + 1)
    decrement = () => setCount(count - 1)

    return (
        <View>
            <Text>{count}</Text>
            <Button title="++" onPress={increment}/>
            <Button title="--" onPress={decrement}/>
        </View>
        )
}
```

As you can see, the second component is much less verbose. We'll see the details soon, but, at a glance, we see:
- no constructor or render method in the hook version
- shorter way to access the state (`this.state.count` vs `count`)
- shorter way to change the state (`useState(...)` vs `setCount`)

So ... how does this work?

## How do hooks work
You can think of hooks as a "magic feature" that "just works". However it's important to have an intuition of how they work. In a version of React that supports hooks, every component is associated with a data structure outside of the components. This data structure is essentially a list of all of the information that the hooks defined in that function use.

When a hook is invoked in during the rendering of a react component, this information is fetched from that data structure, and returned to that component. This is what allows the component to maintain state and a lifecycle while still being a functional components. For this model to work, there are only **two rules** that needs to be followed.

See more information [here](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e). 

## The rules of hooks
The rules that need to be followed are:
- **Don't call hooks inside conditionals or loops**. For performance reasons, React relies on the hooks being called **in the same order** accross each re-renders (they are in a sort of queue). 
- **Only call hooks from React components, or custom hooks**. Hooks are attached to a component, so they must be called from inside a component, directly or indirectly. Do not call hooks from regular javascript functions.
- **hook names should start with `use`**. This is more of a convention, but if you define a custom hook, prefix its name with `use`, so that developers (and the IDE) can recognize it's a hook. This allows the IDE to check if the other rules are followed. Avoid this prefix for other function names.

The first rule deserves more explanation:
```javascript
const MultiCounter = (props) => {
    if (props.first) {
        const [count, setCount] = useState(1)
        increment = () => setCount(count + 1)
        return (
            <View>
                <Text>{count}</Text>
                <Button title="++" onPress={increment}/>
            </View>
        )
    } else {
        const [count2, setCount2] = useState(2)
        decrement2 = () => setCount2(count2 - 1)
        return (
            <View>
                <Text>{count2}</Text>
                <Button title="--" onPress={decrement2}>
            </View>
        )
    }
}
```

You can see that depending on the value of the prop, different hooks will be called, which will result in bugs.
The solution is to always call all the hooks in the same order, like in the following:

```javascript
const MultiCounter = (props) => {
   
    const [count, setCount] = useState(1)
    increment = () => setCount(count + 1)
       
    const [count2, setCount2] = useState(2)
    decrement2 = () => setCount2(count2 - 1)
         
    return props.first?
        (<View>
                <Text>{count}</Text>
                <Button title="++" onPress={increment}>
            </View>):
        (<View>
                <Text>{count2}</Text>
                <Button title="--" onPress={decrement2}>
            </View>)
}
```

See more [here](https://reactjs.org/docs/hooks-rules.html)


## The useState hook

The first hook is `useState`, that we saw above. `useState` allows us to attach state to a function component, by declaring a state variable. The `useState` hook is invoked with one argument, which is the initial value of the state. The first call of `useState` to useState will initialize the variable. `useState` returns an array of two objects, which are:
- The **current value of the state**. This will be a new state variable, initialized to the argument to `useState`, the first time the component is rendered. On subsequent calls, the current value will be fetched and returned.
- A **function to change the state**. This function sets the state variable to a new value, **just as setState would do**. After changing the state, the **component will be re-rendered**, just as if setState was called. Just like setState, we can use it in callbacks, etc ...

 We can use the destructuring assignment to get both objects at once, and name them as we'd like. By convention, one would be called `x`, and the other `setX`:

 ```javascript
 const Counter = (props) => {
    const [count, setCount] = useState(0)

    return (
        <View>
            <Text>{count}</Text>
            <Button title="++" onPress={() => setCount(count + 1)}/>
            <Button title="--" onPress={() => setCount(count - 1)}/>
        </View>
        )
}
```

In that example, `setCount(count + 1)` would be exactly equivalent to `setState({count: this.state.count + 1})`. The advantage is that the `setCount` knows that it will be used to change the count property, so it can be less verbose. 

More than one setState can be used:
```javascript
const ThreeCounters = (props) => {
    const [c1, setC1] = useState(0)
    const [c2, setC2] = useState(0)
    const [c3, setC3] = useState(0)
    // ...
```

As long as the calling order is respected, things will work. Usually, each state property would be defined as with a separate setState. You can define a `useState` that works on a full object, but then you need to set the entire state (useState does not support merging new properties and old one as setState does). 

On the other hand, `setCount` can also take a callback as its argument, which will be called with the current version of the state:
```javascript
const Counter = (props) => {
   
    const [count, setCount] = useState(1)
    increment = () => setCount(c => c + 1)
```

See more on setState [here](https://reactjs.org/docs/hooks-state.html) and [here](https://reactjs.org/docs/hooks-reference.html#usestate) and a discussion on multiple versus single useState [here](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## The useEffect hook

`useEffect` allows you to perform **side effects** in your functional components, and provide support for actions that would be supported by life cycle methods in class components: initialization (`componentDidMount`), recomputing when needed (`shouldComponentUpdate`), or cleanup (`componentWillUnmount`). Example usages would be fetching data from disk or the internet, setting up subscription to even handlers, and any **async** function in general.

### useEffect for initialization 
The simplest form of `useEffect` takes as argument a function, that will be executed **after the component is rendered**. The effect is allowed to change the state of the component, which will re-render it. For instance:

```javascript
const UserList = props => {
    const [users, setUsers] = useState(["loading data ..."])

    useEffect(() => {
        userData = // fetch data from disk or internet
        setUsers(userData)
    })

    return // render component
}
```

See the code examples for functional implementations. Note that the effect will run **each time the component is rendered**. 

### useEffect for cleanup

`useEffect` can also **return a callback function**. This function will be executed **when it is time to cleanup**. For instance, with an interval, one can do:

```javascript
const WebServiceChecker = props => {
    const [data, setData] = useState("some data")

    const checkWebServiceForNewData = () => {
        // if new data, fetch it and set the state of the component
        if (newData !== null ) {
            setData(newData)
        }
    }

    useEffect(() => {
        // check the web service every 30 seconds
        const interval = setInterval(checkWebServiceForNewData, 30 * 1000)
        // return method to do cleanup on unmount
        return () => clearInterval(interval)
    })

    // renders the component
    return //...
}
```

When is it time to cleanup? By default, it is:
- When the component is unmounted
- Before the effect is re-run

### useEffect on prop/state change

Some components need to perform a side effect when their props and state change. For instance, a component that shows user profiles:

```javascript
const UserProfile = props => {
    const [profile, setProfile] = useState("user data")

    const getProfileFromWeb = userID => {
        // fetch data for user based on userID
        userData = // ...
        setProfile(userData)
    }

    useEffect(() => {
        getProfileFromWeb(props.userID)
    }, [props.userID])

    return // render the user profile
}
```

`useEffect` accepts as second argument an array of "watched" object or properties. If any one of the "watched" objects change when the component is re-rendered, the effect is re-executed (the cleanup of the previous effect will execute too). If none of the "watched" objects in the array have changed, the effect will be skipped. In the example above, the effect will re-run only if the `userID` prop changes. This makes sense, because it means we want to display a new profile. Note that **it is very important to list all the important properties in this array**: if some are missed, the effect may fail to run when you expect it to run. Essentially, every piece of state or prop that is referenced in the effect should be put in the array to be "watched".

**Running an effect only once** is possible. In that case, the second argument can be set to an empty array. This ensures that the array will never change. In that case, the effect will be run when the component is mounted, and the cleanup will be performed when the component is unmounted.

### Multiple useEffects

It is allowed to use multiple effects in a single component. This is even recommended. It allows to better separate concern (e.g. one effect for loading things from disk, another effect for checking a webservice periodically, etc). Further, this allows to better specify when each effect should be run. Each effect can "watch" different properties and update at different paces, instead of recomputing all effects at once. For instance:

```javascript
const LoadAndPing = props => {
    const loadDataFromDisk = ()) => // ...
    useEffect(() => loadDataFromDisk(props.fileName), [props.fileName])

    const pingWebService = () => {
        fetch(props.url).then( //... 
    }
    
    useEffect(() => {
        // check the web service every 30 seconds
        const interval = setInterval(pingWebService, 30 * 1000)
        // return method to do cleanup on unmount
        return () => clearInterval(interval)
    }, [props.url])
}
```

[More on useEffect](https://reactjs.org/docs/hooks-effect.html)

## other hooks:
Several basic hooks exist in the React API. They can be seen in the [Hook API Reference]((https://reactjs.org/docs/hooks-reference.html)
- `useContext`: to access a shared React Context object (see lesson 12)
- `useReducer`: a "lightweight" redux for single components with complex state
- `useMemo`: used to memoize expensive computations. Takes a function to execute, but also "watches" object (like useEffect) to avoid  recomputing the functions unless the "watched" object changed.
- `useRef`: a way to access a mutable value that persist accross renders. Changing it does not cause re-renders however.

There are some more as well that you can check in the API. 



# Custom hooks

While single hooks are convienent, one of the most important strengths of hooks is how much they facilitate reuse through **custom hooks**. Defining a custom hook can be as simple as moving the relevant code to a new function (starting with `use` for conventions), and call it in the component. Let's define a custom hook to reuse the logic of a counter.

We had:
```javascript
const Counter = (props) => {
    const [count, setCount] = useState(0)
    increment = () => setCount(count + 1)
    decrement = () => setCount(count - 1)

    return (
        <View>
            <Text>{count}</Text>
            <Button title="++" onPress={increment}/>
            <Button title="--" onPress={decrement}/>
        </View>
        )
}
```

Which we can reuse by extracting a `useCounter` hook:

```javascript
const useCounter = (initialValue, increment = 1) => {
    const [count, setCount] = useState(initialValue)
    increment = () => setCount(count + increment)
    decrement = () => setCount(count - increment)
    return [count, increment, decrement]
}

const Counter = (props) => {
    const [count, increment, decrement] = useCounter(0)

    return (
        <View>
            <Text>{count}</Text>
            <Button title="++" onPress={increment}/>
            <Button title="--" onPress={decrement}/>
        </View>
        )
}

const AutoCounter = (props) => {
    const [count, increment, ...] = useCounter(0, 5)

    useEffect(() => {
        const interval = setInterval(increment, 30 * 1000)
        return () => clearInterval(interval)
    }, [])

     return (
        <View>
            <Text>{count}</Text>
        </View>
     )
}
```

We can now reuse the "counter logic" in several react components. In the code examples, there are more examples of custom hooks:
- A hook to fetch data from a webservice
- A hook that caches the fetched data to avoid re-querying it
- A hook to persist state
- A hook to ease setting up and changing intervals

Note that the last one is bit more subtle, as the setInterval API is not so aligned with hooks. Changing an interval can be a bit tricky. There is a full explanation of the `useInterval` hook [here](https://overreacted.io/making-setinterval-declarative-with-react-hooks/), by one of the main React contributors.

## Custom hooks libraries

There are some custom hooks specific to React Native [here](https://github.com/react-native-community/react-native-hooks).

The author of the unstated library has released a version that supports hooks: [unstated-next](https://github.com/jamiebuilds/unstated-next).

React Navigation has an **upcoming** version of the library that [supports hooks for navigation](https://reactnavigation.org/docs/en/next/use-navigation.html#docsNav).

[React Springs](https://www.react-spring.io) can be used to animate your UI, and supports [hooks](https://www.react-spring.io/docs/hooks/basics). 

More examples from a [dedicated website](https://usehooks.com). Note that some of those may work only for React, not React Native. And an [awesome list](https://github.com/rehooks/awesome-react-hooks) of even more hooks.



