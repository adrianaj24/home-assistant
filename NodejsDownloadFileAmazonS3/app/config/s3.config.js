const AWS = require('aws-sdk');
 
const s3Client = new AWS.S3({
  accessKeyId: "AKIAVLZCPLUKXAUEHIX3",
  secretAccessKey: "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",
	region : "us-east-1"
});
 
const downloadParams = {
  Bucket: 'michaelcain-livestream',
  Key: ' '
};

const s3 = {};
s3.s3Client = s3Client;
s3.downloadParams = downloadParams;
 
module.exports = s3;