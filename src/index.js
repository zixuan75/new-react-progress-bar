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
  render() {
    return <div />;
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
          if (maxProgress < 500) {
            this.setState({
              maxProgressValue: parseInt(maxProgress, 10)
            });
            document.getElementById("max-progress").value = "";
          } else {
            document.getElementById("max-progress").value = "";
            if (
              confirm("Maximum progress value must be less than 500 to use")
            ) {
              return true;
            } else {
              throw new Error(
                "Maximum progress value must be less than 500 to use"
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
  }
  decrease() {
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
        <hr />
        <div id="navbar-form">
          <div id="progress-form">
            <form onSubmit={this.setMaxValue}>
              <label htmlFor="max-progress">Enter the maximum value: </label>
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
        <hr />
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
