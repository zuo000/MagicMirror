const gui_state = {
    init: 1,
    start_record: 2,
    finish_record: 3,
    start_play: 4,
    finish_play: 5
};

Module.register("MMM-10Seconds", {
  defaults: {
    recordLength: 10, //unit second
  },

  started: false,
  suspended: false,
  state: gui_state.init,
  mediaStreamTrack: null,
  recorder: null,
  filename: "",

  resume: function() {
    this.suspended = false;
    this.started = true;
    this.state = gui_state.init;
    this.updateDom();
  },
  suspend: function () {
    this.suspended = true;
    if (this.mediaStreamTrack) this.mediaStreamTrack.stop();
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
      case "10S_SAVE_DATA_RET":
        this.filename = payload;
        this.state = gui_state.finish_record;
        this.updateDom();
        break;
      default:
        break;
    }
  },

  getDom: function() {
    if (this.suspended == true || !this.started) {
      return document.createElement("div");
    }

    switch (this.state) {
      case gui_state.init: {
        var self = this;
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        var cell = document.createElement("div");
        cell.className = "small cell";

        var num = document.createElement("div");
        num.className = "num";
        num.innerText = "5 4 3 2 1 0";
        cell.appendChild(num);
        cell.addEventListener('animationend', function() {
          self.state = gui_state.start_record;
          self.updateDom();
        });
        wrapper.appendChild(cell);
        return wrapper;
      }
      case gui_state.start_record: {
        var wrapper = document.createElement("div");
        var video = document.createElement("video");

        let constraints = {
            video: { width: 800, height: 500 },
            audio: false
        };
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then((mediaStream) => {
          this.mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[0];
          this.recorder = new MediaRecorder(mediaStream, {mimeType: 'video/webm'});
          this.recorder.ondataavailable = event => {
            let blob = new Blob([event.data], {
              type: 'video/mp4'
            });
            let reader = new FileReader();
            let _t = this;
            reader.onload = function () {
              _t.sendSocketNotification("10S_SAVE_DATA", reader.result);
            };
            reader.readAsArrayBuffer(blob);
          };
          this.recorder.start();
          video.srcObject = mediaStream;
          video.play();
          setTimeout( () => {
            this.recorder.stop(); 
            this.mediaStreamTrack.stop();
            this.state = gui_state.finish_record;
            this.updateDom();
          }, this.config.recordLength * 1000);
        });
        wrapper.appendChild(video);

        return wrapper;
      }
      case gui_state.finish_record: {
        var wrapper = document.createElement("div");
        var video = document.createElement("video");
        video.setAttribute("controls", "controls");
        //video.setAttribute("loop", "loop");
        video.src = "modules/MM-Modules/MMM-10Seconds/" + this.filename;

        wrapper.appendChild(video);
        return wrapper;
      }
      default: 
        return document.createElement("div");
    };

  },
});
