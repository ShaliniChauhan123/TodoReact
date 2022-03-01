import "../src/styles.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./components/TodoItem";
import Footer from "./components/Footer";
import expandMore from "./assets/expandMore.svg";
import expandMore1 from "./assets/expandMore1.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
      mode: "All",
      change: "no",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  selectAll(todos) {
    var flag = 0;

    this.setState({
      todos: [...this.state.todos].map((item) => {
        if (this.state.change === "no" || item.completed === false) {
          item.completed = true;
          flag = 1;
          if (
            this.getCompletedCount(this.state.todos) !== this.state.todos.length
          ) {
            this.setState({ change: "yes" });
          }
        }

        if (flag !== 1) {
          item.completed = false;
          this.setState({ change: "no" });
        }

        return item;
      }),
    });
  }
  getCompletedCount = (todos) =>
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
  clearCompleted = (todos) =>
    this.setState({
      todos: [...this.state.todos].filter((item) => !item.completed),
    });
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
  handleCheckboxChange(clickedId) {
    console.log("zzzzz", clickedId);
    this.setState({
      todos: [...this.state.todos].map((item) => {
        if (item.id === clickedId) {
          item.completed = !item.completed;
        }
        return item;
      }),
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">todos</h1>
        <div className="body1">
          <div className="division">
            <div className="first">
              {this.state.todos.length >= 1 ? (
                <div>
                  {this.state.change === "no" &&
                  this.getCompletedCount(this.state.todos) !==
                    this.state.todos.length ? (
                    <img
                      onClick={() => this.selectAll(this.state.todos)}
                      src={expandMore}
                      alt="expandMore"
                    />
                  ) : (
                    <img
                      onClick={() => this.selectAll(this.state.todos)}
                      src={expandMore1}
                      alt="expandMore1"
                    />
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="second">
              <input
                className="newtodo"
                value={this.state.title}
                placeholder="What needs to be done?"
                onChange={this.handleChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && this.state.title.length >= 1) {
                    let newTask = {
                      task: this.state.title,
                      id: uuidv4(),
                      completed: false,
                    };

                    this.setState({
                      todos: [...this.state.todos, newTask],
                      title: "",
                      change: "no",
                    });
                  }
                }}
              />
            </div>
          </div>
          {this.state.mode === "All" ? (
            this.state.todos.map((todoDetail) => {
              return (
                <div>
                  <TodoItem
                    key={todoDetail.id}
                    completed={todoDetail.completed}
                    title={todoDetail.task}
                    onClick={() => this.handleTodoDelete(todoDetail.id)}
                    value={todoDetail.task}
                    onChange={(e) =>
                      this.handleTodoEdit1(e.target.value, todoDetail.id)
                    }
                    handleCheckboxChange={() =>
                      this.handleCheckboxChange(todoDetail.id)
                    }
                    selectAll={() => this.selectAll(this.state.todos)}
                  />
                </div>
              );
            })
          ) : (
            <div>
              {[
                ...this.state.todos.filter((t) =>
                  this.state.mode === "Active"
                    ? t.completed === false
                    : t.completed === true
                ),
              ].map((todoDetail) => {
                return (
                  <div>
                    <TodoItem
                      key={todoDetail.id}
                      completed={todoDetail.completed}
                      title={todoDetail.task}
                      onClick={() => this.handleTodoDelete(todoDetail.id)}
                      value={todoDetail.task}
                      onChange={(e) =>
                        this.handleTodoEdit1(e.target.value, todoDetail.id)
                      }
                      handleCheckboxChange={() =>
                        this.handleCheckboxChange(todoDetail.id)
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
          <Footer
            getCompletedCount={this.getCompletedCount(this.state.todos)}
            todos={this.state.todos}
            change={this.state.change}
            mode={this.state.mode}
            clearCompleted={() => this.clearCompleted(this.state.todos)}
            set1={() => this.setState({ mode: "All" })}
            set2={() => this.setState({ mode: "Active" })}
            set3={() => this.setState({ mode: "Completed" })}
          />
        </div>
      </div>
    );
  }
}
export default App;
