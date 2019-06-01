const controller = require("./app/controllers/s3.controller.js");
var getObject = controller.getObjectFromS3Bucket;
var getKey = controller.getLatestKeyFromS3Bucket;
var getSavedVideo = controller.getSavedVideo;

console.log("key", getKey);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
var cors = require("cors");

app.use(cors());

let router = require("./app/routers/s3.router.js");
app.use("/api/files/:filename", router);

app.get("/", async (req, res) => {
  var key = await getKey("michaelcain-livestream");
  var newObject = await getObject("michaelcain-livestream", key.Key);
  res.send(newObject.Body);
});

app.post("/api/savedvideo", async (req, res) => {
  let savedVideo = req.body;
  var newObject = await getSavedVideo(savedVideo, "michaelcain-livestream");
  console.log("THIS IS THE NEW OBJECT", newObject);
  res.redirect("/");
});
// res.send({ oldVideo: newObject.Body });
// Create a Server
const server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`App listening at http://localhost:${port}`);
});