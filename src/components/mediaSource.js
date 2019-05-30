export function startlivestream() {
  const videoElement = document.getElementById("my-video");
  const myMediaSource = new MediaSource();
  const url = URL.createObjectURL(myMediaSource);
  videoElement.src = url;
  myMediaSource.addEventListener("sourceopen", sourceOpen);
}
function sourceOpen() {
  // 1. add source buffers

  // const audioSourceBuffer = myMediaSource.addSourceBuffer(
  //   'audio/mp4; codecs="mp4a.40.2"'
  // );
  var mediasource = this;
  const videoSourceBuffer = mediasource.addSourceBuffer(
    'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  );

  // 2. download and add our audio/video to the SourceBuffers

  // for the audio SourceBuffer
  // fetch("http://server.com/audio.mp4")
  //   .then(function(response) {
  //     // The data has to be a JavaScript ArrayBuffer
  //     return response.arrayBuffer();
  //   })
  //   .then(function(audioData) {
  //     audioSourceBuffer.appendBuffer(audioData);
  //   });

  // the same for the video SourceBuffer
  fetch("http://localhost:8080", {
    mode: "cors"
  })
    .then(async function(response) {
      let newResponse = await response.json();
      // The data has to be a JavaScript ArrayBuffer
      console.log(newResponse.oldVideo.data);
      const videoSourceBuffer = mediasource.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      );

      videoSourceBuffer.appendBuffer(newResponse.oldVideo.data);

      return newResponse.oldVideo.data.arrayBuffer();
    })
    .then(function(videoData) {
      console.log("what is thisssss");
      videoSourceBuffer.appendBuffer(videoData);
    });
  alert("Starting Live Stream");
}
