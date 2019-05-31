export function startlivestream() {
  const videoElement = document.getElementById("my-video");
  const myMediaSource = new MediaSource();
  const url = URL.createObjectURL(myMediaSource);
  videoElement.src = url;
  myMediaSource.addEventListener("sourceopen", sourceOpen);
}
function sourceOpen() {
  if (
    window.MediaSource.isTypeSupported(
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    )
  ) {
    console.log("YES");
  }
  // 1. add source buffers

  // const audioSourceBuffer = myMediaSource.addSourceBuffer(
  //   'audio/mp4; codecs="mp4a.40.2"'
  // );
  const mediaCodec = 'video/mp4; codecs="avc1.4D601F"';
  var mediasource = this;
  const videoSourceBuffer = mediasource.addSourceBuffer(mediaCodec);

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

  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://localhost:8080", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response; // Note: not oReq.responseText
    if (arrayBuffer) {
      // var byteArray = new Uint8Array(arrayBuffer);
      // for (var i = 0; i < byteArray.byteLength; i++) {
      //   // do something with each byte in the array
      // }
      console.log("44:", arrayBuffer);

      // console.log(videoSourceBuffer);
      videoSourceBuffer.addEventListener("updateend", function(_) {
        mediasource.endOfStream();
        document.getElementById("my-video").play();
        //console.log(mediaSource.readyState); // ended
      });
      videoSourceBuffer.appendBuffer(arrayBuffer);
    }
  };

  oReq.send(null);

  // fetch("http://localhost:8080", {
  //   mode: "cors"
  // }).then(async function(response) {
  //   console.log("response", response);
  //   let newResponse = await response.json();
  //   // The data has to be a JavaScript ArrayBuffer
  //   console.log("THIS IS THE LATEST VIDEO", newResponse.oldVideo.data);
  //   const videoSourceBuffer = mediasource.addSourceBuffer(
  //     'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  //   );
  //   console.log(videoSourceBuffer);
  //   videoSourceBuffer.appendBuffer(newResponse.oldVideo.data);

  //   return newResponse.oldVideo.data.arrayBuffer();
  // });

  //     .then(function(videoData) {
  //       console.log("what is thisssss");
  //       videoSourceBuffer.appendBuffer(videoData);
  //     });
  //   alert("Starting Live Stream");
}
