const AWS = require("aws-sdk");
// const env = require("./.env");

const s3Client = new AWS.S3({
  accessKeyId: 'AKIAJF5APKX7UQEST5RA',
  secretAccessKey: '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',
  region: 'us-east-1'
});

const downloadParams = {
  Bucket: 'michaelcain-livestream',
  Key: " "
};

const s3 = {};
s3.s3Client = s3Client;
s3.downloadParams = downloadParams;

module.exports = s3;
