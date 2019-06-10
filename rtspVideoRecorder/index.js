//
//  index.js
//  node-rtsp-recorder
//
//

const Recorder = require("./src/helpers/recorder");
const FileHandler = require("./src/helpers/fileHandler");

module.exports = {
  Recorder: Recorder,
  FileHandler: FileHandler
};
