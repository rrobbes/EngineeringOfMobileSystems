import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';
import Constants from 'expo-constants';


const Todo = props => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Switch value={props.task.checked} onValueChange={props.onChecked}/>
     <Text>Todo: {props.task.task} id: {props.task.id}</Text>
      <Button onPress={props.onDelete} title="delete" />
    </View>
  );
};

const TodoStats = props => {
  return (<View>
      <Text>todo statistics</Text>
        <Text>Number of todos: {props.todos.length}</Text>
        <Text> Number of todos done:
        {props.todos.filter(todo => todo.checked).length}
        </Text>
        <Text>Number of todos left:
        {props.todos.filter(todo => !todo.checked).length}
  </Text>
  </View>);
}

export default class TodoApp extends React.Component {
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
    const task = "todo text";
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
      <View style={styles.container}>
        <Text style={{fontSize: 36}}>Awesome Todo App</Text>
        <Text style={styles.paragraph}>You have the following todos:</Text>
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
              task={todo}
              onDelete={() => this.deleteTodo(todo.id)}
              onChecked={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ScrollView>
        <Button onPress={() => this.addTodo()} title="Add todo" />
        <TodoStats todos={this.state.todos}/>
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
});
