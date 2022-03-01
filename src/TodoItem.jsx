import "./styles.css";
import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMode: false,
    };
  }

  render() {
    return (
      <div className="App1">
        <ul className="ulist">
          <div className="part1" style={{ display: "flex" }}>
            <input
              className="inputtext"
              type="checkbox"
              checked={this.props.todos}
              onChange={this.props.handleCheckboxChange}
            />

            <label>
              {this.state.inputMode ? (
                <input
                  className="newtodocopy"
                  value={this.props.value}
                  onChange={this.props.onChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.setState({ inputMode: false });
                    }
                  }}
                />
              ) : (
                <div
                  className={this.props.todos ? "text-strike" : "text-none"}
                  onClick={() => this.setState({ inputMode: true })}
                >
                  {this.props.title}
                </div>
              )}
            </label>
          </div>{" "}
          <div className="part2" onClick={this.props.onClick}>
            x
          </div>
        </ul>
      </div>
    );
  }
}
export default TodoItem;
