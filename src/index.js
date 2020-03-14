import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.text.length) {
      if (window.confirm("Review cannot be empty")) {
        return true;
      } else {
        throw new Error("Review cannot be empty");
      }
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({ items: state.items.concat(newItem), text: "" }));
  }
  render() {
    return (
      <div>
        <div id="review">
          <br />
          <br />

          <label htmlFor="new-review">
            <span className="review-text">Review the progress bar system:</span>
            <span className="review-text-2">
              (You can write as many as you want!)
            </span>
          </label>
          <br />
          <br />
          <br />
          <br />

          <textarea
            id="new-review"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="Review the progress bar system:"
          />
          <br />
          <button
            className="add-review normal-button"
            onClick={this.handleSubmit}
          >
            Add Review
          </button>
          <List items={this.state.items} />
        </div>
        <div className="separation" />
        <div id="thanks">
          <p>
            Thank you for visiting this website. Please check more of my
            projects if you want to. <span className="bye">Bye!</span>
          </p>
        </div>
        <div className="separation" />
      </div>
    );
  }
}

function List(props) {
  return (
    <div>
      {props.items.map(item => (
        <div className="reviews-border">
          <div className="separation" />
          <p className="reviews" key={item.id}>
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      maxProgressValue: "x",
      popupNumber: 0,
      buttonValue: "Change Settings"
    };
    this.setMaxValue = this.setMaxValue.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.stop = this.stop.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.changeMaxValue = this.changeMaxValue.bind(this);
    this.getMaxProgressValue = this.getMaxProgressValue.bind(this);
    this.getProgressValue = this.getProgressValue.bind(this);
    this.changeProgressValue = this.changeProgressValue.bind(this);
    this.findPercentage = this.findPercentage.bind(this);
  }
  maxProgressAlgorithm(maxProgress, idstring) {
    if (!isNaN(maxProgress)) {
      if (parseInt(maxProgress, 10) > 1) {
        if (maxProgress < 220) {
          this.setState({
            maxProgressValue: parseInt(maxProgress, 10)
          });
          document.getElementById(idstring).value = "";
        } else {
          document.getElementById(idstring).value = "";
          if (
            window.confirm(
              "Maximum progress value must be less than 220 to use"
            )
          ) {
            return true;
          } else {
            throw new Error(
              "Maximum progress value must be less than 220 to use"
            );
          }
        }
      } else {
        document.getElementById(idstring).value = "";
        if (maxProgress !== "") {
          if (
            window.confirm(
              "Maximum progress value must be greater than 1 to use"
            )
          ) {
            return true;
          } else {
            throw new Error(
              "Maximum progress value must be greater than 1 to use"
            );
          }
        } else {
          if (window.confirm("Input cannot be blank")) {
            return true;
          } else {
            throw new Error("Input cannot be blank");
          }
        }
      }
    } else {
      document.getElementById(idstring).value = "";
      if (window.confirm("Maximum progress value must be a number")) {
        return true;
      } else {
        throw new Error("Maximum progress value must be a number");
      }
    }
  }
  setMaxValue(event) {
    event.preventDefault();
    if (this.state.maxProgressValue === "x") {
      var maxProgress = document.getElementById("max-progress").value;
      this.maxProgressAlgorithm(maxProgress, "max-progress");
    } else {
      document.getElementById("max-progress").value = "";
      if (
        window.confirm(
          "Maximum progress value already set, change settings instead"
        )
      ) {
        return true;
      } else {
        this.setState({ maxProgressValue: "x" });
        throw new Error(
          "Maximum progress value already set, change settings instead"
        );
      }
    }
  }
  increase() {
    if (this.state.maxProgressValue !== "x") {
      if (this.state.progressValue < this.state.maxProgressValue) {
        this.setState(state => ({ progressValue: state.progressValue + 1 }));
      } else {
        this.setState({ progressValue: 0 });
        this.setState({ maxProgressValue: "x" });
        if (
          window.confirm(
            "Progress Value is greater than the maximum progress value"
          )
        ) {
          return true;
        } else {
          throw new Error(
            "Progress Value is greater than the maximum progress value"
          );
        }
      }
    } else {
      if (window.confirm("Maximum progress value not set yet")) {
        return true;
      } else {
        throw new Error("Maximum progress value not set yet");
      }
    }
  }
  decrease() {
    if (this.state.maxProgressValue !== "x") {
      if (this.state.progressValue > 0) {
        this.setState(state => ({ progressValue: state.progressValue - 1 }));
      } else {
        this.setState({ maxProgressValue: "x" });
        if (window.confirm("Progress Value is less than 0")) {
          return true;
        } else {
          throw new Error("Progress Value is less than 0");
        }
      }
    } else {
      if (window.confirm("Maximum progress value not set yet")) {
        return true;
      } else {
        throw new Error("Maximum progress value not set yet");
      }
    }
  }
  stop() {
    if (this.state.maxProgressValue !== "x") {
      this.setState({
        progressValue: 0,
        maxProgressValue: "x"
      });
    } else {
      if (window.confirm("Already cleaned up")) {
        return true;
      } else {
        throw new Error("Already cleaned up");
      }
    }
  }
  changeSettings() {
    if (this.state.popupNumber % 2 === 0) {
      document.getElementById("popup").style.display = "block";
      this.setState({ buttonValue: "Close Settings" });
    } else if (this.state.popupNumber % 2 === 1) {
      document.getElementById("popup").style.display = "none";
      this.setState({ buttonValue: "Change Settings" });
    }
    this.setState(state => ({ popupNumber: state.popupNumber + 1 }));
  }
  changeMaxValue(event) {
    event.preventDefault();
    if (this.state.maxProgressValue !== "x") {
      var maxProgress = document.getElementById("max-progress-2").value;

      if (parseInt(maxProgress, 10) === this.state.maxProgressValue) {
        document.getElementById("popup").style.display = "none";
        this.setState({ buttonValue: "Change Settings" });
        this.setState(state => ({ popupNumber: state.popupNumber + 1 }));
        document.getElementById("max-progress-2").value = "";

        if (
          window.confirm(
            "You have already set the progress value to what you typed last time."
          )
        ) {
          return true;
        } else {
          throw new Error(
            "You have already set the progress value to what you typed last time"
          );
        }
      }

      if (maxProgress !== "") {
        if (this.state.progressValue !== 0) {
          if (parseInt(maxProgress, 10) < this.state.progressValue) {
            this.setState({ progressValue: 0 });
          } else {
            if (
              window.confirm("Do you want to set the progress value to zero?")
            ) {
              this.setState({ progressValue: 0 });
            }
          }
        }
      } else {
        document.getElementById("popup").style.display = "none";
        this.setState({ buttonValue: "Change Settings" });
        this.setState(state => ({ popupNumer: state.popupNumber + 1 }));
        document.getElementById("max-progress-2").value = "";
      }
      this.maxProgressAlgorithm(maxProgress, "max-progress-2");
    } else {
      document.getElementById("popup").style.display = "none";
      this.setState({ buttonValue: "Change Settings" });
      this.setState(state => ({ popupNumber: state.popupNumber + 1 }));
      document.getElementById("max-progress-2").value = "";

      if (
        window.confirm("Maximum progress value not set yet, use the first form")
      ) {
        return true;
      } else {
        throw new Error(
          "Maximum progress value not set yet, use the first form"
        );
      }
    }
    // console.log(<Header />);
  }
  getMaxProgressValue() {
    if (this.state.maxProgressValue === "x") {
      return (
        <span>
          <b>Not set yet</b>
        </span>
      );
    } else {
      return (
        <span>
          <b>{this.state.maxProgressValue}</b>
        </span>
      );
    }
  }
  getProgressValue() {
    if (this.state.maxProgressValue === "x") {
      return (
        <span>
          <b>---</b>
        </span>
      );
    } else {
      return (
        <span>
          <b>{this.state.progressValue}</b>
        </span>
      );
    }
  }
  changeProgressValue(event) {
    event.preventDefault();
    if (this.maxProgressValue === "x") {
      document.getElementById("progress").value = "";
      if (window.confirm("Maximum progress value not set yet")) {
        return true;
      } else {
        throw new Error("Maximum progress value not set yet");
      }
    } else {
      if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue
      ) {
        document.getElementById("progress").value = "";
        if (window.confirm("New progress value is the same as old one")) {
          return true;
        } else {
          throw new Error("New progress value is the same as old one");
        }
      } else if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue + 1
      ) {
        document.getElementById("progress").value = "";
        if (
          window.confirm(
            "New progress value is one plus old one, use + button instead."
          )
        ) {
          return true;
        } else {
          throw new Error(
            "New progress value is one plus old one, use + button instead."
          );
        }
      } else if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue - 1
      ) {
        document.getElementById("progress").value = "";
        if (
          window.confirm(
            "New progress value is old one minus one, use - button instead"
          )
        ) {
          return true;
        } else {
          throw new Error(
            "New progress value is old one minus one, use - button instead"
          );
        }
      } else {
        if (
          parseInt(document.getElementById("progress").value, 10) >
          this.maxProgressValue
        ) {
          document.getElementById("progress").value = "";
          if (
            window.confirm(
              "New progress value is greater than maximum progress value"
            )
          ) {
            return true;
          } else {
            throw new Error(
              "New progress value is greater than maximum progress value"
            );
          }
        } else {
          this.setState({
            progressValue: parseInt(
              document.getElementById("progress").value,
              10
            )
          });
          document.getElementById("progress").value = "";
        }
      }
    }
  }
  findPercentage() {
    var percentage = Math.round(
      (1000 * (this.state.progressValue / this.state.maxProgressValue)) / 10
    );

    if (this.state.maxProgressValue !== "x") {
      if (percentage <= 25) {
        return (
          <span className="percentage-bar percentage-bar-red">
            ({percentage}%)
          </span>
        );
      } else if (percentage > 25 && percentage <= 50) {
        return (
          <span className="percentage-bar percentage-bar-orange">
            ({percentage}%)
          </span>
        );
      } else if (percentage > 50 && percentage <= 75) {
        return (
          <span className="percentage-bar percentage-bar-yellow">
            ({percentage}%)
          </span>
        );
      } else {
        return (
          <span className="percentage-bar percentage-bar-green">
            ({percentage}%)
          </span>
        );
      }
    } else {
      return <span />;
    }
  }
  render() {
    return (
      <div>
        <Header />

        <br />

        <div style={{ marginBottom: "350px" }} />
        <div className="separation separation-block" />
        <div id="navbar-form">
          <div id="progress-form">
            <form onSubmit={this.setMaxValue} autoComplete="off">
              <label htmlFor="max-progress">
                Enter the maximum progress bar value:{" "}
              </label>
              <input type="text" id="max-progress" />
              <button type="submit" id="enter-button">
                Enter!
              </button>
            </form>

            <br />
            <div className="border-div">
              <div className="progress-bar-form">
                <button
                  className="progress-button normal-button"
                  onClick={this.decrease}
                >
                  -
                </button>

                <progress
                  id="progress-bar"
                  value={this.state.progressValue}
                  max={this.state.maxProgressValue}
                />
                <button
                  className="progress-button normal-button"
                  onClick={this.increase}
                >
                  +
                </button>
                <p className="progress-value">
                  {this.state.progressValue} out of{" "}
                  <span className="max-progress-value">
                    {this.state.maxProgressValue}
                  </span>{" "}
                  {this.findPercentage()} tasks complete
                </p>
              </div>

              <button className="cancel-button" onClick={this.stop}>
                Stop/Cancel
              </button>
            </div>
            <button
              className="change-settings normal-button"
              onClick={this.changeSettings}
            >
              {this.state.buttonValue}
            </button>
            <div id="popup">
              <form autoComplete="off">
                <label>
                  Maximum progress value: {this.getMaxProgressValue()}, progress
                  value: {this.getProgressValue()}
                </label>
                <br />
                <input id="max-progress-2" />
                <button
                  className="normal-button wide"
                  onClick={this.changeMaxValue}
                >
                  Change maximum progress value
                </button>

                <br />

                <input id="progress" />
                <button
                  className="normal-button wide"
                  onClick={this.changeProgressValue}
                >
                  Change progress value
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="separation" />
        <Footer />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="position">
          <div className="container">
            <nav>
              <ul>
                <h1 id="navbar-h1">React Progress Bar</h1>
                <li>
                  <a href="#progress-form">ProgressForm</a>
                </li>
                <li>
                  <a href="#review">Review</a>
                </li>
                <li>
                  <a href="#thanks">Bye!</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div id="header">
          <h1 id="react-h1">The React Progress Bar</h1>
          <p>
            This is one of the examples of advanced progress bars. This is also
            a improvement to the old React Progress Bar which was active from
            December 2018 to January 2019. Welcome!
          </p>
        </div>
      </div>
    );
  }
}
class Render extends React.Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}
function renderRoot(rootEl) {
  ReactDOM.render(<Render />, rootEl);
}
const rootElement = document.getElementById("root");
renderRoot(rootElement);
