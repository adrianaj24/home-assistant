let express = require('express');
let router = express.Router();
 
const awsWorker = require('../controllers/s3.controller.js');
const server = require('/Users/alex.tilatti/lighthouse/rollover/lighthouse-web-notes-2/home-assistant/NodejsDownloadFileAmazonS3/server.js');

router.get("/")
 
module.exports = router;