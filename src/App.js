import "./styles.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import expandMore from "./expandMore.svg";
import expandMore1 from "./expandMore1.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
      todos1: [],
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

          this.setState({ change: "yes" });
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
              {this.state.change === "no" ? (
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
                      todos1: [...this.state.todos, newTask],
                      title: "",
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
                    todos={todoDetail.completed}
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

              //(

              // <div key={todoDetail.id} style={{ display: "flex" }}>
              //   <div>{todoDetail.title}</div>
              //   <div onClick={() => this.handleTodoDelete(todoDetail.id)}>D</div>
              // </div>
              //);
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
                      todos={todoDetail.completed}
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

                //(

                // <div key={todoDetail.id} style={{ display: "flex" }}>
                //   <div>{todoDetail.title}</div>
                //   <div onClick={() => this.handleTodoDelete(todoDetail.id)}>D</div>
                // </div>
                //);
              })}
            </div>
          )}
          {this.state.todos.length !== 0 ? (
            <div className="footer">
              <div className="filters1">
                <div className="spacingforfooter">
                  {this.state.mode === "Completed"
                    ? this.getCompletedCount(this.state.todos)
                    : this.state.todos.length -
                      this.getCompletedCount(this.state.todos)}
                </div>

                <div>
                  {(this.state.mode === "All" &&
                    this.state.todos.length -
                      this.getCompletedCount(this.state.todos) ===
                      1) ||
                  (this.state.mode === "Active" &&
                    this.state.todos.length -
                      this.getCompletedCount(this.state.todos) ===
                      1) ? (
                    <span> item l</span>
                  ) : (
                    <div>
                      {(this.state.mode === "All" &&
                        this.state.todos.length -
                          this.getCompletedCount(this.state.todos) !=
                          1) ||
                      (this.state.mode === "Active" &&
                        this.state.todos.length -
                          this.getCompletedCount(this.state.todos) !=
                          1) ? (
                        <span> items l</span>
                      ) : (
                        <div>
                          {this.state.mode === "Completed" &&
                          this.getCompletedCount(this.state.todos) === 1 ? (
                            <span> item l</span>
                          ) : (
                            <span> items l</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span> eft</span>
              </div>

              <div className="filters2">
                <ul>
                  <li onClick={() => this.setState({ mode: "All" })}>All </li>
                  <li onClick={() => this.setState({ mode: "Active" })}>
                    Active{" "}
                  </li>
                  <li onClick={() => this.setState({ mode: "Completed" })}>
                    Completed
                  </li>
                </ul>
              </div>
              {this.getCompletedCount(this.state.todos) >= 1 ? (
                <div className="filters2">
                  <ul>
                    <li onClick={() => this.clearCompleted(this.state.todos)}>
                      Clear completed
                    </li>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
export default App;
