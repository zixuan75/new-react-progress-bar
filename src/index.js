import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <p>
          Welcome to this website. This is one of the examples of advanced
          progress bars. This website uses ReactJS as one of its main
          components. Please remember to use JavaScript in your browser.
        </p>
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
      maxProgressValue: 2
    };
    this.setMaxValue = this.setMaxValue.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  setMaxValue() {
    var maxProgress = document.getElementById("max-progress").value;
    if (!isNaN(maxProgress)) {
      if (parseInt(maxProgress, 10) > 1) {
        this.setState({
          maxProgressValue: parseInt(maxProgress, 10)
        });
        document.getElementById("max-progress").value = "";
      } else {
        document.getElementById("max-progress").value = "";
        if (confirm("Maxinum progress value must be greater than 1 to use")) {
          return true;
        } else {
          throw new Error(
            "Maxinum progress value must be greater than 1 to use"
          );
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
  }
  increase() {
    if (this.state.progressValue < this.state.maxProgressValue) {
      this.setState(state => ({ progressValue: state.progressValue + 1 }));
    } else {
      this.setState({ progressValue: 0 });
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
      if (confirm("Progress Value is less than 0")) {
        return true;
      } else {
        throw new Error("Progress Value is less than 0");
      }
    }
  }
  render() {
    return (
      <div>
        <h1>The React Progress Bar Example</h1>
        <Header />
        <hr />
        <div id="progress-form">
          <label htmlFor="max-progress">Enter the maximum value: </label>
          <input type="text" id="max-progress" />
          <button id="enter-button" onClick={this.setMaxValue}>
            Enter!
          </button>

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
              {this.state.progressValue} out of {this.state.maxProgressValue}{" "}
              tasks complete
            </p>
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
