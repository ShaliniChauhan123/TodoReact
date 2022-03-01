import "../styles.css";
import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.todos.length !== 0 ? (
          <div className="footer">
            <div className="filters1">
              <div className="spacingforfooter">
                {this.props.mode === "Completed"
                  ? this.props.getCompletedCount
                  : this.props.todos.length - this.props.getCompletedCount}
              </div>

              <div>
                {(this.props.mode === "All" &&
                  this.props.todos.length - this.props.getCompletedCount ===
                    1) ||
                (this.props.mode === "Active" &&
                  this.props.todos.length - this.props.getCompletedCount ===
                    1) ? (
                  <span> item l</span>
                ) : (
                  <div>
                    {(this.props.mode === "All" &&
                      this.props.todos.length - this.props.getCompletedCount !==
                        1) ||
                    (this.props.mode === "Active" &&
                      this.props.todos.length - this.props.getCompletedCount !==
                        1) ? (
                      <span> items l</span>
                    ) : (
                      <div>
                        {this.props.mode === "Completed" &&
                        this.props.getCompletedCount === 1 ? (
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
                <li onClick={this.props.set1}>
                  <a className="selected" href="#/all">
                    All
                  </a>{" "}
                </li>
                <li onClick={this.props.set2}>
                  <a href="#/active">Active</a>
                </li>
                <li onClick={this.props.set3}>
                  <a href="#/completed">Completed</a>
                </li>
              </ul>
            </div>
            <div
              className={
                this.props.getCompletedCount >= 1 ? "filters3" : "filtersnone"
              }
            >
              <ul>
                <li onClick={this.props.clearCompleted}>
                  <a>Clear completed</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default Footer;
