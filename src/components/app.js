import React, { Component } from "react";
import ReactPlayer from "react-player";
import smarthomeImage2 from "../images/background2.png";
import { startlivestream } from "./mediaSource.js";
import "./mediaSource.js";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import { loadDoc } from "./savedMedia.js";
import "./savedMedia.js";
import axios from "axios";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      videos: [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // onChange = date => this.setState({ date });

  // handleChange(date) {
  //   this.setState({ startDate: date });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   let something = this.state.startDate;
  // }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    var something = this.state.value;
    var data = something._d;
    event.preventDefault();

    fetch("http://localhost:8080/api/savedvideo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstParam: data.toLocaleString() })
    })
      .then(res => res.json())
      .then(response => this.setState({ videos: response }))
      .catch(error => console.error("Error:", error));
  }

  render() {
    const rootStyles = {
      backgroundImage: `url(${smarthomeImage2})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "100%"
    };
    const bodyStyle = {
      flex: "1"
    };
    const btnStyle = {
      height: "3rem",
      padding: "0px, 12px, 12px",
      borderradius: "75%"
    };
    return (
      <div style={rootStyles}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" href="http://localhost:3000">
            H🏠VEN
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="#">
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Link
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <DatePicker
                className="calendar"
                selected={this.state.startDate}
                onChange={value => this.setState({ value })}
                value={this.state.value}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                dateFormat="Pp"
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </nav>
        <div className="section">
          <div className="video">
            <div className="videoWrapper">
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
            </div>
            <div className="videoBtn">
              <div className="btn">
                <button style={btnStyle} onClick={startlivestream}>
                  Start Stream{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="video">
            <div className="videoWrapper">
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
            </div>
          </div>
        </div>
        <div>
          <h1>Saved Videos</h1>
          {this.state.videos.map(video => (
            <div key={video.Key}>
              <ol>
                <li>{video.Key}</li>
              </ol>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
