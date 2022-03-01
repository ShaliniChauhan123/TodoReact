import "../styles.css";
import React from "react";
import done from "../assets/done.svg";

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
            <div class="part1i">
              <div
                className={this.props.completed ? "circlegreen" : "circle"}
                onClick={this.props.handleCheckboxChange}
              >
                {this.props.completed ? (
                  <img className="doneimg" src={done} alt="done" />
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="writtenpart">
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
                  className={this.props.completed ? "text-strike" : "text-none"}
                  onClick={() => this.setState({ inputMode: true })}
                >
                  {this.props.title}
                </div>
              )}
            </div>
            <div className="part2" onClick={this.props.onClick}>
              x
            </div>
          </div>{" "}
        </ul>
      </div>
    );
  }
}
export default TodoItem;
