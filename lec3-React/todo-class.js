import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// todo application
// you can try it by pasting the code in 
// https://codesandbox.io/

const Todo = props => {
  return (
    <div>
      <input
        type="checkbox"
        value={props.task.checked}
        onChange={props.onChecked}
      />
      <li>
        Todo: {props.task.task} id: {props.task.id}
      </li>
      <button onClick={props.onDelete}>delete</button>
    </div>
  );
};

const TodoStats = props => {
  return (<div>
      <h2>todo statistics</h2>
        <p>Number of todos: {props.todos.length}</p>
        <p> Number of todos done:
        {props.todos.filter(todo => todo.checked).length}
        </p>
        <p>Number of todos left:
        {props.todos.filter(todo => !todo.checked).length}
  </p>
  </div>);
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      id: 0
    };

    const sampleTodo = {
      task: "something to do",
      checked: false,
      id: 2343
    };
  }

  addTodo() {
    const task = prompt("what do you want to do?");
    const newTodo = { task: task, checked: false, id: this.state.id };
    const newTodos = [newTodo, ...this.state.todos];
    this.setState({ todos: newTodos });
    this.setState(previousState => ({ id: previousState.id + 1 }));
  }

  deleteTodo(todoId) {
    const newTodos = this.state.todos.filter(td => td.id !== todoId);
    this.setState({ todos: newTodos });
  }

  toggleTodo(todoId) {
    let list = this.state.todos;
    //const foundTodo = list.find(todo => todo.id === todoId);
    //foundTodo.checked = !foundTodo.checked ;
    const newList = list.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, checked: !todo.checked };
      } else {
        return todo;
      }
    });
    this.setState({ todos: newList });
  }

  render() {
    return (
      <div className="App">
        <h1>Awesome Todo App</h1>
        <h2>You have the following todos:</h2>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              task={todo}
              onDelete={() => this.deleteTodo(todo.id)}
              onChecked={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ul>
        <button onClick={() => this.addTodo()}>Add todo</button>
        <TodoStats todos={this.state.todos}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
