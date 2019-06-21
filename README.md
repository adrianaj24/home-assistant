# Haven - Home Assistant WebApp

Haven is an open source Smart Home app built to automate and control common household processes. The first feature implementation of the app is a video feed from a camera that can be placed anywhere in your home. Our users can enter our application and start the live stream to see the feed. Further, a user can also view previous video footage that is saved in the app’s Amazon s3 storage.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the npm install command.
3. Start the web server with `npm start` on your command line.
4. Start the node server with `node server.js` on your command line. 
5. Visit `http://localhost:3000/`

## Dependencies

- MP4 Video
- FFmPeg
- AWS/Amazon S3/AWS CLI/Lambda
- Node JS
- Express JS
- Media Source
- React 
- CSS Grid

## Note

- User must have any cloud storage i.e Amazon S3 and a camera for the video to work on this repo. 

## Screenshots

![Main page](https://github.com/adrianaj24/home-assistant/blob/master/screenshots/Screen%20Shot%202019-06-10%20at%204.42.59%20PM.png)

![Live Stream Page](https://github.com/adrianaj24/home-assistant/blob/master/screenshots/Screen%20Shot%202019-06-10%20at%204.45.49%20PM.png)

![Saved Videos page](https://github.com/adrianaj24/home-assistant/blob/master/screenshots/Screen%20Shot%202019-06-10%20at%204.46.41%20PM.png)
