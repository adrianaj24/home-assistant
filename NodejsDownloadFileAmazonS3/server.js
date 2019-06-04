const controller = require("./app/controllers/s3.controller.js");
var getObject = controller.getObjectFromS3Bucket;
var getKey = controller.getLatestKeyFromS3Bucket;
console.log("key", getKey);

const express = require("express");
const app = express();
var cors = require("cors");
mostRecentVideoKey = "";
app.use(cors());

let router = require("./app/routers/s3.router.js");
app.use("/api/files/:filename", router);

app.get("/", async (req, res) => {
  var key = await getKey("michaelcain-livestream");
  var newObject = await getObject("michaelcain-livestream", key.Key);
  console.log("NEW TESTERRRR", newObject);
  if (newObject.ETag === mostRecentVideoKey) {
    console.log("Keys MATCH: !!!!!!!!!!!!!!!!!!!", newObject.ETag);
  } else {
    console.log(
      "most Recent keyyyy!!!!!!!!!!!!!!! ",
      newObject.ETag,
      mostRecentVideoKey
    );
    mostRecentVideoKey = newObject.ETag;
    res.send(newObject.Body);
  }
});

// res.send({ oldVideo: newObject.Body });
// Create a Server
const server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`App listening at http://localhost:${port}`);
});
