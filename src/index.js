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
      if (confirm("Review cannot be empty")) {
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
              (You can actually write as many reviews as you want!)
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
            onClick={this.handleSubmit}>
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
          if (confirm("Maximum progress value must be less than 220 to use")) {
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
          if (confirm("Maximum progress value must be greater than 1 to use")) {
            return true;
          } else {
            throw new Error(
              "Maximum progress value must be greater than 1 to use"
            );
          }
        } else {
          if (confirm("Input cannot be blank")) {
            return true;
          } else {
            throw new Error("Input cannot be blank");
          }
        }
      }
    } else {
      document.getElementById(idstring).value = "";
      if (confirm("Maximum progress value must be a number")) {
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
      if (confirm("Maximum progress value already set")) {
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
          confirm("Progress Value is greater than the maximum progress value")
        ) {
          return true;
        } else {
          throw new Error(
            "Progress Value is greater than the maximum progress value"
          );
        }
      }
    } else {
      if (confirm("Maximum progress value not set yet")) {
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
        if (confirm("Progress Value is less than 0")) {
          return true;
        } else {
          throw new Error("Progress Value is less than 0");
        }
      }
    } else {
      if (confirm("Maximum progress value not set yet")) {
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
      if (confirm("Already cleaned up")) {
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

      if (parseInt(maxProgress, 10) < this.state.progressValue) {
        this.setState({ progressValue: 0 });
      }
      this.maxProgressAlgorithm(maxProgress, "max-progress-2");
    } else {
      document.getElementById("popup").style.display = "none";
      this.setState({ buttonValue: "Change Settings" });
      this.setState(state => ({ popupNumber: state.popupNumber + 1 }));
      document.getElementById("max-progress-2").value = "";

      if (confirm("Maximum progress value not set yet, use the first form")) {
        return true;
      } else {
        throw new Error(
          "Maximum progress value not set yet, use the first form"
        );
      }
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
            <form onSubmit={this.setMaxValue} autocomplete="off">
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
                  onClick={this.decrease}>
                  -
                </button>

                <progress
                  id="progress-bar"
                  value={this.state.progressValue}
                  max={this.state.maxProgressValue}
                />
                <button
                  className="progress-button normal-button"
                  onClick={this.increase}>
                  +
                </button>
                <p className="progress-value">
                  {this.state.progressValue} out of{" "}
                  <span className="max-progress-value">
                    {this.state.maxProgressValue}
                  </span>{" "}
                  tasks complete
                </p>
              </div>

              <button className="cancel-button" onClick={this.stop}>
                Stop/Cancel
              </button>
            </div>
            <button
              className="change-settings normal-button"
              onClick={this.changeSettings}>
              {this.state.buttonValue}
            </button>
            <div id="popup">
              <form autocomplete="off">
                <label>
                  Maximum progress value: {this.state.maxProgressValue}{" "}
                </label>
                <br />
                <input id="max-progress-2" />
                <button className="normal-button" onClick={this.changeMaxValue}>
                  Change
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
        <div class="position">
          <div class="container">
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
