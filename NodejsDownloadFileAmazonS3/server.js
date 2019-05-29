const controller = require('../controllers/s3.contoller.js');
var getKey = controller.getLatestKeyFromS3Bucket()

const express = require('express');
const app = express();



let router = require('./app/routers/s3.router.js');
app.use('/api/files/:filename', router);
 
app.get()
// Create a Server  
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log(`App listening at http://localhost:${port}`); 
})