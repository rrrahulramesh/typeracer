import React, { Component } from "react";

class TypeRacer extends Component {
  state = {
    data: [],
    timerOn: false,
    timerTime: 0,
    timerStart: true,
    userData: "",
    dataArray: [],
    i: 0,
    j: 0,
  };

  componentDidMount() {
    var { dataArray, data } = this.state;
    fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
    )
      .then((res) => res.json())
      .then((result) => this.setState({ data: result }));
  }

  startTimer = () => {
    const { data, dataArray } = this.state;
    this.setState({
      timerOn: true,
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
    var arr;
    arr = a.split(" ");
    this.setState({ userData: arr });

    var d = [];
    d = data.toString().split(" ");
    this.setState({ dataArray: d });

    if (userData == dataArray[i]) {
      console.log(i);
      this.setState({ userData: "" });
      this.setState({ i: i + 1 });

      arr = "";
    }
    // if (userData === dataArray[i] && userData === " ")
    //   console.log(this.state.userData);
  };

  render() {
    const { timerTime, userData } = this.state;
    //let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    //let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="container4">
        <div className="row">
          <h1>
            {minutes}:{seconds}
          </h1>
        </div>

        <div className="row">
          <p>{this.state.data}</p>
        </div>

        <div className="row">
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button onClick={this.startTimer}>Start</button>
          )}
          {this.state.timerOn === true && (
            // <textarea
            //   value={this.state.userData}
            //   type="text"
            //   className="textarea"
            //   placeholder="Write Here"
            //   onChange={this.handleChange}
            // ></textarea>
            <input
              value={this.state.userData}
              type="text"
              className="textarea"
              placeholder="Write Here"
              onChange={this.handleChange}
            ></input>
          )}
        </div>
        <div className="row"></div>
      </div>
    );
  }
}

export default TypeRacer;
