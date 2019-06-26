import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>The React Progress Bar Example</h1>

          <p>
            Welcome to this website. This is one of the examples of advanced
            progress bars. This website uses ReactJS as one of its main
            components. Please remember to use JavaScript in your browser.
          </p>
        </div>
      </div>
    );
  }
}
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
      return;
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
        <div className="review">
          <br />
          <label htmlFor="new-review">
            <span className="review-text">Review the progress bar system:</span>
            <span className="review-text-2">
              (You can actually write as many reviews as you want!)
            </span>
          </label>
          <br />

          <br />
          <textarea
            id="new-review"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <br />
          <button className="add-review" onClick={this.handleSubmit}>
            Add Review
          </button>
          <List items={this.state.items} />
        </div>
        <div className="separation" />
        <div className="thanks">
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
class List extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <p key={item.id}>{item.text}</p>
        ))}
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      maxProgressValue: "x"
    };
    this.setMaxValue = this.setMaxValue.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.stop = this.stop.bind(this);
  }
  setMaxValue(event) {
    event.preventDefault();
    if (this.state.maxProgressValue === "x") {
      var maxProgress = document.getElementById("max-progress").value;
      if (!isNaN(maxProgress)) {
        if (parseInt(maxProgress, 10) > 1) {
          if (maxProgress < 220) {
            this.setState({
              maxProgressValue: parseInt(maxProgress, 10)
            });
            document.getElementById("max-progress").value = "";
          } else {
            document.getElementById("max-progress").value = "";
            if (
              confirm("Maximum progress value must be less than 220 to use")
            ) {
              return true;
            } else {
              throw new Error(
                "Maximum progress value must be less than 220 to use"
              );
            }
          }
        } else {
          document.getElementById("max-progress").value = "";
          if (maxProgress !== "") {
            if (
              confirm("Maximum progress value must be greater than 1 to use")
            ) {
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
        document.getElementById("max-progress").value = "";
        if (confirm("Maximum progress value must be a number")) {
          return true;
        } else {
          throw new Error("Maximum progress value must be a number");
        }
      }
    } else {
      document.getElementById("max-progress").value = "";
      if (confirm("Maximum progress value already set")) {
        return true;
      } else {
        this.setState({ maxProgressValue: "x" });
        throw new Error("Maximum progress value already set");
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
  render() {
    return (
      <div>
        <Header />
        <div className="arrow arrow1">&#x2B07;</div>
        <div className="arrow">&#x2B07;</div>
        <div className="separation" />
        <div id="navbar-form">
          <div id="progress-form">
            <form onSubmit={this.setMaxValue}>
              <label htmlFor="max-progress">
                Enter the maximum progress bar value:{" "}
              </label>
              <input type="text" id="max-progress" />
              <button type="submit" id="enter-button">
                Enter!
              </button>
            </form>

            <br />

            <div className="progress-bar-form">
              <button className="progress-button" onClick={this.decrease}>
                -
              </button>

              <progress
                id="progress-bar"
                value={this.state.progressValue}
                max={this.state.maxProgressValue}
              />
              <button className="progress-button" onClick={this.increase}>
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
        </div>
        <div className="separation" />
        <Footer />
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
const rootElement = document.getElementById("root");
ReactDOM.render(<Render />, rootElement);
