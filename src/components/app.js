import React, { Component } from "react";
import ReactPlayer from "react-player";
import { startlivestream } from "./mediaSource.js";
import "./mediaSource.js";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import { loadDoc } from "./savedMedia.js";
import "./savedMedia.js";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    var something = this.state.value;
    var data = something._d
    event.preventDefault();

    fetch("http://localhost:8080/api/savedvideo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: 
        JSON.stringify({firstParam: data.toLocaleString()})
    });
  }

  render() {
    const rootStyles = {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    };
    const bodyStyle = {
      flex: "1"
    };
    return (
      <div style={rootStyles}>
        <div className="header">This is the title</div>
        <div className="body" style={bodyStyle}>
          <div className="video">
            <video
              crossOrigin="anonymous"
              autoPlay
              controls
              type="video/mp4"
              id="my-video"
              className="video"
              src=""
              width={700}
              height={500}
            />
            <div>
              <button onClick={startlivestream}>Start Stream </button>
            </div>
          </div>
        </div>
       
        <div className="video">
          <video
            crossOrigin="anonymous"
            autoPlay
            controls
            type="video/mp4"
            id="saved-video"
            className="video"
            src=""
            width={700}
            height={500}
          />
          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Time:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form> */}
          <div>
            <button onClick={loadDoc}>Start saved video </button>
          </div>
        </div>
        <div>
        <form onSubmit={this.handleSubmit}>
          <DatePicker
            onChange={value => this.setState({ value })}
            value={this.state.value}
          />
          <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
