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

/*    var wrapper = document.createElement("div");
    var video = document.createElement("video");
    var canvas = document.createElement("canvas");
    wrapper.appendChild(video);
    wrapper.appendChild(canvas);


    var videoObj = {"video": true};
    var errBack = function (error){
      console.log("Video capture error: " + error.message, error.code);
    };

    if (navigator.getUserMedia) {
      navigator.getUserMedia(videoObj, function (stream) {
      video.src = stream;
      video.play();
      }, errBack);
    }
    */
    var wrapper = document.createElement("div");
    var input1 = document.createElement("input");
    input1.setAttribute("type", "button");
    input1.setAttribute("title", "turn on dev");
    input1.setAttribute("value", "turn on dev");
    input1.onclick = function() {
        navigator.getUserMedia({
            'video': {
          'optional': [{
                              'sourceId': exArray[1] //0为前置摄像头，1为后置
                      }] },
          'audio':true
      }, function(stream) {  
              if (video.mozSrcObject !== undefined) {  
                  video.mozSrcObject = stream;  
              }  
              else {  
                  video.src = window.URL && window.URL.createObjectURL(stream) || stream;  
              }  
    
              //video.play();  
    
      }, function(e) {  
              alert('Error！'+e);  
      });
    };

    return wrapper;
  },
});
