var stream = require("stream");
const s3 = require("../config/s3.config.js");
var awsCli = require('aws-cli-js');
var Options = awsCli.Options;
var Aws = awsCli.Aws;
const env = require("../config/.env");

var options = new Options(
  /* accessKey    */ env.AWS_ACCESS_KEY,
  /* secretKey    */ env.AWS_SECRET_ACCESS_KEY,
  /* currentWorkingDirectory */ null
);

var aws = new Aws(options)

async function mainFunction() {
  var key = await getLatestKeyFromS3Bucket("michaelcain-livestream");
  getObjectFromS3Bucket("michaelcain-livestream", key.Key);
}
mainFunction();

// function to loop thru all items in s3 bucket.
async function getLatestKeyFromS3Bucket(bucket) {
  const s3Client = s3.s3Client;
  let params = { Bucket: bucket };
  try {
    const response = await s3Client.listObjects(params).promise();
    let latest = response.Contents[0];
    for (let key of response.Contents) {
      if (key.LastModified > latest.LastModified) {
        latest = key;
      }
    }
    return latest;
  } catch (error) {
    throw error;
  }
}

async function getSavedVideo(video, bucket) {
  const s3Client = s3.s3Client;
  let params = { Bucket: bucket };
  console.log(params.Bucket)
  console.log(video)
  try { 
    // `s3 list-objects s3://${params.Bucket} . --exclude "*" --include "${video.firstParam}*"`
    // aws s3api list-objects --bucket myBucketName 
    aws.command(`s3api list-objects --bucket ${params.Bucket} --prefix "${video.firstParam}"`).then(function (data) {
      // let savedVideo = data.raw["Contents"]
     let savedVideo = JSON.parse(data.raw)
     console.log(savedVideo)
    })
  } catch (error) {
    throw error;
  }
}

async function getObjectFromS3Bucket(bucket, key) {
  const s3Client = s3.s3Client;
  let params = { Bucket: bucket, Key: key };
  try {
    const response = await s3Client.getObject(params).promise();
    return response;
  } catch (error) {
    throw error;
  }
}

// function to download specific file in S3

exports.doDownload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.downloadParams;
  params.Key = req.params.filename;

  s3Client
    .getObject(params)
    .createReadStream()
    .on("error", function(err) {
      res.status(500).json({ error: "Error -> " + err });
    })
    .pipe(res);
};
// s3.listObjects(params, function(err, data) {
// 		if (err) {
// 		console.log(err, err.stack)
// 	} else {
// 		console.log(data);
// 	}
// })
module.exports.getObjectFromS3Bucket = getObjectFromS3Bucket;
module.exports.getLatestKeyFromS3Bucket = getLatestKeyFromS3Bucket;
module.exports.getSavedVideo = getSavedVideo;
