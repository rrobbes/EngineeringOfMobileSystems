# Building a todo list in React

We will practice React by building a very simple todo list application in React. 


While doing so we will refresh the React Concepts we've seen last week:
- Components
- JSX
- Props
- Pure Components
- State
- Class Components with state

 We will explore a few alternatives and extensions to the app, depending on time limits.

## App functionality
Our "application" will have the following functionality:

- Display a list of tasks to do
- Add a new todo, asking the user for the text
- Marking a todo as "done"
- Delete a todo
- Display statistics: number of todos, number of done todos, number of todos left

## App state

Given the functionality, we need some sort of data model. We will use the following:
- The app will have a list of todo items
- The app will also have maintain an ID, to be used for todos

Furthermore, each todo will have
- A text description (a string)
- A boolean telling us whether the task was done or not
- An ID, unique for each todo

## Extensions

- Define a component for the statistics
- Add priorities to todos
- Anything you want!

# Thinking in React

There are various nice resources on the React website on how to design React applications. We will come back to this during the course. In the meantime, here are some general principles:
- As mentioned several time already, React is influenced by functional programming concepts. This means that you should limit the amount of state you use, and limit the number of components that have state.
- Deep class hierarchies are not recommended in React. It's better to use [composition of components](https://reactjs.org/docs/composition-vs-inheritance.html), rather than using inheritance (except inheriting from React.Component). In fact, we will see later on that it is possible to write entire applications without using classes, thanks to [Hooks](https://reactjs.org/docs/hooks-intro.html).
- In React, it's easy to pass data from components to sub-components. Data tends to flow down the tree of UI components.
- To transmit information to parent components, callbacks passed as props should be used. The parent component defines a callback, and passes it to the child component.
- Based on this, if two components need to share state that changes, the best location to put it is in a parent that they have in common. State should be [lifted](https://reactjs.org/docs/lifting-state-up.html) to this component. The children components will then be updated when the state change. They can request changes to the state using callbacks.


There is a nice resource on React's website on how to define an application with React, with a nice step-by-step example. Have a look [here](https://reactjs.org/docs/thinking-in-react.html). Briefly, the steps are:
- Break the UI in a component hierarchy (who would have guessed?).
- Build a static version of the UI in React (rendering a fix data structure). 
- Identify the minimal state needed (and what part of the data can be simply computed, not kept as state).
- Identify where the state should live (i.e., which component should manage which state).
- Add Inverse data flow (passing callbacks as props to the components that need it).


