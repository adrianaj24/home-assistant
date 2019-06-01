var stream = require("stream");
const s3 = require("../config/s3.config.js");

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
  try {
    const response = await s3Client.listObjects(params).promise();
    let latest = response.Contents[0];
    for (let key of response.Contents) {
      if (key.LastModified === video) {
        latest = key;
        console.log("LATEST", latest);
      }
    }
    return latest;
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
