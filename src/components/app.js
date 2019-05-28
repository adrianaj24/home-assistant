import React, { Component } from "react";
import ReactPlayer from "react-player";
import { MEDIAURL } from "./mediaSource.js";

export default class App extends React.Component {
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
          <div>
            <video
              autoPlay
              controls
              className="video"
              src={MEDIAURL}
              width={700}
              height={500}
            />
          </div>
          <div className="footer">Footer</div>
        </div>
      </div>
    );
  }
}
