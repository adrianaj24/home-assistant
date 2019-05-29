import React, { Component } from "react";
import ReactPlayer from "react-player";
import { startlivestream } from "./mediaSource.js";
import "./mediaSource.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.mediaSource = this.mediaSource.bind(this);
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
              autoPlay
              controls
              id="my-video"
              className="video"
              src=""
              width={700}
              height={500}
            />
            <button onClick={startlivestream}>Start Stream </button>
          </div>
          {/* <ReactPlayer className="video"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            // playing
          /> */}
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
