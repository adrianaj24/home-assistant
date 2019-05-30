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
              crossOrigin="anonymous"
              autoPlay
              controls
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
        <div className="footer">Footer</div>
      </div>
    );
  }
}
