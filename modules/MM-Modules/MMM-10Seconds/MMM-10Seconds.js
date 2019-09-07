Module.register("MMM-10Seconds", {
  defaults: {
    recordLength: 10, //unit second
  },

  started: false,
  suspended: false,

  resume: function() {
    this.suspended = false;
    this.started = true;
    this.updateDom();
  },
  suspend: function () {
    this.suspended = true;
    this.updateDom();
  },

  getStyles: function() {
    return ["MMM-10Seconds.css"];
  },

  start: function() {
    console.log("Starting module: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    switch (notification) {
      case "HA_GET_STATES_RET":
        break;
      case "HA_POST_STATE_RET":
        break;
      default:
        break;
    }
  },

  getDom: function() {
    if (this.suspended == true || !this.started) {
      return document.createElement("div");
    }

/*    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    var cell = document.createElement("div");
    cell.className = "small cell";

    var num = document.createElement("div");
    num.className = "num";
    num.innerText = "5 4 3 2 1 0";
    cell.appendChild(num);
    wrapper.appendChild(cell);
    */

    var wrapper = document.createElement("div");
    var video = document.createElement("video");
    video.setAttribute("autoplay", "autoplay");
    video.src = "http://localhost:8765/picture/1/frame/";
    wrapper.appendChild(video);


    /*let constraints = {
        video: { width: 800, height: 500 },
        audio: false
    };
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((mediaStream) => {
      mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[1];
      video.srcObject = mediaStream;
      video.play();
    });*/

    return wrapper;
  },
});
