import React from "react";
import smarthomeImage from "../images/background.jpg";
import "../css/home.css";
import styled from "styled-components";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_count: 2
    };
  }

  componentDidMount() {
    const theImage = this;
    setInterval(function() {
      theImage.setState({
        image_count: theImage.state.image_count + 1
      });
    }, 10000);
  }

  renderImage() {
    console.log("image_count", this.state.image_count);

    let toReturn = [];
    for (let i = 0; i < this.state.image_count; i++) {
      toReturn.push(
        <img
          key={i}
          className="image"
          style={{
            height: "1000px"
            //animation: "slide 60s linear infinite"
          }}
          src={smarthomeImage}
        />
      );
    }
    return toReturn;
  }

  render() {
    return (
      <div>
        <div className="overlay">
          <div className="animation-container">{this.renderImage()}</div>
        </div>
        <div className="main">
          <h1>H🏠VEN</h1>
          <div className="button-container">
            <a href="http://localhost:3000/dashboard" className="rounded-btn1">
              📷
            </a>
            <a href="#" className="rounded-btn">
              🇨🇴
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// <div>
//     <div>Home Page</div>
// </div
