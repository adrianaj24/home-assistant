export function startlivestream() {
  var video = document.getElementById("my-video");

  // file:///C:/Users/HA/Documents/GitHub/teststream/index.html

  // var assetURL =
  // ("https://michaelcain-livestream.s3.amazonaws.com/frag_bunny+(1).mp4");
  const asset1 = "http://localhost:8080";
  // console.log(video.src);
  // const asset2 =
  //   "https://michaelcain-livestream.s3.amazonaws.com/test-2019-06-01T15-04-44.mp4";
  // Need to be specific for Blink regarding codecs
  // ./mp4info frag_bunny.mp4 | grep Codec
  var mimeCodec = 'video/mp4; codecs="avc1.4D601F, mp4a.40.2"';

  const BUFFER_LENGTH = 3;
  var sequences = [];

  var mediaSource = null;
  if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
    mediaSource = new MediaSource();
    //console.log(mediaSource.readyState); // closed
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", sourceOpen);
  } else {
    console.error("Unsupported MIME type or codec: ", mimeCodec);
  }

  var sourceBuffer = null;
  function sourceOpen(_) {
    sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    sourceBuffer.mode = "sequence";

    fetchSequence();

    video.addEventListener("timeupdate", check);
    console.log("I am checkingggg", check);

    video.addEventListener("canplay", function() {
      video.play();
    });
    video.addEventListener("seeking", seek);
  }

  const getNextUrl = () => {
    return asset1;
  };

  function fetchSequence() {
    const url = getNextUrl();
    var xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      appendSegment(xhr.response);
    };
    xhr.send();
  }

  function appendSegment(chunk) {
    sequences.push(chunk);
    sourceBuffer.appendBuffer(chunk);
    if (sequences.length > BUFFER_LENGTH - 1) {
      console.log("sequences: ", sequences);

      sequences.splice(0, 1);
    }
  }

  const check = setInterval(function() {
    fetchSequence();
  }, 8000);
  // function checkBuffer(_) {
  //   console.log("checking buffer");
  //   // if (sequences.length < BUFFER_LENGTH) {
  //   console.log("this is the checkkk", check);
  //   return check;
  //   // }
  // }

  function seek(e) {
    console.log(e);
    if (mediaSource.readyState === "open") {
      sourceBuffer.abort();
      console.log(mediaSource.readyState);
    } else {
      console.log("seek but not open?");
      console.log(mediaSource.readyState);
    }
  }
}
