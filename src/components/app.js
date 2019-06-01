import React, { Component } from "react";
import ReactPlayer from "react-player";
import { startlivestream } from "./mediaSource.js";
import "./mediaSource.js";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: moment() };
    // this.mediaSource = this.mediaSource.bind(this);
  }

  render() {
    const rootStyles = {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    };
    var today = new Date();
    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 14
    );
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
              <InfiniteCalendar
                width={300}
                height={500}
                selected={today}
                disabledDays={[]}
                minDate={lastWeek}
              />
            </div>
          </div>
          <button onClick={startlivestream}>Start Stream </button>
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
