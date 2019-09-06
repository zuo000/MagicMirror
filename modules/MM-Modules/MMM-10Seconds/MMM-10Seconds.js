Module.register("MMM-10Seconds", {
  defaults: {
    recordLength: 10, //unit second
  },

  suspended: false,

  resume: function() {
    this.suspended = false;
  },
  suspend: function () {
    this.suspended = true;
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
    if (this.suspended == true) {
      return document.createElement("div");
    }

    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    var cell = document.createElement("div");
    cell.className = "small cell";

    var num = document.createElement("div");
    num.className = "num";
    num.innerText = "5 4 3 2 1 0";
    cell.appendChild(num);
    wrapper.appendChild(cell);
    return wrapper;
  },
});
