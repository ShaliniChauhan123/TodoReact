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
      <div
        className="App"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <input type="checkbox" onChange={this.props.handleCheckboxChange} />

          {this.state.inputMode ? (
            <input
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
        </div>
        <div onClick={this.props.onClick}>Delete</div>
      </div>
    );
  }
}
export default TodoItem;
