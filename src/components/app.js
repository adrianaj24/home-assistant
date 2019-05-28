import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./mediaSource.js";

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
          <div className="video">
            <video
              autoPlay
              controls
              src="https://d1p7vmfdxc45kc.cloudfront.net/Sample+Videos+2.mp4"
              width={700}
              height={500}
            >
              No Videos{" "}
            </video>
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
