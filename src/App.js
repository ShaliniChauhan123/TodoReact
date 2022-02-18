import "./styles.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: " ",
      todos: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleTodoEdit1(eventValue, clickedId) {
    console.log(eventValue, clickedId);

    this.setState({
      todos: [...this.state.todos].map((item) => {
        if (item.id === clickedId) {
          item.task = eventValue;
        }
        return item;
      }),
    });
  }

  handleTodoDelete(clickedId) {
    console.log(clickedId);
    this.setState({
      todos: [...this.state.todos].filter((item) => item.id !== clickedId),
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Todo</h1>
        <input
          type="text"
          value={this.state.title}
          placeholder="Enter todo items"
          onChange={this.handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              let newTask = {
                task: this.state.title,
                id: uuidv4(),
                completed: false,
              };
              this.setState({
                todos: [...this.state.todos, newTask],
                title: "",
              });
            }
          }}
        />
        {this.state.todos.map((todoDetail) => {
          return (
            <div key={todoDetail.id}>
              <TodoItem
                key={todoDetail.id}
                todos={todoDetail}
                title={todoDetail.task}
                onClick={() => this.handleTodoDelete(todoDetail.id)}
                value={todoDetail.task}
                onChange={(e) =>
                  this.handleTodoEdit1(e.target.value, todoDetail.id)
                }
              />
            </div>
          );

          //(

          // <div key={todoDetail.id} style={{ display: "flex" }}>
          //   <div>{todoDetail.title}</div>
          //   <div onClick={() => this.handleTodoDelete(todoDetail.id)}>D</div>
          // </div>
          //);
        })}
      </div>
    );
  }
}
export default App;
