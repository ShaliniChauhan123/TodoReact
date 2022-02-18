import "./styles.css";
import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMode: false,
      isChecked: false,
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleCheckboxChange(event) {
    this.setState({ isChecked: event.target.checked });
  }

  render() {
    return (
      <div
        class="App"
        className="App"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <input
            type="checkbox"
            onChange={this.props.handleCheckboxChange}
            checked={this.props.isChecked}
          />

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
            <div onClick={() => this.setState({ inputMode: true })}>
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
