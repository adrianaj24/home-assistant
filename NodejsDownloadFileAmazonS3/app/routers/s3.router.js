let express = require("express");
let router = express.Router({ mergeParams: true });

const awsWorker = require("../controllers/s3.controller.js");

router.get("/");
// , awsWorker.doDownload

module.exports = router;
