const Recorder = require("../src/helpers/recorder");

var rec = new Recorder({
  url: "rtsp://lakers24:3108041166@192.168.1.15:554/media/video1",
  timeLimit: 60,
  folder: "/home/cain/rtspRecorder/node-rtsp-recorder/videos",
  name: "cam1",
  type: "audio"
});
rec.startRecording();

setTimeout(() => {
  console.log("Stopping Recording");
  rec.stopRecording();
  rec = null;
}, 125000);
