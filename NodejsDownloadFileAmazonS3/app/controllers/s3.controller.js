var stream = require('stream');
const s3 = require('../config/s3.config.js');
require('events').EventEmitter.defaultMaxListeners = 10;
let eventsArray = [];

//function to loop thru all items in s3 bucket.
async function listAllObjectsFromS3Bucket(bucket, prefix) {
	const s3Client = s3.s3Client;
  let isTruncated = true;
	let marker;
  while(isTruncated) {
    let params = { Bucket: bucket };
    if (prefix) params.Prefix = prefix;
    if (marker) params.Marker = marker;
    try {
			const response = await s3Client.listObjects(params).promise();
      response.Contents.forEach(item => {
        eventsArray.push(item.Key);
			});
			
			console.log(eventsArray)
      isTruncated = response.IsTruncated;
      if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
      }
  } catch(error) {
      throw error;
    }
  }
}

listAllObjectsFromS3Bucket('michaelcain-livestream', '');

//function to download specific file in S3

exports.doDownload = (req, res) => {
		const s3Client = s3.s3Client;
		const params = s3.downloadParams;
		// params.Key = req.params.filename;

		// for (let x = 0; x < eventsArray.length; x++) {
			// console.log('one', s3Client)
			// params.Key = eventsArray[x];
		eventsArray.map(item =>
			s3Client.getObject({
				...params,
				Key: item,
			})
				.createReadStream()
				.on('error', function(err){
					res.status(500).json({error:"Error -> " + err});
				})
				.pipe(res));
				// .createReadStream()
			// 	.on('error', function(err){
			// 		res.status(500).json({error:"Error -> " + err});
			// 	})
			// 	.pipe(res)))
		// }
}

