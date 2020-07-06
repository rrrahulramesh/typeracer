import React, { Component } from "react";

class TypeRacer extends Component {
  state = {
    data: [],
    userTypedData: "",
    isGameStarted: false,
    timerOn: false,
    timer: 0,
    timerTime: 0,
    timerStart: true,
    userData: "",
    dataArray: [],
    i: 0,
  };

  componentDidMount() {
    fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
    )
      .then((res) => res.json())
      .then((result) => this.setState({ data: result }));
  }

  startTimer = () => {
    this.setState({ timerOn: true });
    setTimeout(() => {
      this.a();
    }, 3000);
  };

  a = () => {
    this.setState({
      isGameStarted: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });

    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  handleChange = ({ currentTarget: input }) => {
    const { dataArray, data } = this.state;
    var { i, userData } = this.state;

    var a = input.value;

    this.setState({ userTypedData: a });

    var arr = a.split(" ");
    this.setState({ userData: arr });

    var d = [];
    d = data.toString().split(" ");
    this.setState({ dataArray: d });

    if (userData == dataArray[i]) {
      this.setState({ userData: "" });
      this.setState({ i: i + 1 });

      arr = "";
    }
  };

  render() {
    const { timerTime, timerOn, isGameStarted } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return (
      <div>
        <div className="container4">
          <div className="row">
            <p>
              {this.state.data === this.userTypedData}
              <span className="p1">{this.state.data}</span>
            </p>
          </div>
          <div className="row">
            <h1>
              {minutes}:{seconds}
            </h1>
          </div>

          <div className="row">
            {this.state.timerOn === false && this.state.timerTime === 0 && (
              <button onClick={this.startTimer}>Start</button>
            )}

            {timerOn === true && isGameStarted === true && (
              <input
                value={this.state.userData}
                type="text"
                className="textarea"
                placeholder="Write Here"
                onChange={this.handleChange}
                autoFocus={this.state.isGameStarted}
              ></input>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TypeRacer;
