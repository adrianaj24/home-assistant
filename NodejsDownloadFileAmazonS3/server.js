const controller = require("./app/controllers/s3.controller.js");
var getObject = controller.getObjectFromS3Bucket();
var getKey = controller.getLatestKeyFromS3Bucket();
console.log("controller", controller);

const express = require("express");
const app = express();

let router = require("./app/routers/s3.router.js");
app.use("/api/files/:filename", router);

// app.get();
// Create a Server
const server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`App listening at http://localhost:${port}`);
});
