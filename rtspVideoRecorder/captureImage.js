//
//  captureImage.js
//  node-rtsp-recorder
//
//

const Recorder = require("../src/helpers/recorder");

var rec = new Recorder({
  url: "rtsp://lakers24:3108041166@192.168.1.15:554/media/video1",
  folder: "/home/cain/rtspRecorder/node-rtsp-recorder/videos",
  name: "cam1",
  type: "image"
});
rec.captureImage(() => {
  console.log("Image Captured");
});
