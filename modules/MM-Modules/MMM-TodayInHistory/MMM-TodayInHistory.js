Module.register("MMM-TodayInHistory", {
  defaults: {
    appId: '',
    maxEvents: 5
  },

  suspended: false,
  loaded: false,

  resume: function() {
    this.suspended = false;
    return this.updateDom();
  },
  suspend: function () {
    this.suspended = true;
    this.updateDom();
  },

  getScripts: function() {
    return ["moment.js"];
  },

  getStyles: function() {
    return ["MMM-TodayInHistory.css"];
  },

	getTranslations: function() {
    return {
      'zh': 'translations/zh.json'
    };
	},

  start: function() {
    console.log("Starting module: " + this.name);

    moment.locale('zh-cn');
    this.loaded = false;
    this.events = null;
    this.getEvents();
  },

  getEvents: function() {

    var dateStr = moment().format('M/D');
    this.sendSocketNotification('TIH_GET_EVENTS', {
      appId: this.config.appId,
      date: dateStr
      });
  },

  socketNotificationReceived: function(notification, payload) {
    switch (notification) {
      case "TIH_GET_EVENTS_RET":
        this.processEvents(payload);
        this.updateDom();
        break;
      default:
        break;
    }
  },

  processEvents: function(data) {
    this.loaded = true;
    this.events = data;
  },

  getRandomArrayElements: function(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  getDom: function() {
    if (this.suspended == true) {
      return document.createElement("div");
    }
    if (!this.loaded) {
      var self = this;
      var loading = document.createElement("div");
      loading.innerHTML = "Hello, TodayInHistory is loading...";
      loading.className = "normal regular medium";
      setTimeout(function() {
        if (!self.loaded) {
          self.getEvents();
        }
      }, 8000);
      return loading;
    }

    var wrapper = document.createElement("table");
    wrapper.className = "medium tih_table "

    for (let e of this.getRandomArrayElements(this.events, this.config.maxEvents)) {
      console.log(this.name + " get event:" + e.date + " ", e.title);
      var row = this.makeRow(e.date + ", " + e.title);
      wrapper.appendChild(row);
    }

    return wrapper;
  },

  getEventContent: function(eventId) {
    this.sendSocketNotification('TIH_GET_EVENT_CONTENT', {
      appId: this.config.appId,
      eventId: eventId
      });
  },

  makeRow: function(text) {
    var self = this;

    var row = document.createElement("tr");
    row.className = "normal";
    var cell = document.createElement("td");
    cell.colSpan = 1;
    cell.innerHTML = text;
    row.appendChild(cell);

    return row;
  },
});
