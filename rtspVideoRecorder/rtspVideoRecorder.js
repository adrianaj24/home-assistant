//
//  recordExample.js
//  node-rtsp-recorder
//

const Recorder = require("../src/helpers/recorder");
const shell = require("shelljs");

var rec = new Recorder({
  url: "rtsp://lakers24:3108041166@192.168.1.15:554/media/video1",
  timeLimit: 60,
  folder: "/home/cain/rtspRecorder/node-rtsp-recorder/videos",
  name: "cam1",
  directoryPathFormat: "MMM-Do-YY",
  fileNameFormat: "YYYY-M-D-h-mm-ss"
});
rec.startRecording();

setTimeout(() => {
  console.log("Stopping Recording");
  rec.stopRecording();
  rec = null;

  //shell.exec(comandToExecute, {silent:true}).stdout;
  //you need little improvisation
  shell.exec("./syncS3.bash");
}, 300000);
