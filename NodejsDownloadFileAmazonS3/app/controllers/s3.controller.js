var stream = require("stream");
const s3 = require("../config/s3.config.js");
const env = require("../config/.env");
var awsCli = require("aws-cli-js");
var Options = awsCli.Options;
var Aws = awsCli.Aws;
var Options = new Options(
  /* accessKey    */ env.AWS_ACCESS_KEY,
  /* secretKey    */ env.AWS_SECRET_ACCESS_KEY,
  /* currentWorkingDirectory */ null
);
var aws = new Aws(Options);
var Aws = awsCli.Aws;

async function mainFunction() {
  var key = await getLatestKeyFromS3Bucket("michaelcain-livestream");
  getObjectFromS3Bucket("michaelcain-livestream", key.Key);
}
mainFunction();

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
  let params = { Bucket: bucket };
  return aws.command(
    `s3api list-objects --bucket ${params.Bucket} --prefix "${video}"`
  );
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

module.exports.getObjectFromS3Bucket = getObjectFromS3Bucket;
module.exports.getLatestKeyFromS3Bucket = getLatestKeyFromS3Bucket;
module.exports.getSavedVideo = getSavedVideo;
