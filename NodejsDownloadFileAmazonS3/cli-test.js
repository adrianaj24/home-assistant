var awsCli = require("aws-cli-js");
var Options = awsCli.Options;
var Aws = awsCli.Aws;
// var shell = require("shelljs");
// let eventsArray = [];
// shell.exec("./syncS3.bash")

var options = new Options();

var aws = new Aws(options);

aws.command(
  's3 sync s3://michaelcain-livestream/ ~/lighthouse --exclude "*" --include "file_example_MP4_1920_18MG.mp4*"',
  function(err, data) {
    if (err) {
      throw err;
    } else {
      console.log("data = ", data);
    }
  }
);
