const controller = require("./app/controllers/s3.controller.js");
var getObject = controller.getObjectFromS3Bucket;
var getKey = controller.getLatestKeyFromS3Bucket;
var getSavedVideo = controller.getSavedVideo;
let router = require("./app/routers/s3.router.js");
let savedRoute = require("./app/routers/s3.savedVideo.js")
// const aws = controller.getSavedVideo;
var stream = require('stream');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
var cors = require("cors");

app.use(cors());
app.use("/", savedRoute)

app.get("/", async (req, res) => {
  var key = await getKey("michaelcain-livestream");
  var newObject = await getObject("michaelcain-livestream", key.Key);
  res.send(newObject.Body);
});

app.post("/api/savedvideo", (req, res) => {
  let savedVideo = req.body.firstParam
  getSavedVideo(savedVideo, "michaelcain-livestream")
    .then(function (data) {
      // let newArray = []
      let newSavedVideo = JSON.parse(data.raw)
      let updatedVideo = newSavedVideo["Contents"]
      // let lastVideo = updatedVideo[0] 
      // let latest;
      // for (item of lastVideo) {
      //   if (item.LastModified < )
      // }

      console.log("this is the saved video in POST", updatedVideo[0])   
      res.send(updatedVideo[0])
    })
});

// res.send({ oldVideo: newObject.Body });
// Create a Server
const server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`App listening at http://localhost:${port}`);
});